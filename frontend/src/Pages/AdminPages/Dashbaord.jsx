// DashBoard.js
import React from 'react';

const DashBoard = () => {

  return (
    <div className={`flex h-full`}>
      {/* Main Content */}
      <main className={`flex-1 p-1`}>
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
