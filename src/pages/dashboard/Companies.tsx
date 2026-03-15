import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Briefcase,
  Search,
  Plus,
  Filter,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { mockCompanies } from '../../data/mockData';

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = ['all', ...new Set(mockCompanies.map(c => c.industry))];

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold text-black dark:text-white">Companies</h1>
          <p className="font-mono text-gray-500 dark:text-gray-400 mt-1">Manage companies and their recruitment needs</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono text-sm font-bold">
          <Plus size={18} />
          Add Company
        </button>
      </div>

      {/* Search and Filters */}
      <div className="border-4 border-black dark:border-white p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white font-mono text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 dark:border-gray-700">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-transparent font-mono text-sm focus:outline-none"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border-4 border-black dark:border-white p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 border-2 border-black dark:border-white">
              <Building2 size={24} />
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-black dark:text-white">{mockCompanies.length}</p>
              <p className="font-mono text-sm text-gray-500">Total Companies</p>
            </div>
          </div>
        </div>
        <div className="border-4 border-black dark:border-white p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 border-2 border-black dark:border-white bg-indigo-500 text-white">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-black dark:text-white">
                {mockCompanies.reduce((acc, c) => acc + c.openPositions, 0)}
              </p>
              <p className="font-mono text-sm text-gray-500">Open Positions</p>
            </div>
          </div>
        </div>
        <div className="border-4 border-black dark:border-white p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 border-2 border-black dark:border-white bg-emerald-500 text-white">
              <Users size={24} />
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-black dark:text-white">
                {mockCompanies.reduce((acc, c) => acc + c.activeRecruiters, 0)}
              </p>
              <p className="font-mono text-sm text-gray-500">Active Recruiters</p>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div 
            key={company.id}
            className="border-4 border-black dark:border-white p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-14 h-14 border-2 border-black dark:border-white"
                />
                <div>
                  <h3 className="font-mono font-bold text-black dark:text-white">{company.name}</h3>
                  <p className="font-mono text-sm text-gray-500">{company.industry}</p>
                </div>
              </div>
              <button className="p-2 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors">
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>

            <p className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {company.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} />
                <span className="font-mono">{company.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users size={16} />
                <span className="font-mono">{company.size} employees</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="font-mono font-bold text-black dark:text-white">{company.openPositions}</p>
                  <p className="font-mono text-xs text-gray-500">Positions</p>
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-black dark:text-white">{company.activeRecruiters}</p>
                  <p className="font-mono text-xs text-gray-500">Recruiters</p>
                </div>
              </div>
              <button className="p-2 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors">
                <ExternalLink size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="font-mono text-gray-500">No companies found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
