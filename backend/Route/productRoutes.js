const express = require('express');
const router = express.Router();
const productController = require('./../Controller/productController');

router.get('/categories', productController.getCategories);
router.get('/products', productController.getProducts);
router.post('/categories', productController.createCategory);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.removeProduct);
router.delete('/categories/:id', productController.removeCategory);

module.exports = router;
