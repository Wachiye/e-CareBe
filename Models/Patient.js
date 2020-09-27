module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'Patient',
    {
      patient_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        defaultValue: false,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female'],
        defaultValue: false,
        allowNull: false,
      },
      phone_no: {
        type: DataTypes.STRING(15),
        defaultValue: false,
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.ENUM,
        values: ['single', 'married', 'divorced', 'complicated'],
        defaultValue: false,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: false,
      },
      occupation: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: true,
      },
      next_of_kin: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: true,
      },
      nok_address: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: true,
      },
      nok_phone: {
        type: DataTypes.STRING(15),
        defaultValue: false,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        defaultValue: false,
        allowNull: false,
      },
      verification_token: {
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
      model: 'Patient',
      tableName: 'patients',
    }
  );
  Patient.associate = models => {
    Patient.belongsTo(models.PatientRecord, { foreignKey: 'patient_id' });

    Patient.belongsTo(models.Appointment, {
      foreignKey: 'patient_id',
      onDelete: 'cascade',
    });
  };
  return Patient;
};
