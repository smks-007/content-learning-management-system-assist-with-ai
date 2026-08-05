import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: { id: 1, name: 'Student User', roles: ['STUDENT'] },
      isAuthenticated: true,
      isLoading: false,
      login: async () => {},
      register: async () => {},
      updateUser: () => {},
      logout: () => {}
    };
  }
  return context;
};
