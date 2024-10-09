import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../Util/DarkModeContext';

const SearchBar = ({ whatToSearch, searchTerm, handleSearch, handleReload, actionButton }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { darkMode } = useDarkMode(); // Get dark mode state

  const handleClickReload = () => {
    setIsSyncing(true); 
    setTimeout(() => {
      setIsSyncing(false);
      handleReload(); 
    }, 1000); 
  };

  return (
    <div className={`relative w-full flex items-center }`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon icon={faSearch} className={`${darkMode ? 'text-white' : 'text-secondary'}`} />
      </div>
      <input
        type="text"
        placeholder={`Search ${whatToSearch} ...`}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className={`w-4/6 pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${darkMode ? 'bg-secondary border-primary text-white focus:ring-primary' : 'border-primary focus:ring-primary'}`}
      />

      <button
        onClick={handleClickReload}
        className={`ml-3 px-4 py-2 rounded-md shadow-sm transition duration-200 bg-primary text-white }`}
      >
        <FontAwesomeIcon
          icon={faSyncAlt}
          className={`transition-transform duration-200 ${isSyncing ? 'animate-spin' : ''}`}
        />
      </button>

      {actionButton && (
        <div className="mx-16 pt-5 ">
          {actionButton} 
        </div>
      )}
    </div>
  );
};

export default SearchBar;
