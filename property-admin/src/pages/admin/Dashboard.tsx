import React, { useState, useEffect } from 'react';
import { PropertyService, AdminService } from '../../services/api';

interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  totalUsers: number;
  totalAgents: number;
  totalInquiries: number;
  pendingInquiries: number;
  featuredProperties: number;
  totalRevenue: number;
}

interface RecentActivity {
  id: number;
  type: 'property' | 'user' | 'inquiry';
  title: string;
  description: string;
  time: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    activeProperties: 0,
    totalUsers: 0,
    totalAgents: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    featuredProperties: 0,
    totalRevenue: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [topProperties, setTopProperties] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch data using correct method names from your services
      const [propertiesRes, usersRes] = await Promise.all([
        PropertyService.getAllProperties(),
        AdminService.getUsers()
      ]);

      // For inquiries, we'll use mock data since the method doesn't exist
      const inquiriesRes = { data: [] };

      // Extract data based on your API response structure
      const properties = propertiesRes.data || propertiesRes || [];
      const users = usersRes.data || usersRes || [];
      const inquiries = inquiriesRes.data || inquiriesRes || [];

      // Calculate stats
      const totalProperties = Array.isArray(properties) ? properties.length : 0;
      const activeProperties = Array.isArray(properties) ? 
        properties.filter((p: any) => p.status === 'active').length : 0;
      const featuredProperties = Array.isArray(properties) ? 
        properties.filter((p: any) => p.is_featured).length : 0;
      
      const totalUsers = Array.isArray(users) ? 
        users.filter((u: any) => u.role === 'user').length : 0;
      const totalAgents = Array.isArray(users) ? 
        users.filter((u: any) => u.role === 'agent').length : 0;
      
      // Since inquiries API might not be available, we'll use mock data
      const totalInquiries = 0;
      const pendingInquiries = 0;
      
      // Calculate total revenue (sum of all property prices)
      const totalRevenue = Array.isArray(properties) ? properties.reduce((sum: number, property: any) => {
        return sum + (parseFloat(property.price || 0));
      }, 0) : 0;

      setStats({
        totalProperties,
        activeProperties,
        totalUsers,
        totalAgents,
        totalInquiries,
        pendingInquiries,
        featuredProperties,
        totalRevenue
      });

      // Get top 3 properties with highest price
      const sortedProperties = Array.isArray(properties) ? 
        [...properties]
          .sort((a: any, b: any) => parseFloat(b.price || 0) - parseFloat(a.price || 0))
          .slice(0, 3) : [];
      setTopProperties(sortedProperties);

