import React from 'react';
import { useDarkMode } from '../Util/DarkModeContext';

const HollowButton = ({
  text = "CLICK ME",
  onClick,
  disabled = false,
  isActive = false,
  buttonColor = "border-white text-white",
  borderColor = "border-white",
  textColorActive = "text-primary",
  borderColorActive = "border-primary"
}) => {
  const { darkMode } = useDarkMode();

  const activeButtonColor = darkMode ? 'text-primary' : textColorActive;
  const activeBorderColor = darkMode ? 'border-primary' : borderColorActive;
  const defaultButtonColor = darkMode ? 'border-white white' : "border-secondary";
  const defaultBorderColor = darkMode ? 'border-white' : 'border-secondary';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-xs md:text-lg lg:text-lg border-2 px-3 py-2 rounded-md font-semibold flex items-center justify-center transition-all duration-300 ease-in-out
        ${isActive ? `${activeButtonColor} ${activeBorderColor}` : `${defaultButtonColor} ${defaultBorderColor}`}
        ${disabled ? "cursor-not-allowed opacity-75" : "hover:bg-transparent hover:border-primary hover:text-primary"}
      `}
    >
      {text}
    </button>
  );
};

export default HollowButton;
