const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop/script');

router.get('/', shopController.getShop);

router.get('/profile', shopController.getProfile);
router.get('/products', shopController.getProducts);

router.get('/addToCart', shopController.getAddToCart);

router.get('/getcart', shopController.getCart);

router.get('/products-list', shopController.getProductList);

router.post('/reduceitem', shopController.postReduceItem);

router.get('/update-profile', shopController.getUpdateProfile);
router.put('/update-profile', shopController.putUpdateProfile);

module.exports = router;