import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  color?: string;
  background?: string;
}

export const Container = styled.button<ContainerProps>`
  width: 100%;
  height: 64px;
  border: 0;
  border-radius: 8px;
  transition: 0.2s;
  font-weight: 600;
  font-size: 18px;
  background: ${props => props.background || props.theme.red};
  color: ${props => props.color || props.theme.g5};
  text-transform: uppercase;
  font-family: 'Montserrat';
  letter-spacing: 0.01em;
  &:hover {
    background: ${props => shade(0.2, props.background || props.theme.red)};
  }

  ${props =>
    props.disabled &&
    css<ContainerProps>`
      opacity: 50%;
      cursor: not-allowed;

      &:hover {
        background: ${props => props.background || props.theme.red};
      }
    `};
`;

export const LoadingContainer = styled.div`
  margin: auto;
  width: fit-content;
  height: fit-content;
`;
