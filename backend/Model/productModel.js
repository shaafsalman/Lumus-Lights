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
  
  pool.query(query, [], (err, results) => {
    if (err) {
      return callback(new Error('Error fetching products: ' + err.message), null);
    }

    // Process the results into a nested structure
    const productsMap = new Map();

    results.forEach(row => {
      const {
        product_id,
        product_name,
        description,
        category_id,
        brand,
        sku_id,
        sku,
        price,
        stock,
        color,
        size,
        wattage,
        voltage,
        image_path,
        is_primary
      } = row;

      // If product doesn't exist in map, create a new entry
      if (!productsMap.has(product_id)) {
        productsMap.set(product_id, {
          id: product_id,
          name: product_name,
          description,
          category_id,
          brand,
          skus: [],
        });
      }

      const product = productsMap.get(product_id);

      // If SKU exists, append the image to that SKU, otherwise add a new SKU
      let skuIndex = product.skus.findIndex(s => s.id === sku_id);
      if (sku_id && skuIndex === -1) {
        product.skus.push({
          id: sku_id,
          sku,
          price,
          stock,
          color,
          size,
          wattage,
          voltage,
          images: [],
        });
        skuIndex = product.skus.length - 1;
      }

      if (image_path) {
        product.skus[skuIndex].images.push({
          image_path,
          is_primary,
        });
      }
    });

    // Convert map values to an array
    const productsArray = Array.from(productsMap.values());
    
    callback(null, productsArray);
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

const addProduct = (name, description, categoryId, brand, callback) => {
  const query = 'INSERT INTO Products (name, description, category_id, brand) VALUES (?, ?, ?, ?)';
  
  pool.query(query, [name, description, categoryId, brand], (err, results) => {
    if (err) {
      return callback(new Error('Error adding product: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new product ID
  });
};

const addSKU = (productId, sku, price, stock, color, size, wattage, voltage, callback) => {
  const query = 'INSERT INTO Product_SKUs (product_id, sku, price, stock, color, size, wattage, voltage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  pool.query(query, [productId, sku, price, stock, color, size, wattage, voltage], (err, results) => {
    if (err) {
      return callback(new Error('Error adding SKU: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new SKU ID
  });
};


const addImage = (skuId, imagePath, isPrimary, callback) => {
  const query = 'INSERT INTO Product_Images (sku_id, image_path, is_primary) VALUES (?, ?, ?)';
  
  pool.query(query, [skuId, imagePath, isPrimary], (err, results) => {
    if (err) {
      return callback(new Error('Error adding image: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new image ID
  });
};

// Update a product by ID, including updating SKUs and images if necessary
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, categoryId, brand, skus, images } = req.body;

  productModel.updateProduct(id, name, description, categoryId, brand, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Update SKUs if provided
    if (skus && Array.isArray(skus)) {
      const skuPromises = skus.map(sku => 
        new Promise((resolve, reject) => {
          productModel.updateSKU(sku.id, sku.sku, sku.price, sku.stock, sku.color, sku.size, sku.wattage, sku.voltage, (err) => {
            if (err) return reject(err);
            resolve();
          });
        })
      );

      Promise.all(skuPromises)
        .then(() => {
          // Update images if provided
          if (images && Array.isArray(images)) {
            const imagePromises = images.map(image => 
              new Promise((resolve, reject) => {
                productModel.updateImage(image.id, image.image_path, image.is_primary, (err) => {
                  if (err) return reject(err);
                  resolve();
                });
              })
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
  const { id } = req.params;

  productModel.deleteProduct(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

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
