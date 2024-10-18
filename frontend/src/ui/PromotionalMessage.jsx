// src/components/PromotionalMessage.js
import React, { useEffect, useState } from 'react';
import { getPromotionalMessage } from '../CompanyDetails';

const PromotionalMessage = ({ onHide }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const message = getPromotionalMessage();
    if (!message) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {getPromotionalMessage() && (
        <div
          className={`bg-red-600 text-white text-center p-2 fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {getPromotionalMessage()}
        </div>
      )}
    </>
  );
};

export default PromotionalMessage;
