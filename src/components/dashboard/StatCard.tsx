import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="border-4 border-black dark:border-white p-6 transform transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="font-mono text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}