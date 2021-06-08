import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  margin: 56px 0;
  width: 100%;
  max-width: 936px;
  padding: 64px;
  border-radius: 8px;
  background: ${props => props.theme.g5};
  border: 2px solid ${props => props.theme.g3};

  > h1 {
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
  }
`;

export const Form = styled(UnformForm)`
  display: flex;
  flex-direction: column;

  margin-top: 56px;

  > h1 {
    margin: 32px 0;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }

  > button {
    align-self: flex-end;
    width: 216px;
    margin-top: 56px;
  }
`;

export const InputsInLine = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin: 0;

    & + div {
      margin-left: 16px;
    }
  }
`;

export const TicketsHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > h1 {
    margin: 32px 0;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }

  > div {
    margin-left: 4px;

    > button {
      margin: 0;
      background: transparent;
      border: 0;
    }
  }
`;

export const TicketForm = styled.section`
  padding: 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.g3};
  display: flex;
  align-items: center;

  & + section {
    margin-top: 16px;
  }

  > div {
    margin: 0;

    & + div {
      margin-left: 16px;
    }
  }
`;
