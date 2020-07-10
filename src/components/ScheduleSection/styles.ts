import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;

  > strong {
    font-size: 20px;
    font-weight: 400px;
    color: #999591;
  }

  p {
    margin-top: 16px;
    font-size: 14px;
    color: #f4ede8;
  }

  hr {
    margin: 16px 0;
    height: 1px;
    border: none;
    background-color: #3e3b47;
  }

  ul {
    list-style-type: none;
  }
`;

export const AppointmentItem = styled.aside`
  display: flex;
  align-items: center;
  margin-top: 16px;

  span {
    min-width: 70px;
    display: flex;
    align-items: center;
    color: #999591;
    margin-right: 30px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    display: flex;
    flex: 1;
    align-items: center;
    background-color: #3e3b47;
    padding: 16px;
    border-radius: 10px;

    img {
      height: 54px;
      width: 54px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
`;
