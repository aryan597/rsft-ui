import { useState } from 'react';
import { ChevronRight, MapPin, Clock, ArrowRight, Search, Briefcase, Users, Zap, Shield, Globe, Heart, Star } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

function JobCard({ job, isExpanded, onToggle }: { job: Job; isExpanded: boolean; onToggle: () => void; onClick?: () => void }) {
  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-800">
      <div 
        className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={onToggle}
      >
        <div>
          <h3 className="font-mono text-xl font-bold mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1 font-mono text-sm text-gray-500">
              <Briefcase className="w-4 h-4" /> {job.department}
            </span>
            <span className="flex items-center gap-1 font-mono text-sm text-gray-500">
              <MapPin className="w-4 h-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1 font-mono text-sm text-gray-500">
              <Clock className="w-4 h-4" /> {job.type}
            </span>
          </div>
        </div>
        <ChevronRight className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
          <div className="pt-6">
            <p className="font-mono text-gray-600 dark:text-gray-300 mb-6">{job.description}</p>
            
            <h4 className="font-mono font-bold mb-4">Requirements:</h4>
            <ul className="space-y-2 mb-8">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                  <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{req}</span>
                </li>
              ))}
            </ul>
            
            <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold hover:bg-indigo-600 transition-colors flex items-center gap-2">
              APPLY NOW <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-800">
      <div className="w-12 h-12 mb-4 flex items-center justify-center bg-indigo-600 text-white">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-mono text-lg font-bold mb-2">{title}</h3>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function CultureValue({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="text-center p-8">
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-indigo-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-mono text-xl font-bold mb-4">{title}</h3>
      <p className="font-mono text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default function Careers() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const departments = ['All', 'Engineering', 'Product', 'Sales', 'Marketing', 'Customer Success', 'Operations'];

  const jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA (Remote)',
      type: 'Full-time',
      description: 'Join our engineering team to build the next generation of our candidate matching platform. You will work on challenging problems at scale and help shape the future of recruiting technology.',
      requirements: [
        '5+ years of experience with React, TypeScript, and modern frontend frameworks',
        'Strong understanding of web performance optimization',
        'Experience with state management (Redux, MobX, or similar)',
        'Excellent communication skills and ability to work cross-functionally',
        'Passion for building intuitive user experiences'
      ]
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA (Hybrid)',
      type: 'Full-time',
      description: 'Build and deploy ML models that power our candidate matching algorithm. You will work with large datasets and cutting-edge AI technologies.',
      requirements: [
        '3+ years of experience in machine learning engineering',
        'Strong proficiency in Python and ML frameworks (TensorFlow, PyTorch)',
        'Experience with NLP and recommendation systems',
        'PhD or MS in Computer Science, Statistics, or related field preferred',
        'Experience with cloud platforms (AWS, GCP, or Azure)'
      ]
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY (Remote)',
      type: 'Full-time',
      description: 'Lead product strategy for our recruiting platform. You will work closely with engineering, design, and customers to build products that solve real problems.',
      requirements: [
        '4+ years of product management experience in SaaS',
        'Strong analytical skills and data-driven decision making',
        'Excellent communication and stakeholder management',
        'Experience with agile development methodologies',
        'Background in HR tech or marketplace products preferred'
      ]
    },
    {
      id: 4,
      title: 'Enterprise Sales Representative',
      department: 'Sales',
      location: 'New York, NY (Hybrid)',
      type: 'Full-time',
      description: 'Drive new business development and manage relationships with enterprise accounts. You will represent Recept to Fortune 500 companies.',
      requirements: [
        '5+ years of enterprise software sales experience',
        'Proven track record of meeting and exceeding quotas',
        'Experience selling to HR and talent acquisition leaders',
        'Strong presentation and negotiation skills',
        'Self-motivated with ability to work independently'
      ]
    },
    {
      id: 5,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'San Francisco, CA (Remote)',
      type: 'Full-time',
      description: 'Ensure our customers achieve their hiring goals. You will be the primary point of contact for enterprise accounts and drive adoption and satisfaction.',
      requirements: [
        '3+ years in customer success or account management',
        'Experience in SaaS customer success',
        'Strong problem-solving and troubleshooting skills',
        'Excellent communication and relationship-building',
        'Ability to navigate complex organizational structures'
      ]
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain our cloud infrastructure. You will ensure reliability, scalability, and security of our platform.',
      requirements: [
        '4+ years of DevOps or SRE experience',
        'Strong experience with Kubernetes and Docker',
        'Proficiency in AWS or GCP cloud services',
        'Experience with infrastructure as code (Terraform, CloudFormation)',
        'Strong scripting skills (Python, Bash)'
      ]
    },
    {
      id: 7,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'San Francisco, CA (Hybrid)',
      type: 'Full-time',
      description: 'Lead marketing initiatives to grow brand awareness and generate leads. You will develop and execute integrated marketing campaigns.',
      requirements: [
        '4+ years of B2B SaaS marketing experience',
        'Experience with demand generation and content marketing',
        'Strong analytical skills and ROI measurement',
        'Excellent written and verbal communication',
        'Experience with marketing automation platforms'
      ]
    },
    {
      id: 8,
      title: 'Data Analyst',
      department: 'Operations',
      location: 'Remote',
      type: 'Full-time',
      description: 'Analyze data to drive business insights and product decisions. You will work across all teams to provide actionable intelligence.',
      requirements: [
        '3+ years of data analysis experience',
        'Expert in SQL and data visualization tools',
        'Experience with Python or R for analysis',
        'Strong statistical knowledge',
        'Excellent presentation skills'
      ]
    }
  ];

  const filteredJobs = selectedDepartment === 'All'
    ? jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : jobs.filter(j => j.department === selectedDepartment && (j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.description.toLowerCase().includes(searchQuery.toLowerCase())));

  const benefits = [
    { icon: Zap, title: 'Competitive Salary', description: 'Industry-leading compensation with equity for all employees.' },
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision insurance plus wellness programs.' },
    { icon: Globe, title: 'Remote First', description: 'Work from anywhere. We have employees in 20+ countries.' },
    { icon: Clock, title: 'Unlimited PTO', description: 'Take time off when you need it. We trust our team.' },
    { icon: Users, title: 'Learning Budget', description: '$2,000 annual budget for conferences, courses, and books.' },
    { icon: Shield, title: '401(k) Match', description: '6% company match on your retirement contributions.' }
  ];

  const culture = [
    { icon: Zap, title: 'MOVE FAST', description: 'We ship fast, learn faster, and always iterate.' },
    { icon: Users, title: 'TEAM FIRST', description: 'We succeed together. Ego has no place here.' },
    { icon: Heart, title: 'USER FOCUSED', description: 'Everything we do starts with user needs.' },
    { icon: Shield, title: 'BUILD TRUST', description: 'We are transparent, honest, and accountable.' },
    { icon: Globe, title: 'THINK BIG', description: 'We tackle problems that others avoid.' },
    { icon: Star, title: 'EXCELLENCE', description: 'We settle for nothing but the best.' }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-32 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)', top: '-20%', right: '-10%' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Careers</span>
            <h1 className="font-mono text-5xl md:text-7xl font-black mt-6 mb-8">
              JOIN OUR
              <span className="block text-indigo-600">MISSION</span>
            </h1>
            <p className="font-mono text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Help us transform how companies hire talent. We're looking for passionate people to join our team.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search open positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-mono text-4xl font-bold mb-4">OPEN POSITIONS</h2>
            <p className="font-mono text-gray-600 dark:text-gray-300">{filteredJobs.length} positions available</p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 font-mono text-sm font-bold border-2 transition-all ${
                  selectedDepartment === dept
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                isExpanded={expandedJob === job.id}
                onToggle={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                onClick={() => {}}
              />
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="font-mono text-xl text-gray-500">No positions found matching your criteria.</p>
              <button 
                onClick={() => { setSelectedDepartment('All'); setSearchQuery(''); }}
                className="mt-4 px-6 py-3 border-2 border-black dark:border-white font-mono font-bold hover:bg-gray-900 hover:text-white transition-colors"
              >
                VIEW ALL POSITIONS
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Perks</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">BENEFITS & PERKS</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              We take care of our team with comprehensive benefits and a great work environment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (<BenefitCard key={i} {...benefit} />))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-400">Our Way</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">CULTURE & VALUES</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culture.map((value, i) => (<CultureValue key={i} {...value} />))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-4xl font-bold mb-8">DON'T SEE THE RIGHT ROLE?</h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold text-lg border-2 border-gray-900 dark:border-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3">
              <span>SEND US YOUR RESUME</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
