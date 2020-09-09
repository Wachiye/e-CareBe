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

		return queryInterface.createTable('staffs', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			provider_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'health_care_providers', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
			},
			staff_email: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			staff_name: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			password: {
				type: Sequelize.STRING(255),
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
			phone_no: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			role: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			department: {
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('staffs');
	},
};
