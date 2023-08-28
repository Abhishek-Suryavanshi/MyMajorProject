const path = require('path');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/script');

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.delete('/delete-product', adminController.deleteProduct);

router.get('/update-product', adminController.getUpdateProduct);
router.put('/update-product', adminController.putUpdateProduct);

module.exports = router;