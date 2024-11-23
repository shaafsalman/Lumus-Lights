const path = require('path');
const fs = require('fs').promises;
const uploadToCloudinary = require('./uploadToCloudinary');

/**
 * Process the image and upload it to Cloudinary.
 * @param {string} image - Base64 string or file path.
 * @param {string} filename - Filename for temporary storage.
 * @returns {Promise<string>} - Secure URL from Cloudinary.
 */
const processImage = async (image, filename) => {
  let tempFilePath = null;

  try {
    if (image.startsWith('data:image/')) {
      // Handle base64 image
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      tempFilePath = await writeTempFile(base64Data, filename);
    } else {
      // Handle regular file path
      tempFilePath = path.resolve(__dirname, '../Uploads', image);
    }

    // Upload to Cloudinary
    return await uploadToCloudinary(tempFilePath, 'images');
  } catch (error) {
    console.error('Error processing image:', error.message);
    throw new Error('Failed to process image');
  } finally {
    // Cleanup temporary file if created
    if (tempFilePath && (await fileExists(tempFilePath))) {
      try {
        await fs.unlink(tempFilePath);
        console.log('Temporary file deleted:', tempFilePath);
      } catch (cleanupError) {
        console.warn('Failed to delete temporary file:', cleanupError.message);
      }
    }
  }
};

/**
 * Write a base64 string to a temporary file.
 * @param {string} data - Base64 encoded string.
 * @param {string} filename - Desired filename for temporary file.
 * @returns {Promise<string>} - Path to the temporary file.
 */
const writeTempFile = async (data, filename) => {
  const filePath = path.join(__dirname, '../Uploads', filename);
  await fs.writeFile(filePath, data, { encoding: 'base64' });
  console.log('Temporary file created:', filePath);
  return filePath;
};

/**
 * Check if a file exists.
 * @param {string} filePath - File path to check.
 * @returns {Promise<boolean>} - True if the file exists, false otherwise.
 */
const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  processImage,
  writeTempFile,
};
