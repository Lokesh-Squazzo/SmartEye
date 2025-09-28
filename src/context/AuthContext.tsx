import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNumber?: string;
  college?: string;
  profilePhoto?: string;
  biometricRegistered?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'student' ? 'Anita Sharma' : role === 'staff' ? 'Dr. Rajesh Kumar' : 'Admin User',
        email,
        role,
        rollNumber: role === 'student' ? 'CE-2025-042' : undefined,
        college: role === 'student' ? 'Government College of Engineering' : undefined,
        biometricRegistered: role === 'student' ? true : undefined,
      };
      
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'student',
        rollNumber: userData.rollNumber,
        college: userData.college,
        biometricRegistered: false,
      };
      
      setUser(newUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};