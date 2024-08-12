import React from 'react';

const Button = ({
  text = "ADD TO CART",
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
      className={`w-full text-xs uppercase ${buttonColor} ${borderColor} border-2 px-4 py-2 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 ease-in-out
        ${loading ? "cursor-not-allowed opacity-75" : "hover:bg-transparent hover:border-current hover:text-current"}
      `}
      style={{
        borderColor: borderColor.split('[')[1]?.split(']')[0] || '#bea77f',
      }}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin mr-2"></i>
      ) : (
        <>
          {text}
          <i className={`${iconClass} ml-2`}></i>
        </>
      )}
    </button>
  );
};

export default Button;
