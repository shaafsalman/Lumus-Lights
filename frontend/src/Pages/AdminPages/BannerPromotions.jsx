import React, { useState, useEffect } from 'react';
import { getPromotionalMessage, company, isPromotionMessageActive } from './../../CompanyDetails'; 
import ActionButton from '../../ui/ActionButton';
import { useDarkMode } from '../../Util/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import Toggle from '../../ui/Toggle';

const BannerPromotion = () => {
  const { darkMode } = useDarkMode(); 
  const [promotionalMessage, setPromotionalMessage] = useState(getPromotionalMessage());
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 
  const [isActive, setIsActive] = useState(isPromotionMessageActive());

  const handleInputChange = (e) => {
    setPromotionalMessage(e.target.value);
  };

  const toggleEditing = () => {
    if (isEditing) {
      company.promotionalMessage = promotionalMessage; // Update the company object
    }
    setIsEditing((prev) => !prev);
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const toggleActiveStatus = () => {
    setIsActive((prev) => {
      const newStatus = !prev;
      company.promotionMessageActive = newStatus; // Update the company active status
      return newStatus;
    });
  };

  // Sync state with company object when the component mounts or the active status changes
  useEffect(() => {
    setPromotionalMessage(company.promotionalMessage);
    setIsActive(company.promotionMessageActive);
  }, []);

  return (
    <div className={`banner-promotion ${isVisible ? '' : 'hidden'} p-4 transition duration-200`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex-grow" />
        <Toggle isActive={isActive} onToggle={toggleActiveStatus} />
      </div>
      
      <div className="flex flex-col">
        <textarea
          value={promotionalMessage}
          onChange={handleInputChange}
          className={`border p-2 rounded-md h-24 resize-none transition duration-200 ${darkMode ? 'bg-secondary text-white border-gray-600' : 'border-gray-300'}`}
          placeholder="Enter message..."
          aria-label="Promotional message input"
          disabled={!isEditing} // Disable textarea when not in editing mode
        />
        <div className="flex justify-end space-x-2 mt-4">
          {isEditing ? (
            <>
              <ActionButton text="Save" onClick={toggleEditing} icon={faSave} />
              <ActionButton text="Cancel" onClick={toggleEditing} disabled={!isEditing} icon={faTimes} />
            </>
          ) : (
            <ActionButton text="Edit" onClick={toggleEditing} icon={faEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerPromotion;
