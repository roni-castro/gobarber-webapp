import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  ...otherProps
}) => {
  return (
    <Container type="button" {...otherProps}>
      {isLoading ? 'Carregando...' : children}
    </Container>
  );
};

export default Button;
