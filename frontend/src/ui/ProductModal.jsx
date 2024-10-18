import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import ActionButton from './ActionButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faUpload, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import backendUrl from '../Util/backendURL';
import axios from 'axios';
import Dropdown from './DropDownAdmin';
import { colors, brands } from '../data';

const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

const ProductModal = ({
  isOpen,
  onClose,
  editingProductId,
  buttonLoading,
  setButtonLoading,
  setSuccessMessage,
  setError,
  fetchProducts,
  categories,
}) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    category_id: '',
    brand: '',
    skus: [],
    thumbnail: null,
    status: true,
  });
  
  const [skuFields, setSkuFields] = useState({ sku: '', price: '', stock: '', color: '', size: '', images: [] });
  const [isAddingSku, setIsAddingSku] = useState(false);
  const [editingSkuIndex, setEditingSkuIndex] = useState(null);

  const handleInputChange = (field, value) => setProductDetails(prev => ({ ...prev, [field]: value }));

  const handleSkuChange = (field, value) => {
    const updatedSkus = [...(productDetails.skus || [])];
    editingSkuIndex !== null ? updatedSkus[editingSkuIndex][field] = value : setSkuFields({ ...skuFields, [field]: value });
    editingSkuIndex !== null ? setProductDetails({ ...productDetails, skus: updatedSkus }) : null;
  };

  const toggleSku = () => {
    setIsAddingSku(prev => !prev);
    if (isAddingSku) setSkuFields({ sku: '', price: '', stock: '', color: '', size: '', images: [] });
  };

  const saveSku = () => {
    const updatedSkus = editingSkuIndex !== null ? [...(productDetails.skus || [])] : [...(productDetails.skus || []), skuFields];
    if (editingSkuIndex !== null) updatedSkus[editingSkuIndex] = skuFields;
    setProductDetails({ ...productDetails, skus: updatedSkus });
    setSkuFields({ sku: '', price: '', stock: '', color: '', size: '', images: [] });
    toggleSku();
  };

  const removeSku = (index) => setProductDetails(prev => ({ ...prev, skus: (prev.skus || []).filter((_, i) => i !== index) }));

  const editSku = (index) => {
    setEditingSkuIndex(index);
    setSkuFields(productDetails.skus[index]);
    toggleSku();
  };

  const handleSaveProduct = async () => {
    setButtonLoading(true);
    try {
      const url = editingProductId ? `${apiUrl}/api/products/${editingProductId}` : `${apiUrl}/api/products`;
      const payload = {
        ...productDetails,
        thumbnail: productDetails.thumbnail, 
      };
      await axios[editingProductId ? 'put' : 'post'](url, payload);
      console.log(payload);
      setSuccessMessage(`Product ${editingProductId ? 'updated' : 'added'} successfully!`);
      fetchProducts();
      onClose();
    } catch (error) {
      setError(`Error ${editingProductId ? 'updating' : 'adding'} product`);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('thumbnail', reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSkuFields(prev => ({
          ...prev,
          images: [...prev.images, { file, preview: reader.result }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const renderInputs = [
    { id: 'name', label: 'Product Name', value: productDetails.name },
    { id: 'description', label: 'Description', value: productDetails.description },
  ].map(input => (
    <Input key={input.id} id={input.id} label={input.label} value={input.value} onChange={(e) => handleInputChange(input.id, e.target.value)} required />
  ));

  const renderSkus = (productDetails.skus || []).map((sku, index) => (
    <tr key={index}>
      {['sku', 'price', 'stock', 'color', 'size'].map(field => (
        <td key={field} className="border border-gray-300 p-2">{sku[field]}</td>
      ))}
      <td className="p-1 flex space-x-2 justify-center">
        <ActionButton type="button" onClick={() => editSku(index)} icon={<FontAwesomeIcon icon={faEdit} />} />
        <ActionButton type="button" onClick={() => removeSku(index)} icon={<FontAwesomeIcon icon={faTrash} />} />
      </td>
    </tr>
  ));

  return (
    <Modal
      title={editingProductId ? 'Edit Product' : 'Add Product'}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSaveProduct}
      buttonText={editingProductId ? 'Update' : 'Add'}
      buttonLoading={buttonLoading}
      saveButtonDisabled={!productDetails.name.trim() || !(productDetails.skus || []).length}
    >
      <div className="flex items-center mb-2">
        <label className="flex items-center cursor-pointer">
          <FontAwesomeIcon icon={faUpload} className="w-5 h-5 mr-2" />
          <span>Upload Thumbnail</span>
          <input type="file" onChange={handleThumbnailChange} className="hidden" accept="image/*" />
        </label>
        {productDetails.thumbnail && (
          <img src={productDetails.thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover rounded ml-4" />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {renderInputs}
        <Dropdown id="brand" label="Brand" options={brands} value={productDetails.brand} onChange={(e) => handleInputChange('brand', e.target.value)} required />
        <Dropdown id="category" label="Category" options={categories.map(cat => ({ value: cat.id, label: cat.name }))} value={productDetails.category_id} onChange={(e) => handleInputChange('category_id', e.target.value)} required />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">SKUs</h3>
        <div className="flex justify-end">
          <ActionButton type="button" onClick={toggleSku} icon={<FontAwesomeIcon icon={faPlus} />} text="Add SKU" className="mt-4 mb-2" />
        </div>
        <table className="min-w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>{['SKU', 'Price', 'Stock', 'Color', 'Size', 'Actions'].map(heading => <th key={heading} className="border border-gray-300 p-2">{heading}</th>)}</tr>
          </thead>
          <tbody>{renderSkus}</tbody>
        </table>

        {isAddingSku && (
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-4 border p-2 rounded">
            {['sku', 'price', 'stock', 'size'].map(field => (
              <Input key={field} id={field} label={field.charAt(0).toUpperCase() + field.slice(1)} value={skuFields[field]} onChange={(e) => handleSkuChange(field, e.target.value)} required />
            ))}
            <Dropdown
              id="temp-color"
              label="Color"
              options={colors}
              value={skuFields.color}
              onChange={(e) => handleSkuChange('color', e.target.value)}
              required
            />
            <div className="col-span-5">
              <div {...getRootProps({ className: 'border-dashed border-2 border-gray-400 p-2 rounded' })}>
                <input {...getInputProps()} />
                <p className="text-center">Drag & drop images here, or click to select</p>
              </div>
              <div className="mt-2 flex flex-wrap">
                {skuFields.images.length === 0 ? (
                  <p>No SKU images uploaded</p> 
                ) : (
                  skuFields.images.map((image, index) => (
                    <div key={index} className="relative mr-2 mb-2">
                      <img src={image.preview} alt={`Preview ${index}`} className="w-16 h-16 object-cover rounded" />
                      <button type="button" onClick={() => setSkuFields(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                        <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <ActionButton type="button" onClick={saveSku} text={editingSkuIndex !== null ? 'Update SKU' : 'Save SKU'} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProductModal;
