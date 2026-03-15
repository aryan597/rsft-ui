import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Briefcase, GraduationCap, Phone, Linkedin, Github, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CandidateData {
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  linkedin: string;
  github: string;
  website: string;
  phone: string;
}

export default function CandidateOnboarding() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState<CandidateData>({
    firstName: '',
    lastName: '',
    title: '',
    location: '',
    bio: '',
    skills: [],
    experience: '',
    education: '',
    linkedin: '',
    github: '',
    website: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Saving candidate profile:', formData);
      navigate('/rsft-ui/candidate');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col`}>
      {/* Header */}
      <header className={`h-16 flex items-center px-6 border-b ${isDark ? 'border-gray-800 bg-black/50' : 'border-gray-200 bg-white/80'} backdrop-blur-sm`}>
        <button onClick={() => navigate('/rsft-ui/')} className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-mono">Back</span>
        </button>
        <div className="flex-1 text-center">
          <span className={`font-mono font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Candidate Onboarding</span>
        </div>
        <div className="w-20" />
      </header>

      {/* Progress */}
      <div className={`flex justify-center py-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold ${
                step >= s 
                  ? 'bg-indigo-600 text-white' 
                  : isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 4 && (
                <div className={`w-12 h-1 ${s < step ? 'bg-indigo-600' : isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className={`w-full max-w-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8`}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`w-full px-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
                <div>
                  <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`w-full px-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Professional Title *</label>
                <div className="relative">
                  <Briefcase className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Software Engineer"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Location *</label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.firstName || !formData.lastName || !formData.title || !formData.location}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-mono font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Skills & Experience</h2>
              
              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill"
                    className={`flex-1 px-4 py-2 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-mono hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span key={skill} className={`px-3 py-1 rounded-full text-sm font-mono flex items-center gap-2 ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500">&times;</button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Years of Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Highest Education</label>
                <div className="relative">
                  <GraduationCap className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  >
                    <option value="">Select education</option>
                    <option value="high-school">High School</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-lg font-mono font-bold hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-mono font-bold hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
              
              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>LinkedIn Profile</label>
                <div className="relative">
                  <Linkedin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>GitHub Profile</label>
                <div className="relative">
                  <Github className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Personal Website</label>
                <div className="relative">
                  <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-lg font-mono font-bold hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-mono font-bold hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>About You</h2>
              
              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell recruiters about yourself, your career goals, and what you're looking for..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500 resize-none`}
                />
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h3 className={`font-mono font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Summary</h3>
                <div className={`space-y-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p><span className="font-mono">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-mono">Title:</span> {formData.title}</p>
                  <p><span className="font-mono">Location:</span> {formData.location}</p>
                  <p><span className="font-mono">Skills:</span> {formData.skills.length > 0 ? formData.skills.join(', ') : 'None added'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-lg font-mono font-bold hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-mono font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Saving...' : 'Complete Profile'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
