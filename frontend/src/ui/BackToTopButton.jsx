import React from 'react';

const BackToTopButton = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleBackToTop}
      className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
