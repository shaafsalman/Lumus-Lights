import React from 'react';
import Button from '../ui/Button';
import ScrollingProductList from './ScrollingProductList';
import { useFetchProducts } from '../Util/fetchers';
import Loading from '../ui/Loading';

const ProductShowcase = ({ 
  title, 
  description, 
  backgroundImage 
}) => {
  const { products, loading } = useFetchProducts();

  const sortedProducts = [...products].sort((a, b) => b.quantitySold - a.quantitySold);

  if (loading) {
    return <Loading all={true}/>; 
  }

  return (
    <div 
      className="flex flex-col items-center text-white bg-center bg-cover w-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl bg-opacity-50 px-12 py-4 md:p-8">
        {/* Left Column for Title, Description, and Button */}
        <div className="flex flex-col justify-center w-full md:w-1/3 text-left mb-4 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-left">{title}</h1>
          <p className="text-sm md:text-base mb-4">{description}</p>
          <div className="flex justify-end">
            <Button text='All Products' />
          </div>
        </div>

        {/* Right Column for Scrolling Product List */}
        <div className="w-full md:w-2/3">
          {sortedProducts.length > 0 ? (
            <ScrollingProductList products={sortedProducts} productsPerRow={2} />
          ) : (
            <p className="text-sm md:text-lg">No products available.</p>
          )}
        </div>
      </div>

      {/* Gradient Fade at the Bottom */}
      <div className="w-full h-16 md:h-24 bg-gradient-to-t from-secondary to-transparent"></div>
    </div>
  );
};

export default ProductShowcase;
