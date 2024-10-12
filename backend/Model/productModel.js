const pool = require('../db');

// Helper function for query execution
const executeQuery = (query, params, callback) => {
  pool.query(query, params, (err, results) => {
    if (err) {
      return callback(new Error(err.message), null);
    }
    callback(null, results);
  });
};

// Fetch all products along with their SKUs and images
const fetchProducts = (callback) => {
  const query = `
    SELECT 
      p.id AS product_id, 
      p.name AS product_name, 
      p.description, 
      p.category_id, 
      p.brand,
      sku.id AS sku_id,
      sku.sku, 
      sku.price, 
      sku.stock, 
      sku.color, 
      sku.size, 
      sku.wattage, 
      sku.voltage,
      img.image_path, 
      img.is_primary
    FROM Products p
    LEFT JOIN Product_SKUs sku ON p.id = sku.product_id
    LEFT JOIN Product_Images img ON sku.id = img.sku_id
    ORDER BY p.id, sku.id;
  `;

  executeQuery(query, [], (err, results) => {
    if (err) return callback(err, null);

    const productsMap = new Map();

    results.forEach(row => {
      const productId = row.product_id;
      const product = productsMap.get(productId) || {
        id: productId,
        name: row.product_name,
        description: row.description,
        category_id: row.category_id,
        brand: row.brand,
        skus: [],
      };

      if (!productsMap.has(productId)) {
        productsMap.set(productId, product);
      }

      const skuId = row.sku_id;
      if (skuId) {
        const sku = product.skus.find(s => s.id === skuId) || {
          id: skuId,
          sku: row.sku,
          price: row.price,
          stock: row.stock,
          color: row.color,
          size: row.size,
          wattage: row.wattage,
          voltage: row.voltage,
          images: [],
        };

        if (!product.skus.find(s => s.id === skuId)) {
          product.skus.push(sku);
        }

        if (row.image_path) {
          sku.images.push({ image_path: row.image_path, is_primary: row.is_primary });
        }
      }
    });

    callback(null, Array.from(productsMap.values()));
  });
};

// Add a new product
const addProduct = (name, description, categoryId, brand, callback) => {
  executeQuery('INSERT INTO Products (name, description, category_id, brand) VALUES (?, ?, ?, ?)', [name, description, categoryId, brand], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.insertId);
  });
};

// Add a new SKU
const addSKU = (productId, sku, price, stock, color, size, wattage, voltage, callback) => {
  executeQuery('INSERT INTO Product_SKUs (product_id, sku, price, stock, color, size, wattage, voltage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [productId, sku, price, stock, color, size, wattage, voltage], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.insertId);
    });
};

// Add a new image
const addImage = (skuId, imagePath, isPrimary, callback) => {
  executeQuery('INSERT INTO Product_Images (sku_id, image_path, is_primary) VALUES (?, ?, ?)', 
    [skuId, imagePath, isPrimary], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.insertId);
    });
};

// Update a SKU by ID
const updateSKU = (skuId, sku, price, stock, color, size, wattage, voltage, callback) => {
  executeQuery(`UPDATE Product_SKUs SET sku = ?, price = ?, stock = ?, color = ?, size = ?, wattage = ?, voltage = ? WHERE id = ?`, 
    [sku, price, stock, color, size, wattage, voltage, skuId], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.affectedRows);
    });
};

// Update an image by ID
const updateImage = (imageId, imagePath, isPrimary, callback) => {
  executeQuery(`UPDATE Product_Images SET image_path = ?, is_primary = ? WHERE id = ?`, 
    [imagePath, isPrimary, imageId], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.affectedRows);
    });
};

// Update a product by ID, including updating SKUs and images if necessary
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, categoryId, brand, skus, images } = req.body;

  executeQuery('UPDATE Products SET name = ?, description = ?, category_id = ?, brand = ? WHERE id = ?', 
    [name, description, categoryId, brand, id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Internal server error' });

      const updatePromises = [];
      if (skus && Array.isArray(skus)) {
        skus.forEach(sku => {
          updatePromises.push(new Promise((resolve, reject) => {
            updateSKU(sku.id, sku.sku, sku.price, sku.stock, sku.color, sku.size, sku.wattage, sku.voltage, (err) => {
              if (err) return reject(err);
              resolve();
            });
          }));
        });
      }

      if (images && Array.isArray(images)) {
        images.forEach(image => {
          updatePromises.push(new Promise((resolve, reject) => {
            updateImage(image.id, image.image_path, image.is_primary, (err) => {
              if (err) return reject(err);
              resolve();
            });
          }));
        });
      }

      Promise.all(updatePromises)
        .then(() => res.status(200).json({ message: 'Product updated successfully', result }))
        .catch(() => res.status(500).json({ message: 'Failed to update SKUs or images' }));
    });
};

// Delete a product by ID along with its SKUs and images
const removeProduct = (req, res) => {
  const { id } = req.params;

  deleteProduct(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });

    deleteSKUsByProductId(id, (err) => {
      if (err) return res.status(500).json({ message: 'Failed to delete SKUs' });

      deleteImagesByProductId(id, (err) => {
        if (err) return res.status(500).json({ message: 'Failed to delete images' });
        res.status(200).json({ message: 'Product deleted successfully', result });
      });
    });
  });
};

// Delete a product by ID
const deleteProduct = (id, callback) => {
  executeQuery('DELETE FROM Products WHERE id = ?', [id], callback);
};

// Delete SKUs by product ID
const deleteSKUsByProductId = (productId, callback) => {
  executeQuery('DELETE FROM Product_SKUs WHERE product_id = ?', [productId], callback);
};

// Delete images by SKU ID
const deleteImagesByProductId = (productId, callback) => {
  executeQuery('DELETE FROM Product_Images WHERE sku_id IN (SELECT id FROM Product_SKUs WHERE product_id = ?)', [productId], callback);
};

module.exports = {
  fetchProducts,
  addProduct,
  addSKU,
  addImage,
  updateProduct,
  removeProduct,
  updateSKU,
  updateImage,
  deleteProduct,
  deleteSKUsByProductId,
  deleteImagesByProductId,
};
