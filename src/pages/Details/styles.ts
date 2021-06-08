import styled from 'styled-components';

const HEADER_HEIGHT = 80;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100% - ${HEADER_HEIGHT}px);
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const DetailsContainer = styled.section`
  position: absolute;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  bottom: 0;

  > section {
    max-width: 1216px;
    margin: 56px auto 0;

    > div {
      max-width: 592px;

      > p {
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.04em;
        color: ${props => props.theme.red_dark};
        text-transform: uppercase;
        margin-bottom: 8px;
      }

      > h1 {
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 54px;
        line-height: 54px;
      }

      > h2 {
        font-family: 'Inter';
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.theme.g2};
      }
    }
  }
`;

export const PromoImageContainer = styled.section`
  display: flex;
  width: 696px;
  height: 100%;
  margin-left: auto;
  z-index: -1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  );

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: optimizeQuality;
    object-position: center;
    background: #000;
  }
`;

export const InfosContainer = styled.div`
  margin: 32px 0;
  display: flex;

  > div {
    padding: 16px;
    border-radius: 8px;
    border: 2px solid ${props => props.theme.g3};
    background: ${props => props.theme.g5};

    & + div {
      margin-left: 16px;
    }

    > h1 {
      font-family: 'Inter';
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      margin-top: 16px;
    }

    > p {
      margin-top: 8px;
      max-width: 264px;
      font-family: 'Inter';
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: ${props => props.theme.g2};
    }
  }
`;

export const TicketsContainer = styled.section`
  margin-top: 32px;
  display: flex;
  flex-direction: column;

  > h1 {
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    margin-bottom: 8px;
  }

  > p {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: ${props => props.theme.g2};
  }

  > div {
    display: flex;
    align-items: center;
    margin-top: 32px;
  }
`;

export const TicketContainer = styled.div`
  position: relative;

  & + div {
    margin-left: 16px;
  }
`;

export const TicketContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;

  > p {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: ${props => props.theme.g2};
    margin-bottom: 24px;
  }

  > h1 {
    font-family: 'Montserrat';
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
  }
`;
