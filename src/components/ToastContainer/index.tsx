import React from 'react';
import { ToastMessage } from '../../hooks/ToastContext';
import Toast from '../Toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(({ id, title, description, type }) => (
        <Toast
          key={id}
          id={id}
          title={title}
          description={description}
          type={type}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
