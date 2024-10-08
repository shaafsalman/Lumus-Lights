// Input.jsx
import React from 'react';

const Input = ({ id, label, type, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full p-3 border border-gray-300 rounded"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
