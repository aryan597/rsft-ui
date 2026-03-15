import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  FileText, 
  Calendar,
  TrendingUp,
  ArrowRight,
  Search
} from 'lucide-react';
import { mockCandidates, mockCompanies, mockMeetings, mockJobPositions } from '../../data/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

function StatCard({ title, value, icon: Icon, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="border-4 border-black dark:border-white p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="font-mono text-3xl font-bold text-black dark:text-white">{value}</p>
          {trend && (
            <p className={`font-mono text-sm mt-2 ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`p-4 ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function DashboardHome() {
  const [animatedStats, setAnimatedStats] = useState({ candidates: 0, companies: 0, positions: 0, meetings: 0 });

  useEffect(() => {
    const targetStats = {
      candidates: mockCandidates.length,
      companies: mockCompanies.length,
      positions: mockJobPositions.filter(j => j.status === 'open').length,
      meetings: mockMeetings.filter(m => m.status === 'scheduled').length
    };

    const duration = 1000;
    const steps = 30;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedStats({
        candidates: Math.round(targetStats.candidates * progress),
        companies: Math.round(targetStats.companies * progress),
        positions: Math.round(targetStats.positions * progress),
        meetings: Math.round(targetStats.meetings * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const upcomingMeetings = mockMeetings.filter(m => m.status === 'scheduled').slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold text-black dark:text-white">Welcome back!</h1>
          <p className="font-mono text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your recruitment today.</p>
        </div>
        <Link 
          to="/rsft-ui/dashboard/candidate-scan"
          className="inline-flex items-center gap-2 px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono text-sm font-bold"
        >
          <Search size={18} />
          Search Candidates
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Candidates" 
          value={animatedStats.candidates} 
          icon={Users} 
          trend="12% this month"
          trendUp
          color="bg-black dark:bg-white"
        />
        <StatCard 
          title="Active Companies" 
          value={animatedStats.companies} 
          icon={Building2} 
          trend="3 new"
          trendUp
          color="bg-indigo-500"
        />
        <StatCard 
          title="Open Positions" 
          value={animatedStats.positions} 
          icon={FileText} 
          trend="5 urgent"
          color="bg-amber-500"
        />
        <StatCard 
          title="Today's Meetings" 
          value={animatedStats.meetings} 
          icon={Calendar} 
          color="bg-emerald-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Meetings */}
        <div className="lg:col-span-2 border-4 border-black dark:border-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-xl font-bold text-black dark:text-white">Upcoming Meetings</h2>
            <Link to="/rsft-ui/Profile" className="font-mono text-sm text-neu-accent hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div 
                key={meeting.id}
                className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
              >
                <div className="w-14 h-14 border-2 border-black dark:border-white flex flex-col items-center justify-center">
                  <span className="font-mono text-xs text-gray-500">{formatDate(meeting.date)}</span>
                  <span className="font-mono text-lg font-bold text-black dark:text-white">{meeting.time.split(':')[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono font-semibold text-black dark:text-white truncate">{meeting.title}</p>
                  <p className="font-mono text-sm text-gray-500 truncate">{meeting.candidateName}</p>
                </div>
                <div className={`
                  px-3 py-1 border-2 font-mono text-xs font-semibold
                  ${meeting.type === 'interview' ? 'border-blue-500 text-blue-500' : 
                    meeting.type === 'screening' ? 'border-purple-500 text-purple-500' : 
                    'border-amber-500 text-amber-500'}
                `}>
                  {meeting.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-4 border-black dark:border-white p-6">
          <h2 className="font-mono text-xl font-bold text-black dark:text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-4">
            <Link 
              to="/rsft-ui/dashboard/candidate-scan"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors group"
            >
              <div className="p-3 bg-black dark:bg-white text-white dark:text-black">
                <Search size={20} />
              </div>
              <div className="flex-1">
                <p className="font-mono font-semibold text-black dark:text-white">Find Candidates</p>
                <p className="font-mono text-xs text-gray-500">Search by skills, role, location</p>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/rsft-ui/matcher"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors group"
            >
              <div className="p-3 bg-indigo-500 text-white">
                <TrendingUp size={20} />
              </div>
              <div className="flex-1">
                <p className="font-mono font-semibold text-black dark:text-white">AI Matcher</p>
                <p className="font-mono text-xs text-gray-500">Match candidates to jobs</p>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/rsft-ui/Profile"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors group"
            >
              <div className="p-3 bg-emerald-500 text-white">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <p className="font-mono font-semibold text-black dark:text-white">View Profile</p>
                <p className="font-mono text-xs text-gray-500">Manage your account</p>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
         
