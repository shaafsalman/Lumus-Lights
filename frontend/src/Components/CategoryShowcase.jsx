import React, { useState, useEffect } from 'react';
import HollowButton from '../ui/HollowButton';
import ScrollingProductList from './ScrollingProductList'; 
import { useDarkMode } from '../Util/DarkModeContext';
import { useFetchProducts } from '../Util/fetchers';
import Loading from '../ui/Loading';

const CategoryShowcase = ({ 
  title, 
  description, 
  backgroundImage 
}) => {
  const { products, categories, loading } = useFetchProducts();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Category ID
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Automatically set the first available category with products as the default
    const availableCategories = categories.filter(category => 
      products.some(product => product.category_id === category.id)
    );
    if (availableCategories.length > 0) {
      setSelectedCategoryId(availableCategories[0].id);
    }
  }, [categories, products]);

  // Filter products by selected category ID
  const filteredProducts = products.filter(product => product.category_id === selectedCategoryId);

  // Only show categories that have products
  const availableCategories = categories.filter(category => 
    products.some(product => product.category_id === category.id)
  );

  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div 
      className="relative  flex flex-col items-center justify-center h-full w-screen mb-10 bg-secondary "
    >
      <div className={`flex flex-col w-full h-full p-6 md:p-10 ${darkMode ? 'bg-secondary' : 'bg-light'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
          {/* Category Heading */}
          <h1 className={`text-3xl md:text-4xl font-bold text-center md:text-left ${darkMode ? 'text-light' : 'text-secondary'}`}>
            {title}
          </h1>
          
          {/* Hollow Buttons for Categories */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:flex md:space-x-4 gap-2 md:gap-0 py-2 w-full md:w-auto ">
            {availableCategories.map((category) => (
              <HollowButton
                key={category.id}
                text={category.name}
                onClick={() => setSelectedCategoryId(category.id)}
                isActive={selectedCategoryId === category.id} 
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
          <ScrollingProductList products={filteredProducts} productsPerRow={5} />
        ) : (
          <p className="text-lg text-center">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryShowcase;
