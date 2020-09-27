const express = require('express');
const { createPatient } = require('../controllers/patient-register');

const router = express.Router();

router.post('/', createPatient);

module.exports = router;
