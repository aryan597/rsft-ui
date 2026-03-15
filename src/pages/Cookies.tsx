import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

function CookieBanner({ onAccept, onPreferences }: { onAccept: () => void; onPreferences: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-4 border-black dark:border-white p-6 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Cookie className="w-8 h-8 text-indigo-600 flex-shrink-0" />
          <div>
            <h3 className="font-mono font-bold mb-2">We use cookies</h3>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button 
            onClick={onPreferences}
            className="px-6 py-3 border-2 border-black dark:border-white font-mono font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            PREFERENCES
          </button>
          <button 
            onClick={onAccept}
            className="px-6 py-3 bg-indigo-600 text-white font-mono font-bold hover:bg-indigo-700 transition-colors"
          >
            ACCEPT ALL
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Cookies() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    } else {
      const savedPrefs = JSON.parse(cookieConsent);
      setPreferences(savedPrefs);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPrefs = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    setPreferences(newPrefs);
    localStorage.setItem('cookieConsent', JSON.stringify(newPrefs));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Cookies</span>
          <h1 className="font-mono text-5xl md:text-6xl font-black mt-6 mb-8">COOKIE POLICY</h1>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300">
            Last updated: March 15, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 p-6 border-2 border-black dark:border-white bg-white dark:bg-gray-900">
            <h2 className="font-mono text-2xl font-bold mb-6">COOKIE PREFERENCES</h2>
            <p className="font-mono text-gray-600 dark:text-gray-400 mb-6">
              Manage your cookie preferences. Note that some cookies are necessary for the Service to function properly.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-mono font-bold">Necessary Cookies</h3>
                  <p className="font-mono text-sm text-gray-500">Required for the Service to function. Cannot be disabled.</p>
                </div>
                <div className="w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full translate-x-1" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-mono font-bold">Functional Cookies</h3>
                  <p className="font-mono text-sm text-gray-500">Enable enhanced functionality and personalization.</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, functional: !p.functional }))}
                  className={`w-14 h-8 rounded-full transition-colors flex items-center ${preferences.functional ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${preferences.functional ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-mono font-bold">Analytics Cookies</h3>
                  <p className="font-mono text-sm text-gray-500">Help us understand how visitors use our Service.</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`w-14 h-8 rounded-full transition-colors flex items-center ${preferences.analytics ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-mono font-bold">Marketing Cookies</h3>
                  <p className="font-mono text-sm text-gray-500">Used to deliver relevant advertisements.</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`w-14 h-8 rounded-full transition-colors flex items-center ${preferences.marketing ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleSavePreferences}
              className="mt-6 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold hover:bg-indigo-600 transition-colors"
            >
              SAVE PREFERENCES
            </button>
          </div>

          <div className="mb-12">
            <h2 className="font-mono text-2xl font-bold mb-6 pb-4 border-b-2 border-black dark:border-white">WHAT ARE COOKIES?</h2>
            <p className="font-mono text-gray-700 dark:text-gray-300">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="font-mono text-2xl font-bold mb-6 pb-4 border-b-2 border-black dark:border-white">HOW WE USE COOKIES</h2>
            <p className="font-mono text-gray-700 dark:text-gray-300 mb-4">
              We use cookies for several purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-mono text-gray-700 dark:text-gray-300">
              <li><strong>Authentication</strong> - To keep you logged in during your session</li>
              <li><strong>Preferences</strong> - To remember your settings and choices</li>
              <li><strong>Analytics</strong> - To understand how visitors use our Service</li>
              <li><strong>Marketing</strong> - To deliver relevant advertisements</li>
              <li><strong>Security</strong> - To protect against fraudulent activity</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="font-mono text-2xl font-bold mb-6 pb-4 border-b-2 border-black dark:border-white">COOKIE CATEGORIES</h2>
            
            <div className="mb-6">
              <h3 className="font-mono font-bold text-lg mb-3">Necessary Cookies</h3>
              <p className="font-mono text-gray-700 dark:text-gray-300">
                These cookies are essential for the Service to function. They enable basic features like page navigation, secure areas access, and remembering your preferences. The Service cannot function properly without these cookies.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-mono font-bold text-lg mb-3">Functional Cookies</h3>
              <p className="font-mono text-gray-700 dark:text-gray-300">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and enabling live chat support.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-mono font-bold text-lg mb-3">Analytics Cookies</h3>
              <p className="font-mono text-gray-700 dark:text-gray-300">
                These cookies help us understand how visitors interact with our Service by collecting and reporting information anonymously. This helps us improve the Service.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-mono font-bold text-lg mb-3">Marketing Cookies</h3>
              <p className="font-mono text-gray-700 dark:text-gray-300">
                These cookies are used to track visitors across websites. The intention is to display advertisements that are relevant and engaging for the individual user.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-mono text-2xl font-bold mb-6 pb-4 border-b-2 border-black dark:border-white">MANAGING COOKIES</h2>
            <p className="font-mono text-gray-700 dark:text-gray-300 mb-4">
              You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some features may not be available.
            </p>
            <ul className="list-disc pl-6 space-y-2 font-mono text-gray-700 dark:text-gray-300">
              <li><strong>Browser Settings</strong> - Most web browsers allow you to manage cookie preferences through their settings</li>
              <li><strong>Opt-out Links</strong> - You can opt out of specific third-party cookies through industry opt-out platforms</li>
              <li><strong>Our Preferences Tool</strong> - Use the cookie preferences tool above to manage your settings</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="font-mono text-2xl font-bold mb-6 pb-4 border-b-2 border-black dark:border-white">UPDATES TO THIS POLICY</h2>
            <p className="font-mono text-gray-700 dark:text-gray-300">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will post any changes on this page and update the "Last updated" date.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="font-mono text-2xl font-bold mb-6 pb-4 border-b-2 border-black dark:border-white">CONTACT US</h2>
            <p className="font-mono text-gray-700 dark:text-gray-300">
              If you have any questions about our use of cookies, please contact us at privacy@recept.ai.
            </p>
          </div>
        </div>
      </section>

      {showBanner && !showPreferences && (
        <CookieBanner 
          onAccept={handleAcceptAll} 
          onPreferences={() => setShowPreferences(true)}
        />
      )}
    </PageLayout>
  );
}
