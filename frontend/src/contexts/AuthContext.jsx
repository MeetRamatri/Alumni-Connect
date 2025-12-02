import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Dummy login: replace with real API later
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email : 'anurag@gmail.com',
      password : 'Anurag@123',
      batch: '2020',
      company: 'Tech Corp',
      role: 'Software Engineer',
      location: 'San Francisco, CA',
    };
    setUser(mockUser);
  };

  const signup = (userData) => {
    // userData will contain: name, email, batch, company, role, location, password
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      batch: userData.batch,
      company: userData.company,
      role: userData.role,
      location: userData.location,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (userData) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
