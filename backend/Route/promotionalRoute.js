// promotionRoute.js
const express = require('express');
const router = express.Router();
const promotionController = require('./../Controller/promotionController');

// Get promotional message
router.get('/promotional-message', promotionController.getPromotionalMessage);

// Get promotional images
router.get('/promotional-images', promotionController.getPromotionalImages);

// Add or update promotional message
router.post('/promotional-message', promotionController.addOrUpdatePromotionalMessage);

// Activate or deactivate promotional message
router.patch('/promotional-message/activate', promotionController.activateDeactivatePromotionalMessage);

// Add a new promotional image
router.post('/promotional-image', promotionController.addPromotionalImage);

// Delete a promotional image
router.delete('/promotional-image', promotionController.deletePromotionalImage);

// Activate or deactivate a promotional image
router.patch('/promotional-image/activate', promotionController.activateDeactivateImage);

module.exports = router;
