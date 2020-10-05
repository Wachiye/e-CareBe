const db = require('../Models/index');
const ErrorResponse = require('../utils/errorResponse');
const { v4: uuidv4 } = require('uuid');

exports.providerSignUp = async (req, res, next) => {
	// check if exists
	const provider = await db.HealthCareProvider.findOne({
		where: { name: req.body.name },
	});
	if (provider) {
		return next(new ErrorResponse('Provider already exists', 400));
	}
	req.body.provider_id = uuidv4();
	//Save user to database
	await db.HealthCareProvider.create(req.body)
		.then((data) => {
			res.status(201).json({
				success: true,
				message: 'Health care provider created successfully.',
				data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				sucuess: false,
				error:
					err.message ||
					'Some error occurred while creating the health care provider.',
			});
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 *
 *
 * Method to get all health care providers
 */

exports.getProviders = (req, res) => {
	db.HealthCareProvider.findAll()
		.then((data) => {
			res.json({ success: true, data });
		})
		.catch((err) => {
			res.status(500).json({
				error:
					err.message ||
					'Some error occurred while creating the health care provider.',
			});
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 * Method to get a single health care provider
 */
exports.getProvider = (req, res) => {
	db.HealthCareProvider.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((data) => {
			if (data) {
				res.status(200).json({ success: true, data });
			} else {
				res.status(404).json({
					success: false,
					message: 'Record not found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				error:
					err.message ||
					'Some error occurred while creating the health care provider.',
			});
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 * Method to patch a single health care provider
 
exports.update = (req, res) => {
	db.HealthCareProvider.update(
		{ ...req.body },
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then(async (_) => {
			const updatedRecord = await HealthCareProvider.findByPk(
				req.params.id
			);
			if (updatedRecord) {
				res.send(
					successResponse(
						updatedRecord,
						'Record updated successfully'
					)
				);
			} else {
				res.status(404).send(errorResponse([], 'Record not found'));
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while updating record.',
			});
		});
};

/**
 *
 * @param {object} req - The request object
 * @param {object} res  - The response object
 *
 * Method to delete a single health care provider
 
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
				message:
					err.message || 'Some error occurred while deleting record.',
			});
		});
};
**/