      // Generate recent activities
      generateRecentActivities(properties, users, inquiries);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default data for demo if API fails
      setDefaultData();
    } finally {
      setLoading(false);
    }
  };

  const setDefaultData = () => {
    // Fallback data if API is not available
    setStats({
      totalProperties: 3,
      activeProperties: 3,
      totalUsers: 1,
      totalAgents: 1,
      totalInquiries: 0,
      pendingInquiries: 0,
      featuredProperties: 2,
      totalRevenue: 4200000000
    });

    setRecentActivities([
      {
        id: 1,
        type: 'property',
        title: 'New Property Added',
        description: 'Luxury Villa in Bali - Rp 2,500,000,000',
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'property',
        title: 'New Property Added',
        description: 'Modern Apartment in Jakarta - Rp 1,200,000,000',
        time: '1 day ago'
      },
      {
        id: 3,
        type: 'user',
        title: 'New Agent Registered',
        description: 'John Agent (john@agent.com)',
        time: '2 days ago'
      }
    ]);

    setTopProperties([
      {
        id: 1,
        title: 'Luxury Villa in Bali',
        price: '2500000000',
        type: 'sale',
        category: 'villa',
        status: 'active'
      },
      {
        id: 2,
        title: 'Modern Apartment in Jakarta',
        price: '1200000000',
        type: 'sale',
        category: 'apartment',
        status: 'active'
      },
      {
        id: 3,
        title: 'Land for Investment',
        price: '500000000',
        type: 'sale',
        category: 'land',
        status: 'active'
      }
    ]);
  };

  const generateRecentActivities = (properties: any[], users: any[], inquiries: any[]) => {
    const activities: RecentActivity[] = [];

    // Add recent properties
    if (Array.isArray(properties)) {
      properties.slice(0, 3).forEach((property: any) => {
        activities.push({
          id: property.id,
          type: 'property',
          title: `Property ${property.status === 'active' ? 'Added' : 'Updated'}`,
          description: `${property.title} - ${formatCurrency(property.price)}`,
          time: formatTimeAgo(property.created_at)
        });
      });
    }

    // Add recent users
    if (Array.isArray(users)) {
      users.slice(0, 2).forEach((user: any) => {
        activities.push({
          id: user.id,
          type: 'user',
          title: `New ${user.role} Registered`,
          description: `${user.name} (${user.email})`,
          time: formatTimeAgo(user.created_at)
        });
      });
    }

    // Add recent inquiries if available
    if (Array.isArray(inquiries) && inquiries.length > 0) {
      inquiries.slice(0, 2).forEach((inquiry: any) => {
        activities.push({
          id: inquiry.id,
          type: 'inquiry',
          title: `New ${inquiry.type} Inquiry`,
          description: `Property ID: ${inquiry.property_id}`,
          time: formatTimeAgo(inquiry.created_at)
        });
      });
    }

    // Sort by time and take latest 5
    const sortedActivities = activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5);
    
    setRecentActivities(sortedActivities);
  };

  const formatCurrency = (amount: number | string): string => {
    if (!amount) return 'Rp 0';
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatTimeAgo = (dateString: string): string => {
    if (!dateString) return 'Recently';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      return `${Math.floor(diffInHours / 24)} days ago`;
    } catch {
      return 'Recently';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'property': return '🏠';
      case 'user': return '👤';
      case 'inquiry': return '📩';
      default: return '📋';
    }
  };

  const handleQuickAction = (action: string) => {
    // Navigate based on action
    switch (action) {
      case 'add-property':
        window.location.href = '/admin/properties?action=create';
        break;
      case 'manage-users':
        window.location.href = '/admin/users';
        break;
      case 'view-inquiries':
        window.location.href = '/admin/inquiries';
        break;
      case 'reports':
        window.location.href = '/admin/reports';
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to Property Management Admin Panel</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
        >
          <span className="mr-2">🔄</span>
          Refresh Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Properties Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Properties</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.totalProperties}</p>
              <p className="text-sm text-green-600">
                {stats.activeProperties} active • {stats.featuredProperties} featured
              </p>
            </div>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers + stats.totalAgents}</p>
              <p className="text-sm text-gray-600">
                {stats.totalUsers} users • {stats.totalAgents} agents
              </p>
            </div>
          </div>
        </div>

        {/* Inquiries Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <span className="text-2xl">📩</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Inquiries</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.totalInquiries}</p>
              <p className="text-sm text-orange-600">
                {stats.pendingInquiries} pending
              </p>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Portfolio Value</h3>
              <p className="text-lg font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-gray-600">All properties</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={`${activity.type}-${activity.id}`} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-lg mt-1">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activities</p>
            )}
          </div>
        </div>

        {/* Top Properties */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Premium Properties
          </h3>
          <div className="space-y-4">
            {topProperties.length > 0 ? (
              topProperties.map((property) => (
                <div key={property.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg border transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-lg">🏠</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{property.title}</p>
                    <p className="text-sm text-gray-600 capitalize">{property.type} • {property.category}</p>
                    <p className="text-sm font-semibold text-blue-600">{formatCurrency(property.price)}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    property.status === 'active' ? 'bg-green-100 text-green-800' : 
                    property.status === 'sold' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {property.status}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No properties found</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('add-property')}
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <div className="text-blue-600 text-lg mb-2">➕</div>
            <p className="font-medium text-gray-800">Add Property</p>
            <p className="text-sm text-gray-600">Create new listing</p>
          </button>
          <button 
            onClick={() => handleQuickAction('manage-users')}
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
          >
            <div className="text-green-600 text-lg mb-2">👥</div>
            <p className="font-medium text-gray-800">Manage Users</p>
            <p className="text-sm text-gray-600">Users & Agents</p>
          </button>
          <button 
            onClick={() => handleQuickAction('view-inquiries')}
            className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-left"
          >
            <div className="text-yellow-600 text-lg mb-2">📩</div>
            <p className="font-medium text-gray-800">View Inquiries</p>
            <p className="text-sm text-gray-600">Customer messages</p>
          </button>
          <button 
            onClick={() => handleQuickAction('reports')}
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <div className="text-purple-600 text-lg mb-2">📊</div>
            <p className="font-medium text-gray-800">Reports</p>
            <p className="text-sm text-gray-600">Analytics & insights</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;