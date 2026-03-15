import { ChevronRight, Award, Users, Zap, Shield, Globe, Clock, ArrowRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

function MilestoneCard({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-800">
      <span className="font-mono text-3xl font-black text-indigo-600">{year}</span>
      <h3 className="font-mono text-lg font-bold mt-2 mb-2">{title}</h3>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function AwardCard({ title, organization, year, description }: { title: string; organization: string; year: string; description: string }) {
  return (
    <div className="p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transition-all duration-300">
      <div className="w-12 h-12 mb-4 flex items-center justify-center bg-indigo-600 text-white">
        <Award className="w-6 h-6" />
      </div>
      <h3 className="font-mono text-lg font-bold mb-1">{title}</h3>
      <p className="font-mono text-sm text-indigo-600 mb-4">{organization} • {year}</p>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default function About() {
  const milestones = [
    { year: '2023', title: 'Company Founded', description: 'Recept was born from a simple idea: make hiring better for everyone.' },
    { year: '2023', title: 'Beta Launch', description: 'Launched our beta product to 50 companies for testing and feedback.' },
    { year: '2024', title: 'Public Launch', description: 'Officially launched to the public with our AI-powered candidate matching.' },
    { year: '2024', title: '10K Users', description: 'Reached 10,000 active users across 500+ companies.' },
    { year: '2025', title: 'Series A', description: 'Raised $25M in Series A funding to accelerate growth and product development.' },
    { year: '2025', title: '50K Candidates', description: 'Milestone of 50,000 candidates in our database.' },
    { year: '2026', title: 'Global Expansion', description: 'Expanded to 50+ countries with localized support.' }
  ];

  const stats = [
    { number: '50K+', label: 'Active Candidates' },
    { number: '2,500+', label: 'Companies' },
    { number: '95%', label: 'Match Accuracy' },
    { number: '40%', label: 'Faster Hiring' }
  ];

  const values = [
    { icon: Users, title: 'TEAM FIRST', description: 'We believe in the power of great teams. Everything we build helps companies build better ones.' },
    { icon: Zap, title: 'MOVE FAST', description: 'Speed matters in hiring. We optimize for velocity without compromising quality.' },
    { icon: Shield, title: 'BUILD TRUST', description: 'Trust is the foundation of our platform. We handle data with the utmost care and security.' },
    { icon: Globe, title: 'THINK GLOBAL', description: 'Great talent exists everywhere. We help companies find the best people, wherever they are.' }
  ];

  const awards = [
    { title: 'Best Recruiting Technology', organization: 'HR Tech Awards', year: '2025', description: 'Recognized for innovation in AI-powered recruiting solutions.' },
    { title: 'Top Workplace', organization: 'TechCrunch', year: '2025', description: 'Named one of the best places to work in tech.' },
    { title: 'Innovation Award', organization: 'SaaS Awards', year: '2024', description: 'Excellence in software-as-a-service product design.' },
    { title: 'Fastest Growing', organization: 'Forbes', year: '2024', description: 'One of the fastest growing companies in America.' }
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
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">About Us</span>
            <h1 className="font-mono text-5xl md:text-7xl font-black mt-6 mb-8">
              OUR STORY
            </h1>
            <p className="font-mono text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From a simple idea to a platform used by thousands of companies. Here's how we're transforming recruitment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-8 border-2 border-black dark:border-white bg-white dark:bg-gray-800">
                <div className="font-mono text-4xl md:text-5xl font-black text-indigo-600 mb-2">{stat.number}</div>
                <div className="font-mono text-sm font-bold tracking-wider uppercase text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Our Story</span>
              <h2 className="font-mono text-4xl md:text-5xl font-bold mt-6 mb-8">
                BORN FROM FRUSTRATION
              </h2>
              <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mb-6">
                Recept was founded in 2023 by Alex Chen and Marcus Johnson, who both experienced firsthand how broken the hiring process was.
              </p>
              <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mb-6">
                After spending years in talent acquisition, they saw the same problems repeating: companies struggling to find the right candidates, and candidates struggling to be found. Traditional job boards and recruiters weren't solving the fundamental problem.
              </p>
              <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mb-8">
                They knew there had to be a better way. By combining AI with deep HR expertise, they built Recept – a platform that understands both what companies need and what candidates offer.
              </p>
              <button className="group px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold border-2 border-gray-900 dark:border-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3">
                <span>MEET THE TEAM</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl transform rotate-3" />
              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-white p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Clock className="w-24 h-24 mx-auto mb-6 text-indigo-600" />
                  <p className="font-mono text-gray-500">Our Journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">What Drives Us</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">OUR VALUES</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="p-8 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transition-all duration-300">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-indigo-600 text-white">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="font-mono text-xl font-bold mb-4">{value.title}</h3>
                <p className="font-mono text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Journey</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">OUR MILESTONES</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, i) => (
              <MilestoneCard key={i} {...milestone} />
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Recognition</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">AWARDS & ACCOLADES</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              We're honored to be recognized by industry leaders for our work in transforming recruitment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, i) => (<AwardCard key={i} {...award} />))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-4xl md:text-6xl font-bold mb-8">
            JOIN THE MOVEMENT
          </h2>
          <p className="font-mono text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Whether you're a company looking to hire better or a candidate seeking your next opportunity, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group px-10 py-5 bg-white text-gray-900 font-mono font-bold text-lg border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 flex items-center gap-3">
              <span>START HIRING</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 border-2 border-white text-white font-mono font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-3">
              <span>CREATE PROFILE</span>
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
