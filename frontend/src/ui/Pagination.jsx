import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../Util/DarkModeContext';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, bg = "primary", bgHover = "primaryHover" }) => {
  const { darkMode } = useDarkMode(); // Use the dark mode context
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    paginate(page);
  };

  const displayPages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
  let endPage = Math.min(totalPages, startPage + displayPages - 1);

  if (totalPages <= displayPages) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= Math.ceil(displayPages / 2)) {
    startPage = 1;
    endPage = displayPages;
  } else if (currentPage >= totalPages - Math.floor(displayPages / 2)) {
    startPage = totalPages - displayPages + 1;
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={`flex items-center justify-between pagination-container fixed bottom-0 right-10 z-20 ${darkMode ? ' text-white' : ' text-secondary'}`}>
      {/* Left Side: Showing Entries */}
      <div className={`text-sm m-4 mb-10 p-4 rounded-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="font-medium">Showing</span>
        <span className="font-semibold"> {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} </span>
        <span className="font-medium">to</span>
        <span className="font-semibold"> {Math.min(currentPage * itemsPerPage, totalItems)} </span>
        <span className="font-medium">of</span>
        <span className="font-semibold"> {totalItems} </span>
        <span className="font-medium">entries</span>
      </div>

      {/* Right Side: Pagination Controls */}
      <ul className="inline-flex space-x-2 mb-6">
        {currentPage > 1 && (
          <>
            <li>
              <button
                onClick={() => handlePageChange(1)}
                className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            </li>
          </>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? `bg-${bg} hover:bg-${bgHover} text-white`
                  : darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <>
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
