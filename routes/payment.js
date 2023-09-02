const path = require('path');
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment/payment');

router.post('/checkout', paymentController.postCheckout);

router.post('/paymentverification', paymentController.postPaymentVerification);

router.get('/getkey', paymentController.getGetKey);
router.get('/getCartItems', paymentController.getCartItems);

module.exports = router;