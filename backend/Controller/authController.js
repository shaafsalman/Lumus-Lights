const bcrypt = require('bcrypt');
const userModel = require('../Model/userModel');

const registerUser = (req, res) => {
  const { email, password, securityCode } = req.body;

  if (!email || !password || !securityCode) {
    return res.status(400).json({ message: 'Email, password, and security code are required' });
  }

  if (securityCode !== process.env.SECURITY_CODE) {
    return res.status(403).json({ message: 'Invalid security code' });
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10; 
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log('Error hashing password:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    userModel.createUser({ email, password: hash }, (err, user) => {
      if (err) {
        console.log('Error creating user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

const authenticateUser = (req, res) => {
  const { email, password } = req.body;

  console.log("Signing in user", email); 
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  userModel.getUserByEmail(email, (err, user) => {
    if (err) {
      console.log('Internal server error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log("User fetched from DB:", user);

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.log('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (match) {
        console.log('Authentication successful');
        return res.status(200).json({ message: 'Authentication successful' });
      } else {
        console.log('Password does not match for user:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  });
};

module.exports = {
  registerUser,
  authenticateUser,
};
