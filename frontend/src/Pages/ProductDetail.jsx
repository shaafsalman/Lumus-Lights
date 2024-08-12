import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Product Detail</h1>
      <p className="mt-4">Details for product ID: {id}</p>
    </div>
  );
};

export default ProductDetail;
