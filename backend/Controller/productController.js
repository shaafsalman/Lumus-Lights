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
  productModel.fetchProducts((err, products) => {
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


const createProduct = (req, res) => {
  const { name, description, categoryId, brand, skus, images } = req.body;

  productModel.addProduct(name, description, categoryId, brand, (err, productId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If SKUs are provided, insert them
    if (skus && Array.isArray(skus)) {
      const skuPromises = skus.map(sku => 
        new Promise((resolve, reject) => {
          productModel.addSKU(productId, sku.sku, sku.price, sku.stock, sku.color, sku.size, sku.wattage, sku.voltage, (err, skuId) => {
            if (err) reject(err);
            resolve(skuId);
          });
        })
      );

      Promise.all(skuPromises)
        .then(skuIds => {
          // If images are provided, insert them
          if (images && Array.isArray(images)) {
            const imagePromises = images.map(image => 
              new Promise((resolve, reject) => {
                productModel.addImage(skuIds[0], image.image_path, image.is_primary, (err) => {
                  if (err) reject(err);
                  resolve();
                });
              })
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


const updateProduct = (id, name, description, categoryId, brand, callback) => {
  const query = 'UPDATE Products SET name = ?, description = ?, category_id = ?, brand = ? WHERE id = ?';
  
  pool.query(query, [name, description, categoryId, brand, id], (err) => {
    if (err) {
      return callback(new Error('Error updating product: ' + err.message), null);
    }
    callback(null, { message: 'Product updated successfully' });
  });
};

const updateSKU = (id, sku, price, stock, color, size, wattage, voltage, callback) => {
  const query = 'UPDATE Product_SKUs SET sku = ?, price = ?, stock = ?, color = ?, size = ?, wattage = ?, voltage = ? WHERE id = ?';
  
  pool.query(query, [sku, price, stock, color, size, wattage, voltage, id], (err) => {
    if (err) {
      return callback(new Error('Error updating SKU: ' + err.message), null);
    }
    callback(null, { message: 'SKU updated successfully' });
  });
};

const updateImage = (id, imagePath, isPrimary, callback) => {
  const query = 'UPDATE Product_Images SET image_path = ?, is_primary = ? WHERE id = ?';
  
  pool.query(query, [imagePath, isPrimary, id], (err) => {
    if (err) {
      return callback(new Error('Error updating image: ' + err.message), null);
    }
    callback(null, { message: 'Image updated successfully' });
  });
};

const deleteProduct = (id, callback) => {
  const query = 'DELETE FROM Products WHERE id = ?';
  
  pool.query(query, [id], (err) => {
    if (err) {
      return callback(new Error('Error deleting product: ' + err.message), null);
    }
    callback(null, { message: 'Product deleted successfully' });
  });
};

const deleteSKUsByProductId = (productId, callback) => {
  const query = 'DELETE FROM Product_SKUs WHERE product_id = ?';
  
  pool.query(query, [productId], (err) => {
    if (err) {
      return callback(new Error('Error deleting SKUs: ' + err.message), null);
    }
    callback(null, { message: 'SKUs deleted successfully' });
  });
};

const deleteImagesByProductId = (productId, callback) => {
  const query = `
    DELETE FROM Product_Images
    WHERE sku_id IN (SELECT id FROM Product_SKUs WHERE product_id = ?)
  `;
  
  pool.query(query, [productId], (err) => {
    if (err) {
      return callback(new Error('Error deleting images: ' + err.message), null);
    }
    callback(null, { message: 'Images deleted successfully' });
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
