import React from 'react';
import { colors } from '../data';

const ColorSelector = ({ items, selectedItem, onItemSelect }) => {
  
  const getColorStyle = (colorValue) => {
    const colorObject = colors.find(color => color.value === colorValue);
    return colorObject ? colorObject.gradient : 'bg-gray-200'; 
  };

  return (
    <div className="flex mb-2">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={`w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer mr-2 relative`}
          title={item.color.charAt(0).toUpperCase() + item.color.slice(1)}
        >
          <div className={`w-full h-full rounded-full ${getColorStyle(item.color)}`} />
          {selectedItem && selectedItem.id === item.id && (
            <div className="absolute inset-0 rounded-full ring-2 ring-blue-500" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
