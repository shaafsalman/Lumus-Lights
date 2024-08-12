import React from 'react';

const NavigationBar = ({ pages }) => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white font-bold text-xl">
              <i className="fas fa-plane-departure mr-2"></i>Daalo Airlines
            </a>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.path}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <i className={`${page.icon} mr-2`}></i>{page.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full"
            >
              <i className="fas fa-user"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full"
            >
              <i className="fas fa-cog"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
