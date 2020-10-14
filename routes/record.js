const express = require('express');
const { addRecord, updateRecord, getRecord } = require('../controllers/record');

const router = express.Router();

router.post('/add', addRecord).get('/:id', getRecord).put('/:id', updateRecord);

module.exports = router;
