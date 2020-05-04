import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Background, Container, Content } from './styles';
import Logo from '../../assets/logo.svg';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber logo" />
        <form>
          <h1>Faça seu logon</h1>
          <input placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="button">Entrar</button>
          <a href="/forgot">Esqueci minha senha</a>
        </form>
        <a href="/signup">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
