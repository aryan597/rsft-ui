import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle, Globe, Send, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ArrowRight, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
// import { ReactComponent as RIcon } from '../../../R.svg'; // Import the SVG as a React component


export const ANALYSIS_STAGES = [
  { text: 'Formulating analysis', emoji: '🔍' },
  { text: 'Collecting User Information', emoji: '📊' },
  { text: 'Crawling', emoji: '🕸️' },
  { text: 'Extracting semantic blocks', emoji: '🔥' },
  { text: 'Analyzing', emoji: '⚡' },
];

// const DEFAULT_ANALYSIS = `# Resume Analysis Report

// ## Overall Score: 85/100


// ### Key Strengths
// - Strong technical skills alignment
// - Clear project achievements
// - Professional experience well structured


// ### Areas for Improvement
// - Consider adding more quantifiable results
// - Enhance keywords for ATS optimization
// - Add more industry-specific certifications


// ### Detailed Feedback
// Your resume demonstrates solid experience and technical capabilities. Here's a detailed breakdown of each section...`;

interface Message {
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
}

interface FitAnalysis {
  score: number;
  reasoning: string;
  feedback: string;
}

interface FitAnalysisData {
  role_fit: FitAnalysis;
  experience_fit: FitAnalysis;
  responsibilities_fit: FitAnalysis;
  skills_fit: FitAnalysis;
  qualifications_fit: FitAnalysis;
  culture_fit: FitAnalysis;
  missing_keywords: string[];
  keyword_analysis: string;
  overall_match_assessment: string;
  gap_assessment: string;
  improvement_recommendations: string[];
  recommendation_justification: string;
  market_considerations: string;
  market_analysis_approach: string;
}

interface AnalysisData { 
  analysis: {
    process: {
      step1_understanding: string;
      step2_key_requirements: string[];
      step3_comparison: string;
      step4_scoring_rationale: string;
    };
    fit_analysis: FitAnalysisData;
    
    aggregate_score: number;
    meta_reflection: {
      confidence_level: string;
      challenges_faced: string;
      areas_for_improvement: string;
    };
    thoughts_about_company: string;
    thoughts_about_candidate: string;
  }
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#22c55e'; // green
  if (score >= 60) return '#eab308'; // yellow
  return '#ef4444'; // red
};

interface ChatWindowProps {
  initialStages: Array<{ text: string; emoji: string }>;
  analysisData?: AnalysisData;
  jobDescription: string;
  resume: File
}

