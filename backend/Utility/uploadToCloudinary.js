const cloudinary = require('./cloudinaryConfig');
const path = require('path'); 
const fs = require('fs');

async function uploadToCloudinary(filePath,folder=images) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            folder: `${folder}`,
            public_id: path.basename(filePath, path.extname(filePath)),
            overwrite: true,
            type: "upload",
            access_mode: "public" 
        });

        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}

module.exports = uploadToCloudinary;
