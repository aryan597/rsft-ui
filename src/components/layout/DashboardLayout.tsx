import { useState, useEffect, useRef } from 'react';
import { 
  Bot, Home, Building2, Search, CircleUserRound, LogIn, Sun, Moon,
  Bell as BellIcon, MessageSquare, TrendingUp, Users, Briefcase, Calendar, 
  Plus as PlusIcon, MoreVertical, ChevronRight, MapPin, Mail, Phone, ExternalLink, CheckCircle, Send, Shield
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { mockCandidates, mockCompanies, mockMeetings, mockJobPositions } from '../../data/mockData';

type ActiveView = 'dashboard' | 'companies' | 'candidates' | 'scan' | 'profile' | 'messages' | 'activity' | 'chat';

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIContext = {
  candidates: mockCandidates,
  companies: mockCompanies,
  meetings: mockMeetings,
  positions: mockJobPositions
};

function generateAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  // Dashboard/Overview related
  if (msg.includes('overview') || msg.includes('dashboard') || msg.includes('summary') || msg.includes('today')) {
    const candidateCount = AIContext.candidates.length;
    const companyCount = AIContext.companies.length;
    const openPositions = AIContext.positions.filter(p => p.status === 'open').length;
    const todayMeetings = AIContext.meetings.filter(m => m.status === 'scheduled').length;
    const highMatchCandidates = AIContext.candidates.filter(c => c.matchScore >= 80).length;
    
    return `📊 **Today's Dashboard Overview**

• **${candidateCount}** total candidates in database
• **${companyCount}** active companies
• **${openPositions}** open positions
• **${todayMeetings}** meetings scheduled today
• **${highMatchCandidates}** candidates with 80%+ match score

What would you like to explore?`;
  }
  
  // Candidates related
  if (msg.includes('candidate') || msg.includes('talent') || msg.includes('search')) {
    const skills = [...new Set(AIContext.candidates.flatMap(c => c.skills))].slice(0, 10);
    const remoteCandidates = AIContext.candidates.filter(c => c.workType === 'remote').length;
    const highMatch = AIContext.candidates.filter(c => c.matchScore >= 90);
    
    let response = `👥 **Candidate Database**\n\n`;
    response += `Total: ${AIContext.candidates.length} candidates\n`;
    response += `Remote Available: ${remoteCandidates}\n`;
    response += `High Match (90%+): ${highMatch.length}\n\n`;
    response += `**Top Skills in Database:**\n`;
    response += skills.map(s => `• ${s}`).join('\n');
    
    return response;
  }
  
  // Companies related
  if (msg.includes('company') || msg.includes('companies') || msg.includes('client')) {
    const industries = [...new Set(AIContext.companies.map(c => c.industry))];
    const totalOpenings = AIContext.companies.reduce((acc, c) => acc + c.openPositions, 0);
    
    let response = `🏢 **Company Database**\n\n`;
    response += `Total Companies: ${AIContext.companies.length}\n`;
    response += `Total Open Positions: ${totalOpenings}\n`;
    response += `Industries: ${industries.join(', ')}\n\n`;
    response += `**Top Companies:**\n`;
    AIContext.companies.slice(0, 3).forEach(c => {
      response += `• ${c.name} - ${c.openPositions} openings\n`;
    });
    
    return response;
  }
  
  // Meetings/Schedule related
  if (msg.includes('meeting') || msg.includes('schedule') || msg.includes('agenda') || msg.includes('calendar')) {
    const upcoming = AIContext.meetings.filter(m => m.status === 'scheduled');
    
    let response = `📅 **Your Schedule**\n\n`;
    response += `Upcoming Meetings: ${upcoming.length}\n\n`;
    response += `**Today's Agenda:**\n`;
    
    if (upcoming.length > 0) {
      upcoming.slice(0, 5).forEach(m => {
        response += `• ${m.time} - ${m.title} (${m.candidateName})\n`;
      });
    } else {
      response += `No meetings scheduled. You're free! 🎉\n`;
    }
    
    return response;
  }
  
  // Positions/Jobs related
  if (msg.includes('position') || msg.includes('job') || msg.includes('opening') || msg.includes('hire')) {
    const openPositions = AIContext.positions.filter(p => p.status === 'open');
    
    let response = `💼 **Open Positions**\n\n`;
    response += `Total: ${openPositions.length} positions\n\n`;
    response += `**Recent Openings:**\n`;
    openPositions.slice(0, 5).forEach(p => {
      const company = AIContext.companies.find(c => c.id === p.companyId);
      response += `• ${p.title} at ${company?.name || 'Unknown'}\n`;
    });
    
    return response;
  }
  
  // Top candidates
  if (msg.includes('top') || msg.includes('best') || msg.includes('top candidates')) {
    const topCandidates = [...AIContext.candidates]
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
    
    let response = `⭐ **Top Matching Candidates**\n\n`;
    topCandidates.forEach((c, i) => {
      response += `${i + 1}. **${c.name}** - ${c.matchScore}% match\n`;
      response += `   ${c.currentRole} • ${c.location}\n\n`;
    });
    
    return response;
  }
  
  // Help
  if (msg.includes('help') || msg.includes('what')) {
    return `🤖 **I'm your AI Recruitment Assistant!**\n\n`;
  }
  
  // Default response
  return `I can help you with:\n\n`;
}

