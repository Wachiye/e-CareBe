module.exports = (sequelize, DataTypes) => {
	const HealthCareProvider = sequelize.define(
		'HealthCareProvider',
		{
			provider_id: {
				type: DataTypes.STRING(255),
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true,
			},
			address_line1: {
				type: DataTypes.TEXT,
				defaultValue: null,
				allowNull: true,
			},
			accreditation_no: {
				type: DataTypes.STRING,
				defaultValue: null,
				allowNull: true,
			},
			hotline: {
				type: DataTypes.STRING,
				defaultValue: null,
				allowNull: true,
			},
			private_govt: {
				type: DataTypes.ENUM,
				values: ['private', 'government'],
				defaultValue: null,
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true,
			},
			long: {
				type: DataTypes.DOUBLE,
				defaultValue: null,
				allowNull: true,
			},
			lat: {
				type: DataTypes.DOUBLE,
				defaultValue: null,
				allowNull: true,
			},
			healthcare_type: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true,
			},
			address_line2: {
				type: DataTypes.TEXT,
				defaultValue: null,
				allowNull: true,
			},
			city: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true,
			},
			state: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true,
			},
			country: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true,
			},
			zipcode: {
				type: DataTypes.INTEGER,
				defaultValue: null,
				allowNull: true,
			},
		},
		{
			model: 'HealthCareProvider',
			tableName: 'health_care_providers',
		}
	);

	HealthCareProvider.associate = (models) => {
		HealthCareProvider.hasMany(models.Staff);
	};

	return HealthCareProvider;
};
