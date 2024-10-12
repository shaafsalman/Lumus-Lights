const productModel = require('../Model/productModel');

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

// Add or update a product
const addOrUpdateProduct = (req, res) => {
  const { id, name, description, category_id, brand, skus, images } = req.body;


  console.log("request",req.body); 
  if (id) {
    productModel.updateProduct(id, name, description, category_id, brand, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update product' });
      }
      res.status(200).json({ message: 'Product updated successfully' });
    });
  } else {
    // Otherwise, create a new product
    productModel.addProduct(name, description, category_id, brand, (err, productId) => {
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
            res.status(201).json({ id: productId, name, description, category_id, brand });
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Failed to create SKUs or images' });
          });
      } else {
        res.status(201).json({ id: productId, name, description, category_id, brand });
      }
    });
  }
};

// Remove a product by ID
const removeProduct = (req, res) => {
  const { id } = req.params;

  productModel.deleteSKUsByProductId(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete SKUs' });
    }

    // Then, delete the product
    productModel.deleteProduct(id, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete product' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    });
  });
};

module.exports = {
  getProducts,
  addOrUpdateProduct,
  removeProduct,
};
