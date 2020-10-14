const {
	hcpValidationRules,
	validate,
} = require('../validators/healthProviderValidator');
const express = require('express');
const {
	providerSignUp,
	getProviders,
	getProvider,
	// update,
	// deleteRecord,
} = require('../controllers/provider');

const router = express.Router();

router.post('/signup', hcpValidationRules(), validate, providerSignUp);
router.get('/', getProviders);
router.get('/:id', getProvider);
// router.patch('/:id', update);
// router.delete('/:id', deleteRecord);
module.exports = router;
