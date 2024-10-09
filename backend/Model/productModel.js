const pool = require('../db');

// Fetch all categories
const fetchCategories = (callback) => {
  pool.query('SELECT * FROM Categories', (err, results) => {
    if (err) {
      return callback(new Error('Error fetching categories: ' + err.message), null);
    }
    callback(null, results);
  });
};

// Fetch all products with optional filtering by category
const fetchProducts = (categoryId = null, callback) => {
  let query = 'SELECT * FROM Products';
  const params = [];

  if (categoryId) {
    query += ' WHERE category_id = ?';
    params.push(categoryId);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      return callback(new Error('Error fetching products: ' + err.message), null);
    }
    callback(null, results);
  });
};

// Add a new category
const addCategory = (name, callback) => {
  const query = 'INSERT INTO Categories (name) VALUES (?)';
  
  pool.query(query, [name], (err, results) => {
    if (err) {
      return callback(new Error('Error adding category: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new category ID
  });
};

// Delete a category by ID
const deleteCategory = (id, callback) => {
  const query = 'DELETE FROM Categories WHERE id = ?';
  
  pool.query(query, [id], (err) => {
    if (err) {
      return callback(new Error('Error deleting category: ' + err.message), null);
    }
    callback(null, { message: 'Category deleted successfully' });
  });
};

// Add a new product
const addProduct = (name, description, categoryId, brand, callback) => {
  const query = 'INSERT INTO Products (name, description, category_id, brand) VALUES (?, ?, ?, ?)';
  
  pool.query(query, [name, description, categoryId, brand], (err, results) => {
    if (err) {
      return callback(new Error('Error adding product: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new product ID
  });
};

// Add a new SKU for a product
const addSKU = (productId, sku, price, stock, color, size, wattage, voltage, callback) => {
  const query = 'INSERT INTO Product_SKUs (product_id, sku, price, stock, color, size, wattage, voltage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  pool.query(query, [productId, sku, price, stock, color, size, wattage, voltage], (err, results) => {
    if (err) {
      return callback(new Error('Error adding SKU: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new SKU ID
  });
};

// Add a new image for a SKU
const addImage = (skuId, imagePath, isPrimary, callback) => {
  const query = 'INSERT INTO Product_Images (sku_id, image_path, is_primary) VALUES (?, ?, ?)';
  
  pool.query(query, [skuId, imagePath, isPrimary], (err, results) => {
    if (err) {
      return callback(new Error('Error adding image: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new image ID
  });
};

// Update a product by ID
const updateProduct = (id, name, description, categoryId, brand, callback) => {
  const query = 'UPDATE Products SET name = ?, description = ?, category_id = ?, brand = ? WHERE id = ?';
  
  pool.query(query, [name, description, categoryId, brand, id], (err) => {
    if (err) {
      return callback(new Error('Error updating product: ' + err.message), null);
    }
    callback(null, { message: 'Product updated successfully' });
  });
};

// Update a SKU by ID
const updateSKU = (id, sku, price, stock, color, size, wattage, voltage, callback) => {
  const query = 'UPDATE Product_SKUs SET sku = ?, price = ?, stock = ?, color = ?, size = ?, wattage = ?, voltage = ? WHERE id = ?';
  
  pool.query(query, [sku, price, stock, color, size, wattage, voltage, id], (err) => {
    if (err) {
      return callback(new Error('Error updating SKU: ' + err.message), null);
    }
    callback(null, { message: 'SKU updated successfully' });
  });
};

// Update an image by ID
const updateImage = (id, imagePath, isPrimary, callback) => {
  const query = 'UPDATE Product_Images SET image_path = ?, is_primary = ? WHERE id = ?';
  
  pool.query(query, [imagePath, isPrimary, id], (err) => {
    if (err) {
      return callback(new Error('Error updating image: ' + err.message), null);
    }
    callback(null, { message: 'Image updated successfully' });
  });
};

// Delete a product by ID
const deleteProduct = (id, callback) => {
  const query = 'DELETE FROM Products WHERE id = ?';
  
  pool.query(query, [id], (err) => {
    if (err) {
      return callback(new Error('Error deleting product: ' + err.message), null);
    }
    callback(null, { message: 'Product deleted successfully' });
  });
};

// Delete SKUs by product ID
const deleteSKUsByProductId = (productId, callback) => {
  const query = 'DELETE FROM Product_SKUs WHERE product_id = ?';
  
  pool.query(query, [productId], (err) => {
    if (err) {
      return callback(new Error('Error deleting SKUs: ' + err.message), null);
    }
    callback(null, { message: 'SKUs deleted successfully' });
  });
};

// Delete images by product ID
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
  fetchCategories,
  fetchProducts,
  addCategory,
  addProduct,
  addSKU,
  addImage,
  updateProduct,
  updateSKU,
  updateImage,
  deleteProduct,
  deleteSKUsByProductId,
  deleteImagesByProductId,
  deleteCategory
};
