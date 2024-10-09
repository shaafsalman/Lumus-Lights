// Input.jsx
import React from 'react';
import { useDarkMode } from '../Util/DarkModeContext';

const Input = ({ id, label, type, value, onChange, required = false }) => {
  const { darkMode } = useDarkMode(); // Get dark mode state

  return (
    <div className="mb-4">
      <label htmlFor={id} className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-black'}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full p-3 border rounded transition duration-200 ${darkMode ? 'border-primary bg-secondary text-white' : 'border-primary bg-white text-black'}`}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
