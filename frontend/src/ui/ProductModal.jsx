import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import DragAndDropUpload from './DragAndDropUpload';
import ActionButton from './ActionButton';
import backendUrl from '../Util/backendURL';
import axios from 'axios';
import Dropdown from './DropDownAdmin';
import { colors, brands } from '../data'; 

const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

const ProductModal = ({
  isOpen,
  onClose,
  editingProductId,
  productDetails,
  setProductDetails,
  buttonLoading,
  setButtonLoading,
  setSuccessMessage,
  setError,
  fetchProducts,
  categories,
}) => {
  const [tempSku, setTempSku] = useState({ sku: '', price: '', stock: '', color: '', size: '', images: [] });
  const [isAddingSku, setIsAddingSku] = useState(false);

  // Handle SKU changes
  const handleSkuChange = (index, field, value) => {
    const updatedSkus = [...productDetails.skus];
    updatedSkus[index] = { ...updatedSkus[index], [field]: value };
    setProductDetails({ ...productDetails, skus: updatedSkus });
  };

  // Add a new SKU entry
  const addSku = () => {
    setIsAddingSku(true);
  };

  // Save temporary SKU and add it to the product details
  const saveTempSku = () => {
    setProductDetails({
      ...productDetails,
      skus: [...productDetails.skus, tempSku],
    });
    setTempSku({ sku: '', price: '', stock: '', color: '', size: '', images: [] }); // Reset temp SKU
    setIsAddingSku(false); // Hide the temporary section
  };

  // Remove a SKU entry
  const removeSku = (index) => {
    const updatedSkus = productDetails.skus.filter((_, i) => i !== index);
    setProductDetails({ ...productDetails, skus: updatedSkus });
  };

  // Add or update product
  const handleAddOrUpdateProduct = async () => {
    setButtonLoading(true);
    try {
      const productData = { ...productDetails };

      if (editingProductId) {
        await axios.put(`${apiUrl}/api/products/${editingProductId}`, productData);
        setSuccessMessage('Product updated successfully!');
      } else {
        await axios.post(`${apiUrl}/api/products`, productData);
        setSuccessMessage('Product added successfully!');
      }
      
      // Reset form
      setProductDetails({
        name: '',
        description: '',
        category_id: '',
        brand: '',
        skus: [], 
      });

      console.log(productDetails);
      fetchProducts(); 
      onClose(); 
    } catch (error) {
      setError('Error adding/updating product');
    }
    setButtonLoading(false);
  };

  return (
    <Modal
      title={editingProductId ? 'Edit Product' : 'Add Product'}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleAddOrUpdateProduct}
      buttonText={editingProductId ? 'Update' : 'Add'}
      buttonLoading={buttonLoading}
      saveButtonDisabled={!productDetails.name.trim() || !productDetails.skus.length} 
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          id="product-name"
          type="text"
          label="Product Name"
          value={productDetails.name}
          onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
          required
        />
        <Input
          id="description"
          type="text"
          label="Description"
          value={productDetails.description}
          onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
          required
        />
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Dropdown
            id="brand"
            label="Brand"
            options={brands}
            value={productDetails.brand}
            onChange={(e) => setProductDetails({ ...productDetails, brand: e.target.value })}
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Dropdown
            id="category"
            label="Category"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            value={productDetails.category_id}
            onChange={(e) => setProductDetails({ ...productDetails, category_id: e.target.value })}
            required
          />
        </div>
      </div>

      {/* SKU Table Section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <h3 className="text-lg font-medium mb-2">SKUs</h3>
        <div className="mt-4 mb-2 flex justify-end">
          <ActionButton type="button" onClick={addSku} text="Add SKU" />
        </div>

        <table className="min-w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">SKU</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Color</th>
              <th className="border border-gray-300 p-2">Size</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productDetails.skus.map((sku, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{sku.sku}</td>
                <td className="border border-gray-300 p-2">{sku.price}</td>
                <td className="border border-gray-300 p-2">{sku.stock}</td>
                <td className="border border-gray-300 p-2">{sku.color}</td>
                <td className="border border-gray-300 p-2">{sku.size}</td>
                <td className="border border-gray-300 p-2">
                  <button className="text-red-500" onClick={() => removeSku(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Temporary SKU Entry Section */}
        {isAddingSku && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 border p-4 rounded">
            <Input
              id="temp-sku"
              type="text"
              label="SKU"
              value={tempSku.sku}
              onChange={(e) => setTempSku({ ...tempSku, sku: e.target.value })}
            />
            <Input
              id="temp-price"
              type="number"
              label="Price"
              value={tempSku.price}
              onChange={(e) => setTempSku({ ...tempSku, price: e.target.value })}
            />
            <Input
              id="temp-stock"
              type="number"
              label="Stock"
              value={tempSku.stock}
              onChange={(e) => setTempSku({ ...tempSku, stock: e.target.value })}
            />
            <Dropdown
              id="temp-color"
              label="Color"
              options={colors}
              value={tempSku.color}
              onChange={(e) => setTempSku({ ...tempSku, color: e.target.value })}
            />
            <Input
              id="temp-size"
              type="text"
              label="Size"
              value={tempSku.size}
              onChange={(e) => setTempSku({ ...tempSku, size: e.target.value })}
            />
            <div className="col-span-5">
              <DragAndDropUpload
                id={`temp-images`}
                onDrop={(files) => setTempSku({ ...tempSku, images: files })}
                uploadedFiles={tempSku.images}
                label="Upload Images"
              />
            </div>
            <div className="mt-2 col-span-5 flex justify-end space-x-2">
              <ActionButton text="Save SKU" onClick={saveTempSku} />
              <ActionButton text="Cancel" onClick={() => setIsAddingSku(false)} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProductModal;
