import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductDetailsModal from '../Components/ProductDetailsModal';
import SyncLoader from 'react-spinners/SyncLoader';
import Pagination from './Pagination';
import { useDarkMode } from '../Util/DarkModeContext';

const Table = ({
  columns,
  data = [],
  handleEdit = null,
  handleDelete = null,
  handleToggleStatus,
  identifierKey,
  h = 330,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useDarkMode();

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
    if (handleDelete) {
      handleDelete(id);
    }
  };

  const handleIdClick = (item) => {
    setSelectedProduct(item);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
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
          <table
            className={`w-full border-b border-primary ${
              darkMode ? 'bg-secondary text-white border-gray-800' : 'bg-white text-secondary border-gray-50'
            }`}
          >
            <thead
              className={`${
                darkMode ? 'bg-black text-white' : 'bg-gray-50 text-secondary'
              } sticky top-0 z-10`}
            >
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-2 py-1 text-left font-bold text-xs md:text-sm lg:text-base ${
                      column.key.toLowerCase() === 'status' ? 'text-center' : ''
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
                {(handleEdit || handleDelete) && (
                  <th className="px-2 py-1 text-center font-bold text-xs md:text-sm lg:text-base">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'text-white' : 'text-secondary'}`}>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + (handleEdit || handleDelete ? 1 : 0)} className="text-center py-4">
                    <div className="flex items-center justify-center space-x-2 text-2xl">
                      <SyncLoader color={darkMode ? 'white' : 'primary'} size={8} />
                      <span
                        className={`text-gray-500 text-lg md:text-base ${
                          darkMode ? 'text-gray-300' : ''
                        }`}
                      >
                        Loading
                      </span>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr
                    key={item[identifierKey]}
                    className={`border-b border-secondary hover:${
                      darkMode ? 'bg-white' : 'bg-gray-50'
                    } transition duration-200`}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-2 py-1 text-left text-xs md:text-sm lg:text-base border-b border-primary ${
                          col.key.toLowerCase() === 'status' ? 'text-center' : ''
                        }`}
                      >
                        {col.key.toLowerCase() === 'thumbnail' || col.key.toLowerCase() === 'imageurl' ? (
                          item.thumbnail || item.imageUrl ? (
                            <img
                              src={item.thumbnail || item.imageUrl}
                              alt={item.name}
                              className="w-12 h-auto object-cover"
                            />
                          ) : (
                            'No Image'
                          )
                        ) : col.key.toLowerCase() === 'status' || col.key.toLowerCase() === 'active' ? (
                          <div className="flex justify-center items-center h-full">
                            <Switch
                              onChange={() =>
                                handleToggleStatus(item[identifierKey], item.status || item.active)
                              }
                              checked={
                                item.status === true || item.active === true || item.active == 1
                              }
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
                        ) : col.key.toLowerCase() === 'id' ? (
                          <span
                            onClick={() => handleIdClick(item)}
                            className="cursor-pointer font-bold underline text-primary"
                          >
                            {item[col.key]}
                          </span>
                        ) : (
                          <span>
                            {item[col.key].length > 14
                              ? `${item[col.key].substring(0, 14)}...`
                              : item[col.key]}
                          </span>
                        )}
                      </td>
                    ))}
                    {(handleEdit || handleDelete) && (
                      <td className="px-2 py-1 text-center border-b border-primary">
                        {handleEdit && (
                          <button
                            onClick={() => handleEdit(item)}
                            className={`text-gray-500 hover:text-gray-300 focus:outline-none ${
                              darkMode ? 'text-gray-300 hover:text-gray-400' : ''
                            }`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        )}
                        {handleDelete && (
                          <button
                            onClick={() => handleDeleteItem(item[identifierKey])}
                            className={`text-primary hover:text-primaryHover focus:outline-none ml-2 ${
                              darkMode ? 'text-gray-300 hover:text-gray-400' : ''
                            }`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (handleEdit || handleDelete ? 1 : 0)} className="text-center py-4">
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

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={Boolean(selectedProduct)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Table;
