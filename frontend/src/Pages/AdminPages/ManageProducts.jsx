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
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    category_id: '',
    brand: '',
    skus: [],
    status: true,
  });
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
      console.log(response.data);
    } catch (error) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const openAddModal = () => {
    setProductDetails({
      name: '',
      description: '',
      category_id: '',
      brand: '',
      skus: [],
      status: true,
    });
    setEditingProductId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setProductDetails(product);
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
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { label: 'Model', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category_name' },
    { label: 'Status', key: 'status' }, 
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
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          buttonLoading={buttonLoading}
          setButtonLoading={setButtonLoading}
          setSuccessMessage={setSuccessMessage}
          setError={setError}
          fetchProducts={fetchProducts}
          categories={categories} // Pass categories to the modal
        />
      </div>
    </div>
  );
};

export default ManageProducts;
