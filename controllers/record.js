const db = require('../Models/index');

const record = db.PatientRecord;

exports.addRecord = async (req, res) => {
	if (!req.body) {
		res.status(400).json({
			success: false,
			message: 'Please fill in the records you wish to add',
		});
	}

	const recordData = await record.create(req.body).catch((error) => {
		res.status(500).json({ success: false, message: error });
	});
	res.status(200).json({
		success: true,
		message: 'Record added successfully',
		recordData,
	});
};

exports.updateRecord = async (req, res) => {
	//must set patient id as param
	if (!req.params.id) {
		res.status(400).json({
			success: false,
			message: 'Patient id cannot be empty',
		});
	}
	//reject null body
	if (!req.body) {
		res.status(400).json({
			success: false,
			message: 'Please fill in the records you wish to update',
		});
	}
	const patient = await db.Patient.findOne({
		where: { patient_id: req.params.id },
	});
	if (!patient) {
		res.status(404).json({
			success: false,
			message: `No patient with id ${req.params.id} found`,
		});
	}

	await record
		.update(req.body, {
			where: { patient_id: req.params.id },
		})
		.then((row) => {
			if (row) {
				res.status(200).json({
					success: true,
					message: 'Patient record was updated successfully',
				});
			} else {
				res.status(400).json({
					success: false,
					message: `Cannot update patient with id = ${req.params.id}`,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ success: false, message: err.message });
		});
};
exports.getRecord = async (req, res) => {
	console.log(req.params.id);
	if (!req.params.id) {
		res.status(400).json({
			success: false,
			message: 'Patient id cannot be empty',
		});
	}
	const recordData = await record
		.findOne({
			where: { patient_id: req.params.id },
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: error });
		});
	if (!record) {
		res.status(404).json({ success: false, message: 'No record found' });
	}
	res.status(200).json({ success: true, recordData });
};
