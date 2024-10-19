import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, InfoIcon, ShoppingBagIcon, UserIcon, ShoppingCartIcon, MenuIcon, XIcon } from 'lucide-react'; 
import { useDarkMode } from '../Util/DarkModeContext';
import { getCompanyName, company } from '../CompanyDetails';
import { fetchPromotionalMessage } from '../Util/fetchers';
import logoLight from './../assets/logoLight.png';
import logoDark from './../assets/logoDark.png';
import ToggleSwitch from '../ui/ToggleSwitch';

const NavigationLinks = ({ darkMode, isActiveLink }) => {
  const iconMap = {
    home: <HomeIcon className="mr-2" />,  
    about: <InfoIcon className="mr-2" />,
    shop: <ShoppingBagIcon className="mr-2" />,
  };

  return (
    <div className="hidden md:flex flex-grow items-center space-x-6 ml-10">
      {company.pages.map((page) => (
        <Link
          key={page.path}
          to={page.path}
          className={`flex items-center text-md font-semibold tracking-tighter transition-all duration-300 ease-in-out ${isActiveLink(page.path) ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'} ${darkMode ? 'text-white' : 'text-secondary'}`}
        >
          <span className="flex items-center">
            {iconMap[page.name.toLowerCase()]}  {/* Icon */}
            {page.name}  {/* Text */}
          </span>
        </Link>
      ))}
    </div>
  );
};

const MobileMenu = ({ isOpen, darkMode, isActiveLink, toggleDarkMode, setIsOpen }) => {
  const iconMap = {
    home: <HomeIcon />,
    about: <InfoIcon />,
    shop: <ShoppingBagIcon />,
  };

  return (
    isOpen && (
      <div className={`${darkMode ? 'bg-secondary' : 'bg-white'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {company.pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className={`block px-3 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${isActiveLink(page.path) ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} ${darkMode ? 'text-white' : 'text-secondary'}`}
              onClick={() => setIsOpen(false)}
            >
              {iconMap[page.name.toLowerCase()]}
              {page.name}
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className={`block w-full text-left px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out ${darkMode ? 'bg-primary text-white' : 'bg-gray-800 hover:bg-gray-700 text-secondary'}`}
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
    )
  );
};


const ProfileCartActions = ({ darkMode, toggleDarkMode }) => (
  <div className="flex items-center space-x-4">
    <Link to="/profile" className="text-xl">
      <UserIcon className="h-6 w-6" />
    </Link>
    <Link to="/cart" className="text-xl">
      <ShoppingCartIcon className="h-6 w-6" />
    </Link>
    <ToggleSwitch checked={darkMode} onChange={toggleDarkMode} />
  </div>
);

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [promotionalMessage, setPromotionalMessage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    const loadPromotionalMessage = async () => {
      const data = await fetchPromotionalMessage();
      setPromotionalMessage(data.message || '');
      setIsActive(data.active || false);
    };
    loadPromotionalMessage();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
    {/* Navigation Bar */}
<nav className={`fixed top-0 left-0 w-full z-20 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-secondary'} transition-all duration-300`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">
      <Link to="/" className="flex items-center">
        <img src={darkMode ? logoDark : logoLight} alt="Company Logo" className="h-10 w-auto mr-2" />
        <span className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-secondary'}`}>
          {getCompanyName()}
        </span>
      </Link>

      <NavigationLinks darkMode={darkMode} isActiveLink={(path) => location.pathname === path} />

      <ProfileCartActions darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="md:hidden">
        <button onClick={toggleMenu} className={`text-2xl ${darkMode ? 'text-white' : 'text-secondary'}`}>
          {isOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
    </div>
  </div>
</nav>{/* Promotional Message Below Navigation Bar */}
   {isActive && promotionalMessage && (
  <div className={`bg-gradient-to-r  from-primary to-secondary text-white text-left pt-6 text-xl font-thin  mt-16 fixed left-0 right-0 z-10 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
    <div className="ml-20">
    {promotionalMessage}
    </div>

  </div>
)}



  

    </>
  );
};

export default NavigationBar;
