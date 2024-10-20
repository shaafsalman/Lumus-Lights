const fs = require('fs');
const path = require('path');
const { processImage } = require('./../Utility/imageUtils');
const promotionalModel = require('../Model/promotionalModel');
const dataPath = path.join(__dirname, './../Data/data.json');

let promotionalData = {
  message: null,
  messageActive: false,
};

const loadData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    promotionalData = JSON.parse(data);
    promotionalData.message = promotionalData.promotionalMessage.message;
    promotionalData.messageActive = promotionalData.promotionalMessage.active;
  } catch (error) {
    console.error('Error reading promotional data:', error);
  }
};

const saveData = () => {
  const dataToSave = {
    promotionalMessage: {
      message: promotionalData.message,
      active: promotionalData.messageActive,
    },
  };
  fs.writeFileSync(dataPath, JSON.stringify(dataToSave, null, 2));
};

const activateDeactivatePromotionalMessage = async (req, res) => {
  const { active } = req.body; 

  try {
    promotionalData.messageActive = active; 
    saveData();
    const statusMessage = promotionalData.messageActive ? 'activated' : 'deactivated';
    res.status(200).send(`Promotional message ${statusMessage} successfully.`);
  } catch (error) {
    console.error('Error updating promotional message status:', error);
    res.status(500).send('Failed to update promotional message status.');
  }
};






const getPromotionalMessage = (req, res) => {
  res.json({ message: promotionalData.message, active: promotionalData.messageActive });
};
const addOrUpdatePromotionalMessage = (req, res) => {
  const { message, active } = req.body;
  promotionalData.message = message || null;
  promotionalData.messageActive = active !== undefined ? active : promotionalData.messageActive;
  saveData();
  res.status(200).send('Promotional message updated successfully.');
};

const getPromotionalImages = async (req, res) => {
  try {
    const images = await promotionalModel.fetchPromotionalImages();
    res.json({ images });
  } catch (error) {
    console.error('Error fetching promotional images:', error);
    res.status(500).send('Failed to fetch promotional images.');
  }
};

const addPromotionalImage = async (req, res) => {
  const { imageFile, active, name } = req.body; 

  if (imageFile && name) { 
    try {
      const imageUrl = await processImage(imageFile, "promotions"); 
      const imageID = await promotionalModel.addPromotionalImage({ imageUrl, active: active || false, name });
      res.status(201).send(`Promotional image added successfully with ID: ${imageID}.`);
    } catch (error) {
      console.error('Error adding promotional image:', error);
      res.status(500).send('Failed to add the image.');
    }
  } else {
    res.status(400).send('Invalid image file or name.');
  }
};

const deletePromotionalImage = async (req, res) => {
  const { imageID } = req.body; 

  try {
    const affectedRows = await promotionalModel.deletePromotionalImage(imageID);
    if (affectedRows > 0) {
      res.status(200).send('Promotional image deleted successfully.');
    } else {
      res.status(404).send('Image not found.');
    }
  } catch (error) {
    console.error('Error deleting promotional image:', error);
    res.status(500).send('Failed to delete promotional image.');
  }
};

const activateDeactivateImage = async (req, res) => {
  const { imageID, active } = req.body; 

  try {
    const affectedRows = await promotionalModel.activateDeactivatePromotionalImage(imageID, active);
    
    if (affectedRows > 0) {
      const statusMessage = active ? 'deactivated' : 'activated'; 
      res.status(200).send(`Promotional image ${statusMessage} successfully.`);
    } else {
      res.status(404).send('Image not found.');
    }
  } catch (error) {
    console.error('Error updating promotional image status:', error);
    res.status(500).send('Failed to update promotional image status.');
  }
};


loadData();

module.exports = {
  getPromotionalMessage,
  getPromotionalImages,
  addOrUpdatePromotionalMessage,
  addPromotionalImage,
  deletePromotionalImage,
  activateDeactivatePromotionalMessage,
  activateDeactivateImage,
};
