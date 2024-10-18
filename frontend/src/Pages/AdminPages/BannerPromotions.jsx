import React, { useState, useEffect } from 'react';
import { fetchPromotionalMessage, updatePromotionalMessage, setPromotionalMessageStatus } from './../../Util/fetchers'; 
import ActionButton from '../../ui/ActionButton';
import { useDarkMode } from '../../Util/DarkModeContext';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import Toggle from '../../ui/Toggle';
import MessageCard from '../../ui/MessageCard';

const BannerPromotion = () => {
  const { darkMode } = useDarkMode(); 
  const [promotionalMessage, setPromotionalMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageCard, setMessageCard] = useState(null);

  // Fetch promotional message on mount
  useEffect(() => {
    const loadPromotionalMessage = async () => {
      try {
        const data = await fetchPromotionalMessage();
        setPromotionalMessage(data.message || '');
        setIsActive(data.active || false);
      } catch (error) {
        console.error('Error fetching promotional message:', error);
      }
    };

    loadPromotionalMessage();
  }, []);

  const handleInputChange = (e) => {
    setPromotionalMessage(e.target.value);
  };

  const toggleEditing = async () => {
    if (isEditing) {
      setLoading(true); 
      try {
        await updatePromotionalMessage(promotionalMessage, isActive); 
        setMessageCard({ type: 'success', message: 'Promotional message updated successfully!' });
      } catch (error) {
        setMessageCard({ type: 'error', message: 'Failed to update promotional message.' });
      } finally {
        setLoading(false); 
      }
    }
    setIsEditing((prev) => !prev);
  };

  const toggleActiveStatus = async () => {
    const newStatus = !isActive;
    await setPromotionalMessageStatus(newStatus); 
    setIsActive(newStatus); 
  };

  return (
    <div className={`banner-promotion ${isVisible ? '' : 'hidden'} p-4 transition duration-200`}>
      {messageCard && (
        <MessageCard type={messageCard.type} message={messageCard.message} onClose={() => setMessageCard(null)} />
      )}
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
          disabled={!isEditing} 
        />
        <div className="flex justify-end space-x-2 mt-4">
          {isEditing ? (
            <>
              <ActionButton 
                text={loading ? 'Saving...' : 'Save'} 
                onClick={toggleEditing} 
                icon={faSave} 
                disabled={loading} 
              />
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
