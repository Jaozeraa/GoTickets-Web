import styled from 'styled-components';

export const Container = styled.div`
  height: 524px;
  background: #fee7eb;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  outline: 0;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > p {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed ${props => props.theme.red};

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }

  > svg {
    margin-bottom: 8px;
  }
`;
