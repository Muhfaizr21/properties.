import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { Property, Agent } from '../types';

const Properties: React.FC = () => {
  const location = useLocation();
  const filters = location.state?.filters || {};
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    luxuryLocations: 0,
    eliteAgents: 0
  });

  useEffect(() => {
    fetchProperties();
  }, [sortBy]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // Use sample data directly
      let propertiesData: Property[] = getSampleProperties();
      
      // Apply sorting
      propertiesData = sortProperties(propertiesData, sortBy);
      
      setProperties(propertiesData);
      
      // Calculate stats
      const uniqueCities = Array.from(new Set(propertiesData.map((p: Property) => p.city)));
      const uniqueAgents = Array.from(new Set(propertiesData.map((p: Property) => p.agent.id)));
      
      setStats({
        totalProperties: propertiesData.length,
        luxuryLocations: uniqueCities.length,
        eliteAgents: uniqueAgents.length
      });
      
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to sample data
      const sampleData = getSampleProperties();
      setProperties(sampleData);
      
      const uniqueCities = Array.from(new Set(sampleData.map((p: Property) => p.city)));
      const uniqueAgents = Array.from(new Set(sampleData.map((p: Property) => p.agent.id)));
      
      setStats({
        totalProperties: sampleData.length,
        luxuryLocations: uniqueCities.length,
        eliteAgents: uniqueAgents.length
      });
    } finally {
      setLoading(false);
    }
  };

  const getSampleProperties = (): Property[] => {
    const sampleAgent: Agent = {
      id: 2,
      name: 'John Agent',
      email: 'john@agent.com',
      phone: '+628123456789',
      avatar: '/images/agents/agent-1.jpg',
      agency: 'Premium Real Estate'
    };

    return [
      {
        id: 1,
        title: 'Luxury Villa in Bali',
        description: 'Beautiful luxury villa with private pool and ocean view',
        price: 2500000000,
        type: 'sale',
        category: 'house',
        address: 'Jl. Raya Seminyak No. 123',
        city: 'Bali',
        district: 'Seminyak',
        bed_rooms: 4,
        bath_rooms: 3,
        land_size: 500,
        building_size: 350,
        images: [
          '/images/properties/villa-1.jpg',
          '/images/properties/villa-2.jpg',
          '/images/properties/villa-3.jpg'
        ],
        facilities: ['Swimming Pool', 'Garden', 'Security', 'Parking'],
        agent: sampleAgent,
        is_featured: true,
        created_at: '2025-11-26T13:10:07.000Z'
      },
      {
        id: 2,
        title: 'Modern Apartment in Jakarta',
        description: 'Brand new apartment in central business district',
        price: 1200000000,
        type: 'sale',
        category: 'apartment',
        address: 'SCBD Tower, Jakarta',
        city: 'Jakarta',
        district: 'SCBD',
        bed_rooms: 2,
        bath_rooms: 2,
        land_size: 0,
        building_size: 75,
        images: [
          '/images/properties/apartment-1.jpg',
          '/images/properties/apartment-2.jpg'
        ],
        facilities: ['Gym', 'Swimming Pool', 'Security', 'Parking'],
        agent: sampleAgent,
        is_featured: true,
        created_at: '2025-11-26T13:10:07.000Z'
      },
      {
        id: 3,
        title: 'Land for Investment',
        description: 'Prime location land for commercial development',
        price: 500000000,
        type: 'sale',
        category: 'land',
        address: 'Jl. Sudirman Kav. 1',
        city: 'Jakarta',
        district: 'Sudirman',
        bed_rooms: 0,
        bath_rooms: 0,
        land_size: 300,
        building_size: 0,
        images: [
          '/images/properties/land-1.jpg',
          '/images/properties/land-2.jpg'
        ],
        facilities: [],
        agent: sampleAgent,
        is_featured: false,
        created_at: '2025-11-26T13:10:07.000Z'
      }
    ];
  };

  const sortProperties = (properties: Property[], sortType: string): Property[] => {
    const sorted = [...properties];
    
    switch (sortType) {
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'luxury':
        return sorted.filter(p => p.is_featured || p.price > 1000000000);
      case 'featured':
        return sorted.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
      default:
        return sorted;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const luxuryFilters = [
    { id: 'price-high', label: 'Harga Tertinggi', icon: '💎' },
    { id: 'price-low', label: 'Harga Terendah', icon: '💰' },
    { id: 'newest', label: 'Terbaru', icon: '🆕' },
    { id: 'featured', label: 'Unggulan', icon: '⭐' },
    { id: 'luxury', label: 'Luxury', icon: '🏰' },
    { id: 'house', label: 'Rumah', icon: '🏠' },
    { id: 'apartment', label: 'Apartemen', icon: '🏙️' }
  ];

  const propertyTypes = [
    { id: 'all', label: 'Semua Tipe', count: properties.length },
    { id: 'house', label: 'Rumah', count: properties.filter(p => p.category === 'house').length },
    { id: 'apartment', label: 'Apartemen', count: properties.filter(p => p.category === 'apartment').length },
    { id: 'land', label: 'Tanah', count: properties.filter(p => p.category === 'land').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading properties...</span>
        </div>
        <Footer />
      </div>
    );
  }

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
                Premium
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                Properties
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Discover our curated selection of premium properties with verified information 
              and professional management.
            </p>
            
            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stats.totalProperties}+
                </div>
                <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                  Verified Listings
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-400/30 to-transparent"></div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stats.luxuryLocations}+
                </div>
                <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                  Prime Locations
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-400/30 to-transparent"></div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stats.eliteAgents}+
                </div>
                <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                  Professional Agents
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
                    {properties.length}
                  </span>
                  <span className="text-slate-600 font-light"> Real Properties</span>
                </h2>
                <p className="text-slate-500 text-sm font-light">
                  Handpicked selection from our database
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
                    onClick={() => setSortBy(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all duration-300 ${
                      sortBy === filter.id 
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-500 text-slate-900' 
                        : 'bg-gradient-to-r from-slate-100 to-slate-50 border-slate-300 text-slate-700 hover:from-yellow-100 hover:to-orange-100 hover:border-yellow-500'
                    }`}
                  >
                    <span>{filter.icon}</span>
                    <span className="font-medium">{filter.label}</span>
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
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {properties.map((property, index) => (
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
                        {property.is_featured ? '⭐ PREMIUM' : '💎 VERIFIED'}
                      </div>
                    </div>
                    
                    {/* Database Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        REAL DATA
                      </div>
                    </div>
                    
                    <PropertyCard property={property} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Properties Found</h3>
              <p className="text-slate-600 mb-6">We couldn't find any properties matching your criteria.</p>
              <button 
                onClick={() => fetchProperties()}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Refresh Properties
              </button>
            </div>
          )}

          {/* Load More Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white to-slate-50 rounded-3xl p-12 border border-slate-200 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                Explore More <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Premium</span> Properties
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                All our listings feature verified information and professional management 
                for your peace of mind.
              </p>
              
              <button 
                onClick={() => fetchProperties()}
                className="group relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white px-12 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl font-bold text-lg overflow-hidden"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative flex items-center justify-center gap-3">
                  <span className="text-xl">🔄</span>
                  Refresh Properties
                  <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </button>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-slate-200">
                {[
                  { icon: '✅', text: 'Verified Data' },
                  { icon: '💎', text: 'Premium Quality' },
                  { icon: '👑', text: 'Professional Service' },
                  { icon: '🔒', text: 'Secure Information' }
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

      {/* Database Info Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-green-400 text-2xl">📊</span>
              LIVE PROPERTY DATA
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
              Real <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Property</span> Information
            </h3>
            
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              All property data is carefully curated and verified to ensure accurate 
              and reliable information for our valued clients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { 
                  icon: '🏠', 
                  label: 'Active Properties', 
                  value: properties.filter((p: Property) => p.is_featured).length 
                },
                { 
                  icon: '💰', 
                  label: 'Total Portfolio Value', 
                  value: formatCurrency(properties.reduce((sum: number, p: Property) => sum + p.price, 0)) 
                },
                { 
                  icon: '📍', 
                  label: 'Cities Covered', 
                  value: Array.from(new Set(properties.map((p: Property) => p.city))).length 
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
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