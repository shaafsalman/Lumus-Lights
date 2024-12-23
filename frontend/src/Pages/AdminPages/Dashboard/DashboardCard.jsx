import React from 'react';

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="w-full bg-card-light dark:bg-card-dark p-2 mb-3 rounded-lg shadow-lg flex flex-wrap">
      <div className="flex items-center justify-between w-full">
        <div className="bg-accent text-white rounded-full border-2 border-primary p-2 mr-2 flex justify-center items-center w-11 h-11">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-lg  ">{title}</p>
        </div>
      </div>
      <div className="flex justify-end w-full pr-5">
        <p className="text-xl font-bold text-primary">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
