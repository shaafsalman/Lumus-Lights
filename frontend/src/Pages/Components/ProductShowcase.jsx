import React from 'react';
import ProductCard from '../../Cards/ProductCard';
import Button from '../../Cells/Button';
import ScrollingProductList from './ScrollingProductList';

const ProductShowcase = ({ 
  products, 
  title, 
  description, 
  backgroundImage 
}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center text-white bg-center bg-cover h-screen w-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col md:flex-row w-full h-full bg-opacity-50 p-10 rounded-lg">
        <div className="flex flex-col justify-center w-full md:w-1/3 p-12 md:p-16 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="mb-8">{description}</p>
          <div className="mb-8">
            <Button text='All Products' />
          </div>
        </div>
        <div className="w-full md:w-2/3 ">
          {products.length > 0 ? (
            <ScrollingProductList products={products} productsPerRow={2} />
          ) : (
            <p className="text-lg">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
