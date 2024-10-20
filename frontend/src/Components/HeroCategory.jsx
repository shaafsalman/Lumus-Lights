import React, { useState, useEffect } from 'react';
import HollowButton from '../ui/HollowButton';
import Loading from '../ui/Loading'; 
import { useDarkMode } from '../Util/DarkModeContext';
import { useFetchProducts } from '../Util/fetchers';
import Button from '../ui/Button';

const HeroCategory = () => {
  const { products, categories, loading } = useFetchProducts();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [heroImageLeft, setHeroImageLeft] = useState("https://light-workdo.myshopify.com/cdn/shop/files/more-cat-img1_4e2410ed-9006-4294-b26a-98f0e1f64fb9.png?v=1681820620");
  const [heroImageRight, setHeroImageRight] = useState("https://light-workdo.myshopify.com/cdn/shop/files/more-cat-img2.png?v=1681812884");
  const [heroTitle, setHeroTitle] = useState("Unveiling Beauty Of Light");
  const [heroDescription, setHeroDescription] = useState(
    "Lighting is the deliberate use of artificial or natural sources of light to illuminate spaces, objects, or subjects. It plays a crucial role in creating ambiance, setting the mood, and enhancing visibility in various environments."
  );
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const availableCategories = categories.filter(category => 
      products.some(product => product.category_id === category.id)
    );
    if (availableCategories.length > 0) {
      setSelectedCategoryId(availableCategories[0].id);
    }
  }, [categories, products]);

  const filteredProducts = products.filter(product => product.category_id === selectedCategoryId);
  const availableCategories = categories.filter(category => 
    products.some(product => product.category_id === category.id)
  );

  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div className="flex flex-col md:flex-row mt-8 px-10 py-10 h-full w-screen">
      <div className="w-full md:w-1/3 ">
        <img 
          src={heroImageLeft} 
          alt="Left lamp"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="centerContainer w-screen md:w-2/3">
        <div className="w-3/4 text-left p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-base md:text-lg mb-8 pr-0 lg:pr-20">
            {heroDescription}
          </p>

          <div className="flex flex-col items-start gap-4 mb-8">
            {availableCategories.map(category => (
              <HollowButton 
                key={category.id} 
                onClick={() => setSelectedCategoryId(category.id)}
                text={category.name}
              />
            ))}
          </div>

          <Button text="All Products" widthClass="w-4/4 lg:w-2/4" /> 
        </div>
      </div>
      
      <div className="hidden md:block absolute right-10 transform -translate-y-56">
        <img 
          src={heroImageRight} 
          alt="Right lamp"
          className="w-96 h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default HeroCategory;
