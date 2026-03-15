import { useState } from 'react';
import { 
  Briefcase, Search, User, MessageSquare, Bell, LogOut,
  MapPin, Clock, DollarSign, Building2, Users, Star, Send, CheckCircle,
  ChevronRight, Edit2, Upload, Mail, Phone, ExternalLink, Eye
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type ActiveView = 'jobs' | 'applied' | 'network' | 'profile' | 'messages';

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  applicants: number;
  matchScore: number;
  description: string;
  requirements: string[];
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    companyLogo: 'https://i.pravatar.cc/150?img=10',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$150,000 - $200,000',
    posted: '2 days ago',
    applicants: 45,
    matchScore: 92,
    description: 'We are looking for a Senior Software Engineer to join our team...',
    requirements: ['5+ years experience', 'React', 'Node.js', 'TypeScript']
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'InnovateLabs',
    companyLogo: 'https://i.pravatar.cc/150?img=11',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    posted: '1 day ago',
    applicants: 32,
    matchScore: 85,
    description: 'Join our product team to drive innovation...',
    requirements: ['3+ years PM experience', 'Agile', 'Data-driven']
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'DesignHub',
    companyLogo: 'https://i.pravatar.cc/150?img=12',
    location: 'New York, NY',
    type: 'Hybrid',
    salary: '$90,000 - $130,000',
    posted: '3 days ago',
    applicants: 28,
    matchScore: 78,
    description: 'Create beautiful user experiences...',
    requirements: ['Figma', 'User Research', 'Prototyping']
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'DataWorks',
    companyLogo: 'https://i.pravatar.cc/150?img=13',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130,000 - $180,000',
    posted: '5 hours ago',
    applicants: 56,
    matchScore: 88,
    description: 'Build ML models at scale...',
    requirements: ['Python', 'TensorFlow', 'SQL', 'Statistics']
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudFirst',
    companyLogo: 'https://i.pravatar.cc/150?img=14',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140,000 - $190,000',
    posted: '1 day ago',
    applicants: 23,
    matchScore: 82,
    description: 'Manage cloud infrastructure...',
    requirements: ['AWS', 'Kubernetes', 'CI/CD', 'Terraform']
  }
];

const mockAppliedJobs = [
  { id: 1, job: mockJobs[0], status: 'interview', date: '2024-01-15' },
  { id: 2, job: mockJobs[1], status: 'pending', date: '2024-01-18' },
  { id: 3, job: mockJobs[2], status: 'rejected', date: '2024-01-10' },
];

const mockRecruiters = [
  { id: 1, name: 'Sarah Johnson', company: 'TechCorp', avatar: 'https://i.pravatar.cc/150?img=20', role: 'Senior Recruiter', connected: true },
  { id: 2, name: 'Michael Chen', company: 'InnovateLabs', avatar: 'https://i.pravatar.cc/150?img=21', role: 'HR Manager', connected: false },
  { id: 3, name: 'Emily Watson', company: 'DesignHub', avatar: 'https://i.pravatar.cc/150?img=22', role: 'Talent Lead', connected: true },
  { id: 4, name: 'David Kim', company: 'DataWorks', avatar: 'https://i.pravatar.cc/150?img=23', role: 'Recruiter', connected: false },
];

