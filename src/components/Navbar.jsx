import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Book, Users, BookOpen, Library } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Dashboard', icon: Home },
    { path: '/books', name: 'Books', icon: Book },
    { path: '/members', name: 'Members', icon: Users },
    { path: '/loans', name: 'Loans', icon: BookOpen },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Library className="w-8 h-8 text-purple-400" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Library Manager
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <div className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200">
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                  
                  {/* Active Indicator */}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                      initial={false}
                    />
                  )}
                  
                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900"
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;