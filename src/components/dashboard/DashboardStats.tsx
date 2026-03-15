import React from 'react';
import { Search, Send, UserCheck, BarChart } from 'lucide-react';
import StatCard from './StatCard';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Jobs Scanned',
      value: '12',
      icon: Search,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Jobs Applied',
      value: '0',
      icon: Send,
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    },
    {
      title: 'Jobs Interviewing',
      value: '0',
      icon: UserCheck,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      title: 'Average Score',
      value: '82%',
      icon: BarChart,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}