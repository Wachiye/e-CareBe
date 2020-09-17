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

		return queryInterface.createTable('patient_records', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			last_medication: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			remark: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			phenotype: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			genotype: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			blood_group: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			last_appointment: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			patient_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'patients', // name of Target model
					key: 'patient_id', // key in Target model that we're referencing
				},
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
		return queryInterface.dropTable('patient_records');
	},
};
