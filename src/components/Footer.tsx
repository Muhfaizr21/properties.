import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[length:100px_100px] bg-[linear-gradient(45deg,transparent_45%,#ffffff_50%,transparent_55%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Luxury Brand */}
            <div className="space-y-6">
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
              
              <p className="text-gray-400 leading-relaxed font-light max-w-xs">
                Indonesia's premier luxury property platform, connecting discerning individuals with exceptional real estate opportunities through unparalleled service.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-3">
                {[
                  { icon: '💼', label: 'LinkedIn', color: 'hover:bg-blue-500' },
                  { icon: '📘', label: 'Facebook', color: 'hover:bg-blue-600' },
                  { icon: '📷', label: 'Instagram', color: 'hover:bg-pink-500' },
                  { icon: '🐦', label: 'Twitter', color: 'hover:bg-sky-400' }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                    title={social.label}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-black mb-8 text-white flex items-center gap-2">
                <span className="text-yellow-400">⚡</span>
                Quick Links
              </h4>
              <div className="space-y-4">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/properties', label: 'Luxury Properties' },
                  { path: '/about', label: 'Our Story' },
                  { path: '/contact', label: 'Concierge' }
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:translate-x-2 font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Property Types */}
            <div>
              <h4 className="text-lg font-black mb-8 text-white flex items-center gap-2">
                <span className="text-yellow-400">🏰</span>
                Property Types
              </h4>
              <div className="space-y-4">
                {[
                  'Luxury Villas',
                  'Penthouse Suites',
                  'Waterfront Estates',
                  'Premium Apartments',
                  'Investment Properties'
                ].map((type) => (
                  <button
                    key={type}
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:translate-x-2 font-medium text-left"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Contact */}
            <div>
              <h4 className="text-lg font-black mb-8 text-white flex items-center gap-2">
                <span className="text-yellow-400">💎</span>
                Concierge Service
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="text-xl">📞</span>
                  <div>
                    <div className="font-medium">+62 21 1234 5678</div>
                    <div className="text-sm text-gray-500">VIP Hotline</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="text-xl">✉️</span>
                  <div>
                    <div className="font-medium">concierge@propertyku.com</div>
                    <div className="text-sm text-gray-500">Priority Support</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="text-xl mt-1">🏢</span>
                  <div>
                    <div className="font-medium">SCBD Tower</div>
                    <div className="text-sm text-gray-500">Jakarta Selatan</div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8 p-4 bg-gray-800 rounded-2xl border border-gray-700">
                <p className="text-sm text-gray-400 mb-3">Get exclusive listings</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm font-light">
              © 2024 PropertyKu Luxury Estates. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Sitemap'].map((link) => (
                <button key={link} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 font-light">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;