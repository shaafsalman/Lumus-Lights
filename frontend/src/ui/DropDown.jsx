import React from 'react';

const DropDown = ({ values, heading="Color" }) => {
  const defaultValue = values.length > 0 ? values[0] : '';

  return (
    <div>
      <label className="block text-xs mb-1">{heading}</label>
      <div className="relative">
        <select
          className="w-full text-white p-1.5 rounded-md border border-white bg-transparent appearance-none lg:text-sm text-xs"
          defaultValue={defaultValue}
        >
          {values.map((value, index) => (
            <option key={index} value={value} className="bg-black text-white">
              {value}
            </option>
          ))}
        </select>
        {/* Custom Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
