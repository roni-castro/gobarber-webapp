import { fireEvent, render, wait } from '@testing-library/react';
import unformCore from '@unform/core';
import React from 'react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField: (name: string) => ({
    fieldName: name,
    defaultValue: '',
    registerField: jest.fn(),
    error: '',
  }),
}));

describe('Login Page', () => {
  it('should be to render an input', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus and stop highligh on blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainerElement = getByTestId('input-container');
    fireEvent.focus(inputElement);

    await wait(() => {
      expect(inputContainerElement).toHaveStyle('border-color: #FF9000');
      expect(inputContainerElement).toHaveStyle('color: #FF9000');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(inputContainerElement).not.toHaveStyle('border-color: #FF9000');
      expect(inputContainerElement).not.toHaveStyle('color: #FF9000');
    });
  });

  it('should highlight input text when filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainerElement = getByTestId('input-container');
    fireEvent.change(inputElement, { target: { value: 'filled@email.com' } });

    await wait(() => {
      expect(inputContainerElement).not.toHaveStyle('color: #FF9000');
    });
  });

  it('should show icon when passed', async () => {
    const Icon: React.FC = () => <div data-testid="input-icon">icon</div>;
    const { getByTestId } = render(
      <Input name="email" placeholder="E-mail" icon={Icon} />,
    );

    const inputIconElement = getByTestId('input-icon');

    await wait(() => {
      expect(inputIconElement).toBeTruthy();
    });
  });

  it('should show error message when input have error', async () => {
    const mockError = 'empty field';
    jest.spyOn(unformCore, 'useField').mockImplementation(name => ({
      fieldName: name,
      defaultValue: '',
      registerField: jest.fn(),
      clearError: jest.fn(),
      error: mockError,
    }));
    const { getByText } = render(<Input name="email" placeholder="E-mail" />);
    expect(getByText('empty field')).toBeTruthy();
  });
});
