import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faExpand, faLock } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { getCompanyName } from '../CompanyDetails';
import { useDarkMode } from '../Util/DarkModeContext';
import ToggleSwitch from './ToggleSwitch';
import logoLight from './../assets/logoLight.png'; 
import logoDark from './../assets/logoDark.png'; 

const AdminNavbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className={`p-3 sticky shadow-sm top-0 flex justify-between items-center ${darkMode ? 'bg-secondary text-white' : 'bg-white text-secondary'}`}>
      <div className="flex items-center">
        {/* Logo based on dark mode */}
        <img 
          src={darkMode ? logoDark : logoLight} 
          alt="Company Logo" 
          className="h-16 w-auto mr-1 ml-6 transition-all duration-300"
        />
        <div className={`transition-all duration-300 ml-2`}>
          <h1 className="text-4xl tracking-tighter font-semibold">{getCompanyName()}</h1>
        </div>
        
        <div className="ml-24">
          <NavLink to="/admin/profile-control" className="transition-colors duration-300 mx-3">
            <FontAwesomeIcon icon={faUser} size="sm" />
          </NavLink>

          <NavLink to="/login" className="transition-colors duration-300 mx-3">
            <FontAwesomeIcon icon={faLock} size="sm" />
          </NavLink>
        </div>
        <ToggleSwitch checked={darkMode} onChange={toggleDarkMode} />
      </div>
    </nav>
  );
};

export default AdminNavbar;
