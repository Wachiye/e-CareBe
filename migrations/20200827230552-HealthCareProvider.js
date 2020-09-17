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

		return queryInterface.createTable('health_care_providers', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			address_line1: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			accreditation_no: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			hotline: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			private_govt: {
				type: Sequelize.ENUM,
				values: ['private', 'government'],
				allowNull: true,
			},
			occupation: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			long: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			lat: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			healthcare_type: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			address_line2: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			city: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			state: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			country: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			zipcode: {
				type: Sequelize.INTEGER,
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
		return queryInterface.dropTable('health_care_providers');
	},
};
