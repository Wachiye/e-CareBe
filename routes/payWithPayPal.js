const express = require('express');
const { requestPayment, processPayment, cancelPayment} = require('../controllers/payWithPayPal');

const router = express.Router();

//initializing the payment request
router.get('/request', requestPayment);

//processing the payment
router.get('/process', processPayment);

//cancelling the payment
router.get('/cancel', cancelPayment);

module.exports = router;