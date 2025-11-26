import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { featuredProperties } from '../data/mockData';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const propertyId = parseInt(id || '1');
  const property = featuredProperties.find(p => p.id === propertyId);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🏰</div>
            <h1 className="text-3xl font-black text-slate-900 mb-4">Property Not Found</h1>
            <p className="text-slate-600 mb-8">The luxury property you're looking for is no longer available.</p>
            <Link 
              to="/properties" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-300"
            >
              Browse Luxury Properties
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    if (price >= 1000000000) {
      return `Rp ${(price / 1000000000).toFixed(1)} Miliar`;
    } else if (price >= 1000000) {
      return `Rp ${(price / 1000000).toFixed(1)} Juta`;
    }
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const features = [
    { icon: '🛏️', label: `${property.bed_rooms} Bedrooms`, value: property.bed_rooms },
    { icon: '🛁', label: `${property.bath_rooms} Bathrooms`, value: property.bath_rooms },
    { icon: '📐', label: 'Building Size', value: `${property.building_size} m²` },
    { icon: '🏠', label: 'Land Size', value: `${property.land_size} m²` },
    { icon: '🏢', label: 'Floors', value: '3' },
    { icon: '📅', label: 'Year Built', value: '2020' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Luxury Image Gallery */}
      <section className="relative">
        <div className="container mx-auto px-4 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={property.images[activeImage]}
                  alt={property.title}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {property.is_featured ? '⭐ PREMIUM' : '💎 LUXURY'}
                  </div>
                </div>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <span className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
                    {isFavorite ? '❤️' : '🤍'}
                  </span>
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                      activeImage === index ? 'ring-2 ring-yellow-400 scale-105' : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    {activeImage === index && (
                      <div className="absolute inset-0 bg-yellow-400/20"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                <h3 className="font-black text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-all duration-300 font-semibold">
                    <span>📸</span>
                    Virtual Tour
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300 font-semibold">
                    <span>📷</span>
                    View All Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Header Section */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">
                      {property.title}
                    </h1>
                    <p className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
                      {property.type === 'sale' ? 'FOR SALE' : 'FOR RENT'}
                    </span>
                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold">
                      {property.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span className="font-semibold">{property.district}, {property.city}</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <span>🆔</span>
                    <span className="font-mono">PROP-{property.id.toString().padStart(4, '0')}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-yellow-500">📖</span>
                  Property Description
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg font-light">
                  {property.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <span className="text-yellow-500">⚡</span>
                  Property Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center group p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300">
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div className="text-2xl font-black text-slate-900 mb-1">
                        {feature.value}
                      </div>
                      <div className="text-slate-600 text-sm font-medium">
                        {feature.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-yellow-500">🏊</span>
                  Premium Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-yellow-50 transition-all duration-300 group">
                      <span className="text-xl text-green-500 group-hover:scale-110 transition-transform duration-300">✅</span>
                      <span className="font-semibold text-slate-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-yellow-500">📍</span>
                  Prime Location
                </h2>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-black mb-2">Exclusive {property.district} Location</h3>
                  <p className="text-gray-300 mb-4">{property.address}</p>
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                    View on Map
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <span className="text-yellow-500">👑</span>
                  Luxury Agent
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-yellow-400 shadow-lg"
                  />
                  <div>
                    <h4 className="font-black text-slate-900 text-lg">{property.agent.name}</h4>
                    <p className="text-yellow-600 font-bold text-sm">{property.agent.agency}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <span className="text-lg">📞</span>
                    <span className="font-semibold">{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <span className="text-lg">✉️</span>
                    <span className="font-semibold">{property.agent.email}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
                <h3 className="text-xl font-black text-slate-900 mb-6">Take Action</h3>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <span>📞</span>
                    Contact Agent
                  </button>
                  <button className="w-full border-2 border-slate-900 text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    <span>💰</span>
                    Make Offer
                  </button>
                  <button className="w-full border-2 border-yellow-400 text-yellow-600 py-4 rounded-xl font-bold hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2">
                    <span>📅</span>
                    Schedule Tour
                  </button>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-full border-2 border-gray-300 text-gray-600 py-4 rounded-xl font-bold hover:border-red-400 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>{isFavorite ? '❤️' : '🤍'}</span>
                    {isFavorite ? 'Saved' : 'Save Property'}
                  </button>
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="text-yellow-400">📊</span>
                  Property Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                    <span className="text-gray-300">Views Today</span>
                    <span className="font-black text-yellow-400">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                    <span className="text-gray-300">Total Views</span>
                    <span className="font-black text-yellow-400">1.2K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                    <span className="text-gray-300">Days Listed</span>
                    <span className="font-black text-yellow-400">5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                    <span className="text-gray-300">Price per m²</span>
                    <span className="font-black text-yellow-400">Rp 12M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Explore More <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Luxury</span> Properties
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Discover other exclusive properties in premium locations that match your lifestyle and investment criteria.
          </p>
          <Link 
            to="/properties"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <span>🔍</span>
            Browse All Properties
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetail;