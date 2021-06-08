import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerHeader = styled.header`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 56px 0;

  > h1 {
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 48px;
    line-height: 28px;
  }

  > button {
    width: 280px;
  }
`;

export const EventsContainer = styled.section`
  width: 100%;
  max-width: 1216px;
  display: grid;
  display: grid;
  grid-template-rows: 308px;
  grid-template-columns: repeat(4, 286px);
  gap: 24px;
`;

export const EventContainer = styled.div`
  border: 2px solid ${props => props.theme.g3};
  border-radius: 8px;
  width: 286px;
  height: 308px;
  background: ${props => props.theme.g5};
  display: flex;
  flex-direction: column;
  position: relative;

  > button:first-child {
    border: 0;
    background: transparent;

    > img {
      width: 100%;
      height: 188px;
      object-fit: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    > div {
      padding: 16px 24px 24px 24px;
      text-align: left;

      > p {
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.04em;
        color: ${props => props.theme.red_dark};
        text-transform: uppercase;
        margin-bottom: 4px;
      }

      > h1 {
        font-family: 'Montserrat';
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: -0.04em;
      }
    }
  }
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  z-index: 2;
  background: ${props => props.theme.g5};
  position: absolute;
  top: 24px;
  right: 24px;
`;
