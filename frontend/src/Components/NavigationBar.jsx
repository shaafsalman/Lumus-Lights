import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, InfoIcon, ShoppingBagIcon, UserIcon, ShoppingCartIcon, MenuIcon, XIcon,LampDesk  ,MoonIcon, SunIcon} from 'lucide-react'; 
import { useDarkMode } from '../Util/DarkModeContext';
import { getCompanyName, company } from '../CompanyDetails';
import { fetchPromotionalMessage } from '../Util/fetchers';
import logoLight from './../assets/logoLight.png';
import logoDark from './../assets/logoDark.png';
import ToggleSwitch from '../ui/ToggleSwitch';
import DarkModeToggle from '../ui/DarkModeToggle';


const NavigationLinks = ({ darkMode, isActiveLink }) => {
  const iconMap = {
    home: <HomeIcon className="mr-2" />,
    products: <LampDesk className="mr-2" />,
    about: <InfoIcon className="mr-2" />,
    shop: <ShoppingBagIcon className="mr-2" />, 
    contact: <UserIcon className="mr-2" /> 
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
            {iconMap[page.name.toLowerCase()]}
            {page.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

const MobileMenu = ({ isOpen, darkMode, isActiveLink, toggleDarkMode, setIsOpen }) => {
  const iconMap = {
    home: <HomeIcon className="mr-2" />,
    products: <LampDesk className="mr-2" />,
    about: <InfoIcon className="mr-2" />,
    shop: <ShoppingBagIcon className="mr-2" />,
    contact: <UserIcon className="mr-2" />,
  };

  return (
    isOpen && (
      <div className={`md:hidden ${darkMode ? 'bg-secondary' : 'bg-white'} fixed inset-0 z-30`}>
      <div className="absolute top-20 left-0 right-0 max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col px-4 pt-5 space-y-2">
          {/* Navigation Links */}
          {company.pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className={`flex items-center text-lg font-medium transition-all duration-300 ease-in-out px-4 py-2 ${
                isActiveLink(page.path) ? 'bg-primary text-white font-extrabold rounded-lg' : 'hover:bg-primary hover:text-white'
              } ${darkMode ? 'text-white' : 'text-secondary'}`}
              onClick={() => setIsOpen(false)}
            >
              {iconMap[page.name.toLowerCase()]}
              {page.name}
            </Link>
          ))}
    
          {/* Divider */}
          <div className="border-t border-gray-200 my-8 "></div>
    
          {/* Profile Button */}
          <div className="flex justify-between px-4">
            <Link to="/profile" className="flex items-center text-xl">
              <UserIcon className="h-6 w-6 mr-2" />
              Profile
            </Link>
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center">
              <DarkModeToggle />
            </div>
    
            <Link to="/cart" className="flex items-center text-xl">
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    )
  );
};






const ProfileCartActions = ({ darkMode, toggleDarkMode }) => (
  <div className="hidden md:flex items-center space-x-4">
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
  const [isOpen, setIsOpen] = useState(false); // Ensure isOpen controls the menu visibility
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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-colors  ${darkMode ? 'bg-secondary text-white' : 'bg-white text-secondary'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <img src={darkMode ? logoDark : logoLight} alt="Company Logo" className="h-10 w-auto mr-2" />
              <span className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-secondary'}`}>
                {getCompanyName()}
              </span>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className={`text-2xl ${darkMode ? 'text-white' : 'text-secondary'}`}>
                {isOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>

            {/* Desktop Nav Links */}
            <NavigationLinks darkMode={darkMode} isActiveLink={(path) => location.pathname === path} />

            {/* Profile and Cart actions for desktop */}
            <ProfileCartActions darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        darkMode={darkMode}
        isActiveLink={(path) => location.pathname === path}
        toggleDarkMode={toggleDarkMode}
        setIsOpen={setIsOpen}
      />

      {/* Promotional message */}
      {isActive && promotionalMessage && (
        <div className={`fixed left-0 right-0 z-10 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={`flex flex-wrap items-center justify-between text-white tracking-tighter ${darkMode ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-primary font-medium'} text-left pt-6 text-xl font-thin mt-14`}>
          <div className="ml-8 font-Publica">
            {promotionalMessage}
          </div>
        </div>
      </div>
      
      )}
    </>
  );
};

export default NavigationBar;
