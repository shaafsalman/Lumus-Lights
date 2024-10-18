import React, { useEffect, useState } from 'react';
import { fetchPromotionalImages, addPromotionalImage, deletePromotionalImage } from './../../Util/fetchers'; 
import MessageCard from '../../ui/MessageCard';
import { Cloud as CloudIcon } from 'lucide-react'; 
import Modal from '../../ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../../ui/ActionButton';
import Table from '../../ui/Table';
import Input from '../../ui/Input'; 

const ImageUpload = ({ image, imageFile, handleImageChange }) => {
  const fileSizeInKB = imageFile ? (imageFile.size / 1024).toFixed(2) : 0;
  const dimensions = imageFile ? `Dimensions: ${imageFile.width} x ${imageFile.height}` : '';

  return (
    <div className="flex items-center mb-2 flex-col">
      <label className="flex items-center cursor-pointer mb-4">
        <FontAwesomeIcon icon={faUpload} className="w-5 h-5 mr-2" />
        <span>Upload Image</span>
        <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
      </label>
      {image && (
        <div className="flex flex-col items-center">
          <img src={image} alt="Uploaded" className="w-64 h-64 object-cover rounded mb-2" />
          <p>Size: {fileSizeInKB} KB</p>
          <p>{dimensions}</p>
        </div>
      )}
    </div>
  );
};

const PopUpPromotions = () => {
  const [images, setImages] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(''); // New state for name input

  // Fetch promotional images on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchPromotionalImages();
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching promotional images:', error);
      }
    };

    loadImages();
  }, []);

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImageFile({ size: file.size, width: img.width, height: img.height });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (image && name) { // Ensure both image and name are provided
      setLoading(true);
      try {
        await addPromotionalImage({ image, name }); // Pass name to the function
        setNotification({ type: 'success', message: 'Image uploaded successfully!' });
        setImage('');
        setName(''); // Reset name input after upload
        setIsModalOpen(false);
        // Reload images after upload
        loadImages();
      } catch (error) {
        setNotification({ type: 'error', message: 'Error uploading image.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePromotionalImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      setNotification({ type: 'success', message: 'Image deleted successfully!' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error deleting image.' });
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      await togglePromotionalImageStatus(id, !status);
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, active: !status } : img
        )
      );
      setNotification({ type: 'success', message: `Image ${status ? 'deactivated' : 'activated'} successfully!` });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error updating image status.' });
    }
  };

  const columns = [
    { label: 'ID', key: 'ImageID' },
    { label: 'Image', key: 'ImageUrl' },
    { label: 'Created At', key: 'CreatedAt' },
    { label: 'Active', key: 'active' },
  ];

  return (
    <div className="popup-promotions p-4 text-white">
      <div className="flex justify-end mb-4">
        <ActionButton 
          text="Upload a New Promotion Image" 
          onClick={() => setIsModalOpen(true)} 
          icon={faUpload} 
        />
      </div>

      {notification && (
        <MessageCard type={notification.type} message={notification.message} onClose={() => setNotification(null)} />
      )}

      {images.length === 0 ? (
        <div className="flex flex-col items-center py-4">
          <p>No images to show</p>
        </div>
      ) : (
        <Table 
          columns={columns} 
          data={images} 
          handleDelete={handleDelete} 
          handleToggleStatus={handleToggleStatus} 
          identifierKey="id" 
        />
      )}

      <Modal isOpen={isModalOpen} onSave={handleUpload} buttonText="Save" saveButtonDisabled={!image || !name} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-2">Upload New Image</h2>
        <p className="mb-4">Choose an image to upload as a promotional image. You will see a preview once uploaded.</p>
        
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          label="Enter image name" 
          className="mb-4" 
        />

        <ImageUpload image={image} imageFile={imageFile} handleImageChange={handleImageChange} />
      </Modal>
    </div>
  );
};

export default PopUpPromotions;
