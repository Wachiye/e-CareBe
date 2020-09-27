const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const generateToken = data => {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: '1day' });
  return token;
};

module.exports = generateToken;
