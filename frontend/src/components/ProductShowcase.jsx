import React from 'react';
import ProductCard from '../Cards/ProductCard';
import Button from '../Cells/button';

const ProductShowcase = ({ 
  products, 
  title, 
  description, 
  backgroundImage 
}) => {
  return (
    <div 
      className="flex items-center justify-center text-white bg-center h-screen w-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-row w-full h-full bg-opacity-50 p-10 rounded-lg">
        <div className="flex flex-col justify-center w-2/3 p-12">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="mb-8">{description}</p>
          <div className="mb-8 w-max">
            <Button text='All Products' />
          </div>
        </div>
        <div className="flex items-center gap-4 overflow-x-auto w-2/3 p-5">
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-72">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
