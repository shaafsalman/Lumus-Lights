import React, { useEffect, useState } from 'react';

const MessageCard = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 1000); 
    }, 500); 

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg w-100 border transition-opacity duration-300 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${
        type === 'error' ? 'bg-red-100 border-red-300 text-red-800' : 'bg-green-100 border-green-300 text-green-800'
      }`}
    >
      <p className="text-lg  tracking-tighter">{message}</p>
    </div>
  );
};

export default MessageCard;
