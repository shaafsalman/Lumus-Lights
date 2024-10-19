import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';
import RoundIconButton from '../ui/RoundIconButton';
import { colors, brands } from '../data';
import DropDown from '../ui/DropDown';
import Counter from '../ui/Counter';
import ColorSelector from '../ui/ColorSelector';
import ReviewComponent from '../ui/ReviewComponent';

const ProductImageDisplay = ({ imagesToShow, currentImageIndex, onNext, onPrev }) => {
  const [selectedImage, setSelectedImage] = useState(currentImageIndex);

  return (
    <div className="relative w-full lg:w-5/12 mb-8 lg:mb-0 border rounded-xl py-6 px-6 shadow-lg">
      {/* Main Product Image */}
      <div className="relative group">
        <div className="w-30 h-[400px] rounded-lg overflow-hidden">
          <img
            src={imagesToShow[selectedImage]}
            alt="Product"
            className="w-full h-full object-scale-down rounded-lg"
          />
        </div>

       {/* Navigation Arrows */}
       <div className="absolute inset-y-0 left-2 flex items-center">
          <RoundIconButton icon={ArrowLeft} onClick={onPrev} size={24} />
        </div>
        <div className="absolute inset-y-0 right-2 flex items-center">
          <RoundIconButton icon={ArrowRight} onClick={onNext} size={24} />
        </div>
      </div>

      {/* Thumbnails Section (Right-Aligned Outside) */}
      <div className="absolute -right-28 top-0 flex flex-col space-y-4">
        {imagesToShow.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-transform transform ${
              selectedImage === index ? 'scale-110 ring-2 ring-primary' : 'opacity-75'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};


const ProductDetails = ({
  productTitle,
  productCategory,
  productDescription,
  productBrand,
  skus,
  currentPrice,
  originalPrice,
  selectedSku,
  onColorChange,
  brandLogo,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="w-full lg:w-5/12 px-10 mb-8 lg:mb-0">
      <div className="flex flex-col h-full">
        <h1 className="text-md uppercase">{productBrand}</h1>
        <h3 className="text-2xl font-bold ">{productTitle}</h3>
        <h1 className="text-md ">{productCategory}</h1>
        <p className="text-xs tracking-wider">{productDescription}</p>

        <div className="flex justify-end mb-1">
          <img src={brandLogo} alt="Brand Logo" className="w-20 h-auto" />
        </div>

        {/* Replace this part with ColorSelector */}
        <ColorSelector 
          items={skus} 
          selectedItem={selectedSku} 
          onItemSelect={onColorChange} 
        />

        <DropDown 
          values={skus.map(sku => sku.color)} 
          heading="Choose Color" 
        />

        <div className="flex items-center justify-between mt-4 mb-4">
          <span className="text-lg font-semibold">{originalPrice} PKR</span>
          {originalPrice && (
            <span className="line-through ">{originalPrice} PKR</span>
          )}
          <div className="ml-2">
            <Counter 
              quantity={quantity} 
              onIncrease={handleIncrease} 
              onDecrease={handleDecrease} 
            />
          </div>
        </div>

        <div className="w-full flex justify-between gap-4">
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
    <div className="container mx-auto px-1 py-2">
      <div className="flex flex-wrap gap-20">
        <ProductDetails
        productBrand={brand}
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
      <ReviewComponent />
    </div>
  );
};

const getColorStyle = (skuColor) => {
  const colorObj = colors.find(c => c.value === skuColor);
  return colorObj ? colorObj.gradient : 'bg-gray-300'; 
};

export default ProductMainPage;
