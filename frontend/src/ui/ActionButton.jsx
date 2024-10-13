import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons'; // Default FontAwesome icon

const ActionButton = ({
  onClick,
  text,
  icon = faPlus,
  className = '',
  disabled = false,
  loading = false,
  py = 2,
  px = 4,
  bg = 'bg-primary', // Adjusted to use Tailwind class names directly
  bgHover = 'hover:bg-primaryHover', // Adjusted to use Tailwind class names directly
  iconClr = 'text-white', // Adjusted to use Tailwind class names directly
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-auto
        ${bg} 
        ${bgHover} 
        ${disabled || loading ? 'bg-gray-600 text-white' : 'text-white hover:text-dark-secondary'}
        font-medium 
        ${`px-${px}`} 
        ${`py-${py}`} 
        rounded-md 
        shadow-md 
        focus:outline-none 
        flex 
        items-center 
        justify-center
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
          {React.isValidElement(icon) ? (
            // If the icon is a valid React element (Lucide)
            <span className="text-current">{icon}</span>
          ) : (
            // Otherwise, render FontAwesome icon
            <FontAwesomeIcon icon={icon} className={iconClr} />
          )}
          <span className="ml-2">{text}</span>
        </>
      )}
    </button>
  );
};

export default ActionButton;
