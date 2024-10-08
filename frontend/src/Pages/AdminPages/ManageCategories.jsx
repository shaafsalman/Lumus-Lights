import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../ui/Table';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching categories');
      setLoading(false);
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddOrUpdateCategory = async () => {
    try {
      if (editingCategoryId) {
        await axios.put(`/api/categories/${editingCategoryId}`, { name: categoryName });
      } else {
        await axios.post('/api/categories', { name: categoryName });
      }
      setCategoryName('');
      setEditingCategoryId(null);
      fetchCategories();
    } catch (error) {
      setError('Error adding/updating category');
    }
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setEditingCategoryId(category.id);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      setError('Error deleting category');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Category Name' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* Add / Update Form */}
      <div className="mb-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="border rounded p-2 mb-2"
        />
        <button
          onClick={handleAddOrUpdateCategory}
          className="bg-blue-500 text-white rounded p-2"
        >
          {editingCategoryId ? 'Update Category' : 'Add Category'}
        </button>
      </div>

      {error && (
        <p className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </p>
      )}

      {/* Display table with categories */}
      <Table
        columns={columns}
        data={categories}
        handleEdit={handleEditCategory}
        handleDelete={handleDeleteCategory}
        identifierKey="id"
      />
    </div>
  );
};

export default ManageCategories;
