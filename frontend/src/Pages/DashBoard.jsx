import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../Util/DarkModeContext';

const DashBoard = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      {/* Sidebar */}
      <aside className={`w-64 h-full bg-${darkMode ? 'gray-800' : 'white'} p-6`}>
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/profile" className={`block px-4 py-2 rounded ${darkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}>
                Profile
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className={`block px-4 py-2 rounded ${darkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}>
                Settings
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/reports" className={`block px-4 py-2 rounded ${darkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}>
                Reports
              </Link>
            </li>
            <li>
              <Link to="/logout" className={`block px-4 py-2 rounded ${darkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel dolor nec diam facilisis interdum. Donec
            et tincidunt felis.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
