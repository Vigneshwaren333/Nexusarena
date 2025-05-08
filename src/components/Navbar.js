import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/tournaments', label: 'TOURNAMENTS' },
    { path: '/arena', label: 'ARENAS' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/community', label: 'COMMUNITY' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cyber-black/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-future text-xl font-bold mr-1 text-white">NEXUS</span>
              <span className="font-future text-xl font-bold text-neon-blue text-glow-blue">ARENA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-future text-sm relative group ${
                    isActive(link.path)
                      ? 'text-neon-blue text-glow-blue'
                      : 'text-gray-300 hover:text-white'
                  } transition-colors duration-200`}
                >
                  {link.label}
                  {isActive(link.path) ? (
                    <motion.div 
                      className="h-0.5 bg-neon-blue absolute -bottom-1 left-0 right-0"
                      layoutId="navbar-indicator"
                    />
                  ) : (
                    <div className="h-0.5 bg-neon-blue/0 absolute -bottom-1 left-0 right-0 w-0 group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/signin">
              <motion.button 
                className="font-future text-sm px-4 py-1 text-neon-purple border border-neon-purple/60 rounded transition-all duration-200 hover:bg-neon-purple/20"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(113, 34, 250, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                SIGN IN
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button 
                className="font-future text-sm px-4 py-1 bg-neon-blue/90 text-cyber-black rounded transition-all duration-200"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(0, 242, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                SIGN UP
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-full hover:bg-cyber-gray/30 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass-panel-dark border-t-0 rounded-t-none"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-future ${
                    isActive(link.path)
                      ? 'bg-neon-blue/10 text-neon-blue'
                      : 'text-gray-300 hover:bg-cyber-gray/50 hover:text-white'
                  } transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-neon-blue/10">
                <Link to="/signin">
                  <motion.button 
                    className="font-future text-sm px-4 py-2 text-neon-purple border border-neon-purple/60 rounded transition-all duration-200 hover:bg-neon-purple/20"
                    whileTap={{ scale: 0.95 }}
                  >
                    SIGN IN
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button 
                    className="font-future text-sm px-4 py-2 bg-neon-blue/90 text-cyber-black rounded transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    SIGN UP
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 