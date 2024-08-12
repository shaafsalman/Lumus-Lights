import React from 'react';

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
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-max text-sm uppercase border-2 px-4 py-2 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 ease-in-out
        ${buttonColor} ${borderColor}
        ${isActive ? `${textColorActive} ${borderColorActive}` : ''}
        ${disabled ? "cursor-not-allowed opacity-75" : 'hover:bg-transparent hover:border-primary hover:text-primary'}
      `}
      style={{
        borderColor: isActive ? textColorActive.split(' ')[0] : borderColor.split('[')[1]?.split(']')[0] || 'white',
        color: isActive ? textColorActive.split(' ')[0] : 'inherit',
      }}
    >
      {text}
    </button>
  );
};

export default HollowButton;
