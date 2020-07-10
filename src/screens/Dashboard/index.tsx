import React from 'react';
import { Container, Header, HeaderContent, Profile } from './styles';
import Logo from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import AuthContext from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const {
    signOut,
    auth: { user },
  } = AuthContext.useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Logo} alt="Gobarber logo" />
          <Profile>
            <img src={user.avatar_url} alt="Profile" />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button>
            <FiPower onClick={signOut} />
          </button>
        </HeaderContent>
      </Header>
      Content
    </Container>
  );
};

export default Dashboard;
