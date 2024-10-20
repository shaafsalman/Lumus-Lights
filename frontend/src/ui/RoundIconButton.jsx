import React from 'react';
import { useDarkMode } from '../Util/DarkModeContext';

const RoundIconButton = ({ icon: Icon, onClick, size = 30, className = '' }) => {
  const { darkMode } = useDarkMode();

  return (
    <button
      className={`rounded-full p-1 transition-colors ${className} 
        ${darkMode ? 'bg-transparent  text-white hover:bg-gray-950' : 'bg-transparent text-secondary hover:bg-gray-300'}`}
      onClick={onClick}
    >
      <Icon size={size} />
    </button>
  );
};

export default RoundIconButton;
