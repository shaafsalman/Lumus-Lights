import React from 'react';
import ActionButton from './ActionButton'; 
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../Util/DarkModeContext';

const Modal = ({ title, isOpen, onClose, onSave, buttonText,closeButtonText="Cancel", children, buttonLoading, saveButtonDisabled = false }) => {
  const { darkMode } = useDarkMode();

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className={`relative rounded-md shadow-2xl p-6 max-h-[95vh] overflow-y-scroll scrollbar-hidden ${darkMode ? 'bg-secondary text-white' : 'bg-white text-secondary'}`}>
          {onClose && (
            <button 
              className={`absolute top-4 right-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} focus:outline-none`}
              onClick={onClose}
            >
              <i className="fas fa-times"></i> 
            </button>
          )}
          <h1 className={`text-xl font-semibold tracking-tighter mb-6 ${darkMode ? 'text-gray-200' : 'text-secondary'}`}>{title}</h1>
          {children}
          <div className="mt-4 flex justify-end w-full">
            {onSave && (
              <ActionButton
                loading={buttonLoading}
                icon={faSave}
                onClick={onSave}
                text={buttonText}
                disabled={saveButtonDisabled}
                className={`mr-2`}
              />
            )}
            {onClose && (
              <ActionButton
                disabled={buttonLoading}
                icon={faTimes}
                onClick={onClose}
                text={closeButtonText}
                className={`ml-2`}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
