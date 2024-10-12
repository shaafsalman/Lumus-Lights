const pool = require('../db');

// Fetch all categories
const fetchCategories = (callback) => {
  pool.query('SELECT * FROM Categories', (err, results) => {
    if (err) {
      return callback(new Error('Error fetching categories: ' + err.message), null);
    }
    callback(null, results);
  });
};

// Add a new category
const addCategory = (name, callback) => {
  const query = 'INSERT INTO Categories (name) VALUES (?)';
  
  pool.query(query, [name], (err, results) => {
    if (err) {
      return callback(new Error('Error adding category: ' + err.message), null);
    }
    callback(null, results.insertId); // Return the new category ID
  });
};

// Delete a category by ID
const deleteCategory = (id, callback) => {
  const query = 'DELETE FROM Categories WHERE id = ?';
  
  pool.query(query, [id], (err) => {
    if (err) {
      return callback(new Error('Error deleting category: ' + err.message), null);
    }
    callback(null, { message: 'Category deleted successfully' });
  });
};

module.exports = {
  fetchCategories,
  addCategory,
  deleteCategory,
};
