import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RoundButton = ({ onClick, icon, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-primary transition p-2 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <FontAwesomeIcon icon={icon} className="text-white" />
    </button>
  );
};

export default RoundButton;
