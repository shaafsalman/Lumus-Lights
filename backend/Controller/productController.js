const productModel = require('../Model/productModel');

// Fetch all categories
const getCategories = (req, res) => {
  productModel.fetchCategories((err, categories) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(categories);
  });
};

// Fetch all products with optional filtering by category
const getProducts = (req, res) => {
  const { categoryId } = req.query; // Assume categoryId is passed as a query parameter
  productModel.fetchProducts(categoryId, (err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(products);
  });
};

// Add a new category
const createCategory = (req, res) => {
  const { name } = req.body; // Assume name is passed in the request body
  productModel.addCategory(name, (err, categoryId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ id: categoryId, name });
  });
};

// Delete a category by ID
const removeCategory = (req, res) => {
  const { id } = req.params; // Get category ID from request parameters
  productModel.deleteCategory(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(result);
  });
};


// Add a new product along with its SKU(s) and images
const createProduct = (req, res) => {
  const { name, description, categoryId, brand, skus, images } = req.body; // Get product data from the request body
  
  // First, insert the product data
  productModel.addProduct(name, description, categoryId, brand, (err, productId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If SKUs are provided, insert them
    if (skus && Array.isArray(skus)) {
      const skuPromises = skus.map(sku => 
        productModel.addSKU(productId, sku.sku, sku.price, sku.stock, sku.color, sku.size, sku.wattage, sku.voltage)
      );

      Promise.all(skuPromises)
        .then(skuIds => {
          // If images are provided, insert them
          if (images && Array.isArray(images)) {
            const imagePromises = images.map(image => 
              productModel.addImage(skuIds[0], image.image_path, image.is_primary) // Assuming the first SKU for the primary image
            );

            return Promise.all(imagePromises);
          }
        })
        .then(() => {
          res.status(201).json({ id: productId, name, description, categoryId, brand });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Failed to create SKUs or images' });
        });
    } else {
      res.status(201).json({ id: productId, name, description, categoryId, brand });
    }
  });
};

// Update a product by ID, including updating SKUs and images if necessary
const updateProduct = (req, res) => {
  const { id } = req.params; // Get product ID from request parameters
  const { name, description, categoryId, brand, skus, images } = req.body; // Get updated data from request body
  
  productModel.updateProduct(id, name, description, categoryId, brand, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Update SKUs if provided
    if (skus && Array.isArray(skus)) {
      const skuPromises = skus.map(sku => 
        productModel.updateSKU(sku.id, sku.sku, sku.price, sku.stock, sku.color, sku.size, sku.wattage, sku.voltage)
      );

      Promise.all(skuPromises)
        .then(() => {
          // Update images if provided
          if (images && Array.isArray(images)) {
            const imagePromises = images.map(image => 
              productModel.updateImage(image.id, image.image_path, image.is_primary) // Assuming you have an ID for the image
            );

            return Promise.all(imagePromises);
          }
        })
        .then(() => {
          res.status(200).json({ message: 'Product updated successfully', result });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Failed to update SKUs or images' });
        });
    } else {
      res.status(200).json(result);
    }
  });
};

// Delete a product by ID along with its SKUs and images
const removeProduct = (req, res) => {
  const { id } = req.params; // Get product ID from request parameters
  
  productModel.deleteProduct(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Optionally, you might want to delete SKUs and images related to the product here
    productModel.deleteSKUsByProductId(id, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete SKUs' });
      }

      productModel.deleteImagesByProductId(id, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to delete images' });
        }

        res.status(200).json({ message: 'Product deleted successfully', result });
      });
    });
  });
};




module.exports = {
  getCategories,
  getProducts,
  createCategory,
  createProduct,
  updateProduct,
  removeProduct,
  removeCategory
};
