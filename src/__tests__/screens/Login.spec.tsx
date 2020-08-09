import { fireEvent, render, wait } from '@testing-library/react';
import React from 'react';
import AuthContext from '../../hooks/AuthContext';
import ToastContext from '../../hooks/ToastContext';
import Login from '../../screens/Login';

jest.mock('react-router-dom');

describe('Login Page', () => {
  const signInMock = jest.fn();
  jest.spyOn(AuthContext, 'useAuth').mockReturnValue({
    signIn: signInMock,
    auth: {} as any,
    signOut: jest.fn(),
    updateUserAvatar: jest.fn(),
    updateUserProfile: jest.fn(),
  });

  beforeEach(() => {
    signInMock.mockClear();
  });

  it('should be able to login', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(signInMock).toHaveBeenCalledWith('test@email.com', '123456');
    });
  });

  it('should not be able to signIn with invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(signInMock).not.toHaveBeenCalled();
    });
  });

  it('should should show toast when an error is returned after calling `signIn`', async () => {
    signInMock.mockRejectedValue(new Error());
    const addToastMock = jest.fn();
    jest.spyOn(ToastContext, 'useToast').mockReturnValue({
      addToast: addToastMock,
      removeToast: jest.fn(),
    });
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(addToastMock).toHaveBeenCalledWith({
        type: 'error',
        title: 'Erro ao fazer login',
        description: 'Verifique se o email ou senha estão corretos',
      });
    });
  });
});
