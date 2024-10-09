// Dropdown.jsx
import React from 'react';
import { useDarkMode } from '../Util/DarkModeContext';

const Dropdown = ({ id, label, options, value, onChange, required = false }) => {
  const { darkMode } = useDarkMode(); // Get dark mode state

  return (
    <div className="mb-4">
      <label htmlFor={id} className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
        {label}
      </label>
      <select
        id={id}
        className={`w-full p-3.5 border rounded transition duration-200 ${
          darkMode ? 'border-primary bg-secondary text-white' : 'border-primary bg-white text-black'
        }`}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
