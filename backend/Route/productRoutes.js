const express = require('express');
const router = express.Router();
const productController = require('./../Controller/productController');
const categoryController = require('./../Controller/categoryController');

// Get all products
router.get('/products', async (req, res) => {
  try {
    await productController.getProducts(req, res);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// Add or update a product
router.post('/products', async (req, res) => {
  try {
    await productController.addOrUpdateProduct(req, res);
  } catch (error) {
    console.error("Error adding or updating product:", error);
    res.status(500).json({ message: "Failed to add or update product", error: error.message });
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    await productController.addOrUpdateProduct(req, res);
  } catch (error) {
    console.error(`Error updating product with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
});

// Remove a product by ID
router.delete('/products/:id', async (req, res) => {
    try {

    await productController.removeProduct(req, res);
  } catch (error) {
    console.error(`Error removing product with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Failed to remove product", error: error.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    await categoryController.getCategories(req, res);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
});

// Add a new category
router.post('/categories', async (req, res) => {
  try {
    await categoryController.createCategory(req, res);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category", error: error.message });
  }
});

// Remove a category by ID
router.delete('/categories/:id', async (req, res) => {
  try {
    await categoryController.removeCategory(req, res);
  } catch (error) {
    console.error(`Error removing category with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Failed to remove category", error: error.message });
  }
});

module.exports = router;
