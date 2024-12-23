const pool = require('../db');
const { mockProducts } = require('./../Data/mockProducts');

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
      sku.sold,
      sku.discount,
      sku.rating,
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
      let product = productsMap.get(productId);

      if (!product) {
        product = {
          id: productId,
          name: row.product_name,
          description: row.description,
          category_id: row.category_id,
          category_name: row.category_name,
          brand: row.brand,
          thumbnail: row.thumbnail,
          skus: [],
        };
        productsMap.set(productId, product);
      }

      const skuId = row.sku_id;
      if (skuId) {
        let sku = product.skus.find(s => s.id === skuId);
        if (!sku) {
          sku = {
            id: skuId,
            sku: row.sku,
            price: row.price,
            stock: row.stock,
            color: row.color,
            size: row.size,
            wattage: row.wattage,
            voltage: row.voltage,
            rating:row.rating,
            discount:row.discount,
            sold:row.sold,
            images: [],
          };
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

const deleteProductAndAssociations = async (id) => {
  const deleteProductImagesQuery = `
    DELETE FROM Product_Images 
    WHERE sku_id IN (SELECT id FROM Product_SKUs WHERE product_id = ?)
  `;

  const deleteProductSkusQuery = `
    DELETE FROM Product_SKUs WHERE product_id = ?
  `;

  const deleteProductQuery = `
    DELETE FROM Products WHERE id = ?
  `;

  try {
    // Step 1: Delete product images by SKU
    console.log(`Deleting images for product ID: ${id}`);
    await executeQuery(deleteProductImagesQuery, [id]);

    // Step 2: Delete SKUs associated with the product
    console.log(`Deleting SKUs for product ID: ${id}`);
    await executeQuery(deleteProductSkusQuery, [id]);

    // Step 3: Delete the product itself
    console.log(`Deleting product with ID: ${id}`);
    await executeQuery(deleteProductQuery, [id]);

    console.log(`Product ID: ${id} and associated records deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting product ID: ${id} and associated records:`, error.message || error);
    throw error;  // Rethrow the error for higher-level handling
  }
};


module.exports = {
  fetchProducts,
  addProduct,
  addSKU,
  addImage,
  updateProduct,
  updateSKU,
  updateImage,
  deleteProductAndAssociations
};
