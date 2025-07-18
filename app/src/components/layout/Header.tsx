import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, X, LogOut } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { Logo } from '../ui/Logo';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, signOut, isAdmin, isTeamMember } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed w-full z-50 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 border-b border-neutral-200/20 dark:border-neutral-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-2xl font-bold text-primary-500 dark:text-white">Aakkai</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Home</Link>
              <Link to="/work" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Work</Link>
              <Link to="/about" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About</Link>
              <Link to="/contact" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</Link>
              
              {user && (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Admin</Link>
                  )}
                  {isTeamMember && (
                    <Link to="/dashboard" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Dashboard</Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </nav>

            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle - Always visible */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-4">
              <Link to="/" className="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Home</Link>
              <Link to="/work" className="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Work</Link>
              <Link to="/about" className="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About</Link>
              <Link to="/contact" className="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</Link>
              
              {user && (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Admin</Link>
                  )}
                  {isTeamMember && (
                    <Link to="/dashboard" className="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Dashboard</Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};