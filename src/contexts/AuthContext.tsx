import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Admin, getToken, getAdminData, saveAuthData, verifyToken, logout as logoutApi } from '../api/admin/authApi';

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = getToken();
        const storedAdmin = getAdminData();

        if (storedToken && storedAdmin) {
          // Verify token is still valid
          try {
            await verifyToken(storedToken);
            setToken(storedToken);
            setAdmin(storedAdmin);
          } catch (err) {
            // Token is invalid, clear storage
            logoutApi();
            setToken(null);
            setAdmin(null);
          }
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { login: loginApi } = await import('../api/admin/authApi');
      const response = await loginApi({ email, password });
      
      setToken(response.token);
      setAdmin(response.admin);
      saveAuthData(response.token, response.admin);
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setToken(null);
    setAdmin(null);
    setError(null);
  };

  const value: AuthContextType = {
    admin,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!token && !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
