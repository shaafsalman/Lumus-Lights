import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDarkMode } from '../../Util/DarkModeContext';
import ToggleSwitch from '../../ui/ToggleSwitch';
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

  const toggleSection = (section) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  };

  return (
    <aside className={`h-full p-6`}>
      <h1 className="text-2xl font-bold mb-6 text-center">Lumus Lights</h1>
      <ToggleSwitch checked={darkMode} onChange={toggleDarkMode} />
      <nav>
        <ul className="space-y-4 mt-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="pb-3">
              <div
                className={`px-5 py-3 text-sm cursor-pointer flex justify-between ${darkMode ? 'text-white' : 'text-black'}`}
                onClick={() => toggleSection(section.section)}
              >
                <span>{section.section}</span>
                <FontAwesomeIcon icon={collapsedSections[section.section] ? faAngleDown : faAngleUp} />
              </div>
              {!collapsedSections[section.section] && (
                <ul>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <NavLink
                        to={item.path}
                        className={`block px-4 py-2 rounded transition duration-300 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'} hover:shadow-lg`}
                      >
                        <FontAwesomeIcon icon={item.icon} className="mr-3" />
                        {item.name}
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
