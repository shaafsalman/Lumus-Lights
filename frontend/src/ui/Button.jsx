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
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full text-xl sm:text-md  ${buttonColor} ${borderColor} border-2 px-3 py-1 sm:px-2 sm:py-2 rounded-md font-bold flex items-center justify-center transition-all duration-300 ease-in-out
        ${loading ? "cursor-not-allowed opacity-75" : "hover:bg-transparent hover:border-current hover:text-current"}
      `}
      style={{
        borderColor: borderColor.split('[')[1]?.split(']')[0] || '#bea77f',
      }}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin mr-1 sm:mr-2 text-xs sm:text-xs"></i>
      ) : (
        <>
          {text}
          <i className={`${iconClass} ml-1 sm:ml-6 text-xs sm:text-lg`}></i>
        </>
      )}
    </button>
  );
};

export default Button;
