import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Uncomment if using prop-types
// import PropTypes from 'prop-types';

const ProductModal = ({ open, onClose, product, categories = [], fetchProducts }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductDescription(product.description);
      setProductCategoryId(product.category_id);
      setProductBrand(product.brand);
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductCategoryId('');
    setProductBrand('');
    setError(null);
  };

  const handleSubmit = async () => {
    const productData = {
      name: productName,
      description: productDescription,
      category_id: productCategoryId,
      brand: productBrand,
    };

    try {
      if (product) {
        await axios.put(`/api/products/${product.id}`, productData);
      } else {
        await axios.post('/api/products', productData);
      }
      resetForm();
      fetchProducts();
      onClose();
    } catch (error) {
      setError('Error saving product: ' + (error.message || 'Unknown error'));
    }
  };

  if (!open) return null;

  return (
    <div className="modal">
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      {error && <p className="error text-red-600">{error}</p>}
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
        className="border rounded p-2 mb-2 w-full"
      />
      <textarea
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        placeholder="Product Description"
        className="border rounded p-2 mb-2 w-full"
      />
      <select
        value={productCategoryId}
        onChange={(e) => setProductCategoryId(e.target.value)}
        className="border rounded p-2 mb-2 w-full"
      >
        <option value="">Select Category</option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>
      <input
        type="text"
        value={productBrand}
        onChange={(e) => setProductBrand(e.target.value)}
        placeholder="Brand"
        className="border rounded p-2 mb-2 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded p-2 mb-4 w-full"
      >
        {product ? 'Update Product' : 'Add Product'}
      </button>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white rounded p-2 w-full"
      >
        Cancel
      </button>
    </div>
  );
};


export default ProductModal;
