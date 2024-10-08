import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RoundButton = ({ onClick, icon, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-auto m-2 flex items-center justify-center rounded-md bg-primary hover:bg-primary transition p-2 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <FontAwesomeIcon icon={icon} className="text-white" />
    </button>
  );
};

export default RoundButton;
