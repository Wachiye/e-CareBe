const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const colors = require('colors');
const db = require('./Models');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/error');
require('dotenv').config();

// import routes here
const index = require('./routes/index');
const healthcp = require('./routes/healthcp');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const auth = require('./routes/auth');

dotenv.config();
const app = express();
app.use(morgan('tiny'));

// Set Security HTTP Headers
app.use(helmet());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cors());

// express body parser
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);

// mount routers here
app.use('/v1/index', index);
app.use('/v1/provider', healthcp);
app.use('/v1/auth', auth);

// middlewares
app.use(errorHandler);

module.exports = app;
