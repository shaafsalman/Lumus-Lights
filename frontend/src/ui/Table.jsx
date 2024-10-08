import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import SyncLoader from 'react-spinners/SyncLoader'; // Ensure SyncLoader is installed
import Pagination from './Pagination';

const Table = ({ columns, data = [], handleEdit, handleDelete, handleToggleStatus, identifierKey, h = 330 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(false); // Even if data is empty, stop loading
    }
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
    <div className={`table-container ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="overflow-x-auto">
        <div className="overflow-y-auto" style={{ maxHeight: `calc(100vh - ${h}px)` }}>
          <table className="w-full bg-white rounded-lg border border-gray-200">
            <thead className="bg-gray-100 text-black sticky top-0 z-10">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-4 py-2 text-left font-semibold text-sm md:text-base border-b border-gray-300 ${
                      column.key.toLowerCase() === 'status' ? 'text-center' : ''
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-2 text-center font-semibold text-sm md:text-base border-b border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-black">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4">
                    <div className="flex items-center justify-center space-x-2 text-2xl">
                      <SyncLoader color="primary" size={8} />
                      <span className="text-gray-500 text-xl md:text-base">Loading</span>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr
                    key={item[identifierKey]}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-4 py-2 text-left text-sm md:text-base ${
                          col.key.toLowerCase() === 'validfrom' || col.key.toLowerCase() === 'validtill'
                            ? 'break-words'
                            : ''
                        } border-b border-gray-200 ${
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
                    <td className="px-4 py-2 text-center border-b border-gray-200">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-500 hover:text-blue-300 focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item[identifierKey])}
                        className="text-primary hover:text-primaryHover focus:outline-none ml-2"
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
