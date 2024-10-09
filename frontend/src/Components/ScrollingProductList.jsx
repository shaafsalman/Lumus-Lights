import React, { useState, useRef, useEffect } from 'react';
import ProductCard from '.././Cards/ProductCard';
import RoundButton from '.././ui/RoundButton';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 

const ScrollingProductList = ({ products, productsPerRow = 3 }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const productWidth = useRef(300); 
  const gap = 2; 

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition, products.length]);

  const handleScroll = (direction) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxScroll = Math.max(0, productWidth.current * Math.ceil(products.length / productsPerRow) - containerWidth);
    const newPosition = scrollPosition + direction * (productWidth.current + gap);
    setScrollPosition(prev => Math.min(Math.max(0, newPosition), maxScroll));
  };

  const visibleProducts = products.slice(0, productsPerRow); 

  return (
    <div className="relative flex items-center justify-center">
      {/* Left Arrow */}
      <RoundButton
        onClick={() => handleScroll(-1)}
        icon={faArrowLeft}
        disabled={scrollPosition === 0}
        className="absolute left-0 z-10" // Positioning the button over the first card
      />

      <div className="relative overflow-hidden w-full flex justify-center">
        <div 
          ref={containerRef}
          className="flex overflow-x-hidden"
        >
          <div 
            className="flex flex-nowrap"
            style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s ease' }}
          >
            {visibleProducts.map((product, index) => (
              <div key={index} className="flex-shrink-0" style={{ width: productWidth.current, marginRight: gap }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <RoundButton
        onClick={() => handleScroll(1)}
        icon={faArrowRight}
        className="absolute right-0 z-10" 
      />
    </div>
  );
};

export default ScrollingProductList;
