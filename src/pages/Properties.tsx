import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { featuredProperties } from '../data/mockData';

const Properties: React.FC = () => {
  const location = useLocation();
  const filters = location.state?.filters || {};
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const luxuryFilters = [
    { id: 'price-high', label: 'Harga Tertinggi', icon: '💎' },
    { id: 'price-low', label: 'Harga Terendah', icon: '💰' },
    { id: 'newest', label: 'Terbaru', icon: '🆕' },
    { id: 'featured', label: 'Unggulan', icon: '⭐' },
    { id: 'luxury', label: 'Luxury', icon: '🏰' },
    { id: 'penthouse', label: 'Penthouse', icon: '🏙️' },
    { id: 'waterfront', label: 'Waterfront', icon: '🌊' }
  ];

  const propertyTypes = [
    { id: 'all', label: 'Semua Tipe', count: featuredProperties.length },
    { id: 'house', label: 'Rumah', count: featuredProperties.filter(p => p.category === 'house').length },
    { id: 'apartment', label: 'Apartemen', count: featuredProperties.filter(p => p.category === 'apartment').length },
    { id: 'villa', label: 'Villa', count: 12 },
    { id: 'penthouse', label: 'Penthouse', count: 8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Luxury Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-yellow-400 text-2xl">✨</span>
              <span className="tracking-widest uppercase">Exclusive Property Collection</span>
              <span className="text-yellow-400 text-2xl">✨</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Curated
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                Properties
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Discover our handpicked selection of premium properties featuring exceptional design, 
              prime locations, and unparalleled luxury amenities.
            </p>
            
            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                  {featuredProperties.length}+
                </div>
                <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                  Premium Listings
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-400/30 to-transparent"></div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                  15+
                </div>
                <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                  Luxury Locations
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-400/30 to-transparent"></div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                  250+
                </div>
                <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                  Elite Agents
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Controls Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left Section - Results & Toggle */}
            <div className="flex items-center gap-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {featuredProperties.length}
                  </span>
                  <span className="text-slate-600 font-light"> Exclusive Properties</span>
                </h2>
                <p className="text-slate-500 text-sm font-light">
                  Handpicked for discerning individuals
                </p>
              </div>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300"
              >
                <span>🔧</span>
                Filters
              </button>
            </div>

            {/* Right Section - Sort & View Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Sort By */}
              <div className="flex items-center gap-3">
                <span className="text-slate-600 font-light text-sm">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="newest">Newest First</option>
                  <option value="luxury">Luxury Properties</option>
                </select>
              </div>

              {/* View Options */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                <button className="p-2 rounded-lg hover:bg-white transition-colors duration-200">
                  <span className="text-lg">◼️◼️</span>
                </button>
                <button className="p-2 rounded-lg bg-white shadow-sm transition-colors duration-200">
                  <span className="text-lg">◼️</span>
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          <div className={`mt-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-4">
              {/* Property Type Filters */}
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-300"
                  >
                    <span className="text-slate-700 font-medium group-hover:text-slate-900">
                      {type.label}
                    </span>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full group-hover:bg-yellow-200 group-hover:text-slate-800">
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                {luxuryFilters.slice(0, 4).map((filter) => (
                  <button
                    key={filter.id}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300 rounded-xl hover:from-yellow-100 hover:to-orange-100 hover:border-yellow-500 transition-all duration-300"
                  >
                    <span>{filter.icon}</span>
                    <span className="text-slate-700 font-medium">{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Properties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {featuredProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="group relative"
                style={{ 
                  animation: `luxuryFadeIn 0.8s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                
                {/* Card Container */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-4 border border-slate-200">
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {property.is_featured ? '⭐ PREMIUM' : '💎 LUXURY'}
                    </div>
                  </div>
                  
                  <PropertyCard property={property} />
                </div>
              </div>
            ))}
          </div>

          {/* Load More Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white to-slate-50 rounded-3xl p-12 border border-slate-200 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                Discover More <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Exclusive</span> Properties
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Continue exploring our curated collection of premium real estate opportunities 
                tailored for discerning individuals.
              </p>
              
              <button className="group relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white px-12 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl font-bold text-lg overflow-hidden">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative flex items-center justify-center gap-3">
                  <span className="text-xl">✨</span>
                  Load More Properties
                  <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </button>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-slate-200">
                {[
                  { icon: '🔒', text: 'Secure Transactions' },
                  { icon: '⭐', text: 'Premium Verified' },
                  { icon: '👑', text: 'Elite Service' },
                  { icon: '💎', text: 'Luxury Collection' }
                ].map((badge, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-300"
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-sm font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-yellow-400 text-2xl">💫</span>
              STAY UPDATED
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
              Get <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Exclusive</span> Access
            </h3>
            
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Be the first to know about new luxury listings, private viewings, and exclusive market insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 rounded-2xl font-bold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style>{`
        @keyframes luxuryFadeIn {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Properties;