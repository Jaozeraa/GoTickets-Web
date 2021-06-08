import { shade } from 'polished';
import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Form = styled(UnformForm)`
  margin: 56px;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:nth-child(4) {
    margin-top: 32px;
  }

  > button {
    margin-top: 32px;
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 32px;
  align-self: center;
  width: 186px;

  img {
    width: 186px;
    height: 186px;
    border-radius: 8px;
    object-fit: cover;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: ${props => props.theme.red};
    border: none;
    border-radius: 8px;
    right: -16px;
    bottom: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    cursor: pointer;
    input {
      display: none;
    }
    &:hover {
      background: ${props => shade(0.2, props.theme.red)};
    }
  }
`;
