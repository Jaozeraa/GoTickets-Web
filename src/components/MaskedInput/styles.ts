import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  & + div {
    margin-top: 16px;
  }

  > label {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
  }

  > input {
    margin-top: 8px;
    height: 64px;
    width: 100%;
    color: ${props => props.theme.g1};
    background: ${props => props.theme.g3};
    padding: 0 16px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.g3};
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;

    ${props =>
      props.hasError &&
      css`
        border-color: ${props => props.theme.red_dark};
      `}
  }

  > p {
    color: ${props => props.theme.red_dark};
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    margin-top: 8px;
  }
`;
