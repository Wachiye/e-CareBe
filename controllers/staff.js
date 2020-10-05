const db = require('../Models/index');
const { v4: uuidv4 } = require('uuid');

exports.addStaff = async (req, res) => {
	req.body.staff_id = uuidv4();
	//Save user to database
	await db.Staff.create(req.body)
		.then((data) => {
			res.status(201).json({
				success: true,
				message: 'Staff added successfully.',
				data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				sucuess: false,
				error: err.message || 'Some error occurred while adding staff.',
			});
		});
};

exports.getStaffs = async (req, res) => {
	const staffs = await db.Staff.findAll({
		attributes: [
			'staff_id',
			'staff_name',
			'staff_email',
			'phone_no',
			'role',
			'department',
		],
		where: { provider_id: req.body.provider_id },
	}).catch((error) => {
		res.status(500).json({ error });
	});
	if (!staffs) {
		res.status(404).json({ success: false, message: 'No staff added yet' });
	}
	res.status(200).json({
		success: true,
		message: 'All staff record',
		data: staffs,
	});
};
