import React, { useState, useRef, useEffect } from 'react';
import ProductCard from '../Cards/ProductCard';
import RoundIconButton from '../ui/RoundIconButton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ScrollingProductList = ({ products, productsPerRow = 3 }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const productWidth = useRef(300); 
  const gap = 8; 

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
      <RoundIconButton
        onClick={() => handleScroll(-1)}
        icon={ArrowLeft}
        disabled={scrollPosition === 0}
        className="absolute left-0 z-10 md:p-2 p-1"
        size={40} 
      />

      <div className="relative overflow-hidden w-full flex justify-center">
        <div ref={containerRef} className="flex overflow-x-hidden">
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
      <RoundIconButton
        onClick={() => handleScroll(1)}
        icon={ArrowRight}
        className="absolute right-0 z-10 md:p-2 p-1"
        size={40} 
      />
    </div>
  );
};

export default ScrollingProductList;
