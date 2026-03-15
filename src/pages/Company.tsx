import { ChevronRight, Linkedin, Twitter, Mail, ArrowUpRight, Target, Zap, Shield, Heart, Lightbulb, Rocket, Building2 } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

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

function TeamMember({ name, role, image, bio }: { name: string; role: string; image: string; bio: string }) {
  return (
    <div className="group p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300">
      <div className="relative mb-6 overflow-hidden">
        <div className="aspect-square bg-gray-200 dark:bg-gray-700">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      <h3 className="font-mono text-xl font-bold mb-1">{name}</h3>
      <p className="font-mono text-sm text-indigo-600 mb-4">{role}</p>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{bio}</p>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="p-8 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transition-all duration-300">
      <div className="w-16 h-16 mb-6 flex items-center justify-center bg-indigo-600 text-white">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-mono text-xl font-bold mb-4">{title}</h3>
      <p className="font-mono text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function OfficeCard({ city, address, phone, image }: { city: string; address: string; phone: string; image: string }) {
  return (
    <div className="group p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transition-all duration-300">
      <div className="h-48 mb-6 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img src={image} alt={city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="font-mono text-xl font-bold mb-2">{city}</h3>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-4">{address}</p>
      <p className="font-mono text-sm text-gray-500">{phone}</p>
    </div>
  );
}

function PartnerLogo({ name }: { name: string; logo?: string }) {
  return (
    <div className="p-6 flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-500 transition-colors">
      <span className="font-mono text-xl font-bold text-gray-400">{name}</span>
    </div>
  );
}

export default function Company() {
  const stats = [
    { number: '50', suffix: 'K+', label: 'Candidates' },
    { number: '2,500', suffix: '+', label: 'Recruiters' },
    { number: '95', suffix: '%', label: 'Match Accuracy' },
    { number: '40', suffix: '%', label: 'Faster Hiring' }
  ];

  const values = [
    { icon: Target, title: 'MISSION DRIVEN', description: 'We\'re passionate about connecting the right talent with the right opportunities, making hiring more efficient and equitable.' },
    { icon: Heart, title: 'USER CENTRIC', description: 'Every decision we make is guided by the needs of recruiters and candidates. Your success is our success.' },
    { icon: Shield, title: 'TRUST & SECURITY', description: 'We handle your data with the highest level of security and privacy. Trust is the foundation of everything we do.' },
    { icon: Lightbulb, title: 'INNOVATION', description: 'We continuously push the boundaries of what\'s possible in recruitment technology, leading industry innovation.' },
    { icon: Rocket, title: 'VELOCITY', description: 'We move fast, iterate quickly, and always focus on delivering value. Speed with quality is our mantra.' },
    { icon: Zap, title: 'EXCELLENCE', description: 'We hold ourselves to the highest standards in everything we do, from product to customer support.' }
  ];

  const team = [
    { 
      name: 'Alexandra Chen', 
      role: 'CEO & Co-Founder', 
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Former VP of Talent at Google. 15+ years in HR tech. Stanford MBA.'
    },
    { 
      name: 'Marcus Johnson', 
      role: 'CTO & Co-Founder', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Ex-Google AI researcher. PhD in Machine Learning from MIT. Built hiring systems at scale.'
    },
    { 
      name: 'Sarah Williams', 
      role: 'VP of Product', 
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Led product at LinkedIn Talent Solutions. Product leader with 12+ years experience.'
    },
    { 
      name: 'David Park', 
      role: 'VP of Engineering', 
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      bio: 'Former Engineering Manager at Meta. Built teams from 10 to 500. Expert in AI systems.'
    },
    { 
      name: 'Emily Rodriguez', 
      role: 'VP of Sales', 
      image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop',
      bio: 'Scaled sales from $1M to $50M at previous startups. Expert in enterprise sales.'
    },
    { 
      name: 'Michael Thompson', 
      role: 'VP of Customer Success', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Former Director of Customer Success at Salesforce. Passionate about customer outcomes.'
    }
  ];

  const offices = [
    { 
      city: 'San Francisco', 
      address: '548 Market St, Suite 300, San Francisco, CA 94104', 
      phone: '+1 (415) 555-0123',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop'
    },
    { 
      city: 'New York', 
      address: '350 Fifth Avenue, Suite 5100, New York, NY 10118', 
      phone: '+1 (212) 555-0456',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop'
    },
    { 
      city: 'London', 
      address: '25 Canada Square, Canary Wharf, London E14 5LQ', 
      phone: '+44 20 7946 0958',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop'
    }
  ];

  const partners = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Stripe', 'Airbnb'
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
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Our Company</span>
            <h1 className="font-mono text-5xl md:text-7xl font-black mt-6 mb-8">
              REVOLUTIONIZING
              <span className="block text-indigo-600">RECRUITMENT</span>
            </h1>
            <p className="font-mono text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to make hiring more efficient, equitable, and intelligent. Join us in transforming how companies find and hire talent.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-400">Our Mission</span>
              <h2 className="font-mono text-4xl md:text-5xl font-bold mt-6 mb-8">
                CONNECTING TALENT WITH OPPORTUNITY
              </h2>
              <p className="font-mono text-lg text-gray-300 mb-6">
                We believe that finding the right job or the right candidate shouldn't be a struggle. Our AI-powered platform makes it possible to match the best talent with the best companies in minutes, not months.
              </p>
              <p className="font-mono text-lg text-gray-300 mb-8">
                Every day, we help thousands of companies and candidates find their perfect match. We're not just building a product – we're creating a more efficient and fair job market for everyone.
              </p>
              <button className="group px-8 py-4 bg-white text-gray-900 font-mono font-bold border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 flex items-center gap-3">
                <span>LEARN MORE ABOUT US</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl transform rotate-3" />
              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-white p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-24 h-24 mx-auto mb-6 text-indigo-600" />
                  <p className="font-mono text-gray-500">Our Mission in Action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">What We Believe</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">OUR VALUES</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              These core values guide everything we do, from product decisions to how we treat each other and our customers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (<ValueCard key={i} {...value} />))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Leadership</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">MEET OUR TEAM</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              A diverse team of industry veterans with deep expertise in AI, HR, and building products at scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (<TeamMember key={i} {...member} />))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Locations</span>
            <h2 className="font-mono text-4xl md:text-6xl font-bold mt-4">OUR OFFICES</h2>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              We're a global team with offices in major tech hubs around the world.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, i) => (<OfficeCard key={i} {...office} />))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Trusted By</span>
            <h2 className="font-mono text-2xl font-bold mt-4">LEADING COMPANIES</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((partner, i) => (<PartnerLogo key={i} name={partner} logo="" />))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            JOIN OUR MISSION
          </h2>
          <p className="font-mono text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Whether you're looking for your next role or want to help us transform recruiting, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold text-lg border-2 border-gray-900 dark:border-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3">
              <span>VIEW CAREERS</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono font-bold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-3">
              <span>CONTACT US</span>
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
