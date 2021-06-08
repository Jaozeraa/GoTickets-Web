import styled, { keyframes } from 'styled-components';
import { Form as UnformForm } from '@unform/web';

import InformationsImg from '../../assets/authBackground.svg';

const appearFromLeft = keyframes`
    0% {
        opacity:0;
        transform: translateX(-100px);
    }
    100% {
        opacity:1;
        transform: translateX(0px);
    }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 100%;
  align-items: center;
  justify-content: center;

  > header {
    > img {
      width: 148px;
      height: 81px;
      align-self: flex-start;
    }
  }

  > main {
    margin-top: 80px;
    margin-right: 16px;
    width: 55%;
    display: flex;
    flex-direction: column;
    animation: ${appearFromLeft} 1s;

    > h1 {
      font-family: 'Montserrat';
      font-weight: bold;
      font-size: 40px;
      line-height: 130%;
      letter-spacing: -0.04em;
      margin-top: 16px;
      margin-bottom: 24px;
    }

    > span {
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      letter-spacing: 0.12em;
      color: ${props => props.theme.red_dark};
    }

    > p {
      margin-top: 42px;
      align-self: center;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      opacity: 80%;

      > a {
        text-decoration: none;
        font-weight: 600;
        color: ${props => props.theme.red_dark};
        width: fit-content;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-height: 800px) {
    > main {
      > p {
        margin: 16px 0;
      }
    }
  }
`;

export const Form = styled(UnformForm)`
  width: 100%;

  > a {
    display: block;
    width: fit-content;
    margin: 24px 0;
    text-decoration: none;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: ${props => props.theme.g1};
    opacity: 80%;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-height: 800px) {
    > a {
      margin: 16px 0;
    }
  }
`;

export const GreetingWrapper = styled.div`
  height: 100%;
  flex: 1;
  background-image: url(${InformationsImg});
  background-position: center;
  background-size: cover;
`;
