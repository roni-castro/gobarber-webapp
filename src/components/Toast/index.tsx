import React from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import ToastContext from '../../hooks/ToastContext';
import { Container } from './styles';

interface ToastProps {
  id: string;
  type?: 'success' | 'info' | 'error';
  title?: string;
  description?: string;
}

const iconTypes = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ type, title, description, id }) => {
  const { removeToast } = ToastContext.useToast();
  return (
    <Container type={type} hasDescription={!!description}>
      {iconTypes[type || 'info']}
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
