const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../Models/index');
const validator = require('../utils/user-validator');
const mailer = require('../utils/mailer');
const generateToken = require('../utils/auth-token');
const ErrorResponse = require('../utils/errorResponse');

exports.createPatient = async (req, res, next) => {
  try {
    const patient = req.body;

    // const validate = validator(patient);
    // if (validate.error) {
    //   return next(
    //     new ErrorResponse('Validation error, please filll form correctly', 400)
    //   );
    // }
    // if (!validate) {
    //   return next(
    //     new ErrorResponse(
    //       'Validation error, please fill the form correctly',
    //       400
    //     )
    //   );
    // }

    const { email } = patient;
    const existingEmail = await db.Patient.findOne({ where: { email } });
    if (existingEmail) {
      return next(
        new ErrorResponse('Patient with that email already exists', 403)
      );
    }

    const hashPassword = await bcrypt.hash(patient.password, 8);

    const data = {
      email: patient.email,
      name: patient.last_name,
    };

    const token = generateToken(data);

    const savePatient = {
      patient_id: uuidv4(),
      first_name: patient.first_name,
      last_name: patient.last_name,
      date_of_birth: patient.date_of_birth,
      gender: patient.gender,
      phone_no: patient.phone_no,
      marital_status: patient.marital_status,
      occupation: patient.occupation,
      address: patient.address,
      next_of_kin: patient.next_of_kin,
      nok_address: patient.nok_address,
      nok_phone: patient.nok_phone,
      email: patient.email,
      password: hashPassword,
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
      // res.status(200).json({
      //   email: patient.email,
      //   message: 'User created successfully',
      //   token,
      // });
    } catch (error) {
      console.log(error);
      return next(
        new ErrorResponse('Error, cannot have duplicate unique fields', 400)
      );
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('An error occured, please try again', 500));
  }
};
