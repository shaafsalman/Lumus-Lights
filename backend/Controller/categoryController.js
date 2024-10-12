const categoryModel = require('../Model/categoryModel');

// Fetch all categories
const getCategories = (req, res) => {
  categoryModel.fetchCategories((err, categories) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(categories);
  });
};

// Add a new category
const createCategory = (req, res) => {
  const { name } = req.body; // Assume name is passed in the request body
  categoryModel.addCategory(name, (err, categoryId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ id: categoryId, name });
  });
};

// Delete a category by ID
const removeCategory = (req, res) => {
  const { id } = req.params; // Get category ID from request parameters
  categoryModel.deleteCategory(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(result);
  });
};

module.exports = {
  getCategories,
  createCategory,
  removeCategory
};
