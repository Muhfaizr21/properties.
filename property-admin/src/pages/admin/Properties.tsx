import React, { useState, useEffect } from 'react';
import { Property } from '../../types';
import PropertyModal from './components/PropertyModal';
import ConfirmModal from './components/ConfirmModal';

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API
      const sampleData = getSampleProperties();
      setProperties(sampleData);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties(getSampleProperties());
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
          '/images/properties/villa-2.jpg'
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
        created_at: '2025-11-26T13:10:07.000Z',
        status: 'active'
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
          '/images/properties/apartment-1.jpg'
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
        created_at: '2025-11-26T13:10:07.000Z',
        status: 'active'
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
          '/images/properties/land-1.jpg'
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
        created_at: '2025-11-26T13:10:07.000Z',
        status: 'active'
      }
    ];
  };

  const handleCreate = () => {
    setEditingProperty(null);
    setShowModal(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleDelete = (property: Property) => {
    setDeletingProperty(property);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deletingProperty) {
      try {
        // Simulate API call - replace with actual API
        setProperties(properties.filter(p => p.id !== deletingProperty.id));
        setShowDeleteModal(false);
        setDeletingProperty(null);
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleSave = async (propertyData: any) => {
    try {
      if (editingProperty) {
        // Update existing property
        setProperties(properties.map(p => 
          p.id === editingProperty.id 
            ? { ...propertyData, id: editingProperty.id, agent: editingProperty.agent }
            : p
        ));
      } else {
        // Create new property
        const newProperty: Property = {
          ...propertyData,
          id: Math.max(...properties.map(p => p.id)) + 1,
          agent: {
            id: 2,
            name: 'John Agent',
            email: 'john@agent.com',
            phone: '+628123456789',
            avatar: '/images/agents/agent-1.jpg',
            agency: 'Premium Real Estate'
          },
          created_at: new Date().toISOString(),
          status: 'active'
        };
        setProperties([...properties, newProperty]);
      }
      setShowModal(false);
      setEditingProperty(null);
    } catch (error) {
      console.error('Error saving property:', error);
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

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fix Set error - use Array.from
  const uniqueCities = Array.from(new Set(properties.map(p => p.city)));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Properties Management</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span>
          Add New Property
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-gray-800">{properties.length}</div>
          <div className="text-gray-600 text-sm">Total Properties</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">
            {properties.filter(p => p.status === 'active').length}
          </div>
          <div className="text-gray-600 text-sm">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">
            {properties.filter(p => p.is_featured).length}
          </div>
          <div className="text-gray-600 text-sm">Featured</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-purple-600">
            {uniqueCities.length}
          </div>
          <div className="text-gray-600 text-sm">Cities</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={property.images[0]}
                          alt={property.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.city}, {property.district}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{property.type}</div>
                    <div className="text-sm text-gray-500 capitalize">{property.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(property.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      property.is_featured 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {property.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No properties found</div>
          </div>
        )}
      </div>

      {/* Modals */}
      <PropertyModal
        show={showModal}
        property={editingProperty}
        onClose={() => {
          setShowModal(false);
          setEditingProperty(null);
        }}
        onSave={handleSave}
      />

      <ConfirmModal
        show={showDeleteModal}
        title="Delete Property"
        message={`Are you sure you want to delete "${deletingProperty?.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeletingProperty(null);
        }}
      />
    </div>
  );
};

export default Properties;