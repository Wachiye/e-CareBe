const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/auth');

const router = express.Router();
router
	.post('/forgotpassword', forgotPassword)
	.put('/resetpassword', resetPassword);
module.exports = router;
