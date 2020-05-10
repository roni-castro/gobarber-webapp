import React from 'react';
import { useTransition } from 'react-spring';
import { ToastMessage } from '../../hooks/ToastContext';
import Toast from '../Toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );

  return (
    <Container>
      {messagesWithTransition.map(({ item, key, props }) => (
        <Toast key={key} {...item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
