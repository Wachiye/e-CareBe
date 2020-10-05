const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	development: {
<<<<<<< HEAD
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
=======
		username: 'e-care',
		password: 'e-careBe',
>>>>>>> 4d0b486a69f1eadc205980fc32cb3f940c2d600a
		database: 'e-care',
		host: 'localhost',
		dialect: 'mysql',
		define: {
			underscored: true,
		},
		test: {
			username: 'root',
			password: null,
			database: 'database_test',
			host: '127.0.0.1',
			dialect: 'mysql2',
			define: {
				timestamps: false,
				underscored: true,
			},
			production: {
				username: 'root',
				password: null,
				database: 'database_production',
				host: '127.0.0.1',
				dialect: 'mysql2',
				define: {
					timestamps: false,
					underscored: true,
				},
			},
		},
	},
};
