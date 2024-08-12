import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShareAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import DropDown from '../../Cells/DropDown';
import Button from '../../Cells/Button';
import { faFacebookF, faInstagram, faPinterestP, faWhatsapp } from '@fortawesome/free-brands-svg-icons';



const ProductImageDisplay = ({ productImage, productTitle }) => {
  return (
    <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
      <div className="relative">
        <img
          src={productImage}
          alt={productTitle}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};


const ProductDetails = ({
  productTitle,
  productCategory,
  productDescription="This work lamp's flexible gooseneck arm and cone-shaped shade give it a bold retro feel. But behind the bright red surface lies modern technology – a built-in and energy-efficient LED bulb. You can easily direct the light where you like since the flexible gooseneck arm can be bent and angled – perfect It is useful when it's time for homework, arts and crafts or cuddling up with a good book. Package(s):1x Digital Shoppy LED work lamp, White/brass-colour.",
  availableColors,
  currentPrice,
  originalPrice
}) => {

  const currentUrl = encodeURIComponent(window.location.href);
  const productTitleLink = encodeURIComponent(productTitle); 
  return (
    <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0 ">
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

        <DropDown values={availableColors} />

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold">{currentPrice} PKR</span>
          {originalPrice && (
            <span className="line-through text-gray-500">{originalPrice} PKR</span>
          )}
        </div>
        <div className="w-full flex flex-col-2 gap-1">
          <Button
            text="View"
            iconClass="fas fa-eye"
            buttonColor="bg-[#333] text-white"
          />
           <Button
            text="Add to Cart"
            iconClass="fas fa-angle-double-right"
          />
         
        </div>
        <div>
        <h4 className="text-lg font-semibold mb-2">Share:</h4>
        <div className="flex space-x-4">
          <a href={`https://www.facebook.com/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
            <FontAwesomeIcon icon={faFacebookF} className="text-primary" />
          </a>
          <a href={`https://www.instagram.com/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
            <FontAwesomeIcon icon={faInstagram} className="text-primary" />
          </a>
          <a href={`https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${productTitleLink}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest">
            <FontAwesomeIcon icon={faPinterestP} className="text-primary" />
          </a>
          <a href={`https://api.whatsapp.com/send?text=${productTitleLink}%20${currentUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} className="text-primary" />
          </a>
        </div>
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
    productImage,
    productTitle,
    productCategory,
    productDescription,
    availableColors,
    currentPrice,
    originalPrice,
    sku
  } = product;

  return (
    <div className="container mx-auto px-10 py-8">
      <div className="flex flex-wrap">
        <ProductDetails
          productTitle={productTitle}
          productCategory={productCategory}
          productDescription={productDescription}
          availableColors={availableColors}
          currentPrice={currentPrice}
          originalPrice={originalPrice}
        />
        <ProductImageDisplay productImage={productImage} productTitle={productTitle} />
    
      </div>
    </div>
  );
};

export default ProductMainPage;
