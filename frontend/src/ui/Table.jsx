import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import SyncLoader from 'react-spinners/SyncLoader'; // Ensure SyncLoader is installed
import Pagination from './Pagination';
import { useDarkMode } from '../Util/DarkModeContext'; // Assuming this is your context for dark mode

const Table = ({ columns, data = [], handleEdit, handleDelete, handleToggleStatus, identifierKey, h = 330 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  const { darkMode, toggleDarkMode } = useDarkMode(); // Get dark mode state and toggle function

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(!Array.isArray(data) || data.length === 0);
  }, [data]);

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      handleDelete(id);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(data) ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`table-container ${isScrolled ? '' : ''} ${darkMode ? 'bg-secondary' : 'bg-white'}`}>
      <div className="overflow-x-auto">
        <div className="overflow-y-auto" style={{ maxHeight: `calc(100vh - ${h}px)` }}>
          <table className={`w-full  border-b border-primary ${darkMode ? 'bg-secondary text-white border-gray-800' : 'bg-white text-secondary border-gray-50'}`}>
            <thead className={`${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-secondary'} sticky top-0 z-10`}>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-4 py-2 text-left font-bold text-sm md:text-lg ${
                      column.key.toLowerCase() === 'status' ? 'text-center' : ''
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-bold text-sm md:text-lg ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={` ${darkMode ? 'text-white' : 'text-secondary'}`}>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4">
                    <div className="flex items-center justify-center space-x-2 text-2xl">
                      <SyncLoader color={darkMode ? 'white' : 'primary'} size={8} />
                      <span className={`text-gray-500 text-xl md:text-base ${darkMode ? 'text-gray-300' : ''}`}>Loading</span>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr
                    key={item[identifierKey]}
                    className={`border-b border-secondary hover:${darkMode ? 'bg-white' : 'bg-gray-50'} transition duration-200`}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-4 py-2 text-left text-sm md:text-lg border-b border-primary ${
                          col.key.toLowerCase() === 'status' ? 'text-center' : ''
                        }`}
                      >
                        {col.key.toLowerCase() === 'applyto' && Array.isArray(item[col.key]) ? (
                          item[col.key].includes('*') ? '*' : 'many'
                        ) : col.key.toLowerCase() === 'status' ? (
                          <div className="flex justify-center items-center h-full">
                            <Switch
                              onChange={() => handleToggleStatus(item[identifierKey], item.status)}
                              checked={item.status === true}
                              onColor="#38a169"
                              offColor="#808080"
                              checkedIcon={false}
                              uncheckedIcon={false}
                              height={20}
                              width={40}
                              handleDiameter={18}
                              className="align-middle"
                            />
                          </div>
                        ) : (
                          item[col.key]
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center border-b border-primary">
                      <button
                        onClick={() => handleEdit(item)}
                        className={`text-gray-500 hover:text-gray-300 focus:outline-none ${darkMode ? 'text-gray-300 hover:text-gray-400' : ''}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item[identifierKey])}
                        className={`text-primary hover:text-primaryHover focus:outline-none ml-2 ${darkMode ? 'text-gray-300 hover:text-gray-400' : ''}`}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
