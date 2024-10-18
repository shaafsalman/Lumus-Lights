import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';
import RoundIconButton from '../ui/RoundIconButton';
import { colors, brands } from '../data';

const ProductImageDisplay = ({ imagesToShow, currentImageIndex, onNext, onPrev }) => {
  return (
    <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
      <div className="relative">
        <img
          src={imagesToShow[currentImageIndex]}
          alt="Product"
          className="w-full h-auto"
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
          <RoundIconButton
            icon={ArrowLeft}
            onClick={onPrev}
            size={24}
          />
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
          <RoundIconButton
            icon={ArrowRight}
            onClick={onNext}
            size={24}
          />
        </div>
      </div>
    </div>
  );
};

const ProductDetails = ({
  productTitle,
  productCategory,
  productDescription,
  skus,
  currentPrice,
  originalPrice,
  selectedSku,
  onColorChange,
  brandLogo,
}) => {
  return (
    <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="text-yellow-500 flex items-center">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          </div>
          <span className="ml-2 text-gray-500">No reviews</span>
        </div>

        <h3 className="text-4xl font-bold mb-2">{productTitle}</h3>
        <span className="text-sm text-gray-500">{productCategory}</span>
        <p className="mb-4">{productDescription}</p>

        <img src={brandLogo} alt="Brand Logo" className="w-16 h-auto mb-4" />

        <div className="flex mb-2">
          {skus.map((sku) => (
            <div
              key={sku.id}
              onClick={() => onColorChange(sku)}
              className={`w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer mr-2 relative`}
              title={sku.color.charAt(0).toUpperCase() + sku.color.slice(1)}
            >
              <div className={`w-full h-full rounded-full ${getColorStyle(sku.color)}`} />
              {selectedSku && selectedSku.id === sku.id && (
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold">{currentPrice} PKR</span>
          {originalPrice && (
            <span className="line-through text-gray-500">{originalPrice} PKR</span>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <Button text="View" iconClass="fas fa-eye" buttonColor="bg-[#333] text-white" />
          <Button text="Add to Cart" iconClass="fas fa-angle-double-right" />
        </div>
      </div>
    </div>
  );
};

const ProductMainPage = () => {
  const { state } = useLocation();  
  const { product } = state || {};

  if (!product) {
    return <div>No product data found.</div>;
  }

  const {
    name,
    category_name,
    description,
    skus,
    thumbnail,
    currentPrice,
    originalPrice,
    brand,
  } = product;

  const getBrandLogo = () => {
    const brandData = brands.find(b => b.value === brand);
    return brandData ? brandData.logo : 'https://via.placeholder.com/50';
  };

  const [selectedSku, setSelectedSku] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesToShow = (selectedSku && selectedSku.images.length > 0)
    ? selectedSku.images.map(image => image.image_path)
    : [thumbnail];

  const handleColorChange = (sku) => {
    setSelectedSku(sku);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToShow.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imagesToShow.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-10 py-8">
      <div className="flex flex-wrap">
        <ProductDetails
          productTitle={name}
          productCategory={category_name}
          productDescription={description}
          currentPrice={selectedSku ? selectedSku.price : currentPrice}
          originalPrice={selectedSku ? selectedSku.originalPrice : originalPrice}
          skus={skus}
          onColorChange={handleColorChange}
          selectedSku={selectedSku}
          brandLogo={getBrandLogo()}
        />
        <ProductImageDisplay 
          imagesToShow={imagesToShow} 
          currentImageIndex={currentImageIndex} 
          onNext={handleNextImage} 
          onPrev={handlePrevImage} 
        />
      </div>
    </div>
  );
};

const getColorStyle = (skuColor) => {
  const colorObj = colors.find(c => c.value === skuColor);
  return colorObj ? colorObj.gradient : 'bg-gray-300'; 
};

export default ProductMainPage;
