import React, { InputHTMLAttributes, useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  ...otherProps
}: InputProps) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [isFocused, setIsfocused] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => setIsfocused(true)}
        onBlur={() => setIsfocused(false)}
        ref={inputRef}
        defaultValue={defaultValue}
        {...otherProps}
      />
    </Container>
  );
};

export default Input;
