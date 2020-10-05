module.exports = (sequelize, DataTypes) => {
	const PatientRecord = sequelize.define(
		'PatientRecord',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			last_medication: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			remark: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: false,
			},
			phenotype: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			genotype: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			blood_group: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			last_appointment: {
				type: DataTypes.DATE,
				defaultValue: false,
				allowNull: false,
			},
			patient_id: {
				type: DataTypes.STRING(255),
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
			model: 'PatientRecord',
			tableName: 'patient_records',
		}
	);
	PatientRecord.associate = (models) => {
		PatientRecord.hasOne(models.Patient, {
			onDelete: 'cascade',
			foreignKey: 'patient_id',
		});
	};
	return PatientRecord;
};
