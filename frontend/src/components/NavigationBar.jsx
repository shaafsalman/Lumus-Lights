import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavigationBar = ({ pages, companyName, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`bg-black text-white shadow-lg fixed top-0 left-0 w-full z-10 ${darkMode ? 'bg-black' : 'bg-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-semibold tracking-tighter text-primary">{companyName}</span>
          </div>
          <div className="hidden md:flex space-x-4">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(page.path) ? 'bg-primary text-black' : 'hover:bg-primary hover:text-black'}`}
              >
                <i className={`${page.icon} mr-1`}></i>
                {page.name}
              </Link>
            ))}
            <button 
              onClick={toggleDarkMode} 
              className="px-3 py-2 rounded-md text-sm font-medium bg-primary hover:bg-yellow-400"
            >
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(page.path) ? 'bg-primary text-black' : 'hover:bg-primary hover:text-black'}`}
                onClick={() => setIsOpen(false)}
              >
                <i className={`${page.icon} mr-1`}></i>
                {page.name}
              </Link>
            ))}
            <button 
              onClick={toggleDarkMode} 
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary hover:bg-yellow-400"
            >
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>} 
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
