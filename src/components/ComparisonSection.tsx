import { Check, X, Sparkles } from 'lucide-react';

const ComparisonSection = () => {
  const comparisonData = [
    {
      feature: 'Hiring Workflow',
      resift: 'AI agents scan thousands of profiles, resumes, and signals — delivering a ranked shortlist ready for recruiter review.',
      traditional: 'Recruiters spend hours manually searching LinkedIn, reviewing resumes, and filtering unqualified applicants.'
    },
    {
      feature: 'Candidate Quality',
      resift: 'AI ranks candidates using skills, career trajectory, hiring signals, and role fit — so recruiters see the best profiles first.',
      traditional: 'Candidate quality depends on who applied or manual searches recruiters have time to perform.'
    },
    {
      feature: 'Speed',
      resift: 'AI agents generate a recruiter-ready shortlist in minutes — not days.',
      traditional: 'Days or weeks spent filtering applications and coordinating interviews.'
    },
    {
      feature: 'Insights',
      resift: 'AI surfaces hidden signals: career momentum, skill adjacency, role fit probability, and candidate availability.',
      traditional: 'Limited information beyond resumes and recruiter opinion.'
    },
    {
      feature: 'Support',
      resift: 'AI recruiting agents assist with sourcing, screening, outreach, and candidate intelligence.',
      traditional: 'Minimal support beyond job postings or recruiter outreach.'
    },
    {
      feature: 'Cost',
      resift: 'Reduce sourcing time, agency costs, and recruiter workload — without replacing human judgment.',
      traditional: 'High agency fees or internal hiring costs.'
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 py-24 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl font-bold mb-4">
            How AI Agents Transform Recruiting
          </h2>
          <p className="font-mono text-xl text-gray-600 dark:text-gray-300">
            See how recruiters combine AI agents and human expertise to hire better candidates faster.
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="p-6 font-mono text-xl font-bold border-4 border-transparent flex items-center justify-center">
              Hiring Workflow
            </div>
            <div className="p-6 font-mono text-xl lg:text-2xl font-bold border-4 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black flex items-center justify-center gap-2 transform -translate-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <Sparkles className="animate-pulse" size={24} />
              Hiring with Re-Sift
            </div>
            <div className="p-6 font-mono text-xl font-bold border-4 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">
              Traditional Hiring
            </div>
          </div>

          <div className="space-y-4">
            {comparisonData.map((row, index) => (
              <div key={index} className="grid grid-cols-3 gap-6 group">
                <div className="p-6 border-4 border-black dark:border-white font-mono flex items-center text-lg font-bold group-hover:-translate-y-1 transition-transform bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  {row.feature}
                </div>
                <div className="p-6 border-4 border-black dark:border-white font-mono flex items-start gap-4 bg-green-50 dark:bg-green-900/20 group-hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <p className="font-semibold text-lg">{row.resift}</p>
                </div>
                <div className="p-6 border-4 border-gray-300 dark:border-gray-700 font-mono flex items-start gap-4 text-gray-500 dark:text-gray-400 group-hover:-translate-y-1 transition-transform">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <X size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <p className="text-md">{row.traditional}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-12">
          {comparisonData.map((row, index) => (
            <div key={index} className="space-y-4 border-4 border-black dark:border-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-black">
              <h3 className="font-mono text-2xl font-bold mb-6 text-center border-b-4 border-black dark:border-white pb-4">
                {row.feature}
              </h3>
              
              <div className="space-y-6">
                <div className="bg-black dark:bg-white text-white dark:text-black p-5 border-4 border-black dark:border-white transform -translate-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <div className="flex items-center gap-2 font-mono font-bold mb-3 text-lg">
                    <Sparkles size={20} className="animate-pulse" />
                    Hiring with Re-Sift
                  </div>
                  <div className="flex items-start gap-3 mt-4">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center flex-shrink-0 mt-1">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <p className="font-mono font-bold">{row.resift}</p>
                  </div>
                </div>

                <div className="p-5 border-4 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
                  <div className="font-mono font-bold mb-3 text-lg">Traditional Hiring</div>
                  <div className="flex items-start gap-3 mt-4">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                      <X size={12} />
                    </div>
                    <p className="font-mono text-sm">{row.traditional}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
