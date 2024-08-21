const userModel = require('../Model/userModel');

const authenticateUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  userModel.getUserByEmail(email, (err, user) => {
    if (err) {
      console.log('Internal server error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      console.log('Invalid email or password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Directly compare plaintext passwords
    if (password === user.password) {
      console.log('Authentication successful');
      return res.status(200).json({ message: 'Authentication successful' });
    } else {
      console.log('Invalid email or password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
};

module.exports = {
  authenticateUser
};
