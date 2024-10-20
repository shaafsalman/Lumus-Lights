import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, ShoppingCart } from 'lucide-react'; 
import Button from '../ui/Button.jsx';
import { useDarkMode } from '../Util/DarkModeContext';
import { colors, brands } from '../data';
import RoundIconButton from '../ui/RoundIconButton.jsx';
import ColorSelector from '../ui/ColorSelector';

const ProductCard = ({ product, onAddToCart, isAddingToCart = false }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const {
    category_name = "Generic",
    description = "Light",
    name = "Product",
    thumbnail = "https://res.cloudinary.com/dpxvkrk12/image/upload/v1729257713/images/thumbnail.webp",
    skus = [],
    brand = "panasonic",
  } = product || {};

  const [selectedSku, setSelectedSku] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // New state for hover

  const imagesToShow = getImagesToShow();
  const brandLogo = getBrandLogo(brand);

  return (
    <div 
      className={`relative rounded-lg lg:min-w-56 p-1.5 border shadow-md border-primary ${darkMode ? 'bg-opacity-10 text-white border-primary backdrop-blur-sm' : 'bg-white text-secondary border-gray-300'}`}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageCarousel 
        images={imagesToShow} 
        currentImageIndex={currentImageIndex} 
        onPrev={handlePrevImage} 
        onNext={handleNextImage} 
        name={name} 
        thumbnail={thumbnail} 
      />
      <ProductInfo 
        category_name={category_name} 
        name={name} 
        description={description} 
        brandLogo={brandLogo} 
        darkMode={darkMode} 
      />
      <PricingSection 
        handleColorChange={handleColorChange}
        selectedSku={selectedSku} 
        skus={skus} 
        onViewProduct={handleViewProduct} 
        onAddToCart={onAddToCart} 
        isAddingToCart={isAddingToCart} 
        darkMode={darkMode} 
      />
      
      {/* Hover Action Buttons */}
      {isHovered && (
      <div className="absolute top-2 right-2 flex gap-1  rounded-xl ">
         <RoundIconButton 
           icon={Heart} 
      onClick={() => {/* Add like functionality */}} 
      size={16} 
      className="hover:text-primary transition bg-transparent border border-primary rounded-md " 
        />
          <RoundIconButton 
           icon={ShoppingCart} 
      onClick={onAddToCart} 
      size={16} 
      className="hover:text-primary transition bg-transparent border border-primary rounded-md " 
        />
  </div>
)}

    </div>
  );

  function getImagesToShow() {
    if (selectedSku) {
      return selectedSku.images.map(image => image.image_path);
    }
    return skus.reduce((acc, sku) => acc.concat(sku.images.map(image => image.image_path)), [thumbnail]);
  }

  function getBrandLogo(brand) {
    const brandData = brands.find(b => b.value === brand);
    return brandData ? brandData.logo : 'https://via.placeholder.com/50';
  }

  function handleColorChange(sku) {
    setSelectedSku(sku);
    setCurrentImageIndex(0);
  }

  function handleViewProduct() {
    if (product) {
      navigate('/product-main-page', {
        state: { product },
      });
    }
  }

  function handleNextImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToShow.length);
  }

  function handlePrevImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesToShow.length - 1 : prevIndex - 1));
  }
};

const ImageCarousel = ({ images, currentImageIndex, onPrev, onNext, name, thumbnail }) => (
  <div className="relative flex justify-center items-center">
    <img
      src={images.length > 0 ? images[currentImageIndex] : thumbnail}
      alt={name}
      className="w-36 h-auto lg:h-48 object-scale-down" 
    />
    <div className="absolute top-1/2 transform -translate-y-1/2 left-3">
      <RoundIconButton icon={ArrowLeft} onClick={onPrev} size={20} />
    </div>
    <div className="absolute top-1/2 transform -translate-y-1/2 right-3">
      <RoundIconButton icon={ArrowRight} onClick={onNext} size={20} />
    </div>
  </div>
);

const ProductInfo = ({ category_name, name, description, brandLogo, darkMode }) => (
  <div className="mb-2">
    <div className="flex justify-between items-center">
      <h2 className={`lg:text-base text-sm  ${darkMode ? 'text-white' : 'text-secondary'}`}>
        {category_name}
      </h2>
      <img src={brandLogo} alt={name} className="w-auto h-12" />
    </div>
    <h3 className={`lg:text-lg tracking-tight font-semibold leading-tight truncate ${darkMode ? 'text-white' : 'text-secondary'}`}>
      {name}
    </h3>
    <p className={`text-xs ${darkMode ? 'text-white' : 'text-secondary'}`}>{description}</p>
  </div>
);

const PricingSection = ({ selectedSku, skus, onViewProduct, handleColorChange, onAddToCart, isAddingToCart, darkMode }) => (
  <div className="flex flex-col gap-1 mb-2 px-1">
    <div className="flex justify-between items-center">
    <ColorSelector items={skus} onChange={handleColorChange} />

      
      <div>
        <span className={`lg:text-lg font-semibold  rounded-md p-1  tracking-tight ${darkMode ? 'text-white bg-secondary' : 'text-white bg-secondary'}`}>
          {selectedSku ? selectedSku.price : skus.length > 0 ? skus[0].price : "0"} PKR
        </span>
        {selectedSku && selectedSku.originalPrice && (
          <span className={`line-through ml-2 text-xs ${darkMode ? 'text-white' : 'text-secondary'}`}>
            {selectedSku.originalPrice} PKR
          </span>
        )}
      </div>
    </div>
    <div className="w-full flex flex-col-2 gap-1">
      <Button
        onClick={onViewProduct}
        text="View"
        iconClass="fas fa-eye"
        buttonColor="bg-[#333] text-white"
        size="sm" 
      />
      <Button
        onClick={onAddToCart}
        disabled={isAddingToCart}
        loading={isAddingToCart}
        text="Add "
        iconClass="fas fa-shopping-cart"
        size="sm" 
      />
    </div>
  </div>
);

export default ProductCard;
