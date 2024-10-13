const uploadToCloudinary = require('./../Utility/uploadToCloudinary');
const productModel = require('../Model/productModel');
const path = require('path');
const fs = require('fs');

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
const addOrUpdateProduct = async (req, res) => {
  const { id, name, description, category_id, brand, skus, images, thumbnail } = req.body; 

  try {
    let thumbnailUrl;

    // Handle thumbnail if it's a base64 string
    if (thumbnail) {
      if (thumbnail.startsWith('data:image/jpeg;base64,')) {
        const base64Data = thumbnail.replace(/^data:image\/jpeg;base64,/, "");
        const thumbnailPath = path.join(__dirname, '../Uploads', 'thumbnail.jpeg'); // Temporary file path
        fs.writeFileSync(thumbnailPath, base64Data, { encoding: 'base64' });
        thumbnailUrl = await uploadToCloudinary(thumbnailPath, 'thumbnail'); 
        console.log('Thumbnail uploaded:', thumbnailUrl); 
        fs.unlinkSync(thumbnailPath); // Delete the temporary file
      } else {
        // Treat thumbnail as a file path if it's not base64
        const thumbnailPath = path.resolve(__dirname, '../Uploads', thumbnail); 
        thumbnailUrl = await uploadToCloudinary(thumbnailPath, 'thumbnail'); 
        console.log('Thumbnail uploaded:', thumbnailUrl); 
        fs.unlinkSync(thumbnailPath); 
      }
    }

    if (id) {
      // Update existing product
      productModel.updateProduct(id, name, description, category_id, brand, thumbnailUrl, (err) => { 
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to update product' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
      });
    } else {
      // Add new product
      productModel.addProduct(name, description, category_id, brand, thumbnailUrl, (err, productId) => { 
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Handle SKUs if provided
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
              // Handle images if provided
              if (images && Array.isArray(images)) {
                const imagePromises = images.map(image => {
                  // Check if the image is a base64 string
                  if (image.image_path.startsWith('data:image/jpeg;base64,')) {
                    const base64Data = image.image_path.replace(/^data:image\/jpeg;base64,/, "");
                    const imagePath = path.join(__dirname, '../Uploads', 'image.jpeg'); // Temporary file path for images
                    fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });
                    return uploadToCloudinary(imagePath, 'images') // Upload to Cloudinary
                      .then(imageUrl => {
                        console.log('Image uploaded:', imageUrl);
                        return new Promise((resolve, reject) => {
                          productModel.addImage(skuIds[0], imageUrl, image.is_primary, (err) => {
                            if (err) reject(err);
                            resolve();
                          });
                        });
                      })
                      .finally(() => fs.unlinkSync(imagePath)); // Delete the temporary image file
                  } else {
                    const imagePath = path.resolve(__dirname, '../Uploads', image.image_path); // File path for existing images
                    return uploadToCloudinary(imagePath, 'images')
                      .then(imageUrl => {
                        console.log('Image uploaded:', imageUrl);
                        return new Promise((resolve, reject) => {
                          productModel.addImage(skuIds[0], imageUrl, image.is_primary, (err) => {
                            if (err) reject(err);
                            resolve();
                          });
                        });
                      });
                  }
                });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing request' });
  }
};

// Remove a product by ID
const removeProduct = (req, res) => {
  const { id } = req.params;

  // Step 1: Delete images by product ID
  productModel.deleteImagesByProductId(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete images' });
    }

    // Step 2: Delete SKUs by product ID
    productModel.deleteSKUsByProductId(id, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete SKUs' });
      }

      // Step 3: Delete the product
      productModel.deleteProduct(id, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to delete product' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
      });
    });
  });
};

module.exports = {
  getProducts,
  addOrUpdateProduct,
  removeProduct,
};
