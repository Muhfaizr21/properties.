export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'house' | 'apartment' | 'land';
  address: string;
  city: string;
  district: string;
  bed_rooms: number;
  bath_rooms: number;
  land_size: number;
  building_size: number;
  images: string[];
  facilities: string[];
  agent: Agent;
  is_featured: boolean;
  created_at: string;
  status?: 'active' | 'pending' | 'sold' | 'archived';
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  agency: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  phone?: string;
  avatar?: string;
  is_verified?: boolean;
  created_at: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}