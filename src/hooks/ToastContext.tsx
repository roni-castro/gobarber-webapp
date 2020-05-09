import React, { createContext, useCallback, useContext } from 'react';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
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
  const addToast = useCallback(() => {
    console.log('add toast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('remove toast');
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
    </toastContext.Provider>
  );
};

export default {
  ToastProvider,
  useToast,
};
