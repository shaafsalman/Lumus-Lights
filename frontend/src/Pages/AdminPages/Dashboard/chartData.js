// Hardcoded data for weekly, monthly, and yearly data

export const getHardcodedWeeklyData = (startDate, endDate, type) => {
    // Simulate weekly income/expenses for a realistic year (2023 to 2024)
    const weeklyData = [
      { dayOfWeek: 1, total: Math.floor(Math.random() * 150) + 100 },  // Monday
      { dayOfWeek: 2, total: Math.floor(Math.random() * 150) + 100 },  // Tuesday
      { dayOfWeek: 3, total: Math.floor(Math.random() * 200) + 100 },  // Wednesday
      { dayOfWeek: 4, total: Math.floor(Math.random() * 100) + 80 },   // Thursday
      { dayOfWeek: 5, total: Math.floor(Math.random() * 70) + 50 },    // Friday
      { dayOfWeek: 6, total: Math.floor(Math.random() * 250) + 150 },  // Saturday
      { dayOfWeek: 7, total: Math.floor(Math.random() * 150) + 120 },  // Sunday
    ];
    return weeklyData;
  };
  
  export const getHardcodedMonthlyData = (startDate, endDate, type) => {
    // Simulate monthly income/expenses for realistic values over 12 months
    const monthlyData = [
      { month: 1, total: Math.floor(Math.random() * 500) + 500 },  // January
      { month: 2, total: Math.floor(Math.random() * 600) + 600 },  // February
      { month: 3, total: Math.floor(Math.random() * 800) + 700 },  // March
      { month: 4, total: Math.floor(Math.random() * 900) + 800 },  // April
      { month: 5, total: Math.floor(Math.random() * 600) + 500 },  // May
      { month: 6, total: Math.floor(Math.random() * 1000) + 900 }, // June
      { month: 7, total: Math.floor(Math.random() * 700) + 600 },  // July
      { month: 8, total: Math.floor(Math.random() * 800) + 700 },  // August
      { month: 9, total: Math.floor(Math.random() * 600) + 500 },  // September
      { month: 10, total: Math.floor(Math.random() * 1000) + 900 }, // October
      { month: 11, total: Math.floor(Math.random() * 700) + 600 }, // November
      { month: 12, total: Math.floor(Math.random() * 1200) + 1000 }, // December
    ];
    return monthlyData;
  };
  
  export const getHardcodedYearlyData = (startDate, endDate, type) => {
    // Simulate yearly data with some growth (e.g., income growth in 2024)
    const yearlyData = [
      { year: 2023, total: 5000 + Math.floor(Math.random() * 2000) },  // 2023
      { year: 2024, total: 6000 + Math.floor(Math.random() * 2500) },  // 2024
    ];
    return yearlyData;
  };
  