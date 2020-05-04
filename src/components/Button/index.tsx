import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...otherProps }) => {
  return (
    <Container type="button" {...otherProps}>
      {children}
    </Container>
  );
};

export default Button;
