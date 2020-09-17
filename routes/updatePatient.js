const express = require('express');
const { updatePatient } = require('../controllers/updatePatient');

const router = express.Router();

router.put('/:id', updatePatient);

module.exports = router;