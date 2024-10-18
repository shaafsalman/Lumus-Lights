import React from 'react';
import { X } from 'lucide-react';

const PopUpImage = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-4 overflow-hidden shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex flex-col items-center">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl} 
              alt={`Promotional ${index + 1}`}
              className="max-h-[70vh] w-auto mb-2 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopUpImage;
