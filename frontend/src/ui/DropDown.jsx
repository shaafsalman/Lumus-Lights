import React from 'react';
import { ArrowDown } from 'lucide-react'; // Using ArrowDown from Lucide React

const DropDown = ({ values, heading = "Color" }) => {
  const defaultValue = values.length > 0 ? values[0] : '';

  return (
    <div className="relative mb-4"> {/* Added margin for spacing */}
      <label className="text-sm block mb-1">{heading}</label>
      <div className="relative">
        <select
          className="w-full p-2 rounded-md border bg-transparent appearance-none lg:text-sm text-xs pl-2 pr-8" // Added padding to left and right
          defaultValue={defaultValue}
          style={{ background: 'transparent' }}
        >
          {values.map((value, index) => (
            <option key={index} value={value} className="bg-transparent">
              {value}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default DropDown;
