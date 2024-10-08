import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../ui/Table';
import ProductModal from './ProductModal';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products'); // Replace with your API endpoint
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching products');
      setLoading(false);
      console.error('Error fetching products:', error);
    }
  };

  const handleAddOrUpdateProduct = async () => {
    try {
      const productData = {
        name: productName,
        category: productCategory,
        price: productPrice,
      };
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct.id}`, productData);
      } else {
        await axios.post('/api/products', productData);
      }
      setProductName('');
      setProductCategory('');
      setProductPrice('');
      setEditingProduct(null);
      fetchProducts();
      setModalOpen(false);
    } catch (error) {
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductCategory(product.category);
    setProductPrice(product.price);
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      setError('Error deleting product');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
  ];

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* Add / Update Form Modal */}
      <button
        onClick={() => { setModalOpen(true); setEditingProduct(null); }}
        className="bg-green-500 text-white rounded p-2 mb-4"
      >
        Add Product
      </button>

      {error && (
        <p className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </p>
      )}

      {/* Display table with products */}
      <Table
        columns={columns}
        data={products}
        handleEdit={handleEditProduct}
        handleDelete={handleDeleteProduct}
        identifierKey="id"
      />

      {/* Product Modal for Adding/Updating */}
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={{
          name: productName,
          category: productCategory,
          price: productPrice,
        }}
        setProductName={setProductName}
        setProductCategory={setProductCategory}
        setProductPrice={setProductPrice}
        onSave={handleAddOrUpdateProduct}
      />
    </div>
  );
};

export default ManageProducts;
