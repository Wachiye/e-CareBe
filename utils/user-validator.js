const Joi = require('joi');

const validateCreateUser = body => {
  const userSchema = Joi.object()
    .keys({
      first_name: Joi.string().alphanum().min(3).max(60).required(),
      last_name: Joi.string().alphanum().min(3).max(60).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      date_of_birth: Joi.number().integer().min(1900).max(2020),
    })
    .with('password');

  return userSchema.validate(body);
};

module.exports = validateCreateUser;
