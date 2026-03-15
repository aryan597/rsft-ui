import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, MapPin, Users, Globe, Linkedin, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface RecruiterData {
  company: string;
  title: string;
  location: string;
  companySize: string;
  linkedin: string;
  website: string;
  phone: string;
  bio: string;
}

export default function RecruiterOnboarding() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RecruiterData>({
    company: '',
    title: '',
    location: '',
    companySize: '',
    linkedin: '',
    website: '',
    phone: '',
    bio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Saving recruiter profile:', formData);
      navigate('/rsft-ui/dashboard');
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
          <span className={`font-mono font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Recruiter Onboarding</span>
        </div>
        <div className="w-20" />
      </header>

      {/* Progress */}
      <div className={`flex justify-center py-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold ${
                step >= s 
                  ? 'bg-indigo-600 text-white' 
                  : isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && (
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
              <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Company Information</h2>
              
              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company Name *</label>
                <div className="relative">
                  <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Your Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior Recruiter, HR Manager"
                  className={`w-full px-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                />
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company Location *</label>
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

              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company Size</label>
                <div className="relative">
                  <Users className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.company || !formData.title || !formData.location}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-mono font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
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
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company Website</label>
                <div className="relative">
                  <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourcompany.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500`}
                  />
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
              <h2 className={`font-mono text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>About Your Company</h2>
              
              <div>
                <label className={`block font-mono text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell candidates about your company, culture, and what makes it a great place to work..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg font-mono border ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-indigo-500 resize-none`}
                />
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h3 className={`font-mono font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Summary</h3>
                <div className={`space-y-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p><span className="font-mono">Company:</span> {formData.company}</p>
                  <p><span className="font-mono">Title:</span> {formData.title}</p>
                  <p><span className="font-mono">Location:</span> {formData.location}</p>
                  <p><span className="font-mono">Size:</span> {formData.companySize || 'Not specified'}</p>
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
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-mono font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Saving...' : 'Complete Setup'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
