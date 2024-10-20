import React from 'react';
import { colors, brands } from './../data';

const VerticalSelector = ({
  title,
  items,
  selectedItems,
  onChange,
  showGradient = false,
}) => {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <ul className="pl-4 space-y-2">
        {items.map((item) => (
          <li key={item.value} className="flex items-center cursor-pointer transition-transform duration-200 ease-in-out">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.value)}
                onChange={() => onChange(item.value)}
                className="absolute opacity-0 cursor-pointer" 
                disabled={item.quantity === 0}
              />
              <span
                className={`relative flex items-center h-5 w-5 rounded-full border-2 transition-all duration-200 ease-in-out
                  ${selectedItems.includes(item.value) ? 'border-primary bg-primary' : 'border-gray-400'}
                  ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {selectedItems.includes(item.value) && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.293 8.293a1 1 0 00-1.414 0L10 11.586 7.121 8.707a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l5-5a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </span>
              <span className={`ml-2 flex items-center ${item.quantity === 0 ? 'line-through text-gray-400' : ''}`}>
                {showGradient && item.gradient && (
                  <div className={`w-5 h-5 rounded-full mr-2 ${item.gradient}`} />
                )}
                <span>{item.label}</span>
              </span>
              {item.quantity > 0 && <span className="text-sm ml-2">({item.quantity})</span>}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalSelector;
