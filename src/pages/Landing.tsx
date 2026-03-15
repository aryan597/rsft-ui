import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronDown, Star, Zap, TrendingUp, Users, Building2, Search, Briefcase, Handshake, Target, Clock, Mail } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { mockCandidates } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

type UserType = 'recruiter' | 'candidate';

function FeatureCard({ icon: Icon, title, description, index }: { icon: React.ElementType; title: string; description: string; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group p-8 bg-white dark:bg-gray-800 border-2 border-black dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 mb-6 flex items-center justify-center bg-black dark:bg-white text-white dark:text-gray-900 group-hover:bg-white group-hover:text-black transition-colors duration-300">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-mono text-xl font-bold mb-3">{title}</h3>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

function HowItWorks({ userType }: { userType: UserType }) {
  const steps = userType === 'recruiter' ? [
    { number: '01', title: 'BUILD', description: 'Candidates create profiles. Recruiters gain access to a premium talent database built from global candidate data.' },
    { number: '02', title: 'MATCH', description: 'AI-powered search finds perfect matches. Algorithms analyze skills, experience, and cultural fit with 95% accuracy.' },
    { number: '03', title: 'HIRE', description: 'Connect directly through our platform. Track candidates through your pipeline and make data-driven decisions.' }
  ] : [
    { number: '01', title: 'CREATE', description: 'Build your professional profile. Showcase your skills, experience, and career preferences to stand out to recruiters.' },
    { number: '02', title: 'DISCOVER', description: 'Browse curated job openings from top companies. Get matched with roles that align with your skills and goals.' },
    { number: '03', title: 'CONNECT', description: 'Direct access to recruiters. Receive interview requests and track your application status in real-time.' }
  ];

  return (
    <section className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Process</span>
          <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">HOW IT WORKS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < 2 && <div className="hidden md:block absolute top-1/2 left-full w-16 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent" />}
              <div className="p-8 border-4 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(167,139,250,1)] transition-all duration-300 hover:-translate-y-2">
                <span className="font-mono text-6xl font-bold text-gray-200 dark:text-gray-700">{step.number}</span>
                <h3 className="font-mono text-2xl font-bold mt-4 mb-4">{step.title}</h3>
                <p className="font-mono text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)`,
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-400">Testimonials</span>
          <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">TRUSTED BY INDUSTRY LEADERS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: "Recept transformed how we source candidates. The AI matching saved us 20+ hours per week.", author: "Sarah Chen", role: "Head of Talent, TechCorp", rating: 5 },
            { quote: "The candidate database quality is unmatched. We've hired 3 senior engineers in the last month.", author: "Michael Roberts", role: "Senior Recruiter, InnovateLabs", rating: 5 },
            { quote: "Finally, a platform that bridges the gap between recruiters and great talent effectively.", author: "Emily Watson", role: "HR Director, FutureScale", rating: 5 }
          ].map((testimonial, i) => (
            <div key={i} className="p-8 border-2 border-gray-700 hover:border-indigo-500 transition-colors duration-300">
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, j) => (<Star key={j} className="w-5 h-5 fill-indigo-500 text-indigo-500" />))}
              </div>
              <p className="font-mono text-lg text-gray-300 mb-8 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-mono font-bold text-lg">{testimonial.author}</p>
                <p className="font-mono text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ userType, onSignInClick }: { userType: UserType; onSignInClick?: () => void }) {
  const ctaContent = userType === 'recruiter' ? {
    title: 'READY TO TRANSFORM YOUR HIRING?',
    description: 'Join thousands of recruiters who have upgraded their talent acquisition with AI-powered tools.',
    primaryButton: 'START HIRING',
    secondaryButton: 'WATCH DEMO'
  } : {
    title: 'READY TO ADVANCE YOUR CAREER?',
    description: 'Create your profile and get discovered by top recruiters. Your next opportunity is just a click away.',
    primaryButton: 'CREATE PROFILE',
    secondaryButton: 'BROWSE JOBS'
  };

  return (
    <section className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-mono text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">{ctaContent.title}</h2>
        <p className="font-mono text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">{ctaContent.description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={onSignInClick} className="group px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold text-lg border-2 border-gray-900 dark:border-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3">
            <span>{ctaContent.primaryButton}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono font-bold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            <span>{ctaContent.secondaryButton}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

const recruiterFeatures = [
  { icon: Users, title: 'CANDIDATE DATABASE', description: 'Access thousands of curated candidate profiles with detailed skills, experience, and compatibility scores powered by AI.' },
  { icon: Building2, title: 'COMPANY HUB', description: 'Manage all your client companies in one place. Track job openings, hiring managers, and recruitment pipelines.' },
  { icon: Search, title: 'SMART CANDIDATE SCAN', description: 'AI-powered search that finds perfect matches based on skills, experience, location, and cultural fit.' },
  { icon: Zap, title: 'AI MATCHING', description: 'Our intelligent algorithms match candidates to positions with 95% accuracy, saving hours of manual screening.' },
  { icon: TrendingUp, title: 'ANALYTICS DASHBOARD', description: 'Real-time insights into your recruitment pipeline. Track metrics, measure performance, optimize workflows.' },
  { icon: Star, title: 'DATA SECURITY', description: 'Enterprise-grade security with encrypted data storage, GDPR compliance, and role-based access control.' }
];

const candidateFeatures = [
  { icon: Briefcase, title: 'JOB MATCHING', description: 'AI-powered job recommendations tailored to your skills, experience, and career goals.' },
  { icon: Handshake, title: 'DIRECT RECRUITER ACCESS', description: 'Connect directly with recruiters. No middlemen - straight to the hiring team.' },
  { icon: Target, title: 'APPLICATION TRACKING', description: 'Track all your applications in one place. Know exactly where each application stands.' },
  { icon: Clock, title: 'REAL-TIME NOTIFICATIONS', description: 'Get instant updates on new jobs, interview requests, and application status changes.' },
  { icon: Mail, title: 'EMAIL INTEGRATION', description: 'Built-in email tools to communicate with recruiters directly from the platform.' },
  { icon: Zap, title: 'PROFILE OPTIMIZATION', description: 'AI suggestions to improve your profile and increase your visibility to recruiters.' }
];

interface LandingProps {
  onSignInClick?: () => void;
}

export default function Landing({ onSignInClick }: LandingProps) {
  const { isDark } = useTheme();
  const [userType, setUserType] = useState<UserType>('recruiter');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockCandidates>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = mockCandidates.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.currentRole.toLowerCase().includes(query.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const features = userType === 'recruiter' ? recruiterFeatures : candidateFeatures;
  
  const heroContent = userType === 'recruiter' ? {
    title: 'HIRE SMARTER.',
    titleAccent: 'FASTER.',
    titleEnd: 'BETTER.',
    description: 'Access a premium database of 50,000+ vetted candidates. AI-powered matching. Instant insights. Start hiring today.',
    cta: 'START HIRING',
    demo: 'BOOK DEMO',
    proof: '2,500+ recruiters already hiring'
  } : {
    title: 'FIND YOUR',
    titleAccent: 'PERFECT JOB.',
    titleEnd: 'GET HIRED.',
    description: 'Create your profile and get discovered by top companies. Direct access to recruiters. Fast-track your career today.',
    cta: 'CREATE PROFILE',
    demo: 'BROWSE JOBS',
    proof: '10,000+ jobs from top companies'
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col overflow-x-hidden">
      <Navbar onSignInClick={onSignInClick} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)', top: '-20%', right: '-10%' }} />
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)', bottom: '-20%', left: '-10%' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* User Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className={`flex border-2 border-black dark:border-white ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setUserType('recruiter')}
                  className={`flex items-center px-6 py-2 font-mono text-sm font-bold transition-all ${
                    userType === 'recruiter'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  FOR RECRUITERS
                </button>
                <button
                  onClick={() => setUserType('candidate')}
                  className={`flex items-center px-6 py-2 font-mono text-sm font-bold transition-all ${
                    userType === 'candidate'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  FOR CANDIDATES
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-gray-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-sm font-bold tracking-wider">NOW LIVE</span>
                </div>

                <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1]">
                  <span className="block">{heroContent.title}</span>
                  <span className="block text-indigo-600">{heroContent.titleAccent}</span>
                  <span className="block">{heroContent.titleEnd}</span>
                </h1>

                <p className="font-mono text-lg text-gray-600 dark:text-gray-300 max-w-md">
                  {heroContent.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={onSignInClick}
                    className="group px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold text-center border-2 border-gray-900 dark:border-white hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,1)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <span>{heroContent.cta}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>{heroContent.demo}</span>
                  </button>
                </div>

                <div className="pt-4">
                  <div className="flex -space-x-3">
                    {['JD', 'SC', 'MR', 'EW', '+2K'].map((name, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white border-2 border-white dark:border-gray-900 flex items-center justify-center">
                        <span className="font-mono text-xs font-bold text-white dark:text-gray-900">{name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-sm text-gray-500 mt-3">
                    <span className="font-bold text-gray-900 dark:text-white">{heroContent.proof}</span>
                  </p>
                </div>
              </div>

              {/* Right Side - Demo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl transform rotate-3" />
                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-black dark:border-white shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="font-mono text-sm text-gray-500">
                      {userType === 'recruiter' ? 'AI Candidate Search' : 'Job Search'}
                    </span>
                    <div className="w-16" />
                  </div>

                  <div className="p-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={userType === 'recruiter' ? "Search candidates (e.g., React, Python, Manager)..." : "Search jobs (e.g., Software Engineer, Remote)..."}
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="px-6 pb-6 space-y-3">
                    {searchResults.length > 0 ? (
                      searchResults.map((candidate) => (
                        <div key={candidate.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                          <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full" />
                          <div className="flex-1 min-w-0">
                            <p className="font-mono font-bold">{candidate.name}</p>
                            <p className="font-mono text-sm text-gray-500">{candidate.currentRole}</p>
                          </div>
                          <div className="text-right">
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-mono text-sm font-bold">
                              {candidate.matchScore}%
                            </span>
                            <p className="font-mono text-xs text-gray-500 mt-1">match</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-4 opacity-50">
                          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse" />
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse" />
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-4 opacity-50">
                          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse" />
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse" />
                          </div>
                        </div>
                        <div className="text-center py-4">
                          <p className="font-mono text-sm text-gray-400">
                            {userType === 'recruiter' ? 'Try searching for "Engineer", "Designer", or "Manager"' : 'Try searching for "Remote", "Junior", or "Tech"'}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <p className="font-mono text-xs text-center text-gray-500">
                      <span className="text-indigo-600 font-bold">{userType === 'recruiter' ? '50,247' : '10,000+'}</span> {userType === 'recruiter' ? 'candidates' : 'jobs'} available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
            <span className="font-mono text-xs tracking-wider">SCROLL</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Platform Features</span>
              <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                {userType === 'recruiter' ? 'EVERYTHING YOU NEED' : 'YOUR CAREER ADVANTAGE'}
              </h2>
              <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
                {userType === 'recruiter' 
                  ? 'A complete recruitment suite with AI-powered tools to help you find, evaluate, and hire the best talent faster than ever.'
                  : 'Powerful tools to help you find the perfect job, connect with recruiters, and accelerate your career growth.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (<FeatureCard key={i} {...feature} index={i} />))}
            </div>
          </div>
        </section>

        <HowItWorks userType={userType} />
        <Testimonials />
        <CTASection userType={userType} onSignInClick={onSignInClick} />
      </main>

      <Footer />
    </div>
  );
}
