import React from 'react';
import { ExternalLink } from 'lucide-react';

const recentScans = [
  {
    id: 1,
    title: 'Machine Learning Engineer',
    company: 'Lloyds Banking Group',
    status: 'Accepted',
    score: 93,
    daysAgo: 64
  },
  {
    id: 2,
    title: 'LLM Engineer',
    company: 'Xapien',
    status: 'Rejected',
    score: 88,
    daysAgo: 66
  },
  {
    id: 3,
    title: 'AI Specialist',
    company: 'BJSS',
    score: 77,
    status: 'InProgress',
    daysAgo: 74
  },
  {
    id: 4,
    title: 'Software Engineer (Applied ML Research Engineering)',
    company: 'Isomorphic Labs',
    status: 'InProgress',
    score: 81,
    daysAgo: 74
  }
];

export default function RecentScans() {
  return (
    <div className="space-y-8 px-4 py-16">
      {recentScans.map((scan) => (
        <div
          key={scan.id}
          className={`transform transition duration-300 hover:-translate-y-1 border-2 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${scan.status === 'Accepted' ? 'border-green-500' : scan.status === 'Rejected' ? 'border-red-500' : 'border-yellow-500'}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-mono font-bold">{scan.title}</h3>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{scan.company}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-mono font-bold">{scan.score}%</p>
                <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  {scan.daysAgo} days ago
                </p>
              </div>
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}