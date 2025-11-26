import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        console.log('Auth check - token:', token, 'userData:', userData); // Debug log
        
        // Validasi ketat untuk menghindari "undefined" string
        if (token && token !== 'undefined' && token !== 'null' && 
            userData && userData !== 'undefined' && userData !== 'null') {
          
          const parsedUser = JSON.parse(userData);
          console.log('Parsed user:', parsedUser); // Debug log
          
          // Validasi structure user data
          if (parsedUser && 
              typeof parsedUser === 'object' && 
              parsedUser.id && 
              parsedUser.email && 
              parsedUser.role) {
            setIsAuthenticated(true);
            setUser(parsedUser);
          } else {
            console.warn('Invalid user data structure, clearing auth data');
            // Clear data yang corrupt
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Jika ada error parsing, clear data yang corrupt
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    try {
      // Validasi input sebelum menyimpan
      if (!token || token === 'undefined' || !userData) {
        throw new Error('Invalid login data');
      }

      // Validasi user data structure
      if (!userData.id || !userData.email || !userData.role) {
        throw new Error('Invalid user data structure');
      }

      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      // Clear data jika ada error
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      throw error; // Re-throw untuk handling di component
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};