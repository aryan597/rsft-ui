import React from 'react';
import { Heart } from 'lucide-react';

export function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t-2 border-black dark:border-white pt-8 flex flex-col md:flex-row justify-between items-center font-mono text-sm">
      <div className="flex items-center space-x-1 mb-4 md:mb-0">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
        <span>© {currentYear} Re-Sift</span>
      </div>
      <div className="flex space-x-6">
        <a href="#privacy" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy</a>
        <a href="#terms" className="hover:text-gray-600 dark:hover:text-gray-300">Terms</a>
        <a href="#cookies" className="hover:text-gray-600 dark:hover:text-gray-300">Cookies</a>
      </div>
    </div>
  );
}