import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  containerStyle,
  label,
  type,
  name,
  defaultValue: propDefaultValue,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error}>
      <label>{label}</label>
      <input {...rest} type={type} ref={inputRef} defaultValue={defaultValue} />
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Input;
