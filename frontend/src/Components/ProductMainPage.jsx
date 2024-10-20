import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import RoundIconButton from '../ui/RoundIconButton';
import { brands } from '../data';
import DropDown from '../ui/DropDown';
import Counter from '../ui/Counter';
import ColorSelector from '../ui/ColorSelector';
import ReviewComponent from '../ui/ReviewComponent';

const ProductImageDisplay = ({ imagesToShow, currentImageIndex, onNext, onPrev }) => {
  const [selectedImage, setSelectedImage] = useState(currentImageIndex);

  const handleNext = () => {
    const nextIndex = (selectedImage + 1) % imagesToShow.length;
    setSelectedImage(nextIndex);
    onNext(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (selectedImage - 1 + imagesToShow.length) % imagesToShow.length;
    setSelectedImage(prevIndex);
    onPrev(prevIndex);
  };

  return (
    <div className="relative w-full lg:w-5/12 mb-8 lg:mb-0 border rounded-xl py-6 px-6 shadow-lg">
      <div className="relative group">
        <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <img
            src={imagesToShow[selectedImage]?.image_path || ''}
            alt="Product"
            className="w-full h-full object-scale-down rounded-lg"
          />
        </div>
        <div className="absolute inset-y-0 left-2 flex items-center">
          <RoundIconButton icon={ArrowLeft} onClick={handlePrev} size={24} />
        </div>
        <div className="absolute inset-y-0 right-2 flex items-center">
          <RoundIconButton icon={ArrowRight} onClick={handleNext} size={24} />
        </div>
      </div>
      <div className="absolute -right-28 top-0 flex flex-col space-y-4 md:-right-10">
        {imagesToShow.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer transition-transform transform ${
              selectedImage === index ? 'scale-110 ring-2 ring-primary' : 'opacity-75'
            }`}
          >
            <img
              src={image.image_path}
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
  onColorChange,
  brandLogo,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="w-full lg:w-5/12 mb-8 lg:mb-0 px-2">
      <div className="flex flex-col h-full">
        <h1 className="text-md uppercase">{productBrand}</h1>
        <h3 className="text-2xl font-bold">{productTitle}</h3>
        <h1 className="text-md">{productCategory}</h1>
        <p className="text-xs tracking-wider">{productDescription}</p>
        <div className="flex justify-end mb-1">
          <img src={brandLogo} alt="Brand Logo" className="w-20 h-auto" />
        </div>
        <p className='font-medium tracking-tighter py-1'>Choose Color</p>
        <ColorSelector 
          items={skus} 
          selectedItem={skus[0]?.id} 
          onItemSelect={onColorChange} 
        />
  
        <div className="flex items-center justify-between mt-4 mb-4">
          <span className="text-lg font-semibold">{currentPrice} PKR</span>
          {originalPrice && (
            <span className="line-through">{originalPrice} PKR</span>
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
          <Button text="View" iconClass="fas fa-eye" buttonColor="bg-secondary text-white" />
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

  const handleColorChange = (sku) => {
    setSelectedSku(sku);
    setCurrentImageIndex(0);
  };

  const imagesToShow = selectedSku?.images.length > 0
    ? selectedSku.images
    : [{ image_path: thumbnail }];

  return (
    <div className="mainPage mt-10">
      <div className="container mx-auto px-4 py-2 flex flex-col gap-4 md:flex-row md:gap-20">
        <ProductImageDisplay
          imagesToShow={imagesToShow}
          currentImageIndex={currentImageIndex}
          onNext={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToShow.length)}
          onPrev={() => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesToShow.length - 1 : prevIndex - 1))}
        />
        <ProductDetails
          productBrand={brand}
          productTitle={name}
          productCategory={category_name}
          productDescription={description}
          currentPrice={selectedSku ? selectedSku.price : currentPrice}
          originalPrice={selectedSku ? selectedSku.originalPrice : originalPrice}
          skus={skus}
          onColorChange={handleColorChange}
          brandLogo={getBrandLogo()}
        />
      </div>
      <ReviewComponent />
    </div>
  );
};


export default ProductMainPage;
