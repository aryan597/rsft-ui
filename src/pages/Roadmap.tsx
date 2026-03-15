import { useState, useEffect, useRef } from 'react';
import { Check, Rocket, Sparkles, Target, Zap, ChevronRight, Star, TrendingUp, Lightbulb, Globe, Smartphone, Shield, Brain, MessageSquare, BarChart3, Users, Building2, Mail } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

interface RoadmapItem {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  quarter?: string;
  icon: React.ElementType;
  features?: string[];
}

interface TimelineItem {
  quarter: string;
  year: number;
  items: RoadmapItem[];
}

function StatusBadge({ status }: { status: 'completed' | 'in-progress' | 'planned' }) {
  const config = {
    completed: { label: 'SHIPPED', color: 'bg-green-500', icon: Check },
    'in-progress': { label: 'IN PROGRESS', color: 'bg-indigo-500', icon: Zap },
    planned: { label: 'PLANNED', color: 'bg-gray-400', icon: Star }
  };
  const { label, color, icon: Icon } = config[status];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${color} text-white font-mono text-xs font-bold`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function RoadmapCard({ item, index }: { item: RoadmapItem; index: number }) {
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
      className={`p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-800 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900">
          <item.icon className="w-6 h-6" />
        </div>
        <StatusBadge status={item.status} />
      </div>
      <h3 className="font-mono text-xl font-bold mb-2">{item.title}</h3>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
      {item.features && item.features.length > 0 && (
        <ul className="space-y-2">
          {item.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
      )}
      {item.quarter && (
        <p className="font-mono text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          Target: {item.quarter}
        </p>
      )}
    </div>
  );
}

