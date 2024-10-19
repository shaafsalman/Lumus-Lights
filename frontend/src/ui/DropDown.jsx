import React from 'react';
import { ChevronDown } from 'lucide-react'; // Lucide React Icon

const DropDown = ({ values, heading = "Color" }) => {
  const defaultValue = values.length > 0 ? values[0] : '';

  return (
    <div>
      <label className="block text-md mb-1">{heading}</label>
      <div className="relative">
        <select
          className="w-full p-1.5 rounded-md border bg-transparent  uppercase appearance-none lg:text-sm text-xs"
          defaultValue={defaultValue}
          style={{ background: 'transparent' }} // Transparent background
        >
          {values.map((value, index) => (
            <option key={index} value={value} className="bg-transparent text-black">
              {value}
            </option>
          ))}
        </select>
        {/* Custom Arrow using Lucide React */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default DropDown;
