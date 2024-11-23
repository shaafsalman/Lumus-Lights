const pool = require('../db');
const {mockProducts} = require('./../Data/mockProducts');


// Helper function for query execution (returns a Promise)
const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) {
        return reject(new Error(err.message));
      }
      resolve(results);
    });
  });
};

// Fetch all products along with their SKUs and images
const fetchProducts = async () => {
  const query = `
    SELECT 
      p.id AS product_id, 
      p.name AS product_name, 
      p.description, 
      p.discountFactor,
      p.quantitySold, 
      p.category_id, 
      c.name AS category_name,  
      p.brand,
      p.thumbnail,  
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
    LEFT JOIN Categories c ON p.category_id = c.id  
    ORDER BY p.id, sku.id;
  `;

  try {
    const results = await executeQuery(query, []);

    const productsMap = new Map();

    results.forEach(row => {
      const productId = row.product_id;
      const product = productsMap.get(productId) || {
        id: productId,
        name: row.product_name,
        description: row.description,
        category_id: row.category_id,
        category_name: row.category_name,
        brand: row.brand,
        thumbnail: row.thumbnail,  
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

    return Array.from(productsMap.values());
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

// const fetchProducts = async () => {
//   try {
//     // Simulate a delay for mock data
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     return mockProducts;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error; 
//   }
// };



// Add a new product with thumbnail file path
const addProduct = async (name, description, categoryId, brand, thumbnail) => {
  const result = await executeQuery(
    'INSERT INTO Products (name, description, category_id, brand, thumbnail) VALUES (?, ?, ?, ?, ?)', 
    [name, description, categoryId, brand, thumbnail]
  );
  return result.insertId;
};

// Add a new SKU
const addSKU = async (productId, sku, price, stock, color, size, wattage, voltage) => {
  const result = await executeQuery(
    'INSERT INTO Product_SKUs (product_id, sku, price, stock, color, size, wattage, voltage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [productId, sku, price, stock, color, size, wattage, voltage]
  );
  return result.insertId;
};

// Add a new image
const addImage = async (skuId, imagePath, isPrimary) => {
  const result = await executeQuery(
    'INSERT INTO Product_Images (sku_id, image_path, is_primary) VALUES (?, ?, ?)', 
    [skuId, imagePath, isPrimary]
  );
  return result.insertId;
};

// Update a SKU by ID
const updateSKU = async (skuId, sku, price, stock, color, size, wattage, voltage) => {
  const result = await executeQuery(
    'UPDATE Product_SKUs SET sku = ?, price = ?, stock = ?, color = ?, size = ?, wattage = ?, voltage = ? WHERE id = ?', 
    [sku, price, stock, color, size, wattage, voltage, skuId]
  );
  return result.affectedRows;
};

// Update an image by ID
const updateImage = async (imageId, imagePath, isPrimary) => {
  const result = await executeQuery(
    'UPDATE Product_Images SET image_path = ?, is_primary = ? WHERE id = ?', 
    [imagePath, isPrimary, imageId]
  );
  return result.affectedRows;
};

// Update a product by ID, including updating SKUs and images
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, categoryId, brand, skus, images, thumbnail } = req.body;

  try {
    await executeQuery(
      'UPDATE Products SET name = ?, description = ?, category_id = ?, brand = ?, thumbnail = ? WHERE id = ?', 
      [name, description, categoryId, brand, thumbnail, id]
    );

    const updatePromises = [];

    if (skus && Array.isArray(skus)) {
      skus.forEach(sku => {
        updatePromises.push(updateSKU(sku.id, sku.sku, sku.price, sku.stock, sku.color, sku.size, sku.wattage, sku.voltage));
      });
    }

    if (images && Array.isArray(images)) {
      images.forEach(image => {
        updatePromises.push(updateImage(image.id, image.image_path, image.is_primary));
      });
    }

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a product by ID along with its SKUs and images
const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProduct(id);
    await deleteSKUsByProductId(id);
    await deleteImagesByProductId(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a product by ID
const deleteProduct = async (id) => {
  await executeQuery('DELETE FROM Products WHERE id = ?', [id]);
};

// Delete SKUs by product ID
const deleteSKUsByProductId = async (productId) => {
  await executeQuery('DELETE FROM Product_SKUs WHERE product_id = ?', [productId]);
};

// Delete images by SKU ID
const deleteImagesByProductId = async (productId) => {
  await executeQuery('DELETE FROM Product_Images WHERE sku_id IN (SELECT id FROM Product_SKUs WHERE product_id = ?)', [productId]);
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