function TimelineQuarter({ quarter }: { quarter: TimelineItem }) {
  const isCurrentQuarter = quarter.quarter === 'Q1' && quarter.year === 2026;
  
  return (
    <div className="relative">
      <div className="flex items-center mb-8">
        <div className={`px-6 py-3 font-mono text-xl font-bold border-2 border-black dark:border-white ${
          isCurrentQuarter ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-white dark:bg-gray-800'
        }`}>
          {quarter.quarter} {quarter.year}
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-700 ml-4" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quarter.items.map((item, i) => (
          <RoadmapCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function FeatureRequestCard({ title, description, votes, status }: { title: string; description: string; votes: number; status: 'under-review' | 'planned' | 'completed' }) {
  const statusColors = {
    'under-review': 'bg-yellow-500',
    'planned': 'bg-indigo-500',
    'completed': 'bg-green-500'
  };
  
  return (
    <div className="p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-mono font-bold">{title}</h3>
        <span className={`px-2 py-1 ${statusColors[status]} text-white font-mono text-xs font-bold`}>
          {status.replace('-', ' ').toUpperCase()}
        </span>
      </div>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-colors">
          <Star className="w-4 h-4" />
          <span className="font-mono text-sm font-bold">{votes}</span>
        </button>
        <span className="font-mono text-xs text-gray-500">votes</span>
      </div>
    </div>
  );
}

export default function Roadmap() {
  const roadmap: TimelineItem[] = [
    {
      quarter: 'Q1',
      year: 2026,
      items: [
        {
          title: 'AI Resume Parser v2.0',
          description: 'Next-generation resume parsing with 99% accuracy and support for 50+ file formats.',
          status: 'in-progress',
          quarter: 'Q1 2026',
          icon: Brain,
          features: ['Multi-format support', 'Handwriting recognition', 'Real-time parsing', 'Custom field extraction']
        },
        {
          title: 'Mobile App Launch',
          description: 'Native iOS and Android apps for recruiters on the go.',
          status: 'in-progress',
          quarter: 'Q1 2026',
          icon: Smartphone,
          features: ['Push notifications', 'Offline mode', 'Biometric login', 'Candidate messaging']
        },
        {
          title: 'Advanced Analytics Dashboard',
          description: 'New analytics suite with predictive insights and custom reporting.',
          status: 'planned',
          quarter: 'Q1 2026',
          icon: BarChart3,
          features: ['Predictive hiring', 'Custom dashboards', 'Export to PDF/CSV', 'Scheduled reports']
        }
      ]
    },
    {
      quarter: 'Q2',
      year: 2026,
      items: [
        {
          title: 'Interview Scheduling Automation',
          description: 'AI-powered interview scheduling with automatic timezone detection.',
          status: 'planned',
          quarter: 'Q2 2026',
          icon: Zap,
          features: ['Calendar integration', 'Timezone smarts', 'Reminder automation', 'Reschedule handling']
        },
        {
          title: 'Video Interview Platform',
          description: 'Built-in video interviewing with AI-powered candidate assessment.',
          status: 'planned',
          quarter: 'Q2 2026',
          icon: MessageSquare,
          features: ['Live coding interviews', 'Recording & playback', 'AI body language analysis', 'Team collaboration']
        },
        {
          title: 'Talent Marketplace',
          description: 'Open marketplace connecting companies with freelancers and contractors.',
          status: 'planned',
          quarter: 'Q2 2026',
          icon: Globe,
          features: ['Freelancer profiles', 'Hourly/fixed pricing', 'Escrow payments', 'Project management']
        }
      ]
    },
    {
      quarter: 'Q3',
      year: 2026,
      items: [
        {
          title: 'Skills Assessment Platform',
          description: 'Comprehensive skills testing with 500+ pre-built assessments.',
          status: 'planned',
          quarter: 'Q3 2026',
          icon: Target,
          features: ['Technical tests', 'Soft skills assessments', 'Custom test builder', 'Automated grading']
        },
        {
          title: 'Employee Referral System',
          description: 'Gamified referral program with rewards and tracking.',
          status: 'planned',
          quarter: 'Q3 2026',
          icon: Users,
          features: ['Referral tracking', 'Reward management', 'Social sharing', 'Leaderboards']
        },
        {
          title: 'API v2.0',
          description: 'Complete API overhaul with GraphQL support and webhooks.',
          status: 'planned',
          quarter: 'Q3 2026',
          icon: Rocket,
          features: ['GraphQL endpoint', 'Webhooks', 'Rate limiting', 'SDKs for all languages']
        }
      ]
    },
    {
      quarter: 'Q4',
      year: 2026,
      items: [
        {
          title: 'AI Career Coach',
          description: 'Personalized career guidance for candidates using AI.',
          status: 'planned',
          quarter: 'Q4 2026',
          icon: Lightbulb,
          features: ['Career path recommendations', 'Resume optimization', 'Interview prep', 'Salary insights']
        },
        {
          title: 'Diversity & Inclusion Analytics',
          description: 'Tools to track and improve D&I metrics in hiring.',
          status: 'planned',
          quarter: 'Q4 2026',
          icon: Shield,
          features: ['Bias detection', 'D&I dashboards', 'Compliance reporting', 'Anonymized screening']
        },
        {
          title: 'Enterprise SSO',
          description: 'Enterprise-grade single sign-on with SAML 2.0 and OAuth.',
          status: 'planned',
          quarter: 'Q4 2026',
          icon: TrendingUp,
          features: ['SAML 2.0', 'OAuth 2.0', 'Multi-factor auth', 'Audit logging']
        }
      ]
    }
  ];

  const completedItems = [
    {
      title: 'Candidate Database',
      description: 'Launched our candidate database with 50K+ profiles and advanced search.',
      status: 'completed',
      icon: Users
    },
    {
      title: 'AI Matching Algorithm',
      description: '95% accurate AI matching between candidates and job requirements.',
      status: 'completed',
      icon: Zap
    },
    {
      title: 'Company Hub',
      description: 'Complete company management system with branding and pipeline tracking.',
      status: 'completed',
      icon: Building2
    },
    {
      title: 'Email Integration',
      description: 'Seamless integration with Gmail, Outlook, and other email providers.',
      status: 'completed',
      icon: Mail
    }
  ];

  const featureRequests = [
    { title: 'Dark Mode', description: 'Add dark mode support for the entire platform', votes: 234, status: 'completed' as const },
    { title: 'Slack Integration', description: 'Receive notifications and updates in Slack', votes: 189, status: 'planned' as const },
    { title: 'Candidate Assessment Tests', description: 'Add built-in skills assessment functionality', votes: 156, status: 'under-review' as const },
    { title: 'Multiple Language Support', description: 'Interface available in Spanish, French, German', votes: 142, status: 'planned' as const },
    { title: 'Chrome Extension', description: 'Browser extension for sourcing candidates', votes: 98, status: 'under-review' as const },
    { title: 'Outlook Calendar Sync', description: 'Two-way sync with Microsoft Outlook calendar', votes: 87, status: 'planned' as const }
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
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Product Roadmap</span>
            <h1 className="font-mono text-5xl md:text-7xl font-black mt-6 mb-8">
              THE FUTURE OF
              <span className="block text-indigo-600">RECRUITING</span>
            </h1>
            <p className="font-mono text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're constantly innovating to help you hire better, faster. Here's what we're building next.
            </p>
          </div>

          {/* Completed Items */}
          <div className="mb-20">
            <h2 className="font-mono text-2xl font-bold mb-8 text-center">ALREADY SHIPPED</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {completedItems.map((item, i) => (
                <div key={i} className="p-6 border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center bg-green-500 text-white">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-mono font-bold mb-2">{item.title}</h3>
                  <p className="font-mono text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-mono text-4xl md:text-6xl font-bold">2026 ROADMAP</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6">
              Our planned features and improvements for the coming year
            </p>
          </div>
          
          <div className="space-y-20">
            {roadmap.map((quarter, i) => (
              <TimelineQuarter key={i} quarter={quarter} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Requests */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Community</span>
            <h2 className="font-mono text-4xl font-bold mt-4">FEATURE REQUESTS</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Vote on features you'd like to see. We build based on your feedback.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureRequests.map((request, i) => (
              <FeatureRequestCard key={i} {...request} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-black dark:border-white font-mono font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300">
              SUBMIT FEATURE REQUEST
            </button>
          </div>
        </div>
      </section>

      {/* Feedback CTA */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-4xl md:text-6xl font-bold mb-8">
            HAVE A SUGGESTION?
          </h2>
          <p className="font-mono text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            We're always listening. Share your ideas and help shape the future of recruiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group px-10 py-5 bg-white text-gray-900 font-mono font-bold text-lg border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 flex items-center gap-3">
              <span>JOIN OUR BETA</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 border-2 border-white text-white font-mono font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              <span>SHARE FEEDBACK</span>
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
