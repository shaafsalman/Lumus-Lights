import React, { useState } from 'react';
import HollowButton from '../../Cells/HollowButton';
import ScrollingProductList from './ScrollingProductList'; 
import { useDarkMode } from '../../Util/DarkModeContext';

const CategoryShowcase = ({ 
  categories, 
  products, 
  title, 
  description, 
  backgroundImage 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
  const filteredProducts = products.filter(product => product.productCategory === selectedCategory);
  const { darkMode } = useDarkMode();

  return (
    <div 
      className="relative flex flex-col items-center justify-center h-full w-screen mb-10 bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={`flex flex-col w-full h-full bg-opacity-50 p-6 md:p-10 rounded-lg ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
          {/* Category Heading */}
          <h1 className={`text-3xl md:text-4xl font-bold text-center md:text-left ${darkMode ? 'text-white' : 'text-secondary'}`}>
            {title}
          </h1>
          
          {/* Hollow Buttons for Categories */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:flex md:space-x-4 gap-2 md:gap-0 py-2 w-full md:w-auto">
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
        <p className={`text-center md:text-left text-sm md:text-base mb-6 md:mb-8 px-4 md:px-0 ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>
          {description}
        </p>
        
        {/* Products of Selected Category */}
        {filteredProducts.length > 0 ? (
          <ScrollingProductList products={filteredProducts} productsPerRow={3} />
        ) : (
          <p className="text-lg text-center">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryShowcase;
