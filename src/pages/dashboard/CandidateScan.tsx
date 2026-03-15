import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  SlidersHorizontal,
  X,
  Sparkles
} from 'lucide-react';
import { mockCandidates, mockSkills, mockLocations, mockRoles } from '../../data/mockData';

interface Filters {
  role: string;
  location: string;
  workType: string;
  skills: string[];
  minExperience: number;
  minMatchScore: number;
}

export default function CandidateScan() {
  const [filters, setFilters] = useState<Filters>({
    role: '',
    location: '',
    workType: '',
    skills: [],
    minExperience: 0,
    minMatchScore: 0
  });
  const [showFilters, setShowFilters] = useState(true);
  const [skillSearch, setSkillSearch] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      if (filters.role && !candidate.targetRoles.some(r => r.toLowerCase().includes(filters.role.toLowerCase())) &&
          !candidate.currentRole.toLowerCase().includes(filters.role.toLowerCase())) {
        return false;
      }
      if (filters.location && !candidate.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.workType && candidate.workType !== filters.workType) {
        return false;
      }
      if (filters.skills.length > 0 && !filters.skills.some(skill => 
        candidate.skills.some(s => s.toLowerCase() === skill.toLowerCase())
      )) {
        return false;
      }
      if (candidate.experience < filters.minExperience) {
        return false;
      }
      if (candidate.matchScore < filters.minMatchScore) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const availableSkills = mockSkills.filter(skill => 
    skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
    !filters.skills.includes(skill)
  );

  const addSkill = (skill: string) => {
    setFilters(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    setSkillSearch('');
    setShowSkillDropdown(false);
  };

  const removeSkill = (skill: string) => {
    setFilters(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const clearFilters = () => {
    setFilters({
      role: '',
      location: '',
      workType: '',
      skills: [],
      minExperience: 0,
      minMatchScore: 0
    });
  };

  const activeFilterCount = [
    filters.role,
    filters.location,
    filters.workType,
    filters.skills.length > 0,
    filters.minExperience > 0,
    filters.minMatchScore > 0
  ].filter(Boolean).length;

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-gray-600';
  };

  const getWorkTypeColor = (type: string) => {
    switch (type) {
      case 'remote': return 'border-purple-500 text-purple-500';
      case 'hybrid': return 'border-indigo-500 text-indigo-500';
      case 'onsite': return 'border-cyan-500 text-cyan-500';
      default: return 'border-gray-500 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold text-black dark:text-white">Candidate Scan</h1>
          <p className="font-mono text-gray-500 dark:text-gray-400 mt-1">
            Found {filteredCandidates.length} candidates matching your criteria
          </p>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-6 py-3 border-4 border-black dark:border-white transition-colors font-mono text-sm font-bold
            ${showFilters ? 'bg-black dark:bg-white text-white dark:text-black' : 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'}`}
        >
          <SlidersHorizontal size={18} />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:w-80 space-y-4">
            <div className="border-4 border-black dark:border-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-mono font-bold text-black dark:text-white">Filters</h2>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="font-mono text-sm text-black dark:text-white hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Role Search */}
                <div>
                  <label className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2 block">Target Role</label>
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer"
                      value={filters.role}
                      onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                      list="roles"
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white font-mono text-sm focus:outline-none"
                    />
                    <datalist id="roles">
                      {mockRoles.map(role => (
                        <option key={role} value={role} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. San Francisco"
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      list="locations"
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white font-mono text-sm focus:outline-none"
                    />
                    <datalist id="locations">
                      {mockLocations.map(loc => (
                        <option key={loc} value={loc} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Work Type */}
                <div>
                  <label className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2 block">Work Type</label>
                  <div className="flex gap-2">
                    {['all', 'remote', 'hybrid', 'onsite'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilters(prev => ({ ...prev, workType: type === 'all' ? '' : type }))}
                        className={`flex-1 px-3 py-2 border-2 font-mono text-sm transition-all
                          ${(type === 'all' ? !filters.workType : filters.workType === type)
                            ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white'
                          }`}
                      >
                        {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2 block">Required Skills</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search skills..."
                      value={skillSearch}
                      onChange={(e) => {
                        setSkillSearch(e.target.value);
                        setShowSkillDropdown(true);
                      }}
                      onFocus={() => setShowSkillDropdown(true)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white font-mono text-sm focus:outline-none"
                    />
                    {showSkillDropdown && availableSkills.length > 0 && (
                      <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-white max-h-48 overflow-y-auto">
                        {availableSkills.slice(0, 8).map(skill => (
                          <button
                            key={skill}
                            onClick={() => addSkill(skill)}
                            className="w-full px-4 py-2 text-left font-mono text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {filters.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {filters.skills.map(skill => (
                        <span 
                          key={skill} 
                          className="inline-flex items-center gap-1 px-3 py-1 border-2 border-black dark:border-white font-mono text-sm"
                        >
                          {skill}
                          <button onClick={() => removeSkill(skill)}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2 block">
                    Min Experience: {filters.minExperience}+ years
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.minExperience}
                    onChange={(e) => setFilters(prev => ({ ...prev, minExperience: parseInt(e.target.value) }))}
                    className="w-full accent-black dark:accent-white"
                  />
                  <div className="flex justify-between font-mono text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>10+ years</span>
                  </div>
                </div>

                {/* Match Score */}
                <div>
                  <label className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2 block">
                    Min Match Score: {filters.minMatchScore}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={filters.minMatchScore}
                    onChange={(e) => setFilters(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }))}
                    className="w-full accent-black dark:accent-white"
                  />
                  <div className="flex justify-between font-mono text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          {filteredCandidates.length > 0 ? (
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div 
                  key={candidate.id}
                  className="border-4 border-black dark:border-white p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Left - Avatar & Basic Info */}
                    <div className="flex items-center gap-4 lg:w-64">
                      <img 
                        src={candidate.avatar} 
                        alt={candidate.name}
                        className="w-16 h-16 border-2 border-black dark:border-white"
                      />
                      <div>
                        <h3 className="font-mono font-bold text-black dark:text-white">{candidate.name}</h3>
                        <p className="font-mono text-sm text-gray-500">{candidate.currentRole}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`font-mono text-lg font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
                            {candidate.matchScore}%
                          </span>
                          <span className="font-mono text-xs text-gray-400">match</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle - Details */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="font-mono">{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Briefcase size={16} className="text-gray-400" />
                        <span className="font-mono">{candidate.experience} years exp.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 border-2 font-mono text-xs font-semibold ${getWorkTypeColor(candidate.workType)}`}>
                          {candidate.workType}
                        </span>
                      </div>
                    </div>

                    {/* Right - Skills & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="hidden lg:flex flex-wrap gap-1 max-w-[200px]">
                        {candidate.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="px-2 py-0.5 border border-gray-300 dark:border-gray-600 font-mono text-xs text-black dark:text-white">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-mono text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                          View
                        </button>
                        <button className="px-4 py-2 border-2 border-black dark:border-white font-mono text-sm font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                          <Sparkles size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Skills (mobile) */}
                  <div className="lg:hidden flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {candidate.skills.slice(0, 6).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 border border-gray-300 dark:border-gray-600 font-mono text-xs text-black dark:text-white">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-4 border-black dark:border-white p-12 text-center">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-mono text-xl font-bold text-black dark:text-white mb-2">No candidates found</h3>
              <p className="font-mono text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters to find more candidates</p>
              <button 
                onClick={clearFilters}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
