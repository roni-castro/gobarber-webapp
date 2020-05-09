import React from 'react';
import AuthContext from './AuthContext';

const Providers: React.FC = ({ children }) => (
  <AuthContext.AuthProvider>{children}</AuthContext.AuthProvider>
);

export default Providers;
