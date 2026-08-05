import React, { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);
  const showInfo = (message) => toast(message, { icon: 'ℹ️' });

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
