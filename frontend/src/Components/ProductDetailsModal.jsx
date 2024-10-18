import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Lightbox from '../ui/LightBox';


const SKUCard = ({ skuItem, skuStats, handleImageClick }) => (
  <div className="flex items-center space-x-6 p-4 border-b border-gray-200">
    <div className="flex-shrink-0">
      {skuItem.images && skuItem.images.length > 0 ? (
        <div className="flex space-x-3">
          {skuItem.images.map((image, idx) => (
            <img
              key={idx}
              src={image.image_path}
              alt={skuItem.sku}
              className="w-24 h-auto object-cover cursor-pointer rounded-md transition-transform duration-200 hover:scale-105"
              onClick={() => handleImageClick(skuItem.images, idx)}
            />
          ))}
        </div>
      ) : (
        <p className="italic text-sm">No Images Available</p>
      )}
    </div>

    <div className="space-y-1">
      <p className="font-semibold text-md"><strong>SKU:</strong> {skuItem.sku || 'N/A'}</p>

      {skuStats.map((stat) => (
        <p key={stat.key} className="text-sm">
          <strong>{stat.label}:</strong> {stat.format ? stat.format(skuItem[stat.key] || 'N/A') : (skuItem[stat.key] || 'N/A')}
        </p>
      ))}
    </div>
  </div>
);

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const { name, skus = [], thumbnail } = product;

  const skuStats = [
    { label: 'Color', key: 'color' },
    { label: 'Size', key: 'size' },
    { label: 'Price', key: 'price', format: (value) => `Pkr ${value}` },
    { label: 'Stock', key: 'stock' }
  ];

  const [productInfo] = useState([
    { label: 'Description', value: product.description || 'N/A' },
    { label: 'Brand', value: product.brand || 'N/A' },
    { label: 'Category', value: product.category_name || 'N/A' }
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (images, index) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + selectedImages.length) % selectedImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImages.length > 0) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    if (selectedImages.length > 0) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImages]);

  const closeImageModal = () => {
    setSelectedImages([]);
    setSelectedImageIndex(0);
  };

  return (
    <>
      <Modal title="Product Details" closeButtonText="Close" isOpen={isOpen} onClose={onClose} style={{ maxWidth: '80%' }}>
        <div className="p-2 space-y-8">
          {/* Product Info */}
          <div className="flex items-start space-x-10">
            {thumbnail && <img src={thumbnail} alt={name} className="w-48 h-auto rounded-lg" />}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight leading-snug">{name}</h2>

              {productInfo.map((info, idx) => (
                <p key={idx} className="text-base leading-6">
                  <strong>{info.label}:</strong> {info.value}
                </p>
              ))}
            </div>
          </div>

          {/* SKU Details */}
          {skus.length > 0 ? (
            <div
              className={`${
                skus.length < 3
                  ? 'flex space-y-4'  // less than 3
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'  //  3 SKUs per row
              } overflow-y-auto max-h-96`}  // Vertical scroll 
            >
              {skus.map((skuItem) => (
                <SKUCard key={skuItem.id} skuItem={skuItem} skuStats={skuStats} handleImageClick={handleImageClick} />
              ))}
            </div>
          ) : (
            <p className="italic text-base">No SKU details available.</p>
          )}
        </div>
      </Modal>

      {/* Lightbox */}
      {selectedImages.length > 0 && (
        <Lightbox
          images={selectedImages}
          selectedIndex={selectedImageIndex}
          onClose={closeImageModal}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
};

export default ProductDetailsModal;
