const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const db = require('../models');
const validator = require('../utils/user-validator');
const mailer = require('../../Utils/mailer');
const jsonWT = require('../../Utils/auth-token');
const ErrorResponse = require('../utils/errorResponse');

exports.create = async (req, res, next) => {
	try {
		const patient = req.body;
		const validate = validator(patient);
		if (validate.error) {
			return next(
				new ErrorResponse(
					'Validation error, please filll form correctly',
					400
				)
			);
		}

		const { email } = patient;
		const existingEmail = await db.Patient.findOne({ where: { email } });
		if (existingEmail) {
			return next(
				new ErrorResponse('Patient with that email already exists', 403)
			);
		}

		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(patient.password, salt);

		const data = {
			email: patient.email,
			name: patient.last_name,
		};
		const token = jsonWT.signJWT(data, '1h');

		const savePatient = {
			patient_id: uuid(),
			first_name: patient.firstname,
			last_name: patient.lastname,
			date_of_birth: patient.date_of_birth,
			gender: patient.gender,
			email: patient.email,
			phone_no: patient.phone_no,
			password: password,
			verification_token: token,
		};

		// create new patient and send verification mail
		try {
			await db.Patient.create(savePatient);
			const verificationUrl = `${req.protocol}://${req.get(
				'host'
			)}/email/verify/?verification_code=${token}`;

			// const message = `<p> Hi ${savePatient.last_name} thanks for registering, kindly verify your email </p><a href ='${verificationUrl}'>${token}</a>`;
			await mailer.send({
				template: '../utils/emails/verification',
				message: { to: savePatient.email },
				locals: { name: savePatient.last_name, url: verificationUrl },
			});
			res.status(200).json({
				email: patient.email,
				message: 'Verifaction email sent',
				token,
			});
		} catch (error) {
			return next(
				new ErrorResponse(
					'Error, cannot have duplicate unique fields',
					400
				)
			);
		}
	} catch (error) {
		return next(
			new ErrorResponse('An error occured, please try again', 500)
		);
	}
};
