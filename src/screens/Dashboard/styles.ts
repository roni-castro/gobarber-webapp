import { shade } from 'polished';
import styled from 'styled-components';

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

export const Content = styled.main`
  max-width: 1120px;
  height: 1000px;
  margin: 64px auto;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  p {
    span {
      font-size: 14px;
      font-weight: 500;
      color: #ff9000;
    }

    span + span::before {
      content: '|';
      margin: 0 8px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    font-size: 20px;
    font-weight: 400px;
    color: #999591;
  }

  p {
    margin-top: 20px;
  }

  div {
    display: flex;
    align-items: center;
    background-color: #3e3b47;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 10px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      height: 80%;
      width: 1px;
      background: #ff9000;
    }

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;
