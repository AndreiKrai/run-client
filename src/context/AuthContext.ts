import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check if user is logged in on page load
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      // You would typically validate the token and fetch user info from API
      setUser({ name: 'John Doe' }); // Placeholder
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This would be an API call in a real app
    // Simulating a successful login
    localStorage.setItem('authToken', 'dummy-token');
    setIsAuthenticated(true);
    setUser({ name: 'John Doe' });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    // This would be an API call in a real app
    // After registration, log in the user
    await login(email, password);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
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