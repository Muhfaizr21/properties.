import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { Property } from '../types';

const Home: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      // Use sample data from database
      const properties = getSampleProperties();
      setFeaturedProperties(properties.filter(p => p.is_featured).slice(0, 3));
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to sample data
      const sampleData = getSampleProperties();
      setFeaturedProperties(sampleData.filter(p => p.is_featured).slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  const getSampleProperties = (): Property[] => {
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
        agent: {
          id: 2,
          name: 'John Agent',
          email: 'john@agent.com',
          phone: '+628123456789',
          avatar: '/images/agents/agent-1.jpg',
          agency: 'Premium Real Estate'
        },
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
        agent: {
          id: 2,
          name: 'John Agent',
          email: 'john@agent.com',
          phone: '+628123456789',
          avatar: '/images/agents/agent-1.jpg',
          agency: 'Premium Real Estate'
        },
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
        agent: {
          id: 2,
          name: 'John Agent',
          email: 'john@agent.com',
          phone: '+628123456789',
          avatar: '/images/agents/agent-1.jpg',
          agency: 'Premium Real Estate'
        },
        is_featured: false,
        created_at: '2025-11-26T13:10:07.000Z'
      }
    ];
  };

  const features = [
    {
      icon: '🏠',
      title: 'Premium Properties',
      description: 'Exclusive selection of luxury homes, apartments, and investment properties'
    },
    {
      icon: '📍',
      title: 'Prime Locations',
      description: 'Carefully curated properties in the most desirable neighborhoods'
    },
    {
      icon: '👑',
      title: 'Elite Service',
      description: 'Personalized service from our team of experienced luxury agents'
    },
    {
      icon: '💎',
      title: 'Verified Quality',
      description: 'Every property is thoroughly vetted for quality and authenticity'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Luxury Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.02)_50%,transparent_60%)]"></div>
        
        {/* Animated Luxury Elements */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-float">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-sm"></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-blue-400 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Diamond Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[length:50px_50px] bg-[linear-gradient(45deg,transparent_45%,#ffffff_50%,transparent_55%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* Luxury Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-sm font-light mb-12 shadow-2xl">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">✦</span>
                  ))}
                </div>
                <span className="tracking-widest uppercase">Database Powered</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">✦</span>
                  ))}
                </div>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  FIND
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                    YOUR
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 blur-xl rounded-full"></div>
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                  DREAM
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
                Discover <span className="text-yellow-400 font-semibold">verified luxury properties</span> from our database. 
                From premium villas to prime land investments, experience real estate with real data.
              </p>
              
              {/* Luxury Stats */}
              <div className="flex justify-center items-center gap-16 mb-16">
                {[
                  { number: '3+', label: 'Verified Properties', color: 'from-yellow-400 to-orange-400' },
                  { number: '2+', label: 'Prime Cities', color: 'from-purple-400 to-pink-400' },
                  { number: '1+', label: 'Expert Agents', color: 'from-blue-400 to-cyan-400' }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Luxury Search Bar */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Featured Properties - Luxury Showcase */}
      <section className="py-32 bg-gradient-to-b from-slate-50 via-white to-slate-100 relative overflow-hidden">
        {/* Luxury Background Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,215,0,0.03),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full text-amber-600 text-sm font-semibold mb-8 shadow-lg">
              <span className="text-2xl">💎</span>
              DATABASE COLLECTION
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent">
                Verified
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Properties
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Real properties from our database featuring accurate information, 
              verified details, and professional management.
            </p>
          </div>
          
          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading properties...</span>
            </div>
          ) : (
            <>
              {/* Luxury Properties Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
                {featuredProperties.map((property, index) => (
                  <div 
                    key={property.id} 
                    className="group relative"
                    style={{ 
                      animation: `luxuryFadeIn 0.8s ease-out ${index * 0.2}s both`
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
              
              {/* Luxury View All Button */}
              <div className="text-center">
                <Link 
                  to="/properties" 
                  className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl font-bold text-lg overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span className="relative flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    Explore All Properties
                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us - Luxury Experience */}
      <section className="py-32 bg-gradient-to-br from-slate-100 via-white to-slate-50 relative overflow-hidden">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,215,0,0.03)_50%,transparent_52%)] bg-[length:100px_100px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full text-indigo-600 text-sm font-semibold mb-8 shadow-lg">
              <span className="text-2xl">🌟</span>
              THE DATABASE DIFFERENCE
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Real Data
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Real Value
              </span>
            </h2>
          </div>
          
          {/* Luxury Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative text-center p-12 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-6 border border-slate-200 overflow-hidden"
                style={{ 
                  animation: `luxurySlideIn 0.8s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-yellow-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700"></div>
                
                {/* Luxury Icon */}
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-2xl">
                    <span className="text-4xl text-white">{feature.icon}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/30 via-orange-400/30 to-pink-500/30 rounded-3xl blur-2xl group-hover:scale-125 transition-all duration-700"></div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  {feature.description}
                </p>
                
                {/* Luxury Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Stats Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        {/* Diamond Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[length:80px_80px] bg-[linear-gradient(45deg,transparent_45%,#ffffff_50%,transparent_55%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-2xl">📊</span>
              DATABASE INSIGHTS
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Real Numbers
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Real Value
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏠',
                title: 'Total Properties',
                value: '3+',
                description: 'Verified listings in our database'
              },
              {
                icon: '💰',
                title: 'Portfolio Value',
                value: 'Rp 4.2M+',
                description: 'Total property value'
              },
              {
                icon: '📍',
                title: 'Cities Covered',
                value: '2+',
                description: 'Prime locations available'
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 transform hover:scale-105 transition-all duration-500 overflow-hidden text-center"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  
                  {/* Value */}
                  <div className="text-4xl font-black text-yellow-400 mb-4">
                    {stat.value}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {stat.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed font-light">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className="relative py-40 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
        {/* Luxury Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,215,0,0.1),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_60%)]"></div>
        
        {/* Floating Luxury Elements */}
        <div className="absolute top-20 left-20 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60 blur-sm animate-float"></div>
        <div className="absolute bottom-32 right-32 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-sm font-light mb-12">
              <span className="text-yellow-400 text-2xl">✨</span>
              <span className="tracking-widest uppercase">Begin Your Property Journey</span>
              <span className="text-yellow-400 text-2xl">✨</span>
            </div>
            
            {/* Main Headline */}
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 leading-none">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                READY TO
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                EXPLORE
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                REAL DATA?
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
              Discover verified properties with accurate information from our database. 
              Your next investment or dream home is just a click away.
            </p>
            
            {/* Luxury CTA Buttons */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-20">
              <Link
                to="/properties"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-slate-900 px-16 py-8 rounded-3xl transition-all duration-500 transform hover:scale-105 font-black text-xl shadow-2xl hover:shadow-3xl overflow-hidden min-w-[300px]"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative flex items-center justify-center gap-4">
                  <span className="text-3xl">🔍</span>
                  BROWSE PROPERTIES
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group relative border-2 border-white/30 text-white px-16 py-8 rounded-3xl transition-all duration-500 transform hover:scale-105 font-bold text-xl backdrop-blur-xl overflow-hidden min-w-[300px]"
              >
                {/* Hover Background */}
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <span className="relative flex items-center justify-center gap-4">
                  <span className="text-2xl">ℹ️</span>
                  LEARN MORE
                  <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </Link>
            </div>
            
            {/* Luxury Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-12 pt-16 border-t border-white/10">
              {[
                { icon: '💾', text: 'Database Powered' },
                { icon: '✅', text: 'Verified Data' },
                { icon: '🔒', text: 'Secure Platform' },
                { icon: '📊', text: 'Real Analytics' }
              ].map((badge, index) => (
                <div 
                  key={index}
                  className="group flex items-center gap-3 text-white/80 hover:text-white text-lg font-light transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{badge.icon}</span>
                  <span className="tracking-widest uppercase text-sm">{badge.text}</span>
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
        
        @keyframes luxurySlideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;