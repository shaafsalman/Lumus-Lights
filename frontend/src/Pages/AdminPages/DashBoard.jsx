// DashBoard.js
import React from 'react';
import Sidebar from './Sidebar';
import { useDarkMode } from '../../Util/DarkModeContext';

const DashBoard = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      
      {/* Main Content */}
      <main className={`flex-1 p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-3xl font-bold mb-6 tracking-tighter">Welcome to Your Dashboard</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-700">Manage your categories and products from the sidebar. Add, edit, or delete items as needed.</p>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
