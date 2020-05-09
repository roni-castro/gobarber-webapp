import React from 'react';
import AuthContext from './AuthContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthContext.AuthProvider>{children}</AuthContext.AuthProvider>
);

export default AppProvider;
