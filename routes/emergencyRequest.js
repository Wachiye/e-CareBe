const express = require('express');
const { emergencyRequest } = require('../controllers/emergencyRequest');

const router = express.Router();

router.post('/emergencyrequest', emergencyRequest);

module.exports = router;
