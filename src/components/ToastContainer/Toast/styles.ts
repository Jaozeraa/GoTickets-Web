import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'info' | 'warning' | 'error';
}

const toastTypeVariations = {
  info: css`
    background: ${props => props.theme.g1};
  `,
  success: css`
    background: #10d269;
  `,
  error: css`
    background: #ec3137;
  `,
  warning: css`
    background: #ffc452;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 100vw;
  position: fixed;
  display: flex;
  color: ${props => props.theme.g1};
  height: 80px;
  align-items: center;
  justify-content: center;

  ${props => toastTypeVariations[props.type || 'info']}

  > div {
    display: flex;
    align-items: center;
    max-width: 1216px;
    width: 100%;

    img {
      margin: 0 12px 0 0;
      width: 40px;
      height: 40px;
    }

    p {
      font-family: 'Inter';
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      color: ${props => props.theme.g4};
    }
  }

  @media (max-width: 540px) {
    height: 60px;
    padding: 0 24px;

    div {
      img {
        width: 32px;
        height: 32px;
        margin: 0 8 0 0;
      }

      p {
        font-size: 14px;
      }
    }
  }
`;
