import styled from 'styled-components';

interface TooltipProps {
  type?: 'error' | 'info';
}

export const Container = styled.div<TooltipProps>`
  position: relative;

  span {
    width: 160px;
    color: ${({ type }) => (type === 'error' ? '#FFF' : '#302e38')};
    background: ${({ type }) => (type === 'error' ? '#c53030' : '#ff9000')};
    padding: 8px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    &::before {
      content: '';
      border-style: solid;
      border-color: ${props => (props.type === 'error' ? '#c53030' : '#ff9000')}
        transparent;
      position: absolute;
      border-width: 6px 6px 0px 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
