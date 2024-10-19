import { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <div className="w-72 h-72 bg-gray-800 rounded-lg flex items-center justify-center">
        <img 
          src={selectedImage} 
          alt="Selected" 
          className="w-full h-full object-contain rounded-lg" 
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex mt-4 space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${
              selectedImage === image ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
