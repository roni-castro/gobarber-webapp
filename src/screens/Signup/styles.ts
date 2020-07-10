import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signupBackgroundImg from '../../assets/sign-up-background.png';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AnimationContent = styled.div`
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;
  justify-content: inherit;

  animation: ${appearFromRight} 1s;

  form {
    width: 340px;
    margin: 80px 0;
    flex-direction: column;
    text-align: center;

    span {
      margin-bottom: 24px;
    }
  }

  a {
    display: block;
    color: #f4ede8;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signupBackgroundImg}) no-repeat center;
  background-size: cover;
`;
