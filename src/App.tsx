import React from 'react';
import GlobalStyle from './styles/global';
import Login from './screens/Login';
import AppProvider from './hooks/AppProvider';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Login />
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;
