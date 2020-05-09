import React from 'react';
import GlobalStyle from './styles/global';
import Login from './screens/Login';
import Providers from './hooks/Providers';

const App: React.FC = () => (
  <>
    <Providers>
      <Login />
    </Providers>

    <GlobalStyle />
  </>
);

export default App;
