const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  development: {
    username: 'e-care',
    password: 'e-CareBe',
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
