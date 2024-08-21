const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

// Middleware to log request details
router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  next();
});

router.post('/login', (req, res) => {
  console.log('Login attempt received');
  authController.authenticateUser(req, res);
});

module.exports = router;
