import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShareAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductMainPage = () => {
  const { state } = useLocation();  
  const { product } = state || {};  

  if (!product) {
    return <div>No product data found.</div>;
  }

  const {
    productImage = "https://light-workdo.myshopify.com/cdn/shop/products/nymane-work-lamp-with-wireless-charging-white__0991755_pe819570_s5-removebg-preview.png?v=1680784639",
    productTitle = "Default Product Title",
    productCategory = "Default Category",
    productDescription = "Default Description",
    availableColors = ["Default Color"],
    currentPrice = "0.00",
    originalPrice = null,
    sku = "0000000000000"
  } = product;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        {/* Product Image and Gallery */}
        <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
          <div className="relative">
            <div className="product-main-slider">
              <div className="slider-item">
                <img
                  src={productImage}
                  alt={productTitle}
                  className="w-full h-auto"
                />
              </div>
              {/* Add more slider items if needed */}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-2">{productTitle}</h3>
              <span className="text-sm text-gray-500">{productCategory}</span>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-yellow-500 flex items-center">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
              <span className="ml-2 text-gray-500">No reviews</span>
            </div>
            <p className="mb-4">{productDescription}</p>
            <a
              href="#"
              className="inline-flex items-center text-blue-500 hover:underline mb-4"
            >
              <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
              See Sizing Guide
            </a>
            <div className="mb-4">
              <label className="block mb-2">Color:</label>
              <select className="form-select block w-full">
                {availableColors.map(color => (
                  <option key={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">{currentPrice} USD</span>
              {originalPrice && (
                <span className="line-through text-gray-500">{originalPrice} USD</span>
              )}
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-2">Quantity:</span>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 px-2 py-1 border border-gray-300 rounded"
              />
            </div>
            <button className="btn-primary flex items-center">
              Add to Cart
            </button>
            <button className="btn-secondary mt-2 flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Add to Wishlist
            </button>
          </div>
        </div>

        {/* Additional Info and Social Icons */}
        <div className="w-full lg:w-1/4 px-4">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">More Info:</h4>
            <p className="mb-2">SKU: <span className="font-medium">{sku}</span></p>
            <p className="mb-2">Category: <span className="font-medium">{productCategory}</span></p>
            <p>Color: <span className="font-medium">{availableColors.join(', ')}</span></p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Share:</h4>
            <div className="flex space-x-4">
              <a href={`//pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faShareAlt} />
              </a>
              <a href={`//www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faShareAlt} />
              </a>
              <a href={`//instagram.com/share?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faShareAlt} />
              </a>
              <a href={`//twitter.com/share?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faShareAlt} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainPage;
