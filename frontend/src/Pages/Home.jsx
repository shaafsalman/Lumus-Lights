import React from 'react';
import ProductShowcase from './Components/ProductShowcase';
import CategoryShowcase from './Components/CategoryShowcase'; // Import the CategoryShowcase component
import productsData from '../data/products.json'; 

const bgImage = "https://light-workdo.myshopify.com/cdn/shop/files/home-banner.png";

const Home = () => {
  // Assuming productsData is the imported JSON data
  const products = productsData;

  const categories = [...new Set(products.map(product => product.productCategory))];

  return (
    <div className="min-h-screen flex flex-col mb-10">
      {/* Product Showcase */}
      <ProductShowcase 
        products={products}
        title="Modern And Minimalist Lamps" 
        description="Lamps are devices that provide artificial light for illumination purposes. They come in various shapes, sizes, and designs, and can be used for both functional and decorative purposes in different settings. Here are some common types of lamps:" 
        backgroundImage={bgImage}
      />

      {/* Category Showcase */}
      <CategoryShowcase 
        categories={categories}
        products={products}
        title="Explore Our Categories"
        description="Browse our wide range of lamps categorized by type and design. Find the perfect lamp for your needs."
        backgroundImage={bgImage}
      />
    </div>
  );
};

export default Home;
