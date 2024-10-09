import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal'; 
import backendUrl from '../../Util/backendURL';
import Input from '../../ui/Input'; 
import ActionButton from '../../ui/ActionButton';
import NoDataFound from '../../ui/NoDataFound';
import SearchBar from '../../ui/SearchBar'; 
import MessageCard from '../../ui/MessageCard';

const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching categories');
      setLoading(false);
      console.error('Error fetching categories:', error);
    }
  };

  // Add or update category
  const handleAddOrUpdateCategory = async () => {
    setButtonLoading(true);
    try {
      if (editingCategoryId) {
        await axios.put(`${apiUrl}/api/categories/${editingCategoryId}`, { name: categoryName });
        setSuccessMessage('Category updated successfully!');
      } else {
        await axios.post(`${apiUrl}/api/categories`, { name: categoryName });
        setSuccessMessage('Category added successfully!');
      }
      setCategoryName('');
      setEditingCategoryId(null); 
      fetchCategories(); 
      setIsModalOpen(false); 
    } catch (error) {
      setError('Error adding/updating category');
    }
    setButtonLoading(false);
  };

  const openAddModal = () => {
    setCategoryName(''); 
    setEditingCategoryId(null);
    setIsModalOpen(true); 
  };

  const openEditModal = (category) => {
    setCategoryName(category.name);
    setEditingCategoryId(category.id);
    setIsModalOpen(true);
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/categories/${id}`);
      setSuccessMessage('Category deleted successfully!');
      fetchCategories(); 
    } catch (error) {
      setError('Error deleting category');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    // { key: 'id', label: 'ID' },
    { key: 'name', label: 'Category Name' },
  ];

  return (
    <div className="flex mx-auto min-h-[85vh]">
      {(error || successMessage) && (
        <MessageCard
          type={error ? 'error' : 'success'}
          message={error || successMessage}
          onClose={() => {
            setError(null);
            setSuccessMessage(null);
          }}
        />
      )}
      <div className="flex-1 flex flex-col p-2">
        {/* SearchBar Component */}
        <SearchBar 
          whatToSearch="Categories"
          searchTerm={searchTerm}
          handleSearch={setSearchTerm}
          handleReload={fetchCategories} 
          actionButton={<ActionButton onClick={openAddModal} text="Add Category" className="ml-auto mb-4"></ActionButton>} 
        />

        {filteredCategories.length > 0 ? (
          <Table
            columns={columns}
            data={filteredCategories}
            handleEdit={openEditModal}
            handleDelete={handleDeleteCategory}
            identifierKey="id"
          />
        ) : (
          <NoDataFound />
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <Modal
            title={editingCategoryId ? 'Edit Category' : 'Add Category'}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddOrUpdateCategory}
            buttonText={editingCategoryId ? 'Update' : 'Add'}
            buttonLoading={buttonLoading}
            saveButtonDisabled={categoryName.trim() === ''} 
          >
            <Input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
