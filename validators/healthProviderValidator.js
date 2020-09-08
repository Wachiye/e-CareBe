const { body, validationResult } = require('express-validator');
const hcpValidationRules = () => {
	return [
		body('name').isString().optional(),
		body('address_line1').isString().optional(),
		body('accreditation_no').isString().optional(),
		body('hotline').isString().optional(),
		body('private_govt')
			.custom((val) => {
				if (!['private', 'government'].includes(val)) {
					throw new Error('Value can only be private or government');
				}

				return true;
			})
			.optional(),
		body('occupation').isString().optional(),
		body('long').isNumeric().optional(),
		body('lat').isNumeric().optional(),
		body('healthcare_type').isString().optional(),
		body('address_line2').isString().optional(),
		body('city').isString().optional(),
		body('state').isString().optional(),
		body('country').isString().optional(),
		body('zipcode').isNumeric().optional(),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors,
	});
};

module.exports = {
	hcpValidationRules,
	validate,
};
