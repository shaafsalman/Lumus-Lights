import React from 'react';
import { colors, brands } from './../data';

const VerticalSelector = ({
  title,
  items,
  selectedItems,
  onChange,
  showGradient = false,
  showImage = false,
}) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold">{title}</h4>
      <ul className="pl-4">
        {items.map((item) => (
          <li key={item.value} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.value)}
              onChange={() => onChange(item.value)}
              className="mr-2"
              disabled={item.quantity === 0}
            />
            <span className="flex items-center">
              {showGradient && item.gradient && (
                <div
                  className={`w-5 h-5 rounded-full mr-2 ${item.gradient}`}
                />
              )}
              {showImage && item.logo && (
                <img src={item.logo} alt={item.label} className="w-5 h-5 rounded-full mr-2" />
              )}
              {item.label} {item.quantity > 0 && `(${item.quantity})`} {/* Show quantity */}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalSelector;
