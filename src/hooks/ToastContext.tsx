import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  title?: string;
  description?: string;
}

type ToastAddMessage = Omit<ToastMessage, 'id'>;

interface ToastContextData {
  addToast(message: ToastAddMessage): void;
  removeToast(id: string): void;
}

const toastContext = createContext<ToastContextData>({} as ToastContextData);

const useToast = (): ToastContextData => {
  const context = useContext(toastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, description }: ToastAddMessage) => {
      const newToastMessage: ToastMessage = {
        id: uuid(),
        title,
        type,
        description,
      };
      setMessages((state) => [...state, newToastMessage]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => [...state.filter((message) => message.id !== id)]);
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </toastContext.Provider>
  );
};

export default {
  ToastProvider,
  useToast,
};
