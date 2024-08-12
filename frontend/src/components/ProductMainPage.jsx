import React from 'react';
import { FaStar, FaShareAlt, FaHeart } from 'react-icons/fa';

const ProductMainPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        {/* Product Image and Gallery */}
        <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
          <div className="relative">
            <div className="product-main-slider">
              {/* Add your slider implementation here */}
              <div className="slider-item">
                <img
                  src="https://light-workdo.myshopify.com/cdn/shop/products/nymane-work-lamp-with-wireless-charging-white__0991755_pe819570_s5-removebg-preview.png?v=1680784639"
                  alt="Work Lamp"
                  className="w-full h-auto"
                />
              </div>
              {/* Add more slider items here */}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-2">Work Lamp With Wireless Charging White</h3>
              <span className="text-sm text-gray-500">Floor lamps</span>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-yellow-500 flex items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="ml-2 text-gray-500">No reviews</span>
            </div>
            <p className="mb-4">
              This work lamp's flexible gooseneck arm and cone-shaped shade give it a bold retro feel. But behind the bright red surface lies modern technology –...
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-500 hover:underline mb-4"
            >
              <FaShareAlt className="mr-2" />
              See Sizing Guide
            </a>
            <div className="mb-4">
              <label className="block mb-2">Color:</label>
              <select className="form-select block w-full">
                <option>Black</option>
                <option>White</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">20.00 USD</span>
              <span className="line-through text-gray-500">30.00 USD</span>
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
              <FaHeart className="mr-2" />
              Add to Wishlist
            </button>
          </div>
        </div>

        {/* Additional Info and Social Icons */}
        <div className="w-full lg:w-1/4 px-4">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">More Info:</h4>
            <p className="mb-2">SKU: <span className="font-medium">9823124654698</span></p>
            <p className="mb-2">Category: <span className="font-medium">Generic</span></p>
            <p>Color: <span className="font-medium">Black</span></p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Share:</h4>
            <div className="flex space-x-4">
              <a href="//pinterest.com/pin/create/button/?url=https://light-workdo.myshopify.com/products/work-lamp-with-wireless-charging-white" target="_blank" rel="noopener noreferrer">
                <FaShareAlt />
              </a>
              <a href="//www.facebook.com/sharer.php?u=https://light-workdo.myshopify.com/products/work-lamp-with-wireless-charging-white" target="_blank" rel="noopener noreferrer">
                <FaShareAlt />
              </a>
              <a href="//instagram.com/share?text=Work%20Lamp%20With%20Wireless%20Charging%20White&url=https://light-workdo.myshopify.com/products/work-lamp-with-wireless-charging-white" target="_blank" rel="noopener noreferrer">
                <FaShareAlt />
              </a>
              <a href="//twitter.com/share?text=Work%20Lamp%20With%20Wireless%20Charging%20White&url=https://light-workdo.myshopify.com/products/work-lamp-with-wireless-charging-white" target="_blank" rel="noopener noreferrer">
                <FaShareAlt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainPage;
