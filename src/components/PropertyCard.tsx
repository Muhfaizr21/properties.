import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number): string => {
    if (price >= 1000000000) {
      return `Rp ${(price / 1000000000).toFixed(1)} Miliar`;
    } else if (price >= 1000000) {
      return `Rp ${(price / 1000000).toFixed(1)} Juta`;
    }
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 hari lalu';
    return `${diffDays} hari lalu`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        
        {/* Featured Badge */}
        {property.is_featured && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            UNGGULAN
          </div>
        )}
        
        {/* Favorite Button */}
        <button className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition duration-300">
          <span className="text-xl">🤍</span>
        </button>
        
        {/* Type Badge */}
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {property.type === 'sale' ? 'Dijual' : 'Disewa'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <p className="text-2xl font-bold text-blue-600 mb-3">
          {formatPrice(property.price)}
        </p>
        
        <p className="text-gray-600 mb-4 flex items-center">
          📍 {property.district}, {property.city}
        </p>

        {/* Property Features */}
        <div className="flex items-center space-x-4 mb-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <span>🛏️</span>
            <span>{property.bed_rooms} KT</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🛁</span>
            <span>{property.bath_rooms} KM</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>📐</span>
            <span>{property.building_size} m²</span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{property.agent.name}</p>
              <p className="text-xs text-gray-500">{property.agent.agency}</p>
            </div>
          </div>
          <span className="text-xs text-gray-500">
            {getTimeAgo(property.created_at)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
         <Link
  to={`/property/${property.id}`}
  className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
>
  Lihat Detail
</Link>
          <button className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300">
            📞
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;