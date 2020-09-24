/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
<<<<<<< HEAD
  development: {
    username: 'root',
    password: null,
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
=======
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		define: {
			timestamps: false,
		}
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql',
		define: {
			timestamps: false,
		}
	},

	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
		define: {
			timestamps: false,
		}
		
	}

};
>>>>>>> ac4a91c60b57e7a5a9c371bdcb6e9f1edcabc2b9
