/* eslint-disable no-undef */
const db = require('../Models/index');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/async');
const email = require('../utils/mailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc      Forgot password
// @route     POST /v1/auth/forgotpassword
// @access    Public

// generate neccessary password reset variables
const passwordResetVars = () => {
	const rawToken = crypto.randomBytes(20).toString('hex');

	// Hash raw token
	const password_token = crypto
		.createHash('sha256')
		.update(rawToken)
		.digest('hex');

	// set password reset token expiry
	const password_token_expire = Date.now() + 4500000;

	return { rawToken, password_token, password_token_expire };
};
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const patient = await db.Patient.findOne({
		where: { email: req.body.email },
	});

	if (!patient) {
		return next(
			new ErrorResponse(
				'There is no patient registered with this email address',
				404
			)
		);
	}

	const {
		rawToken,
		password_token,
		password_token_expire,
	} = passwordResetVars();

	// update password reset token and password reset token expiry for patient to db
	await db.Patient.update(
		{ password_token, password_token_expire },
		{ where: { email: req.body.email } }
	);

	// construct reset url
	var resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/auth/resetpassword/${rawToken}`;
	// send reset link to patient's email address
	try {
		await email.send({
			template: '../utils/emails/password',
			message: { to: req.body.email },
			locals: { name: patient.name, url: resetUrl },
		});
		res.status(200).json({
			email: patient.email,
			message: 'Recovery email sent',
			token: rawToken,
		});
	} catch (error) {
		patient.password_token = null;
		patient.password_token_expire = null;
		await patient.save();
		return next(
			new ErrorResponse('An error occured, please try again later', 500)
		);
	}
});

// @desc      Reset password
// @route     PUT /v1/auth/resetpassword
// @access    Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
	// get hashed token
	const password_token = crypto
		.createHash('sha256')
		.update(req.body.token)
		.digest('hex');

	const patient = await db.Patient.findOne({ where: { password_token } });
	// console.log(Date.now());

	if (!patient) {
		return next(new ErrorResponse('Invalid Token', 400));
	}
	if (patient.password_token_expire < Date.now()) {
		return next(new ErrorResponse('Token expired', 400));
	}

	// save new password to database
	const salt = await bcrypt.genSalt(10);
	patient.password = await bcrypt.hash(req.body.password, salt);
	patient.password_token = null;
	patient.password_token_expire = null;
	await patient.save();

	res.status(200).json({
		success: 'true',
		message: 'Password successfully changed',
	});
});

// Creating jsonwebtoken
const loginTokenExpiryTime = 7 * 24 * 60 * 60;
const createToken = (email) => {
	return jwt.sign({email}, 'e-care', {
		expiresIn: loginTokenExpiryTime
	});
};

// @desc      Staff Login
// @route     POST /v1/auth/stafflogin
exports.staffLogin = asyncHandler(async(req, res) => {
	let { email, password } = req.body;

	const staff = await db.Staff.findOne({
		where: { staff_email: email },
	});
 
	if (staff) {
		const passwaordAuth = await bcrypt.compare(password, staff.password);
		if (passwaordAuth) {
			const loginToken = createToken(email);

			await db.Staff.update(
				{ password_token: loginToken, password_token_expire: loginTokenExpiryTime },
				{ where: { staff_email: email } }
			);

			res.json({
				status: 'success',
				token: loginToken
			});

		} else {
			return next(new ErrorResponse('Incorrect Password', 401));
		}
	}
	else {
		return next(new ErrorResponse('Email is not registered', 404));
	}
});

// @desc      Patient Login
// @route     POST /v1/auth/patientlogin
exports.patientLogin = asyncHandler(async(req, res) => {
	let { email, password } = req.body;

	const patient = await db.Patient.findOne({
		where: { email: email },
	});
 
	if (patient) {
		const passwaordAuth = await bcrypt.compare(password, patient.password);
		if (passwaordAuth) {
			const loginToken = createToken(email);

			await db.Patient.update(
				{ password_token: loginToken, password_token_expire: loginTokenExpiryTime },
				{ where: { email: email } }
			);

			res.json({
				status: 'success',
				token: loginToken
			});

		} else {
			return next(new ErrorResponse('Incorrect Password', 401));
		}
	}
	else {
		return next(new ErrorResponse('Email is not registered', 404));
	}
});