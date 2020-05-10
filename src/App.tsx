import React from 'react';
import AppProvider from './hooks/AppProvider';
import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;
