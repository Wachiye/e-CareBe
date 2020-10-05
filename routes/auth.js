const express = require('express');
const {
	forgotPassword,
	resetPassword,
	staffLogin,
	patientLogin,
	providerLogin,
} = require('../controllers/auth');

const router = express.Router();
router
	.post('/forgotpassword', forgotPassword)
	.post('/stafflogin', staffLogin)
	.post('/patientlogin', patientLogin)
	.post('/providerlogin', providerLogin)
	.put('/resetpassword', resetPassword);
module.exports = router;
