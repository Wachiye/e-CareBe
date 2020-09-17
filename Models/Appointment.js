module.exports = (sequelize, DataTypes) => {
	const Appointment = sequelize.define(
		'Appointment',
		{
			appointment_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			patient_name: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			patient_email: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			phone_no: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			preferred_date: {
				type: DataTypes.DATEONLY,
				defaultValue: false,
				allowNull: true,
			},
			preferred_time: {
				type: DataTypes.TIME,
				defaultValue: false,
				allowNull: true,
			},
			reason_for_appointment: {
				type: DataTypes.ENUM,
				values: ['consultation', 'antenatal', 'others'],
				defaultValue: false,
				allowNull: true,
			},
			patient_id: {
				type: DataTypes.INTEGER,
			},
			staff_id: {
				type: DataTypes.INTEGER,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal(
					'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
				),
			},
		},
		{
			model: 'Appointment',
			tableName: 'appointments',
		}
	);
	Appointment.associate = (models) => {
		Appointment.hasOne(models.Patient, {
			foreignKey: 'patient_id',
		});
		Appointment.hasOne(models.Staff, {
			foreignKey: 'staff_id',
		});
	};
	return Appointment;
};
