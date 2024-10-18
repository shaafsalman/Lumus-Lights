import React, { useEffect, useState } from 'react';
import ProductShowcase from '../../Components/ProductShowcase';
import CategoryShowcase from '../../Components/CategoryShowcase'; 
import productsData from '../../data/products.json'; 
import { fetchPromotionalImages } from '../../Util/fetchers';
import PopUpImage from '../../ui/PopUpImage';

const bgImage = "https://light-workdo.myshopify.com/cdn/shop/files/home-banner.png";

const Home = () => {
  const products = productsData;
  const categories = [...new Set(products.map(product => product.productCategory))];
  const [promotionalImages, setPromotionalImages] = useState([]);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const loadPromotionalImages = async () => {
      try {
        const data = await fetchPromotionalImages();
        const activeImages = data.images.filter(image => image.active === 1);
        setPromotionalImages(activeImages); 
        setShowImages(activeImages.length > 0);

        const timer = setTimeout(() => {
          setShowImages(false);
        }, 5000); 

        return () => clearTimeout(timer); 
      } catch (error) {
        console.error('Error fetching promotional images:', error);
      }
    };

    loadPromotionalImages();
  }, []);

  const handleClose = () => {
    setShowImages(false);
  };

  return (
    <div className="w-screen flex flex-col">
      {/* Promotional Images Modal */}
      {showImages && promotionalImages.length > 0 && (
        <PopUpImage images={promotionalImages} onClose={handleClose} />
      )}

      <ProductShowcase 
        products={products}
        title="Modern And Minimalist Lamps" 
        description="Lamps are devices that provide artificial light for illumination purposes. They come in various shapes, sizes, and designs, and can be used for both functional and decorative purposes in different settings. Here are some common types of lamps:" 
        backgroundImage={bgImage}
      />

      <CategoryShowcase 
        categories={categories}
        products={products}
        title="Explore Our Categories"
        description="Browse our wide range of lamps categorized by type and design. Find the perfect lamp for your needs."
      />
    </div>
  );
};

export default Home;
