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
  // Use the custom hook to fetch products
  const { products, loading } = useFetchProducts();

  // Sort products in descending order based on quantitySold
  const sortedProducts = [...products].sort((a, b) => b.quantitySold - a.quantitySold);

  if (loading) {
    return <Loading/>; 
  }

  return (
    <div 
      className="flex flex-col items-center text-white bg-center bg-cover h-screen w-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col lg:mt-8 md:flex-row w-full max-w-screen-xl mx-auto bg-opacity-50 p-6 md:p-2 rounded-lg">
        <div className="flex flex-col justify-center w-full md:w-1/3 text-left md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{title}</h1>
          <p className="text-sm md:text-base mb-4 md:mb-8">{description}</p>
          <div className="mb-4 md:mb-8">
            <Button text='All Products' />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          {sortedProducts.length > 0 ? (
            <ScrollingProductList products={sortedProducts} productsPerRow={2} />
          ) : (
            <p className="text-sm md:text-lg">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
