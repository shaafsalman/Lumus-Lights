import React, { useState } from 'react';
import ProductShowcase from '../Components/ProductShowcase';

const bgImage = "https://light-workdo.myshopify.com/cdn/shop/files/home-banner.png";

const Home = () => {
  const [isAddingToCart1, setIsAddingToCart1] = useState(false);
  const [isAddingToCart2, setIsAddingToCart2] = useState(false);

  const handleAddToCart1 = () => {
    setIsAddingToCart1(true);
    setTimeout(() => {
      alert('Added to cart!');
      setIsAddingToCart1(false);
    }, 2000);
  };

  const handleAddToCart2 = () => {
    setIsAddingToCart2(true);
    setTimeout(() => {
      alert('Added to cart!');
      setIsAddingToCart2(false);
    }, 2000);
  };

  const products = [
    {
      discount: 33,
      productImage: "https://light-workdo.myshopify.com/cdn/shop/products/nymane-work-lamp-w-charging-led-bulb-anthracite__0991757_pe819571_s5-removebg-preview_600x600.png",
      productTitle: "Work Lamp With...",
      productCategory: "GENERIC",
      productType: "FOOR LAMPS",
      availableColors: ['Black', 'White', 'Gold'],
      currentPrice: "20.00",
      originalPrice: "30.00",
      onAddToCart: handleAddToCart1,
      isAddingToCart: isAddingToCart1,
    },
    {
      discount: null,
      productImage: "https://light-workdo.myshopify.com/cdn/shop/products/nymane-work-lamp-w-charging-led-bulb-anthracite__0991757_pe819571_s5-removebg-preview_600x600.png",
      productTitle: "Work Lamp Light Blue",
      productCategory: "IKEA",
      productType: "FOOR LAMPS",
      availableColors: ['White', 'Blue', 'Black'],
      currentPrice: "12.00",
      originalPrice: null,
      onAddToCart: handleAddToCart2,
      isAddingToCart: isAddingToCart2,
    }
  ];

  return (
    <div className=" min-h-screen flex flex-col">
    
      <ProductShowcase 
      products={products}
      title = "Modern And Minimalist Lamps" 
      description= "Lamps are devices that provide artificial light for illumination purposes. They come in various shapes, sizes, and designs, and can be used for both functional and decorative purposes in different settings. Here are some common types of lamps:" 
      backgroundImage = {bgImage}
       />
    </div>
  );
};

export default Home;
