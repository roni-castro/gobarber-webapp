import React from 'react';
import AuthContext from './AuthContext';
import ToastContext from './ToastContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthContext.AuthProvider>
    <ToastContext.ToastProvider>{children}</ToastContext.ToastProvider>
  </AuthContext.AuthProvider>
);

export default AppProvider;
