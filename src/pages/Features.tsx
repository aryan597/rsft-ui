import { useEffect, useState, useRef } from 'react';
import { Users, Building2, Search, Zap, TrendingUp, Shield, Brain, MessageSquare, FileText, BarChart3, Clock, Target, Globe, Palette, Smartphone, Cloud, Lock, Workflow, ChevronRight, Check, Star, Sparkles } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

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

function StatCard({ number, label, suffix = '' }: { number: string; label: string; suffix?: string }) {
  return (
    <div className="text-center p-8 border-2 border-black dark:border-white bg-white dark:bg-gray-800">
      <div className="font-mono text-5xl md:text-6xl font-black text-indigo-600 mb-2">
        {number}{suffix}
      </div>
      <div className="font-mono text-sm font-bold tracking-wider uppercase text-gray-500">{label}</div>
    </div>
  );
}

function FeatureHighlight({ icon: Icon, title, description, features, imagePosition = 'left' }: { icon: React.ElementType; title: string; description: string; features: string[]; imagePosition?: 'left' | 'right' }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center py-24 ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>
      <div className={imagePosition === 'right' ? 'lg:order-2' : ''}>
        <div className="w-20 h-20 mb-6 flex items-center justify-center bg-indigo-600 text-white">
          <Icon className="w-10 h-10" />
        </div>
        <h3 className="font-mono text-3xl md:text-4xl font-bold mb-6">{title}</h3>
        <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mb-8">{description}</p>
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="font-mono text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`relative ${imagePosition === 'right' ? 'lg:order-1' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl transform rotate-3" />
        <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-black dark:border-white p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Icon className="w-12 h-12 text-indigo-600" />
            </div>
            <p className="font-mono text-gray-500 dark:text-gray-400">Interactive Demo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role, company, rating }: { quote: string; author: string; role: string; company: string; rating: number }) {
  return (
    <div className="p-8 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transition-all duration-300">
      <div className="flex gap-1 mb-6">
        {[...Array(rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-indigo-500 text-indigo-500" />))}
      </div>
      <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">"{quote}"</p>
      <div>
        <p className="font-mono font-bold text-lg">{author}</p>
        <p className="font-mono text-sm text-gray-500">{role} at {company}</p>
      </div>
    </div>
  );
}

export default function Features() {
  const features = [
    { icon: Users, title: 'CANDIDATE DATABASE', description: 'Access thousands of curated candidate profiles with detailed skills, experience, and compatibility scores powered by AI.' },
    { icon: Building2, title: 'COMPANY HUB', description: 'Manage all your client companies in one place. Track job openings, hiring managers, and recruitment pipelines.' },
    { icon: Search, title: 'SMART CANDIDATE SCAN', description: 'AI-powered search that finds perfect matches based on skills, experience, location, and cultural fit.' },
    { icon: Zap, title: 'AI MATCHING', description: 'Our intelligent algorithms match candidates to positions with 95% accuracy, saving hours of manual screening.' },
    { icon: TrendingUp, title: 'ANALYTICS DASHBOARD', description: 'Real-time insights into your recruitment pipeline. Track metrics, measure performance, optimize workflows.' },
    { icon: Shield, title: 'DATA SECURITY', description: 'Enterprise-grade security with encrypted data storage, GDPR compliance, and role-based access control.' },
    { icon: Brain, title: 'AI RESUME PARSING', description: 'Automatically extract and analyze candidate information from resumes with 99% accuracy using advanced NLP.' },
    { icon: MessageSquare, title: 'COMMUNICATION HUB', description: 'Built-in messaging system for seamless communication between recruiters and candidates.' },
    { icon: FileText, title: 'APPLICATION TRACKING', description: 'Full-cycle ATS functionality to manage candidates through every stage of your hiring process.' },
    { icon: BarChart3, title: 'REPORTING SUITE', description: 'Generate detailed reports on hiring metrics, time-to-fill, cost-per-hire, and more.' },
    { icon: Clock, title: 'AUTOMATION WORKFLOWS', description: 'Automate repetitive tasks like scheduling interviews, sending follow-ups, and status updates.' },
    { icon: Target, title: 'SKILL ASSESSMENTS', description: 'Integrated assessment tools to evaluate candidates on technical and soft skills.' },
    { icon: Globe, title: 'GLOBAL REACH', description: 'Source talent from around the world with multi-language support and international job posting capabilities.' },
    { icon: Palette, title: 'CUSTOM BRANDING', description: 'White-label solutions to customize the platform with your company branding.' },
    { icon: Smartphone, title: 'MOBILE APP', description: 'Access your recruitment dashboard on-the-go with our iOS and Android mobile applications.' },
    { icon: Cloud, title: 'CLOUD INTEGRATION', description: 'Seamlessly integrate with popular HR tools like Workday, BambooHR, and Salesforce.' },
    { icon: Lock, title: 'COMPLIANCE MANAGEMENT', description: 'Built-in compliance tracking for EEOC, OFCCP, and other regulatory requirements.' },
    { icon: Workflow, title: 'CUSTOM WORKFLOWS', description: 'Design and implement custom hiring workflows tailored to your organization\'s needs.' }
  ];

  const stats = [
    { number: '50K+', label: 'Active Candidates' },
    { number: '2,500+', label: 'Recruiters' },
    { number: '95%', label: 'Match Accuracy' },
    { number: '40%', label: 'Faster Hiring' }
  ];

  const highlights: { icon: React.ElementType; title: string; description: string; features: string[]; imagePosition?: 'left' | 'right' }[] = [
    {
      icon: Search,
      title: 'Intelligent Candidate Search',
      description: 'Our AI-powered search goes beyond keywords. Understands context, skills equivalencies, and cultural fit factors to surface the most relevant candidates for your positions.',
      features: [
        'Semantic search with natural language processing',
        'Skills-based matching with experience weighting',
        'Location-aware recommendations',
        'Cultural fit assessment algorithms',
        'Boolean search support for power users'
      ]
    },
    {
      icon: Brain,
      title: 'AI-Powered Candidate Screening',
      description: 'Let our artificial intelligence handle the initial screening process. Our models analyze resumes, assess qualifications, and score candidates against your requirements.',
      features: [
        'Automated resume scoring',
        'Qualification gap analysis',
        'Red flag detection',
        'Interview readiness prediction',
        'Bias-free screening algorithms'
      ],
      imagePosition: 'right'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analytics',
      description: 'Make data-driven hiring decisions with our powerful analytics suite. Track every metric that matters to your recruitment success.',
      features: [
        'Real-time pipeline analytics',
        'Source effectiveness tracking',
        'Time-to-fill dashboards',
        'Cost-per-hire calculations',
        'Predictive hiring insights'
      ]
    }
  ];

  const testimonials = [
    { quote: "Recept transformed how we source candidates. The AI matching saved us 20+ hours per week and helped us find candidates we would have otherwise missed.", author: "Sarah Chen", role: "Head of Talent", company: "TechCorp", rating: 5 },
    { quote: "The candidate database quality is unmatched. We've hired 3 senior engineers in the last month using the platform's intelligent matching.", author: "Michael Roberts", role: "Senior Recruiter", company: "InnovateLabs", rating: 5 },
    { quote: "Finally, a platform that bridges the gap between recruiters and great talent effectively. Our time-to-hire decreased by 40%.", author: "Emily Watson", role: "HR Director", company: "FutureScale", rating: 5 }
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
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Platform Features</span>
            <h1 className="font-mono text-5xl md:text-7xl font-black mt-6 mb-8">
              EVERYTHING YOU NEED
              <span className="block text-indigo-600">TO HIRE SMARTER</span>
            </h1>
            <p className="font-mono text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A complete recruitment suite with AI-powered tools to help you find, evaluate, and hire the best talent faster than ever before.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {highlights.map((highlight, i) => (
            <FeatureHighlight key={i} {...highlight} />
          ))}
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Comprehensive Tools</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">POWERFUL FEATURES</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              From candidate sourcing to offer management, we've built every feature with your hiring success in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (<FeatureCard key={i} {...feature} index={i} />))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-400">Testimonials</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">TRUSTED BY INDUSTRY LEADERS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (<TestimonialCard key={i} {...testimonial} />))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            READY TO TRANSFORM YOUR HIRING?
          </h2>
          <p className="font-mono text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of recruiters who have upgraded their talent acquisition with AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold text-lg border-2 border-gray-900 dark:border-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3">
              <span>START FREE TRIAL</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono font-bold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              <span>BOOK DEMO</span>
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
