import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../ui/Table';
import ProductModal from '../../ui/ProductModal';
import backendUrl from '../../Util/backendURL';
import ActionButton from '../../ui/ActionButton';
import NoDataFound from '../../ui/NoDataFound';
import SearchBar from '../../ui/SearchBar';
import MessageCard from '../../ui/MessageCard';
import { fetchProducts, fetchCategories } from './../../Util/fetchers'; 

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
    const fetchOptionsData = async () => {
      try {
        setLoading(true);
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching options:', err);
        setMessage({ type: 'error', content: 'Failed to fetch options data. Please try again.' });
      }
      setLoading(false);
    };

    fetchOptionsData();

  }, []);

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
        const updatedProducts = await fetchProducts();
        setProducts(updatedProducts);
        setSuccessMessage('Product deleted successfully!');
      } catch (error) {
        setError('Error deleting product');
        console.error(error); 
      }
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      await axios.patch(`${apiUrl}/api/products/${productId}/status`, { status: !currentStatus });
      setProducts(updatedProducts);
      setSuccessMessage('Product status updated successfully!');
    } catch (error) {
      setError('Error updating product status');
      console.error(error); 
    }
  };

 

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
          handleReload={async () => {
            const updatedProducts = await fetchProducts(); 
            setProducts(updatedProducts);
          }}
          actionButton={
            <ActionButton onClick={openAddModal} text="Add Product" className="ml-auto mb-4" />
          }
        />

        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <Table
            columns={columns}
            data={products}
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
