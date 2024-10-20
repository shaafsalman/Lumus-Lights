import React from 'react';
import { useDarkMode } from '../Util/DarkModeContext';
import { MoonIcon, SunIcon } from 'lucide-react';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center">
      <span className="mr-2">
        {darkMode ? (
          <MoonIcon className="w-6 h-6 text-yellow-400 transition-colors duration-300" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-400 transition-colors duration-300" />
        )}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <div className={`w-14 h-8 bg-gray-300 rounded-full shadow-inner transition duration-200 border ease-in-out ${darkMode ? 'bg-secondary' : 'bg-gray-200'}`}></div>
        <div
          className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
        ></div>
      </label>
      <span className={`ml-3 text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} transition-colors duration-300`}>
        {/* {darkMode ? 'Light Mode' : 'Dark Mode'} */}
      </span>
    </div>
  );
};

export default DarkModeToggle;
