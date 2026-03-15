import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, LogIn, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onSignInClick?: () => void;
}

export default function Navbar({ onSignInClick }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b-4 border-black dark:border-white bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/rsft-ui/" className="flex items-center hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white h-full transition-colors duration-200">
              <img src='./logo.svg' alt="Re-Sift" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <button
                onClick={onSignInClick}
                className="flex items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white px-3 transition-colors duration-200"
              >
                <LogIn className="w-6 h-6 mr-2" />
                <span className="font-mono font-bold">SIGN IN</span>
              </button>
            <button
              onClick={toggleTheme}
              className="flex items-center px-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black dark:border-white">
          <div className="flex justify-center py-3 space-x-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignInClick?.();
                }}
                className="flex items-center font-mono text-sm font-bold"
              >
                <LogIn className="w-5 h-5 mr-1" />
                SIGN IN
              </button>
            <button
              onClick={toggleTheme}
              className="flex items-center"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
