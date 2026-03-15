import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Paper Texture Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated gradient orbs - 3D depth effect */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20 transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) scale(${1 + scrollY * 0.0005})`,
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-15 transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
          bottom: '10%',
          right: '10%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(${1 + scrollY * 0.0003})`,
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: `perspective(1000px) rotateX(60deg) translateY(${scrollY * 0.2}px) scale(2)`,
          top: '-50%',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div 
            className={`max-w-5xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-gray-300 dark:border-gray-600 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-sm text-gray-600 dark:text-gray-300">The Future of Talent Acquisition</span>
            </div>

            {/* Headline */}
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                Where Talent
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Meets Opportunity
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-mono text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
              The intelligent platform connecting world-class recruiters with exceptional talent. 
              Build your database. Find perfect matches. Hire with confidence.
            </p>

            <p className="font-mono text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              One platform. Two powerful sides. Candidates build profiles and get resume insights. 
              Recruiters access a premium talent database and find their ideal hires.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/rsft-ui/dashboard" 
                className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold text-lg rounded-sm hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(167,139,250,1)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
              >
                <span>Enter Recruiter Portal</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono font-bold text-lg rounded-sm hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-3">
                <span>Watch Demo</span>
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '50K+', label: 'Active Candidates' },
                { value: '2,500+', label: 'Partner Companies' },
                { value: '95%', label: 'Match Accuracy' },
                { value: '48hrs', label: 'Avg. Hire Time' },
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-sm hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-300"
                >
                  <div className="font-mono text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="font-mono text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8">
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 animate-bounce">
            <span className="font-mono text-xs">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
