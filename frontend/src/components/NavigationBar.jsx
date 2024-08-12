import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

const NavigationBar = ({ pages, companyName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-semibold tracking-tighter">{companyName}</span>
          </div>
          <div className="hidden md:flex space-x-4">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(page.path) ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
              >
                <i className={`${page.icon} mr-1`}></i>
                {page.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(page.path) ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
                onClick={() => setIsOpen(false)}
              >
                <i className={`${page.icon} mr-1`}></i>
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
