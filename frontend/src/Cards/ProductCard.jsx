import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../Cells/Button';
import DropDown from '../Cells/DropDown';
import { useDarkMode } from '../Util/DarkModeContext.jsx';

const ProductCard = ({ product, onAddToCart, isAddingToCart = false }) => {
  const navigate = useNavigate();  
  const { darkMode } = useDarkMode();

  const {
    discount = null,
    productImage = "https://light-workdo.myshopify.com/cdn/shop/products/nymane-work-lamp-w-charging-led-bulb-anthracite__0991757_pe819571_s5-removebg-preview_600x600.png",
    productTitle = "Default Product Title",
    productCategory = "Default Category",
    productType = "Default Type",
    availableColors = ["Default Color"],
    currentPrice = "0.00",
    originalPrice = null,
  } = product;

  const handleViewProduct = () => {
    navigate('/product-main-page', {
      state: { product } 
    });
  };

  return (
    <div className={`relative rounded-lg p-2 border shadow-lg lg:w-72  w-48 h-auto ${darkMode ? 'bg-opacity-10 text-white border-[#bea77f] backdrop-blur-sm' : 'bg-white text-secondary border-gray-300'}`}>
      {/* Discount Badge */}
      {discount && (
        <div className={`absolute font-bold top-2 left-2 text-sm tracking-tighter px-2 py-1 rounded-full ${darkMode ? 'bg-black bg-opacity-70 text-[#bea77f]' : 'bg-yellow-400 text-black'}`}>
          -{discount}%
        </div>
      )}

      {/* Product Image */}
      <img
        src={productImage}
        alt={productTitle}
        className="w-full lg:h-48 h-28 object-scale-down"
      />

      {/* Product Details */}
      <div className="mb-2">
        <h2 className={`lg:text-sm text-xs mb-1 ${darkMode ? 'text-white' : 'text-secondary'}`}>{productCategory}</h2>
        <h3 className={`lg:text-xl  tracking-tighter font-semibold leading-tight truncate ${darkMode ? 'text-white' : 'text-secondary'}`}>
          {productTitle}
        </h3>
        <p className={`text-xs ${darkMode ? 'text-white' : 'text-secondary'}`}>{productType}</p>
      </div>

      {/* Color Selection */}
      <div className="lg:mb-4 mb-2">
        <DropDown values={availableColors} />
      </div>

      {/* Price and Buttons */}
      <div className="flex flex-col gap-2 lg:mb-4 mb-1 lg:px-6 px-2">
        <div className="flex justify-between items-center">
          <div>
            <span className={`lg:text-lg  font-semibold tracking-tighter ${darkMode ? 'text-white' : 'text-secondary'}`}>{currentPrice} PKR</span>
            {originalPrice && (
              <span className={`line-through ml-2 text-xs ${darkMode ? 'text-white' : 'text-secondary'}`}>
                {originalPrice} PKR
              </span>
            )}
          </div>
        </div>
        
        {/* Full-Width Buttons */}
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
