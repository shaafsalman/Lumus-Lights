const express = require('express');
const router = express.Router();
const productController = require('./../Controller/productController');
const categoryController = require('./../Controller/categoryController');


// Get all products
router.get('/products', productController.getProducts);
// Add or update a product
router.post('/products', productController.addOrUpdateProduct);
// Update a product by ID
router.put('/products/:id', productController.addOrUpdateProduct);
// Remove a product by ID
router.delete('/products/:id', productController.removeProduct);


router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);
router.delete('/categories/:id', categoryController.removeCategory);

module.exports = router;
