import React from 'react';
import { ArrowDown } from 'lucide-react'; // Using ArrowDown from Lucide React

const DropDown = ({ values, heading = "Color" }) => {
  const defaultValue = values.length > 0 ? values[0] : '';

  return (
    <div className="">
      <label className=" text-sm ">{heading}</label>
      <div className="relative">
        <select
          className="w-full p-2 rounded-md border bg-transparent appearance-none lg:text-sm text-xs mx-4"
          defaultValue={defaultValue}
          style={{ background: 'transparent' }}
        >
          {values.map((value, index) => (
            <option key={index} value={value} className="bg-transparent ">
              {value}
            </option>
          ))}
        </select>
        {/* Custom Arrow using Lucide React */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ArrowDown className="w-4 h-4 " />
        </div>
      </div>
    </div>
  );
};

export default DropDown;