export default function ChatWindow({ initialStages, analysisData, jobDescription, resume }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [visibleStages, setVisibleStages] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [errors, setErrors] = useState<{ jobDescription?: string }>({});
  const [formData, setFormData] = useState<{ jobDescription: string }>({
    jobDescription: jobDescription || '', // Initialize with the passed jobDescription
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastAutoScrollPosition = useRef<number>(0);

  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom) {
        const scrollToBottom = () => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        };
        
        requestAnimationFrame(scrollToBottom);
        lastAutoScrollPosition.current = container.scrollHeight;
      }
    }
  }, [messages]);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowAnalysis(true), 800);
    
    const stageInterval = setInterval(() => {
      setVisibleStages(prev => {
        if (prev < initialStages.length) {
          return prev + 1;
        }
        clearInterval(stageInterval);
        return prev;
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(stageInterval);
    };
  }, [initialStages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage: Message = {
        content: message.trim(),
        role: 'user',
        timestamp: new Date(),
      };
      
      const assistantMessage: Message = {
        content: "I'm analyzing your question. This is a placeholder response. In a real implementation, this would be connected to your AI backend.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage, assistantMessage]);
      setMessage('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Optionally, you can add validation logic here
    if (name === 'jobDescription' && !value) {
      setErrors(prev => ({ ...prev, jobDescription: 'Job description is required.' }));
    } else {
      setErrors(prev => ({ ...prev, jobDescription: undefined })); // Clear error if valid
    }
  };

  const calculateAggregateScore = (fitAnalysis: FitAnalysisData) => {
    const scores = [
      fitAnalysis.role_fit.score,
      fitAnalysis.experience_fit.score,
      fitAnalysis.responsibilities_fit.score,
      fitAnalysis.skills_fit.score,
      fitAnalysis.qualifications_fit.score,
      fitAnalysis.culture_fit.score
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-black dark:border-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 min-h-[calc(100vh-2rem)] flex flex-col"
        >
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b-2 border-black dark:border-white">
            <Bot className="w-6 h-6" />
            <span className="font-mono font-bold text-black dark:text-white">Re-Sift Analysis</span>
          </div>

          <div 
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto space-y-4 max-h-[calc(100vh-15rem)] scroll-smooth"
            style={{ 
              height: "calc(100vh - [your_navbar_height]px)", 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              {initialStages.slice(0, visibleStages).map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  <span>{stage.emoji}</span>
                  <span>{stage.text}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.3 }}
              className="prose dark:prose-invert max-w-none font-mono mt-6 p-6 border-t-2 border-gray-200 dark:border-gray-700"
            >
              {/* Job Description */}
              <div className="transform transition duration-300 hover:-translate-y-1">
                <label className="block font-mono font-bold mb-2">
                  JOB DESCRIPTION *
                </label>
                <textarea
                  name="jobDescription"
                  className={`w-full h-48 p-4 font-mono border-2 ${errors.jobDescription ? 'border-red-500' : 'border-black dark:border-white'} bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition`}
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Paste job description here..."
                  required
                />
                {errors.jobDescription && (
                  <p className="text-red-500 font-mono text-sm mt-1">{errors.jobDescription}</p>
                )}
              </div>

              {/* Uploaded Resume Section */}
              <div
                className="bg-gray-100 dark:bg-gray-800 hover:-translate-y-1 p-4 font-mono w-fit h-fit border-2 mt-8 border-black dark:border-white text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              >
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">
                  Uploaded Resume
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {resume ? resume.name : "No resume uploaded."}
                </p>
              </div>
            </motion.div>


            {showAnalysis && visibleStages === initialStages.length ? (
              analysisData && analysisData.analysis ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose dark:prose-invert max-w-none font-mono mt-6 p-6 border-t-2 border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-32">
                      <CircularProgressbar
                        value={calculateAggregateScore(analysisData.analysis.fit_analysis)}
                        text={`${calculateAggregateScore(analysisData.analysis.fit_analysis)}%`}
                        styles={buildStyles({
                          pathColor: `rgba(62, 152, 199, ${calculateAggregateScore(analysisData.analysis.fit_analysis) / 100})`,
                          textColor: '#3e98c7',
                          trailColor: '#d6d6d6',
                        })}
                      />
                    </div>
                    <div className="flex-1 ml-6">
                      <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">Match Analysis</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Overall match assessment based on role requirements and your profile
                      </p>
                    </div>
                  </div>
                  {/* Fit Analysis Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {analysisData.analysis.fit_analysis &&
                      Object.entries(analysisData.analysis.fit_analysis)
                        .filter(([key]) => !['missing_keywords', 'keyword_analysis', 'overall_match_assessment', 'gap_assessment', 'improvement_recommendations', 'recommendation_justification', 'market_considerations', 'market_analysis_approach'].includes(key))
                        .map(([key, data]) => (
                          <div
                            key={key}
                            className="border-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold capitalize text-black dark:text-white">
                                {key.replace('_', ' ')}
                              </h3>
                              <span
                                className="text-xl font-bold"
                                style={{ color: getScoreColor((data as FitAnalysis).score) }}
                              >
                                {(data as FitAnalysis).score}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {(data as FitAnalysis).feedback}
                            </p>
                          </div>
                        ))}
                  </div>


                  {/* Missing Keywords */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                      <h3 className="font-semibold text-black dark:text-white">Missing Keywords</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.analysis.fit_analysis.missing_keywords &&
                        analysisData.analysis.fit_analysis.missing_keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                    </div>
                  </div>


                  {/* Improvement Recommendations */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      <h3 className="font-semibold text-black dark:text-white">Improvement Recommendations</h3>
                    </div>
                    <ul className="space-y-2">
                      {analysisData.analysis.fit_analysis.improvement_recommendations &&
                        analysisData.analysis.fit_analysis.improvement_recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="w-4 h-4 mt-1 mr-2 text-green-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Gap Assessment */}
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-4">
                    <div className="flex items-center mb-3">
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="font-semibold text-black dark:text-white">Gap Assessment</h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {analysisData.analysis.fit_analysis.gap_assessment}
                    </p>
                  </div>
                  {/* Overall Match Assessment */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <h3 className="font-semibold text-black dark:text-white">Overall Match Assessment</h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {analysisData.analysis.fit_analysis.overall_match_assessment}
                    </p>
                  </div>
                  {/* Market Considerations */}
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg mt-4">
                    <div className="flex items-center mb-3">
                      <Globe className="w-5 h-5 text-orange-500 mr-2" />
                      <h3 className="font-semibold text-black dark:text-white">Market Considerations</h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {analysisData.analysis.fit_analysis.market_considerations}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-300">
                  <p>No analysis data available.</p>
                </div>
              )
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-300">
                <p>Loading analysis...</p>
              </div>
            )}

            <div className="space-y-4 mt-6">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-2 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && <Bot className="w-6 h-6 mt-1" />}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.role === 'user' && <User className="w-6 h-6 mt-1" />}
                </motion.div>
              ))}
            </div>

            
          </div>
          <form onSubmit={handleSubmit} className="mt-6 pt-4 border-t-2 border-black dark:border-white">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask a question about your analysis..."
                  className="flex-grow p-4 font-mono border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
                <button
                  type="submit"
                  className="px-6 bg-black dark:bg-white text-white dark:text-black font-mono hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center"
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
        </motion.div>
      </div>
    </div>
  )};