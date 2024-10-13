import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../ui/Table';
import ProductModal from '../../ui/ProductModal';
import backendUrl from '../../Util/backendURL';
import ActionButton from '../../ui/ActionButton';
import NoDataFound from '../../ui/NoDataFound';
import SearchBar from '../../ui/SearchBar';
import MessageCard from '../../ui/MessageCard';

const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
      setProducts(response.data);
      console.log('Fetched products:', response.data); // Debugging log
    } catch (error) {
      setError('Error fetching products');
      console.error(error); // Log the actual error
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      setCategories(response.data);
      console.log('Fetched categories:', response.data); // Debugging log
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProductId(product.id);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${apiUrl}/api/products/${productId}`);
        fetchProducts();
        setSuccessMessage('Product deleted successfully!');
      } catch (error) {
        setError('Error deleting product');
        console.error(error); // Log the actual error
      }
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      await axios.patch(`${apiUrl}/api/products/${productId}/status`, { status: !currentStatus });
      fetchProducts();
      setSuccessMessage('Product status updated successfully!');
    } catch (error) {
      setError('Error updating product status');
      console.error(error); // Log the actual error
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    
    { label: 'Thumbnail', key: 'thumbnail' },
    { label: 'Model', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category_name' },
    {
      label: 'Status',
      key: 'status',
      render: (row) => (
        <button
          onClick={() => handleToggleStatus(row.id, row.status)}
          className={`px-2 py-1 rounded ${row.status ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          {row.status ? 'Active' : 'Inactive'}
        </button>
      ),
    },
  ];

  return (
    <div>
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
        <SearchBar
          whatToSearch="Products"
          searchTerm={searchTerm}
          handleSearch={setSearchTerm}
          handleReload={fetchProducts}
          actionButton={
            <ActionButton onClick={openAddModal} text="Add Product" className="ml-auto mb-4" />
          }
        />

        {loading ? (
          <p>Loading...</p>
        ) : filteredProducts.length > 0 ? (
          <Table
            columns={columns}
            data={filteredProducts}
            handleEdit={openEditModal}
            handleDelete={handleDeleteProduct}
            handleToggleStatus={handleToggleStatus} 
            identifierKey="id"
          />
        ) : (
          <NoDataFound />
        )}

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingProductId={editingProductId}
          buttonLoading={buttonLoading}
          setButtonLoading={setButtonLoading}
          setSuccessMessage={setSuccessMessage}
          setError={setError}
          fetchProducts={fetchProducts}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ManageProducts;
