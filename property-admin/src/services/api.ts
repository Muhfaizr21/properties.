import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const AuthService = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const AdminService = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (page?: number, limit?: number) => 
    api.get(`/admin/users?page=${page || 1}&limit=${limit || 10}`),
  updateUserRole: (userId: number, role: string) =>
    api.put(`/admin/users/${userId}/role`, { role }),
  deleteUser: (userId: number) => api.delete(`/admin/users/${userId}`),
};

export const PropertyService = {
  getAllProperties: (filters?: any) => api.get('/properties', { params: filters }),
  getProperty: (id: number) => api.get(`/properties/${id}`),
  createProperty: (propertyData: any) => api.post('/properties', propertyData),
  updateProperty: (id: number, propertyData: any) => api.put(`/properties/${id}`, propertyData),
  deleteProperty: (id: number) => api.delete(`/properties/${id}`),
};

export default api;