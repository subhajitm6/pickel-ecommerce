import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session on mount
    try {
      const savedUser = localStorage.getItem('pickle_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from local storage:', error);
      localStorage.removeItem('pickle_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be an API call verifying credentials
    if (password === 'password123') { // Simple mock validation
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}`
      };
      setUser(mockUser);
      localStorage.setItem('pickle_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid email or password. Use "password123" for demo.');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock register delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock API success
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    const mockUser = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}`
    };
    
    setUser(mockUser);
    localStorage.setItem('pickle_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pickle_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
