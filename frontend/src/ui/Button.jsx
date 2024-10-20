import React from 'react';

const Button = ({
  text = "Add To Cart",
  onClick,
  disabled = false,
  loading = false,
  iconClass = "fas fa-angle-double-right",
  buttonColor = "bg-[#bea77f] text-white",
  borderColor = "border-[#bea77f]",
  textColorHover = "text-[#bea77f]",
  size = 'md' // Default size
}) => {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-lg sm:text-lg md:text-xl px-4 py-2',
    lg: 'text-xl px-6 py-3',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full ${sizeClasses[size]} ${buttonColor} ${borderColor} border-2 rounded-md font-bold flex items-center justify-center transition-all duration-300 ease-in-out
        ${loading ? "cursor-not-allowed opacity-75" : "hover:bg-transparent hover:border-current hover:text-current"}
      `}
      style={{
        borderColor: borderColor.split('[')[1]?.split(']')[0] || '#bea77f',
      }}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin mr-1 text-lg"></i>
      ) : (
        <>
          {text}
          <i className={`${iconClass} ml-1`}></i>
        </>
      )}
    </button>
  );
};

export default Button;
