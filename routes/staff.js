const express = require('express');
const { addStaff, getStaffs } = require('../controllers/staff');

const router = express.Router();

router.post('/add', addStaff).get('/get', getStaffs);
module.exports = router;
