const db = require('../db');

const getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    const user = results.length > 0 ? results[0] : null;
    callback(null, user);
  });
};

const createUser = (userData, callback) => {
  const { email, password } = userData;
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id: results.insertId, email });
  });
};

module.exports = {
  getUserByEmail,
  createUser,
};
