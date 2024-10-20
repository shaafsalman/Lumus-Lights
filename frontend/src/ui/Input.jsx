import React from 'react';
import { useDarkMode } from '../Util/DarkModeContext';

const Input = ({ id, label, type, value, onChange, required = false, isTextArea = false }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className="mb-4">
      <label htmlFor={id} className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-black'}`}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          className={`w-full p-3 border rounded transition duration-200 ${darkMode ? 'border-primary bg-secondary text-white' : 'border-primary bg-white text-black'}`}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`w-full p-3 border rounded transition duration-200 ${darkMode ? 'border-primary bg-secondary text-white' : 'border-primary bg-white text-black'}`}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default Input;
