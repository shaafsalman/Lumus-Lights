import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import RoundIconButton from './RoundIconButton'; 

const Lightbox = ({ images, selectedIndex, onClose, onNext, onPrev }) => {
  if (!images || images.length === 0) return null;

  const prevIndex = (selectedIndex - 1 + images.length) % images.length;
  const nextIndex = (selectedIndex + 1) % images.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <RoundIconButton
        icon={X}
        onClick={onClose}
        size={24}
        className="absolute top-5 right-5"
      />

      <div className="relative max-w-full max-h-full flex items-center justify-center space-x-4 px-10 py-5">
        {/* Previous Image Preview */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={images[prevIndex].image_path}
            alt={`Previous Image ${prevIndex + 1}`}
            className="w-full h-full object-cover rounded-lg opacity-50 cursor-pointer"
            onClick={onPrev}
          />
        </div>

        {/* Main Image */}
        <div className="relative flex items-center ">
          <img
            src={images[selectedIndex].image_path}
            alt={`Selected Image ${selectedIndex + 1}`}
            className="max-w-lg max-h-lg rounded-md shadow-2xl "
          />

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <RoundIconButton
              icon={ArrowLeft}
              onClick={onPrev}
              size={30}
            />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <RoundIconButton
              icon={ArrowRight}
              onClick={onNext}
              size={30}
            />
          </div>
        </div>

        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={images[nextIndex].image_path}
            alt={`Next Image ${nextIndex + 1}`}
            className="w-full h-full object-cover rounded-lg opacity-50 cursor-pointer"
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
