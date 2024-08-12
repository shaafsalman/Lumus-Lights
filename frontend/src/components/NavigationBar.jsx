import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDarkMode } from './../Util/DarkModeContext';
import ToggleSwitch from '../Cells/ToggleSwitch';
import { faUser ,faShoppingCart,faBars } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = ({ pages, companyName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`shadow-md fixed top-0 left-0 w-full z-10 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-secondary'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Company Name */}
          <div className="flex-shrink-0">
            <span className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-secondary'}`}>
              {companyName}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex flex-grow items-center space-x-6 ml-10">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`relative text-md font-semibold tracking-tighter transition-all duration-300 ease-in-out ${isActive(page.path) ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'} ${darkMode ? 'text-white' : 'text-secondary'}`}
              >
                <FontAwesomeIcon icon={page.icon} className="mr-2 text-md" />
                {page.name}
              </Link>
            ))}
          </div>

          {/* Profile, Cart Icons & Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-xl">
              <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-xl">
              <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />
            </Link>
            <ToggleSwitch checked={darkMode} onChange={toggleDarkMode} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`text-2xl focus:outline-none ${darkMode ? 'text-white' : 'text-secondary'}`}>
              {isOpen ? <FontAwesomeIcon icon={faTimes} className="h-6 w-6" /> : <FontAwesomeIcon icon={faBars} className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`${darkMode ? 'bg-secondary' : 'bg-white'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`block px-3 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${isActive(page.path) ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} ${darkMode ? 'text-white' : 'text-secondary'}`}
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={page.icon} className="mr-2 h-5 w-5" />
                {page.name}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className={`block w-full text-left px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out ${darkMode ? 'bg-primary hover:bg-yellow-400' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="mr-2 h-5 w-5 inline" />
              {darkMode ? ' Light Mode' : ' Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
