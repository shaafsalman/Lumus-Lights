import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import DashboardCard from './DashboardCard';
import SalesStats from './SalesStats';
import SummaryChart from './SummaryChart';
import ItemsSoldCard from './ItemSoldCard';
import CategoriesPieChart from './CategoriesPieChart';

const statsData = [
  { icon: <DollarSign size={24} />, title: 'Total Sales', value: 'Rs12,345' },
  { icon: <Users size={24} />, title: 'Active Users', value: 1287 },
  { icon: <ShoppingCart size={20} />, title: 'New Orders', value: 34 },
  { icon: <TrendingUp size={24} />, title: 'Revenue', value: 'Rs45,678' },
];

const Dashboard = () => {
  return (
    <div className="font-Publica flex flex-col p-4 overflow-y-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  mr-6">
        {statsData.map((stat, index) => (
          <DashboardCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Summary Chart in Full Row */}
      <div className="mb-4 mr-6">
        <SummaryChart />
      </div>

      {/* Other Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ItemsSoldCard />
        <CategoriesPieChart />
      </div>
    </div>
  );
};

export default Dashboard;
