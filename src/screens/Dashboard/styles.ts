import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  background-color: #28262e;
  width: 100%;
  height: 200px;
  padding: 32px 20px;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex: 1;
  align-items: center;

  > img {
    height: 80px;
    max-width: 100%;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      height: 20px;
      width: 20px;
      color: #999591;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
    margin-right: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 24px;

    span {
      font-size: 14px;
      color: #f4ede8;
    }

    strong {
      font-size: 16px;
      font-weight: 500;
      color: #ff9000;
    }
  }
`;
