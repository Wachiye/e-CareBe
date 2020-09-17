const express = require('express');
const { forgotPassword, resetPassword, staffLogin, patientLogin } = require('../controllers/auth');

const router = express.Router();
router
	.post('/forgotpassword', forgotPassword)
	.post('/stafflogin', staffLogin)
	.post('/patientlogin', patientLogin)
	.put('/resetpassword', resetPassword);
module.exports = router;
