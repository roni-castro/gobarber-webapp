import React from 'react';
import AuthContext from './AuthContext';
import ToastContext from './ToastContext';
import Toast from '../components/Toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthContext.AuthProvider>
    <ToastContext.ToastProvider>
      {children}
      <Toast />
    </ToastContext.ToastProvider>
  </AuthContext.AuthProvider>
);

export default AppProvider;
