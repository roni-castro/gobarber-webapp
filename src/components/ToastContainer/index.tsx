import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, ToastContainer } from './styles';
import ToastContext, { ToastMessage } from '../../hooks/ToastContext';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const Toast: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = ToastContext.useToast();
  return (
    <Container>
      {messages.map(({ type, description, title, id }) => (
        <ToastContainer type={type} hasDescription={!!description}>
          <FiAlertCircle size={20} />
          <div>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
          <button type="button" onClick={() => removeToast(id)}>
            <FiXCircle size={18} />
          </button>
        </ToastContainer>
      ))}
    </Container>
  );
};

export default Toast;
