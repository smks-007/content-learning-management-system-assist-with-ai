import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import * as authService from '../services/authService';

export const AuthContext = createContext();

const defaultUser = {
  id: 1,
  firstName: 'Student',
  lastName: 'User',
  name: 'Student User',
  email: 'student@example.com',
  phone: '+1 234 567 8900',
  bio: 'Full-stack learner exploring AI & Web applications.',
  roles: ['STUDENT'],
  avatar: null
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user_data');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Failed parsing saved user_data, using default:', err);
      localStorage.removeItem('user_data');
    }
    return defaultUser;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }, [user]);

  const login = async (credentials) => {
    const role = credentials.email?.includes('admin') ? 'ADMIN' : 'STUDENT';
    const loggedUser = {
      ...defaultUser,
      email: credentials.email || 'student@example.com',
      roles: [role]
    };
    localStorage.setItem('token', 'mock_token');
    localStorage.setItem('user_data', JSON.stringify(loggedUser));
    setUser(loggedUser);
    setIsAuthenticated(true);
    return loggedUser;
  };

  const register = async (data) => {
    const loggedUser = {
      ...defaultUser,
      firstName: data.firstName || data.name || 'Student',
      lastName: data.lastName || '',
      name: data.name || `${data.firstName || 'Student'} ${data.lastName || ''}`.trim(),
      email: data.email,
      roles: [data.role || 'STUDENT']
    };
    localStorage.setItem('token', 'mock_token');
    localStorage.setItem('user_data', JSON.stringify(loggedUser));
    setUser(loggedUser);
    setIsAuthenticated(true);
    return loggedUser;
  };

  const updateUser = (updatedFields) => {
    setUser(prev => {
      const nextUser = { ...prev, ...updatedFields };
      if (updatedFields.firstName || updatedFields.lastName) {
        nextUser.name = `${nextUser.firstName || ''} ${nextUser.lastName || ''}`.trim();
      }
      localStorage.setItem('user_data', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
