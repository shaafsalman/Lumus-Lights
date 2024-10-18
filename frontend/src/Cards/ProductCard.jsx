import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 
import Button from '../ui/Button.jsx';
import { useDarkMode } from '../Util/DarkModeContext';
import { colors, brands } from '../data';
import RoundIconButton from '../ui/RoundIconButton.jsx';

const ProductCard = ({ product, onAddToCart, isAddingToCart = false }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const {
    category_name = "N/A",
    description = "No description available",
    name = "Unnamed Product",
    thumbnail = "https://via.placeholder.com/150",
    skus = [],
    brand = "unknown-brand",
  } = product || {};

  const [selectedSku, setSelectedSku] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getBrandLogo = () => {
    const brandData = brands.find(b => b.value === brand);
    return brandData ? brandData.logo : 'https://via.placeholder.com/50';
  };

  const getImagesToShow = () => {
    if (selectedSku) {
      return selectedSku.images.map(image => image.image_path); // Only show images of the selected SKU
    }
    return skus.reduce((acc, sku) => {
      return acc.concat(sku.images.map(image => image.image_path)); // Show all SKU images
    }, [thumbnail]); // Include thumbnail
  };

  const imagesToShow = getImagesToShow();

  const getColorStyle = (skuColor) => {
    const colorObj = colors.find(c => c.value === skuColor);
    return colorObj ? colorObj.gradient : 'bg-gray-300'; 
  };

  const handleColorChange = (sku) => {
    setSelectedSku(sku);
    setCurrentImageIndex(0);
  };

  const handleViewProduct = () => {
    if (product) {
      navigate('/product-main-page', {
        state: { product },
      });
    }
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
    <div className={`relative rounded-lg p-2 border shadow-lg lg:w-72 w-48 h-auto ${darkMode ? 'bg-opacity-10 text-white border-[#bea77f] backdrop-blur-sm' : 'bg-white text-secondary border-gray-300'}`}>
      <div className="relative">
        <img
          src={imagesToShow.length > 0 ? imagesToShow[currentImageIndex] : thumbnail}
          alt={name}
          className="w-full lg:h-48 h-28 object-scale-down"
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
          <RoundIconButton
            icon={ArrowLeft}
            onClick={handlePrevImage}
            size={24}
          />
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
          <RoundIconButton
            icon={ArrowRight}
            onClick={handleNextImage}
            size={24}
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center">
          <h2 className={`lg:text-sm text-xs mb-1 ${darkMode ? 'text-white' : 'text-secondary'}`}>
            {category_name}
          </h2>
          <img src={getBrandLogo()} alt={brand} className="w-10 h-auto" />
        </div>
        <h3 className={`lg:text-xl tracking-tighter font-semibold leading-tight truncate ${darkMode ? 'text-white' : 'text-secondary'}`}>
          {name}
        </h3>
        <p className={`text-xs ${darkMode ? 'text-white' : 'text-secondary'}`}>{description}</p>
      </div>

      <div className="flex items-center mb-2">
        <div className="flex">
          {skus.length > 0 ? skus.map((sku) => (
            <div
              key={sku.id}
              onClick={() => handleColorChange(sku)}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer mr-2 relative`}
              title={sku.color.charAt(0).toUpperCase() + sku.color.slice(1)}
            >
              <div className={`w-full h-full rounded-full ${getColorStyle(sku.color)}`} />
            </div>
          )) : (
            <span className={`text-gray-500`}>No available colors</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:mb-4 mb-1 lg:px-6 px-2">
        <div className="flex justify-between items-center">
          <div>
            <span className={`lg:text-lg font-semibold tracking-tighter ${darkMode ? 'text-white' : 'text-secondary'}`}>
              {selectedSku ? selectedSku.price : skus.length > 0 ? skus[0].price : "0"} PKR
            </span>
            {selectedSku && selectedSku.originalPrice && (
              <span className={`line-through ml-2 text-xs ${darkMode ? 'text-white' : 'text-secondary'}`}>
                {selectedSku.originalPrice} PKR
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Button
            onClick={handleViewProduct}
            text="View"
            iconClass="fas fa-eye"
            buttonColor="bg-[#333] text-white"
          />
          <Button
            onClick={onAddToCart}
            disabled={isAddingToCart}
            loading={isAddingToCart}
            text="Add to Cart"
            iconClass="fas fa-angle-double-right"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
