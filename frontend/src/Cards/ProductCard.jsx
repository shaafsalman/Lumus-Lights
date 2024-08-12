import React from 'react';
import Button from '../Cells/button';
import DropDown from '../Cells/DropDown';

const ProductCard = ({ product, onAddToCart, onViewProduct, isAddingToCart = false }) => {
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

  return (
    <div className="relative bg-opacity-10 text-white rounded-lg p-2 border border-[#bea77f] shadow-lg w-72 h-auto backdrop-blur-sm">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-sm tracking-tighter px-2 py-1 rounded-full text-[#bea77f]">
          -{discount}%
        </div>
      )}

      {/* Product Image */}
      <img
        src={productImage}
        alt={productTitle}
        className="w-full h-48 object-scale-down mb-4 rounded"
      />

      {/* Product Details */}
      <div className="mb-4">
        <h2 className="text-sm text-white mb-1">{productCategory}</h2>
        <h3 className="text-xl tracking-tighter font-semibold leading-tight truncate">
          {productTitle}
        </h3>
        <p className="text-xs text-white">{productType}</p>
      </div>

      {/* Color Selection */}
      <div className="mb-4">
        <DropDown values={availableColors} />
      </div>

      {/* Price and Buttons */}
      <div className="flex flex-col gap-2 mb-4 px-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold tracking-tighter ">{currentPrice} PKR</span>
            {originalPrice && (
              <span className="text-white line-through ml-2 text-sm">
                {originalPrice} PKR
              </span>
            )}
          </div>
        </div>
        
        {/* Full-Width Buttons */}
        <div className="w-full flex flex-col-2 gap-1">
          <Button
            onClick={onViewProduct}
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
