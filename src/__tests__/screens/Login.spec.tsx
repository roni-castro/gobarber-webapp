import { fireEvent, render, wait } from '@testing-library/react';
import React from 'react';
import ToastContext from '../../hooks/ToastContext';
import Login from '../../screens/Login';

const mockSignIn = jest.fn();

jest.mock('react-router-dom');
jest.mock('../../hooks/AuthContext', () => {
  return {
    useAuth: () => ({
      signIn: mockSignIn,
    }),
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    mockSignIn.mockClear();
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
      expect(mockSignIn).toHaveBeenCalledWith('test@email.com', '123456');
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
      expect(mockSignIn).not.toHaveBeenCalled();
    });
  });

  it('should should show toast when an error is returned after calling `signIn`', async () => {
    mockSignIn.mockRejectedValue(new Error());
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
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
