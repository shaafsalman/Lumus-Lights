import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import { useDarkMode } from '../../Util/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faTag, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


const menuItems = [
  {
    section: 'Product Management',
    items: [
      { name: 'Manage Categories', icon: faTag, path: '/admin/manage-categories' },
      { name: 'Manage Products', icon: faBoxOpen, path: '/admin/manage-products' },
    ],
  },
];

const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [collapsedSections, setCollapsedSections] = useState({});
  const location = useLocation(); // Get the current location

  const toggleSection = (section) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  };

  return (
    <aside className={`h-full p-4 shadow-sm`}>
      <nav>
        <ul className="space-y-3 mt-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div
                className={`px-1 py-2 text-xl font-semibold  cursor-pointer flex justify-between items-center ${darkMode ? 'text-white' : 'text-black'}`}
                onClick={() => toggleSection(section.section)}
              >
                <span>{section.section}</span>
                <FontAwesomeIcon className = " ml-2 "icon={collapsedSections[section.section] ? faAngleDown : faAngleUp} />
              </div>
              {!collapsedSections[section.section] && (
                <ul className="pl-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded-md transition duration-300 ${
                            isActive
                              ? `${darkMode ? 'text-white text-lg' : 'text-white text-lg'} bg-primary` // Larger text for active item
                              : `${darkMode ? 'text-white hover:text-primary' : 'text-secondary hover:text-gray-400'}`
                          }`
                        }
                      >
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        <span className="text-base">{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
