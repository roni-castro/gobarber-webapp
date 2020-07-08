import styled, { keyframes } from 'styled-components';
import signInBackgroundImg from '../../assets/sign-in-background.png';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  },
  to {
    opacity: 1;
    transform: translateX(0px)
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AnimationContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;
  justify-content: inherit;

  animation: ${appearFromLeft} 1s;

  form {
    text-align: center;
    width: 340px;
    margin: 80px 0;

    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
