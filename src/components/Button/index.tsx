import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';

import {
  Container,
  LoadingContainer,
} from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  background?: string;
  loading?: boolean;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ children, loading = false, color, background, ...props }) => {
  return (
    <Container type="button" color={color} background={background} {...props}>
      {loading ? (
        <LoadingContainer>
          <ReactLoading color="#fff" type="spin" width={40} height={40} />
        </LoadingContainer>
      ) : (
        children
      )}
    </Container>
  );
}

export default Button;