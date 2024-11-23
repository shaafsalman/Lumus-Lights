const cloudinary = require('./cloudinaryConfig');
const path = require('path');
const fs = require('fs').promises;

/**
 * Upload a file to Cloudinary and return the secure URL.
 * @param {string} filePath - Local path to the file.
 * @param {string} folder - Folder in Cloudinary.
 * @returns {Promise<string>} - Secure URL of the uploaded file.
 */
async function uploadToCloudinary(filePath, folder = 'images') {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      folder,
      public_id: path.basename(filePath, path.extname(filePath)),
      overwrite: true,
      access_mode: 'public',
    });

    console.log('Upload successful:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.message);
    if (error.http_code) {
      console.error('Cloudinary Error Code:', error.http_code);
    }
    throw new Error('Failed to upload file to Cloudinary');
  }
}

module.exports = uploadToCloudinary;
