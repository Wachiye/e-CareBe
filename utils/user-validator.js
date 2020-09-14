const Joi = require('joi');

const validateCreateUser = (body) => {
	const userSchema = Joi.object()
		.keys({
			first_name: Joi.string().alphanum().min(3).max(60).required(),
			last_name: Joi.string().alphanum().min(3).max(60).required(),
			password: Joi.string()
				.regex(/^[a-zA-Z0-9]{3,30}$/)
				.min(8),
			confirm_password: Joi.ref('password'),
			email: Joi.string()
				.email({
					minDomainSegments: 2,
					tlds: { allow: ['com', 'net'] },
				})
				.required(),
			phone_no: Joi.string()
				.regex(/^[0]+[0-9]{10}$/)
				.min(5)
				.max(12)
				.required(),
		})
		.with('password', 'confirm_password');

	return userSchema.validate(body);
};

module.exports = validateCreateUser;
