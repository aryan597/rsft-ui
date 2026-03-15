import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterOnboarding from './pages/RecruiterOnboarding';
import CandidateOnboarding from './pages/CandidateOnboarding';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './components/layout/DashboardLayout';

function UserTypeSelector({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (type: 'recruiter' | 'candidate') => void }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-8 rounded-xl max-w-md w-full mx-4">
        <h2 className="font-mono text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Welcome to Re-Sift
        </h2>
        <p className="font-mono text-center text-gray-600 dark:text-gray-400 mb-6">
          Are you a recruiter or candidate?
        </p>
        <div className="space-y-3">
          <button
            onClick={() => onSelect('recruiter')}
            className="w-full p-4 border-2 border-black dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-lg flex items-center justify-center gap-3"
          >
            <span className="font-mono font-bold text-lg">I'm a Recruiter</span>
          </button>
          <button
            onClick={() => onSelect('candidate')}
            className="w-full p-4 border-2 border-black dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-lg flex items-center justify-center gap-3"
          >
            <span className="font-mono font-bold text-lg">I'm a Candidate</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function LandingWithSelector() {
  const [showSelector, setShowSelector] = useState(false);
  
  return (
    <>
      <Landing onSignInClick={() => setShowSelector(true)} />
      <UserTypeSelector 
        isOpen={showSelector} 
        onClose={() => setShowSelector(false)}
        onSelect={(type) => {
          setShowSelector(false);
          if (type === 'recruiter') {
            window.location.href = '/rsft-ui/dashboard';
          } else {
            window.location.href = '/rsft-ui/candidate';
          }
        }}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Routes>
            <Route path="/rsft-ui/" element={<LandingWithSelector />} />
            <Route path="/rsft-ui/onboarding/recruiter" element={<RecruiterOnboarding />} />
            <Route path="/rsft-ui/onboarding/candidate" element={<CandidateOnboarding />} />
            <Route path="/rsft-ui/dashboard/*" element={<DashboardLayout />} />
            <Route path="/rsft-ui/candidate/*" element={<CandidateDashboard />} />
            <Route path="*" element={<Navigate to="/rsft-ui/" replace />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
