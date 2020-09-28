module.exports = (sequelize, DataTypes) => {
	const Staff = sequelize.define(
		'Staff',
		{
			staff_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			provider_id: {
				type: DataTypes.INTEGER,
			},
			staff_email: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			staff_name: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			password_token: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			password_token_expire: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			phone_no: {
				type: DataTypes.STRING(255),
				defaultValue: false,
				allowNull: true,
			},
			role: {
				type: DataTypes.STRING,
				defaultValue: false,
				allowNull: false,
			},
			department: {
				type: DataTypes.STRING,
				defaultValue: false,
				allowNull: true,
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
			model: 'Staff',
			tableName: 'staffs',
		}
	);
	Staff.associate = (models) => {
		Staff.hasOne(models.HealthCareProvider, {
			foreignKey: 'provider_id',
		});

		Staff.belongsTo(models.Appointment);
	};
	return Staff;
};
