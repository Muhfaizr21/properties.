import React from 'react';

const Inquiries: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inquiries Management</h1>
          <p className="text-gray-600">Manage customer inquiries and messages</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          View All Inquiries
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border p-6">
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📩</div>
          <h3 className="text-lg font-medium mb-2">Inquiries Management</h3>
          <p>Inquiry management functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;