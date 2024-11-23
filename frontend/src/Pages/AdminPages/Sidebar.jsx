import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; 
import { useDarkMode } from '../../Util/DarkModeContext';
import { ArrowDown, ArrowUp, Box, Tag, Grid, Settings, LogOut } from 'lucide-react'; 

const menuItems = [
  {
    section: 'Dashboard',
    items: [
      { name: 'Overview', icon: Grid, path: '/admin/dashboard' },
    ],
  },
  {
    section: 'Product Management',
    items: [
      { name: 'Manage Categories', icon: Tag, path: '/admin/manage-categories' },
      { name: 'Manage Products', icon: Box, path: '/admin/manage-products' },
    ],
  },
  {
    section: 'Promotion Management',
    items: [
      { name: 'Banner Promotions', icon: Tag, path: '/admin/banner-promotions' },
      { name: 'Pop Ups Promotions', icon: Tag, path: '/admin/popups-promotions' },
      { name: 'Flat Sale', icon: Tag, path: '/admin/flat-sale' },
    ],
  },
  {
    section: 'Admin Controls',
    items: [
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
      { name: 'Logout', icon: LogOut, path: '/admin/logout' },
    ],
  },
];

const Sidebar = () => {
  const { darkMode } = useDarkMode();
  const [collapsedSections, setCollapsedSections] = useState({});
  const location = useLocation(); 

  const toggleSection = (section) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  };

  return (
    <aside className={`h-full p-3 shadow-sm overflow-auto ${darkMode ? 'bg-secondary' : 'bg-white'}`}>
      <nav>
        <ul className="space-y-4 mt-2"> {/* Reduced gap between sections */}
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div
                className={`px-3 py-2 text-lg font-semibold cursor-pointer flex justify-between items-center ${darkMode ? 'text-white' : 'text-black'}`}
                onClick={() => toggleSection(section.section)}
              >
                <span>{section.section}</span>
                <div className="ml-2">
                  {collapsedSections[section.section] ? (
                    <ArrowDown />
                  ) : (
                    <ArrowUp />
                  )}
                </div>
              </div>
              <div
                style={{
                  maxHeight: collapsedSections[section.section] ? '0' : '500px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out',
                }}
              >
                <ul className="pl-4 space-y-1"> {/* Reduced space between items */}
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded-md transition duration-300 ${
                            isActive
                              ? `${darkMode ? 'text-white text-lg' : 'text-white text-lg'} bg-primary`
                              : `${darkMode ? 'text-white' : 'text-secondary'}`
                          }`
                        }
                      >
                        <item.icon className="mr-2" />
                        <span className="text-sm">{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
