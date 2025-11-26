import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from '../types';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    transactionType: 'sale',
    propertyType: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  const transactionTypes = [
    { id: 'sale', label: 'Dijual' },
    { id: 'rent', label: 'Disewa' }
  ];

  const propertyTypes = [
    { id: 'house', label: 'Rumah', icon: '🏠' },
    { id: 'apartment', label: 'Apartemen', icon: '🏢' },
    { id: 'land', label: 'Tanah', icon: '📍' }
  ];

  const popularLocations = ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Medan', 'Tangerang'];

  const handleSearch = () => {
    navigate('/properties', { state: { filters } });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl -mt-20 relative z-10 mx-4 lg:mx-auto max-w-6xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Cari Properti Impian Anda</h3>
      
      {/* Transaction Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Tipe Transaksi</label>
        <div className="flex space-x-4">
          {transactionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilters({ ...filters, transactionType: type.id })}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition duration-300 ${
                filters.transactionType === type.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Tipe Properti</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilters({ ...filters, propertyType: type.id })}
              className={`p-4 rounded-lg border-2 transition duration-300 flex items-center justify-center space-x-2 ${
                filters.propertyType === type.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Lokasi</label>
        <div className="flex flex-wrap gap-2">
          {popularLocations.map((location) => (
            <button
              key={location}
              onClick={() => setFilters({ ...filters, location })}
              className={`px-4 py-2 rounded-full border transition duration-300 ${
                filters.location === location
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Range Harga</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Harga Minimum"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Harga Maksimum"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300 font-bold text-lg"
      >
        🔍 CARI PROPERTI
      </button>
    </div>
  );
};

export default SearchBar;