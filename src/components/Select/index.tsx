import React, {
  SelectHTMLAttributes,
  useRef,
  useEffect,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label: string;
  name: string;
  containerStyle?: object;
  noOptionsMessage?: string;
}

export interface Option {
  value: string;
  label: string;
}

const Select: React.FC<SelectProps> = ({
  containerStyle,
  label,
  name,
  defaultValue: propDefaultValue,
  noOptionsMessage = 'Nenhuma opção encontrada',
  options,
  value,
  ...rest
}) => {
  const SelectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState(value || '');

  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: SelectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <Container hasError={!!error}>
      <label>{label}</label>
      <select
        {...rest}
        ref={SelectRef}
        defaultValue={defaultValue}
        value={selectedOption}
      >
        {options.length > 0 ? (
          <>
            <option disabled hidden value="">
              Selecione uma opção
            </option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        ) : (
          <option disabled hidden value="">
            {noOptionsMessage}
          </option>
        )}
      </select>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Select;
