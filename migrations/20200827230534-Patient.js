/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.createTable('patients', {
      patient_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(255),
        defaultValue: false,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(255),
        defaultValue: false,
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female'],
        allowNull: false,
      },
      phone_no: {
        type: Sequelize.STRING(15),
        defaultValue: false,
        allowNull: true,
      },
      marital_status: {
        type: Sequelize.ENUM,
        values: ['single', 'married'],
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      occupation: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      next_of_kin: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nok_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nok_phone: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      verification_token: {
        type: Sequelize.STRING(255),
        defaultValue: false,
        allowNull: true,
      },
      password_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      password_token_expire: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('patients');
  },
};
