import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHardcodedWeeklyData, getHardcodedMonthlyData, getHardcodedYearlyData } from "./chartData";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Period = {
  week: "week",
  month: "month",
  year: "year",
};

export default function SummaryChart() {
  const [chartPeriod, setChartPeriod] = useState(Period.week);
  const [chartData, setChartData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("Income");

  const fetchChartData = () => {
    let data = [];
    let labels = [];

    if (chartPeriod === Period.week) {
      const weeklyData = getHardcodedWeeklyData();
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      data = weeklyData.map((item) => item.total);
    } else if (chartPeriod === Period.month) {
      const monthlyData = getHardcodedMonthlyData();
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      data = monthlyData.map((item) => item.total);
    } else if (chartPeriod === Period.year) {
      const yearlyData = getHardcodedYearlyData();
      labels = yearlyData.map((item) => `${item.year}`);
      data = yearlyData.map((item) => item.total);
    }

    if (data.length && labels.length) {
      setChartData({
        labels,
        datasets: [
          {
            label: transactionType,
            data,
            backgroundColor: transactionType === "Income" ? "#bea77f" : "#bea77f",
            borderRadius: 4, // Slightly rounded corners for bars
            barThickness: 20, // Set a fixed bar thickness
          },
        ],
      });
    } else {
      setChartData(null);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [chartPeriod, transactionType]);

  const handleTimeRangeChange = (range) => {
    setChartPeriod(range.toLowerCase());
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (chartPeriod === Period.week) {
      newDate.setDate(newDate.getDate() - 7);
    } else if (chartPeriod === Period.month) {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (chartPeriod === Period.year) {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (chartPeriod === Period.week) {
      newDate.setDate(newDate.getDate() + 7);
    } else if (chartPeriod === Period.month) {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (chartPeriod === Period.year) {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-card-light p-4 rounded-md shadow-md mx-auto">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <div className="flex gap-2 mb-4">
          {["Week", "Month", "Year"].map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                chartPeriod === range.toLowerCase()
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      {chartData ? (
        <>
          <div className="flex justify-between items-center text-sm mb-6">
            <div>
              {currentDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </div>
            <div>
              Total {transactionType}:{" "}
              <span className="font-bold text-primary text-2xl">
                Rs {chartData.datasets[0].data.reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
          <div>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    ticks: { color: "#bea77f" },
                    grid: { display: false },
                    barPercentage: 0.7, // Reduce bar width relative to category
                    categoryPercentage: 0.8, // Adjust spacing between bars
                  },
                  y: {
                    ticks: { color: "#bea77f" },
                    grid: { color: "#E5E7EB" },
                  },
                },
              }}
              height={200} // Adjust the graph height
            />
          </div>
        </>
      ) : (
        <p className="text-center">No data available</p>
      )}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 text-sm hover:text-primary transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Prev
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 text-sm hover:text-primary transition"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
