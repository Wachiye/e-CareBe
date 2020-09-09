/* eslint-disable no-undef */
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const email = new Email({
	message: {
		from: 'support@e-care.ml',
	},
	send: true,
	transport: nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD,
		},
	}),
	preview: false,
});

module.exports = email;
