import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  message: string;
  type?: 'error' | 'info';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  message,
  type,
  className,
  children,
}) => {
  return (
    <Container type={type} className={className}>
      {children}
      <span>{message}</span>
    </Container>
  );
};

export default Tooltip;
