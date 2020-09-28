const { successResponse, errorResponse } = require('.');

/* prettier-ignore */
const db = require('../Models/index');

exports.providerSignUp = (req, res, next) => {
	// Create a health care provider
	const healthCareProvider = {
		name: req.body.name,
		address_line1: req.body.address_line1,
		accreditation_no: req.body.accreditation_no,
		hotline: req.body.hotline,
		private_govt: req.body.private_govt,
		occupation: req.body.occupation,
		long: req.body.long,
		lat: req.body.lat,
		healthcare_type: req.body.healthcare_type,
		address_line2: req.body.address_line2,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		zipcode: req.body.zipcode,
	}
	//Save user to database
	healthCareProvider
		.save()
		.then((data) => {
			res
				.status(201)
				.send(
					successResponse(data, 'Health care provider created successfully.')
				);
		})
		.catch((err) => {
			res
				.status(500)
				.send(
					err.message ||
            'Some error occurred while creating the health care provider.'
				);
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 * Method to get all health care providers
 */

exports.read = (req, res) => {
	HealthCareProvider.findAll()
		.then((data) => {
			res.send(successResponse(data, 'Fetched all records'));
		})
		.catch((err) => {
			res
				.status(500)
				.send(
					err.message ||
            'Some error occurred while creating the health care provider.'
				);
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 * Method to get a single health care provider
 */
exports.readSingle = (req, res) => {
	HealthCareProvider.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((data) => {
			if (data) {
				res.send(successResponse(data, 'Record fetched'));
			} else {
				res.status(404).send(errorResponse([], 'Record not found'));
			}
		})
		.catch((err) => {
			res
				.status(500)
				.send(
					err.message ||
            'Some error occurred while creating the health care provider.'
				);
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 * Method to patch a single health care provider
 */
exports.update = (req, res) => {
	HealthCareProvider.update(
		{ ...req.body },
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then(async (_) => {
			const updatedRecord = await HealthCareProvider.findByPk(req.params.id);
			if (updatedRecord) {
				res.send(successResponse(updatedRecord, 'Record updated successfully'));
			} else {
				res.status(404).send(errorResponse([], 'Record not found'));
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while updating record.',
			});
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 * Method to delete a single health care provider
 */
exports.deleteRecord = (req, res) => {
	HealthCareProvider.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(async (data) => {
			res.send(successResponse(true, 'Record deleted successfully'));
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while deleting record.',
			});
		});
};
