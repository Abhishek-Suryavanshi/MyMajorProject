const path = require('path');
const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signup/script');

router.get('/', signUpController.getSignup);
router.post('/', signUpController.postSignup);

module.exports = router;