export default function DashboardLayout() {
  const { isDark, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    window.location.href = '/rsft-ui/';
  };

  const navItems = [
    { id: 'dashboard' as const, icon: Home, label: 'Overview' },
    { id: 'companies' as const, icon: Building2, label: 'Companies' },
    { id: 'candidates' as const, icon: Users, label: 'Candidates' },
    { id: 'scan' as const, icon: Search, label: 'Candidate Scan' },
    { id: 'chat' as const, icon: Bot, label: 'AI Assistant' },
    { id: 'messages' as const, icon: MessageSquare, label: 'Messages' },
    { id: 'activity' as const, icon: TrendingUp, label: 'Activity' },
    { id: 'profile' as const, icon: CircleUserRound, label: 'Profile' },
  ];

  return (
    <div className={`min-h-screen flex relative overflow-hidden ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Background Effects - only in dark mode */}
      {isDark && (
        <>
          <div 
            className="fixed inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: `${60 + scrollY * 0.15}px ${60 + scrollY * 0.15}px`,
            }}
          />
          
          {/* Floating Pluses - only on non-AI pages */}
          {activeView !== 'chat' && (
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="fixed text-gray-600 opacity-10 pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${15 + Math.random() * 25}px`,
                  transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
                }}
              >
                +
              </div>
            ))
          )}
        </>
      )}

      {/* Sidebar */}
      <aside className={`w-64 flex flex-col relative z-10 ${
        isDark 
          ? 'bg-black/50 backdrop-blur-xl border-r border-gray-800' 
          : 'bg-white/80 backdrop-blur-sm border-r border-gray-200'
      }`}>
        <div className={`h-16 flex items-center px-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <Bot className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          <span className={`ml-3 font-mono font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Re-Sift</span>
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
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
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
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="ml-3 font-mono">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={() => setShowSignOutModal(true)}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LogIn className="w-5 h-5" />
            <span className="ml-3 font-mono">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Header */}
        <header className={`h-16 flex items-center justify-between px-6 sticky top-0 z-20 ${
          isDark 
            ? 'bg-black/30 backdrop-blur-sm border-b border-gray-800' 
            : 'bg-white/80 backdrop-blur-sm border-b border-gray-200'
        }`}>
          <div>
            <h1 className={`font-mono text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{navItems.find(n => n.id === activeView)?.label}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className={`relative p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className={`relative p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <BellIcon className="w-5 h-5" />
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

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeView === 'dashboard' && <DashboardOverview />}
          {activeView === 'companies' && <CompaniesView />}
          {activeView === 'candidates' && <CandidatesView />}
          {activeView === 'scan' && <CandidateScanView />}
          {activeView === 'profile' && <ProfileView />}
          {activeView === 'messages' && <MessagesView />}
          {activeView === 'activity' && <ActivityView />}
          {activeView === 'chat' && <AIChatView />}
        </div>
      </main>

      {showSignOutModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 w-96 shadow-xl`}>
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

function DashboardOverview() {
  const { isDark } = useTheme();
  const stats = [
    { label: 'Total Candidates', value: mockCandidates.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Active Companies', value: mockCompanies.length, icon: Building2, color: 'bg-purple-500' },
    { label: 'Open Positions', value: mockJobPositions.filter(j => j.status === 'open').length, icon: Briefcase, color: 'bg-amber-500' },
    { label: 'Scheduled Meetings', value: mockMeetings.filter(m => m.status === 'scheduled').length, icon: Calendar, color: 'bg-green-500' },
  ];

  const recentActivity = [
    { type: 'candidate', text: 'New candidate matched: Sarah Johnson', time: '2 min ago' },
    { type: 'company', text: 'TechCorp viewed 5 candidate profiles', time: '15 min ago' },
    { type: 'interview', text: 'Interview scheduled with Michael Chen', time: '1 hour ago' },
    { type: 'message', text: 'New message from Emily Watson', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                <p className={`font-mono text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl`}>
          <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
            <h2 className={`font-mono text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming Interviews</h2>
            <button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} font-mono text-sm`}>View All</button>
          </div>
          <div className="p-6 space-y-4">
            {mockMeetings.slice(0, 4).map((meeting) => (
              <div key={meeting.id} className={`flex items-center gap-4 p-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg`}>
                <div className={`w-14 h-14 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-lg flex flex-col items-center justify-center`}>
                  <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className={`font-mono text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {new Date(meeting.date).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{meeting.title}</p>
                  <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{meeting.candidateName} • {meeting.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                  meeting.type === 'interview' ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600') :
                  meeting.type === 'screening' ? (isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600') :
                  (isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600')
                }`}>
                  {meeting.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl`}>
          <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`font-mono text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 mt-2 ${isDark ? 'bg-white' : 'bg-gray-900'} rounded-full`} />
                <div>
                  <p className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{activity.text}</p>
                  <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl`}>
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
          <h2 className={`font-mono text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Top Candidates</h2>
          <button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} font-mono text-sm flex items-center gap-1`}>
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockCandidates.slice(0, 4).map((candidate) => (
            <div key={candidate.id} className={`p-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg hover:${isDark ? 'bg-gray-900' : 'bg-gray-100'} transition-colors`}>
              <div className="flex items-center gap-3 mb-3">
                <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className={`font-mono font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{candidate.name}</p>
                  <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{candidate.currentRole}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  candidate.matchScore >= 90 ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') :
                  candidate.matchScore >= 80 ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600') :
                  (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600')
                }`}>
                  {candidate.matchScore}% Match
                </span>
                <span className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{candidate.workType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompaniesView() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  const industries = ['all', ...new Set(mockCompanies.map(c => c.industry))];
  
  const filteredCompanies = mockCompanies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || c.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Companies</h2>
          <p className={`font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{filteredCompanies.length} companies found</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-lg font-mono text-sm`}>
          <PlusIcon className="w-4 h-4" /> Add Company
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-lg font-mono text-sm focus:outline-none focus:border-white`}
          />
        </div>
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className={`px-4 py-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-lg font-mono text-sm focus:outline-none focus:border-white`}
        >
          {industries.map(i => (
            <option key={i} value={i}>{i === 'all' ? 'All Industries' : i}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div key={company.id} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border p-6 hover:border-white/30 transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-lg" />
                <div>
                  <h3 className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{company.name}</h3>
                  <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{company.industry}</p>
                </div>
              </div>
              <button className={`p-2 hover:bg-white/10 rounded-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4 line-clamp-2`}>{company.description}</p>
            <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {company.location}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {company.size}</span>
            </div>
            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex gap-4">
                <div>
                  <p className={`font-mono text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{company.openPositions}</p>
                  <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Openings</p>
                </div>
                <div>
                  <p className={`font-mono text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{company.activeRecruiters}</p>
                  <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Recruiters</p>
                </div>
              </div>
              <button className={`p-2 ${isDark ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} rounded-lg`}>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CandidatesView() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('all');
  
  const filteredCandidates = mockCandidates.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesWorkType = selectedWorkType === 'all' || c.workType === selectedWorkType;
    return matchesSearch && matchesWorkType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Candidates</h2>
          <p className={`font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{filteredCandidates.length} candidates found</p>
        </div>
        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-white/10 font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <PlusIcon className="w-4 h-4" /> Add
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-lg font-mono text-sm`}>
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: mockCandidates.length },
          { label: 'High Match (80%+)', value: mockCandidates.filter(c => c.matchScore >= 80).length },
          { label: 'Remote', value: mockCandidates.filter(c => c.workType === 'remote').length },
          { label: 'Skills', value: new Set(mockCandidates.flatMap(c => c.skills)).size },
        ].map((stat, i) => (
          <div key={i} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
            <p className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-lg font-mono text-sm focus:outline-none focus:border-white`}
          />
        </div>
        <select
          value={selectedWorkType}
          onChange={(e) => setSelectedWorkType(e.target.value)}
          className={`px-4 py-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-lg font-mono text-sm focus:outline-none focus:border-white`}
        >
          <option value="all">All Work Types</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border p-5 hover:border-white/30 transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className={`font-mono font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{candidate.name}</p>
                  <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{candidate.currentRole}</p>
                </div>
              </div>
              <button className={`p-1 hover:bg-white/10 rounded-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {candidate.skills.slice(0, 3).map((skill) => (
                <span key={skill} className={`px-2 py-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded text-xs font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 3 && (
                <span className={`px-2 py-0.5 text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>+{candidate.skills.length - 3}</span>
              )}
            </div>
            <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {candidate.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {candidate.experience}y</span>
            </div>
            <div className={`flex items-center justify-between mt-3 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                candidate.matchScore >= 90 ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') :
                candidate.matchScore >= 80 ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600') :
                (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600')
              }`}>
                {candidate.matchScore}% Match
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'} capitalize`}>{candidate.workType}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CandidateScanView() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<typeof mockCandidates>([]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const searchResults = mockCandidates.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.currentRole.toLowerCase().includes(query.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
        c.location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Candidate Scan</h2>
          <p className={`font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>AI-powered candidate matching</p>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search by role, skills, location, or keyword..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'} border rounded-lg font-mono focus:outline-none focus:border-white`}
            />
          </div>
          <button className={`px-6 py-3 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-lg font-mono flex items-center gap-2`}>
            <Search className="w-4 h-4" /> Search Candidates
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps', 'Marketing', 'Python', 'React'].map((skill) => (
            <button 
              key={skill}
              onClick={() => handleSearch(skill)}
              className={`p-3 text-left border rounded-lg hover:border-white/50 hover:bg-white/5 transition-colors font-mono text-sm ${
                isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className={`font-mono text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {results.length > 0 ? `Found ${results.length} candidates` : 'Top Matches'}
        </h3>
        {(results.length > 0 ? results : mockCandidates.slice(0, 5)).map((candidate) => (
          <div key={candidate.id} className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border p-4 flex items-center gap-4 hover:border-white/30 transition-colors`}>
            <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <p className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{candidate.name}</p>
              <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{candidate.currentRole} • {candidate.location}</p>
            </div>
            <div className="text-center px-4">
              <p className={`font-mono text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{candidate.matchScore}%</p>
              <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Match</p>
            </div>
            <button className={`px-4 py-2 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-lg font-mono text-sm`}>
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIChatView() {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'ai', content: `🤖 **Hi! I'm your AI Recruitment Assistant**\n\nI can help you with:\n\n• **Dashboard Overview** - Today's stats and summary\n• **Candidate Search** - Find talent in your database\n• **Company Info** - View company details\n• **Meetings & Schedule** - Your agenda for today\n• **Top Candidates** - Best matching talent\n\nWhat would you like to know?`, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        role: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
    
    setInput('');
  };

  const quickActions = [
    { label: '📊 Dashboard Overview', prompt: 'Give me a dashboard overview' },
    { label: '👥 Top Candidates', prompt: 'Show me top candidates' },
    { label: '📅 Today\'s Schedule', prompt: 'What is my schedule today' },
    { label: '🏢 Companies', prompt: 'Show me companies' }
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-wrap gap-2 mb-4">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => { setInput(action.prompt); }}
            className={`px-4 py-2 border rounded-lg hover:border-white/30 font-mono text-sm transition-colors ${
              isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className={`flex-1 overflow-auto rounded-xl p-4 space-y-4 ${
        isDark ? 'bg-gray-800/30 border-gray-800' : 'bg-gray-50 border-gray-200 border'
      }`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-4 ${
              msg.role === 'user' 
                ? (isDark ? 'bg-white text-black' : 'bg-gray-900 text-white')
                : (isDark ? 'bg-gray-800 border border-gray-700 text-gray-100' : 'bg-white border border-gray-200 text-gray-900')
            }`}>
              <p className="font-mono text-sm whitespace-pre-wrap">{msg.content}</p>
              <p className={`font-mono text-xs mt-2 ${msg.role === 'user' ? (isDark ? 'text-gray-500' : 'text-gray-400') : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about your recruitment data..."
          className={`flex-1 px-4 py-3 rounded-xl font-mono text-sm focus:outline-none focus:border-white ${
            isDark ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-gray-300 text-gray-900'
          }`}
        />
        <button
          onClick={handleSend}
          className={`px-6 py-3 rounded-xl font-mono flex items-center gap-2 ${
            isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
}

function ProfileView() {
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
              <span className={`font-mono text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>JD</span>
            </div>
            <div>
              <h2 className={`font-mono text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>John Doe</h2>
              <p className={`font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Senior Recruiter</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-mono ${
                isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                Pro Plan
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 border rounded-lg hover:bg-white/10 font-mono text-sm ${
              isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg`}>
            <Mail className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email</p>
              <p className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>john.doe@company.com</p>
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
        <h3 className={`font-mono text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Account Settings</h3>
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center gap-3">
              <Shield className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`font-mono font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication</p>
                <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Add an extra layer of security</p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg font-mono text-sm ${isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              Enable
            </button>
          </div>
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center gap-3">
              <BellIcon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`font-mono font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Email Notifications</p>
                <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Receive updates about candidates</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessagesView() {
  const { isDark } = useTheme();
  const messages = [
    { id: 1, name: 'Sarah Johnson', role: 'Software Engineer', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Thank you for the opportunity!', time: '2 min ago', unread: true },
    { id: 2, name: 'Michael Chen', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'When is the next interview?', time: '1 hour ago', unread: true },
    { id: 3, name: 'Emily Watson', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'I have reviewed the position...', time: '3 hours ago', unread: false },
    { id: 4, name: 'David Kim', role: 'Data Scientist', avatar: 'https://i.pravatar.cc/150?img=4', lastMessage: 'Looking forward to hearing from you', time: 'Yesterday', unread: false },
  ];

  return (
    <div className="h-full">
      <h2 className={`font-mono text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Messages</h2>
      <div className={`${isDark ? 'bg-gray-800/30 border-gray-800' : 'bg-white border-gray-200'} border divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-200'}`}>
        {messages.map((message) => (
          <div key={message.id} className={`p-4 flex items-center gap-4 hover:bg-white/5 cursor-pointer ${isDark ? '' : 'hover:bg-gray-50'}`}>
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
              <p className={`font-mono text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} truncate`}>{message.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityView() {
  const { isDark } = useTheme();
  const activities = [
    { type: 'candidate', text: 'New candidate registered: Sarah Johnson', time: '5 min ago', icon: Users },
    { type: 'company', text: 'Company "TechCorp" added a new job posting', time: '1 hour ago', icon: Building2 },
    { type: 'interview', text: 'Interview completed with Michael Chen', time: '2 hours ago', icon: CheckCircle },
    { type: 'search', text: 'Performed candidate search: "React Developer"', time: '3 hours ago', icon: Search },
    { type: 'profile', text: 'Candidate "Emily Watson" updated profile', time: 'Yesterday', icon: CircleUserRound },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`font-mono text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Activity Log</h2>
      <div className={`${isDark ? 'bg-gray-800/30 border-gray-800' : 'bg-white border-gray-200'} border divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-200'}`}>
        {activities.map((activity, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <activity.icon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1">
              <p className={`font-mono ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{activity.text}</p>
              <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
