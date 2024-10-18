import React from 'react';

const RoundIconButton = ({ icon: Icon, onClick, size = 30, className = '' }) => {
  return (
    <button
      className={`text-white bg-gray-900 rounded-full p-3 hover:bg-gray-700 transition-colors ${className}`}
      onClick={onClick}
    >
      <Icon size={size} />
    </button>
  );
};

export default RoundIconButton;
