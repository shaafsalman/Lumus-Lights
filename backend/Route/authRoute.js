const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

// Middleware to log request details
router.use((req, res, next) => {
  next();
});

router.post('/login', (req, res) => {
  console.log('Login attempt received');
  authController.authenticateUser(req, res);
});
router.post('/register', (req, res) => {
  console.log('register attempt received');
  authController.registerUser (req, res);
});


module.exports = router;
