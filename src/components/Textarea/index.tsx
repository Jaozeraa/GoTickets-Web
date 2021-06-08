import React, { TextareaHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  containerStyle?: object;
}

const Textarea: React.FC<TextareaProps> = ({
  containerStyle,
  label,
  name,
  defaultValue: propDefaultValue,
  ...rest
}) => {
  const TextareaRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: TextareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} hasError={!!error}>
      <label>{label}</label>
      <textarea {...rest} ref={TextareaRef} defaultValue={defaultValue} />
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Textarea;