export default function CandidateDashboard() {
  const { isDark, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState<ActiveView>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const navItems = [
    { id: 'jobs' as const, icon: Briefcase, label: 'Find Jobs' },
    { id: 'applied' as const, icon: CheckCircle, label: 'Applied' },
    { id: 'network' as const, icon: Users, label: 'Network' },
    { id: 'messages' as const, icon: MessageSquare, label: 'Messages' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  const handleSignOut = () => {
    window.location.href = '/rsft-ui/';
  };

  const filteredJobs = mockJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex relative overflow-hidden ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 flex-col relative z-10 hidden md:flex ${
        isDark 
          ? 'bg-black/50 backdrop-blur-xl border-r border-gray-800' 
          : 'bg-white/80 backdrop-blur-sm border-r border-gray-200'
      }`}>
        <div className={`h-16 flex items-center px-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <Briefcase className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          <span className={`ml-3 font-mono font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Re-Sift</span>
          <span className={`ml-2 px-2 py-0.5 text-xs font-mono rounded ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>CANDIDATE</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                activeView === item.id
                  ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  : isDark ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-3 font-mono font-medium">{item.label}</span>
              {item.id === 'messages' && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
              )}
            </button>
          ))}
        </nav>

        <div className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} space-y-2`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isDark ? <Star className="w-5 h-5" /> : <Star className="w-5 h-5" />}
            <span className="ml-3 font-mono">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={() => setShowSignOutModal(true)}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3 font-mono">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Header */}
        <header className={`h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 ${
          isDark 
            ? 'bg-black/30 backdrop-blur-sm border-b border-gray-800' 
            : 'bg-white/80 backdrop-blur-sm border-b border-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2" onClick={() => {}}>
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
              </div>
            </button>
            <h1 className={`font-mono text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {navItems.find(n => n.id === activeView)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className={`relative p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className={`relative p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <Bell className="w-5 h-5" />
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                isDark ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
              }`}>3</span>
            </button>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDark ? 'bg-white' : 'bg-gray-900'
            }`}>
              <span className={`font-mono font-bold text-sm ${isDark ? 'text-black' : 'text-white'}`}>JD</span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-around py-2 border-t border-gray-800 bg-black/90 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg ${
                activeView === item.id ? 'text-white' : 'text-gray-500'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-mono mt-1">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6 pb-24 md:pb-6">
          {activeView === 'jobs' && (
            <JobsView 
              jobs={filteredJobs} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              isDark={isDark}
            />
          )}
          {activeView === 'applied' && (
            <AppliedJobsView jobs={mockAppliedJobs} isDark={isDark} />
          )}
          {activeView === 'network' && (
            <NetworkView recruiters={mockRecruiters} isDark={isDark} />
          )}
          {activeView === 'messages' && (
            <MessagesView isDark={isDark} />
          )}
          {activeView === 'profile' && (
            <ProfileView isDark={isDark} />
          )}
        </div>
      </main>

      {showSignOutModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 w-full max-w-sm shadow-xl`}>
            <h2 className={`font-mono text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sign Out</h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Are you sure you want to sign out?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutModal(false)}
                className={`flex-1 px-4 py-2 border rounded-lg hover:bg-white/10 font-mono ${
                  isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-mono"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function JobsView({ jobs, searchQuery, setSearchQuery, isDark }: { jobs: Job[]; searchQuery: string; setSearchQuery: (q: string) => void; isDark: boolean }) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search jobs, companies, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono text-sm focus:outline-none focus:border-white ${
              isDark ? 'bg-gray-800 border-gray-700 border text-white' : 'bg-white border-gray-300 border text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Job Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Available Jobs', value: jobs.length },
          { label: 'Remote', value: jobs.filter(j => j.location.toLowerCase().includes('remote')).length },
          { label: 'High Match (80%+)', value: jobs.filter(j => j.matchScore >= 80).length },
          { label: 'Applied This Week', value: 3 },
        ].map((stat, i) => (
          <div key={i} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
            <p className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 md:p-6 hover:border-white/30 transition-all`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-lg" />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className={`font-mono font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>
                    <div className={`flex flex-wrap items-center gap-2 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${
                      job.matchScore >= 90 ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') :
                      job.matchScore >= 80 ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600') :
                      (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600')
                    }`}>
                      {job.matchScore}% Match
                    </span>
                  </div>
                </div>
                
                <div className={`flex flex-wrap gap-4 mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.posted}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {job.applicants} applicants</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {job.requirements.slice(0, 3).map((req) => (
                    <span key={req} className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                      {req}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    className={`px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 ${
                      isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button className={`px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 ${
                    isDark ? 'border border-gray-600 text-white hover:bg-white/10' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}>
                    <Send className="w-4 h-4" /> Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppliedJobsView({ jobs, isDark }: { jobs: { id: number; job: Job; status: string; date: string }[]; isDark: boolean }) {
  const statusColors: Record<string, string> = {
    pending: isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600',
    interview: isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600',
    rejected: isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600',
    offered: isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600',
  };

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h2 className={`font-mono text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Application Status</h2>
        <div className="grid grid-cols-3 gap-4">
          {['pending', 'interview', 'rejected'].map((status) => (
            <div key={status} className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
              <p className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {jobs.filter(j => j.status === status).length}
              </p>
              <p className={`font-mono text-sm capitalize ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((application) => (
          <div key={application.id} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 md:p-6`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <img src={application.job.companyLogo} alt={application.job.company} className="w-12 h-12 rounded-lg" />
              <div className="flex-1">
                <h3 className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{application.job.title}</h3>
                <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{application.job.company}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-mono capitalize ${statusColors[application.status]}`}>
                  {application.status}
                </span>
                <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkView({ recruiters, isDark }: { recruiters: { id: number; name: string; company: string; avatar: string; role: string; connected: boolean }[]; isDark: boolean }) {
  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h2 className={`font-mono text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Network</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
            <p className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{recruiters.filter(r => r.connected).length}</p>
            <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Connected</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
            <p className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{recruiters.length}</p>
            <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Available</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recruiters.map((recruiter) => (
          <div key={recruiter.id} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 md:p-6`}>
            <div className="flex items-start gap-4">
              <img src={recruiter.avatar} alt={recruiter.name} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <h3 className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{recruiter.name}</h3>
                <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{recruiter.role} at {recruiter.company}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className={`flex-1 px-4 py-2 rounded-lg font-mono text-sm ${
                recruiter.connected 
                  ? (isDark ? 'border border-gray-600 text-white' : 'border border-gray-300 text-gray-700')
                  : (isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800')
              }`}>
                {recruiter.connected ? 'Message' : 'Connect'}
              </button>
              <button className={`px-4 py-2 rounded-lg font-mono text-sm ${
                isDark ? 'border border-gray-600 text-white hover:bg-white/10' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesView({ isDark }: { isDark: boolean }) {
  const messages = [
    { id: 1, name: 'Sarah Johnson', company: 'TechCorp', avatar: 'https://i.pravatar.cc/150?img=20', lastMessage: 'Hi! I saw your application for the Senior Software Engineer role...', time: '2 min ago', unread: true },
    { id: 2, name: 'Michael Chen', company: 'InnovateLabs', avatar: 'https://i.pravatar.cc/150?img=21', lastMessage: 'Thanks for applying! We would like to schedule an interview...', time: '1 hour ago', unread: true },
    { id: 3, name: 'Emily Watson', company: 'DesignHub', avatar: 'https://i.pravatar.cc/150?img=22', lastMessage: 'Your portfolio looks great!', time: 'Yesterday', unread: false },
  ];

  return (
    <div className={`${isDark ? 'bg-gray-800/30 border-gray-800' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
      {messages.map((message) => (
        <div key={message.id} className={`p-4 flex items-center gap-4 hover:bg-white/5 cursor-pointer border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="relative">
            <img src={message.avatar} alt={message.name} className="w-12 h-12 rounded-full" />
            {message.unread && (
              <span className={`absolute bottom-0 right-0 w-3 h-3 ${isDark ? 'bg-green-500 border-gray-900' : 'bg-green-500 border-white'} rounded-full border-2`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{message.name}</p>
              <span className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{message.time}</span>
            </div>
            <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} truncate`}>{message.lastMessage}</p>
            <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{message.company}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileView({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
              <span className={`font-mono text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>JD</span>
            </div>
            <div>
              <h2 className={`font-mono text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>John Doe</h2>
              <p className={`font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Senior Software Engineer</p>
              <div className={`flex items-center gap-1 mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <MapPin className="w-4 h-4" />
                <span className="font-mono text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <button className={`px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 ${
            isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}>
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg`}>
            <Mail className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email</p>
              <p className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>john.doe@email.com</p>
            </div>
          </div>
          <div className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg`}>
            <Phone className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Phone</p>
              <p className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className={`font-mono text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'PostgreSQL', 'GraphQL', 'Docker'].map((skill) => (
            <span key={skill} className={`px-3 py-1 rounded-full font-mono text-sm ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className={`font-mono text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Completion</h3>
        <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
        </div>
        <p className={`font-mono text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>75% complete - Add your resume to increase visibility</p>
        <button className={`mt-4 px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 ${
          isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}>
          <Upload className="w-4 h-4" /> Upload Resume
        </button>
      </div>
    </div>
  );
}
