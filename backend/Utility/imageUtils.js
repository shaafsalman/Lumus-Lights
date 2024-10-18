// imageUtils.js
const uploadToCloudinary = require('./uploadToCloudinary'); 
const path = require('path');
const fs = require('fs');

const processImage = async (image, filename) => {
  if (image.startsWith('data:image/jpeg;base64,') || image.startsWith('data:image/png;base64,')) {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    return await uploadToCloudinary(await writeTempFile(base64Data, filename), 'images');
  } else {
    return await uploadToCloudinary(path.resolve(__dirname, '../Uploads', image), 'images');
  }
};

const writeTempFile = async (data, filename) => {
  const filePath = path.join(__dirname, '../Uploads', filename);
  fs.writeFileSync(filePath, data, { encoding: 'base64' });
  return filePath;
};

module.exports = {
  processImage,
  writeTempFile,
};
