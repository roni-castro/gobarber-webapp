import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    display: flex;
    align-items: center;
    padding: 0 20px;

    height: 144px;
    background-color: #28262e;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        height: 24px;
        width: 24px;
        color: #999591;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.2, '#f4ede8')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -100px;

  h1 {
    font-size: 20px;
    text-align: left;
    margin-bottom: 24px;
  }

  form {
    width: 340px;
    display: flex;
    flex-direction: column;
    text-align: center;

    span {
      margin-bottom: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 32px;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    cursor: pointer;
    transition: background 0.2s;

    input {
      display: none;
    }

    svg {
      height: 20px;
      width: 20px;
      color: #28262e;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
