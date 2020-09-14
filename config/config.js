/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	development: {
		username: 'root',
		password: null,
		database: 'e-care',
		host: 'localhost',
		dialect: 'mysql',
		define : {
		"timestamps":false,
		"underscored":true
	
		
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql2',
		define : {
		"timestamps":false,
		"underscored":true
		
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql2',
		define : {
		"timestamps":false,
		"underscored":true,
		}
		
	}
	}
}
}