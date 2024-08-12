import React, { useState } from 'react';
import HollowButton from '../Cells/HollowButton';
import ScrollingProductList from '../Components/ScrollingProductList'; 
import {useDarkMode } from '../Util/DarkModeContext';

const CategoryShowcase = ({ 
  categories, 
  products, 
  title, 
  description, 
  backgroundImage 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
  const filteredProducts = products.filter(product => product.productCategory === selectedCategory);

  return (
    <div className="relative bg-black flex flex-col items-center justify-center text-white bg-center h-screen w-screen mb-10">
      <div className="flex flex-col w-full h-full bg-opacity-50 p-10 rounded-lg">
        <div className="flex flex-row justify-between items-center mb-8">
          {/* Category Heading */}
          <h1 className="text-4xl font-bold">{title}</h1>
          
          {/* Hollow Buttons for Categories */}
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((category, index) => (
              <HollowButton
                key={index}
                text={category}
                onClick={() => setSelectedCategory(category)}
                isActive={selectedCategory === category}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="mb-8">{description}</p>
        
        {/* Products of Selected Category */}
        {filteredProducts.length > 0 ? (
          <ScrollingProductList products={filteredProducts} productsPerRow={4}/>
        ) : (
          <p className="text-lg">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryShowcase;
