import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import InputMask from 'react-input-mask';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  mask: string;
  containerStyle?: object;
}

const MaskedInput: React.FC<InputProps> = ({
  containerStyle,
  label,
  type,
  name,
  mask,
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
      <InputMask
        {...rest}
        type={type}
        mask={mask}
        ref={inputRef}
        defaultValue={defaultValue}
      />
      {error && <p>{error}</p>}
    </Container>
  );
};

export default MaskedInput;
