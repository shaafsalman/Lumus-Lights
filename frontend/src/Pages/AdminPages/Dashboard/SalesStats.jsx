import React from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart component from react-chartjs-2

const SalesStats = ({ salesData, timeRange, setTimeRange }) => {
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Chart data configuration for react-chartjs-2
  const data = {
    labels: salesData.labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData.sales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Example color
        borderColor: 'rgba(75, 192, 192, 1)', // Example border color
        borderWidth: 1,
      },
      {
        label: 'Profits',
        data: salesData.profits,
        backgroundColor: 'rgba(153, 102, 255, 0.6)', // Example color
        borderColor: 'rgba(153, 102, 255, 1)', // Example border color
        borderWidth: 1,
      }
    ],
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  return (
    <div className="flex flex-col p-4 mt-4 bg-gray-200 rounded-lg flex-grow">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl font-bold text-gray-800">Sales and Profits</p>
        <div className="flex bg-gray-300 rounded-lg">
          {['Week', 'Month', 'Year'].map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
              className={`px-2 py-1 m-1 rounded-lg ${
                timeRange === range ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
            >
              {range[0]}
            </button>
          ))}
        </div>
      </div>

      <Bar data={data} options={options} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default SalesStats;
