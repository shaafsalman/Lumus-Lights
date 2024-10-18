const uploadToCloudinary = require('./../Utility/uploadToCloudinary');
const productModel = require('../Model/productModel');
const path = require('path');
const fs = require('fs');


// Utility function to process and upload images
const processImage = async (image, filename) => {
  if (image.startsWith('data:image/jpeg;base64,') || image.startsWith('data:image/png;base64,')) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      return await uploadToCloudinary(await writeTempFile(base64Data, filename), 'images');
  } else {
      return await uploadToCloudinary(path.resolve(__dirname, '../Uploads', image), 'images');
  }
};

// Write a temporary file and return its path
const writeTempFile = async (data, filename) => {
  const filePath = path.join(__dirname, '../Uploads', filename);
  fs.writeFileSync(filePath, data, { encoding: 'base64' });
  return filePath; 
};





const getProducts = async (req, res) => {
  try {
    const products = await productModel.fetchProducts();
    console.log(products.length); 
    res.status(200).json(products); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};













// Main function to add or update a product
const addOrUpdateProduct = async (req, res) => {
  const { id, name, description, category_id, brand, skus, thumbnail } = req.body;

  try {
      const thumbnailUrl = thumbnail ? await processImage(thumbnail, 'thumbnail.jpeg') : null;

      if (id) {
          await productModel.updateProduct(id, name, description, category_id, brand, thumbnailUrl);
          return res.status(200).json({ message: 'Product updated successfully' });
      }

      const productId = await productModel.addProduct(name, description, category_id, brand, thumbnailUrl);
      
      if (skus && Array.isArray(skus)) {
          await Promise.all(skus.map(async (sku, index) => {
              const skuId = await productModel.addSKU(productId, sku.sku, sku.price, sku.stock, sku.color, sku.size, sku.wattage, sku.voltage);
              const images = sku.images || [];

              await Promise.all(images.map(async (img, imgIndex) => {
                  const isPrimary = imgIndex === 0;
                  const imageUrl = await processImage(img.preview || img.file.name, `image-${skuId}-${imgIndex}.jpeg`);
                  await productModel.addImage(skuId, imageUrl, isPrimary);
              }));
          }));
      }

      return res.status(201).json({ id: productId, name, description, category_id, brand });
  } catch (error) {
      console.error('Error processing request:', error);
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
