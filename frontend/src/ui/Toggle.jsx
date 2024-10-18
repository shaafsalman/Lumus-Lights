import React from 'react';

// CustomToggle Component
const Toggle = ({ isActive, onToggle }) => {
  return (
    <div className="flex items-center">
      
      <div
        onClick={onToggle}
        className={`relative inline-flex items-center cursor-pointer w-16 h-8 rounded-full transition-colors duration-200 ${
          isActive ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute left-1 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${
            isActive ? 'translate-x-8' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default Toggle;
