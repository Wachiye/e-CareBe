const {
	hcpValidationRules,
	validate,
} = require('../validators/healthProviderValidator');
const express = require('express');
const {
	create,
	read,
	readSingle,
	update,
	deleteRecord,
} = require('../controllers/HealthCareProvider');

const router = express.Router();

router.post('/', hcpValidationRules(), validate, create);
router.get('/', read);
router.get('/:id', readSingle);
router.patch('/:id', update);
router.delete('/:id', deleteRecord);
module.exports = router;
