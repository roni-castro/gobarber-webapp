import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, ToastContainer } from './styles';

interface ToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}

const Toast: React.FC<ToastProps> = ({ type, title, description }) => {
  return (
    <Container>
      <ToastContainer type={type} hasDescription={!!description}>
        <FiAlertCircle size={20} />
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </ToastContainer>
    </Container>
  );
};

export default Toast;
