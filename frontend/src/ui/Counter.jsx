import React from 'react';
import { Plus, Minus } from 'lucide-react'; // Import Lucide React icons



const Counter = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center border  p-1 rounded-md">
      <button 
        onClick={onDecrease} 
        className="flex items-center justify-center w-8 h-8 transition-colors duration-200"
        disabled={quantity <= 0} 
      >
        <Minus size={16} />
      </button>

      <span className="mx-4 text-lg font-semibold">{quantity}</span>

      <button 
        onClick={onIncrease} 
        className="flex items-center justify-center w-8 h-8 transition-colors duration-200"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default Counter;
