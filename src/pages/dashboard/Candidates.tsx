import { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Mail, 
  Briefcase,
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Download
} from 'lucide-react';
import { mockCandidates } from '../../data/mockData';

export default function Candidates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const workTypes = ['all', 'remote', 'hybrid', 'onsite'];

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesWorkType = selectedWorkType === 'all' || candidate.workType === selectedWorkType;
    return matchesSearch && matchesWorkType;
  });

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'border-emerald-500 text-emerald-500';
    if (score >= 80) return 'border-blue-500 text-blue-500';
    if (score >= 70) return 'border-amber-500 text-amber-500';
    return 'border-gray-500 text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold text-black dark:text-white">Candidates</h1>
          <p className="font-mono text-gray-500 dark:text-gray-400 mt-1">Browse your candidate database</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono text-sm font-bold">
            <Download size={18} />
            Export
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-mono text-sm font-bold">
            <Users size={18} />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border-4 border-black dark:border-white p-5">
          <p className="font-mono text-2xl font-bold text-black dark:text-white">{mockCandidates.length}</p>
          <p className="font-mono text-sm text-gray-500">Total Candidates</p>
        </div>
        <div className="border-4 border-black dark:border-white p-5">
          <p className="font-mono text-2xl font-bold text-emerald-600">
            {mockCandidates.filter(c => c.matchScore >= 80).length}
          </p>
          <p className="font-mono text-sm text-gray-500">High Match (80%+)</p>
        </div>
        <div className="border-4 border-black dark:border-white p-5">
          <p className="font-mono text-2xl font-bold text-black dark:text-white">
            {mockCandidates.filter(c => c.workType === 'remote').length}
          </p>
          <p className="font-mono text-sm text-gray-500">Remote Available</p>
        </div>
        <div className="border-4 border-black dark:border-white p-5">
          <p className="font-mono text-2xl font-bold text-black dark:text-white">
            {new Set(mockCandidates.flatMap(c => c.skills)).size}
          </p>
          <p className="font-mono text-sm text-gray-500">Unique Skills</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-4 border-black dark:border-white p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white font-mono text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 dark:border-gray-700">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="bg-transparent font-mono text-sm focus:outline-none"
              >
                {workTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Work Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex rounded-sm overflow-hidden border-2 border-black dark:border-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'} transition-colors`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 ${viewMode === 'list' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'} transition-colors`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current rounded-sm h-1" />
                  <div className="bg-current rounded-sm h-1" />
                  <div className="bg-current rounded-sm h-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCandidates.map((candidate) => (
            <div 
              key={candidate.id}
              className="border-4 border-black dark:border-white p-5 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={candidate.avatar} 
                    alt={candidate.name}
                    className="w-12 h-12 border-2 border-black dark:border-white"
                  />
                  <div>
                    <h3 className="font-mono font-bold text-black dark:text-white">{candidate.name}</h3>
                    <p className="font-mono text-xs text-gray-500 truncate max-w-[120px]">{candidate.currentRole}</p>
                  </div>
                </div>
                <button className="p-1.5 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {candidate.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-0.5 border border-gray-300 dark:border-gray-600 font-mono text-xs text-black dark:text-white">
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 3 && (
                  <span className="px-2 py-0.5 border border-gray-300 dark:border-gray-600 font-mono text-xs text-gray-500">
                    +{candidate.skills.length - 3}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span className="font-mono truncate">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} />
                  <span className="font-mono">{candidate.experience} years exp.</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className={`px-3 py-1 border-2 font-mono text-xs font-semibold ${getMatchScoreColor(candidate.matchScore)}`}>
                  {candidate.matchScore}% Match
                </span>
                <span className={`px-2 py-0.5 border border-gray-300 dark:border-gray-600 font-mono text-xs text-black dark:text-white`}>
                  {candidate.workType}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div 
              key={candidate.id}
              className="border-4 border-black dark:border-white p-5 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-6">
                <img 
                  src={candidate.avatar} 
                  alt={candidate.name}
                  className="w-16 h-16 border-2 border-black dark:border-white"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-mono font-bold text-black dark:text-white">{candidate.name}</h3>
                    <span className={`px-3 py-1 border-2 font-mono text-xs font-semibold ${getMatchScoreColor(candidate.matchScore)}`}>
                      {candidate.matchScore}% Match
                    </span>
                    <span className={`px-2 py-0.5 border border-gray-300 dark:border-gray-600 font-mono text-xs text-black dark:text-white`}>
                      {candidate.workType}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-300">{candidate.currentRole}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {candidate.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={14} /> {candidate.experience} years</span>
                    <span className="flex items-center gap-1"><Mail size={14} /> {candidate.email}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {candidate.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 border border-gray-300 dark:border-gray-600 font-mono text-xs text-black dark:text-white">
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="p-3 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors">
                  <ExternalLink size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="font-mono text-gray-500">No candidates found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
