import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastContainerType {
  type?: 'success' | 'info' | 'error';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ToastContainerType>`
  position: relative;
  display: flex;
  width: 360px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 16px 30px 16px 16px;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    h1 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
      margin-top: 4px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    background: transparent;
    border: 0;
    right: 16px;
    top: 20px;
    opacity: 0.6;
    color: inherit;

    svg {
      margin: 0px;
    }
  }

  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;
    `}
`;
