import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (location.pathname === path) {
      return 'text-yellow-400 font-bold';
    }
    return 'text-gray-300 hover:text-yellow-400';
  };

  const navItems = [
    { path: '/', label: 'Home', icon: '' },
    { path: '/properties', label: 'Properties', icon: '' },
    { path: '/about', label: 'About', icon: '' },
    { path: '/contact', label: 'Contact', icon: '' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-gray-800' 
          : 'bg-black/90'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Luxury Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <span className="text-white font-black text-xl">P</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">
                  PropertyKu
                </span>
                <span className="text-xs text-yellow-400 font-light tracking-widest uppercase -mt-1">
                  Luxury Estates
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gray-800 border border-gray-700 text-yellow-400'
                      : 'text-gray-300 hover:bg-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-semibold tracking-wide">{item.label}</span>
                  <div className={`w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 ${
                    location.pathname === item.path ? 'w-full' : 'group-hover:w-full'
                  }`}></div>
                </Link>
              ))}
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link 
                to="/login" 
                className="group flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 rounded-2xl hover:bg-gray-800 border border-transparent hover:border-gray-700"
              >
                <span className="text-lg">🔑</span>
                <span className="font-semibold">Login</span>
              </Link>
              <Link 
                to="/register" 
                className="group relative bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-2">
                  <span className="text-lg">✨</span>
                  <span>Get Started</span>
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col space-y-1.5 p-3 rounded-2xl bg-gray-800 border border-gray-700"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="container mx-auto px-4 py-6 border-t border-gray-800 bg-black/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-4 rounded-2xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gray-800 border border-gray-700 text-yellow-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold text-lg">{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-4 text-gray-300 hover:text-white transition-all duration-300 rounded-2xl hover:bg-gray-800 border border-gray-700"
                >
                  <span className="text-xl">🔑</span>
                  <span className="font-semibold text-lg">Login</span>
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-xl">✨</span>
                  <span className="font-semibold text-lg">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        header {
          animation: slideDown 0.8s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;