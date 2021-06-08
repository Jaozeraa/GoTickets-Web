import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.g5};
  z-index: 100;
`;

export const Content = styled.div`
  max-width: 1216px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    cursor: pointer;
  }
`;

export const UserAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
`;
