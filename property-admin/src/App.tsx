import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Properties from './pages/admin/Properties';
import Users from './pages/admin/Users';
import Inquiries from './pages/admin/Inquiries';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin Route Component (Role-based access)
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Only admin and agent can access admin panel
  if (user?.role !== 'admin' && user?.role !== 'agent') {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/inquiries" element={<Inquiries />} />
                    
                    {/* Additional admin routes */}
                    <Route path="/settings" element={
                      <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                        <p className="text-gray-600">Admin settings page</p>
                      </div>
                    } />
                    
                    {/* 404 for admin routes */}
                    <Route path="*" element={
                      <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h1>
                        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                      </div>
                    } />
                  </Routes>
                </AdminLayout>
              </AdminRoute>
            } 
          />
          
          {/* Redirect root to admin */}
          <Route path="/" element={<Navigate to="/admin" />} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <a 
                  href="/admin"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Admin Panel
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;