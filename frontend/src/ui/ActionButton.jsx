import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner,faPlus } from '@fortawesome/free-solid-svg-icons'; 

const ActionButton = ({ onClick, text, icon = faPlus, className, disabled = false, loading = false ,py = 2,px=4, bg="primary",bgHover="primaryHover",iconClr = "white" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading} 
      className={`
        bg-${bg} 
        ${!disabled && !loading ? `hover:bg-${bgHover}` : ''}
        text-white 
        ${!disabled && !loading ? 'hover:text-white' : 'text-white'}
        font-medium 
        px-${px} 
        py-${py} 
        rounded-md 
        shadow-md 
        focus:outline-none 
        flex 
        items-center 
        space-x-2 
        transition 
        duration-200 
        ${className} 
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
          >
      {loading ? (
        <div className="flex items-center">
          <span className="mr-2">Processing...</span>
          <FontAwesomeIcon icon={faSpinner} className="text-white animate-spin" />
        </div>
      ) : (
        <>
          <FontAwesomeIcon icon={icon} className={`text-${iconClr} }`}          />
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default ActionButton;