import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NoDataFound = ({color = "primary", title = "No Data Found", message = "Try adjusting your filters or adding new data to see results here." }) => {


  return (
    <div className="flex flex-col items-center justify-center h-64 p-6">
      <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className={`text-${color} mb-4 animate-bounce`} />
      <h2 className={`text-3xl font-bold text-${color}`}>{title}</h2>
      <p className={`text-lg text-${color} mt-2 text-center`}>{message}</p>
    </div>
  );
};

export default NoDataFound;
