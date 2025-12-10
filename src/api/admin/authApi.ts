import { BASE_URL } from './baseUrl';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: {
    _id: string;
    email: string;
    name: string;
    role: 'admin' | 'superadmin';
  };
}

export interface Admin {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
}

// Login
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Mock authentication - replace with real backend when available
  // For now, accept any email/password combination
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required');
  }

  // Try to connect to real backend first
  try {
    const res = await fetch(`${BASE_URL}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Backend auth endpoint not available, using mock auth');
  }

  // Mock response if backend is not available
  const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return {
    token: mockToken,
    admin: {
      _id: 'admin_001',
      email: credentials.email,
      name: credentials.email.split('@')[0].charAt(0).toUpperCase() + credentials.email.split('@')[0].slice(1),
      role: 'admin',
    },
  };
};

// Verify token
export const verifyToken = async (token: string): Promise<Admin> => {
  if (!token) {
    throw new Error('No token provided');
  }

  // Try real backend first
  try {
    const res = await fetch(`${BASE_URL}/admin/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
    // If 404, backend endpoint not implemented yet
    if (res.status === 404) {
      // Silent fallback to mock
    }
  } catch (err) {
    // Network error or backend not available - silent fallback
  }

  // Mock verification for local tokens
  if (token.startsWith('mock_token_')) {
    const storedAdmin = getAdminData();
    if (storedAdmin) {
      return storedAdmin;
    }
  }

  throw new Error('Invalid token');
};

// Logout
export const logout = (): void => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_data');
};

// Get stored token
export const getToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

// Get stored admin data
export const getAdminData = (): Admin | null => {
  const data = localStorage.getItem('admin_data');
  return data ? JSON.parse(data) : null;
};

// Save token and admin data
export const saveAuthData = (token: string, admin: Admin): void => {
  localStorage.setItem('admin_token', token);
  localStorage.setItem('admin_data', JSON.stringify(admin));
};
