import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`relative w-16 h-8 bg-gray-300 rounded-full transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-gray-300'}`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${checked ? 'translate-x-8' : ''}`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-between px-2 text-md text-gray-600 transition-opacity duration-300 ${checked ? 'opacity-0' : 'opacity-100'}`}
        >
          <i className="fas fa-sun"></i>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-between px-2 text-lg text-gray-600 transition-opacity duration-300 ${checked ? 'opacity-100' : 'opacity-0'}`}
        >
          <i className="fas fa-moon"></i>
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
