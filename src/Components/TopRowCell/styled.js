import styled from 'styled-components/macro'

export const TopRowCellContainer = styled.div`
  width: var(--cellWidth);
  height: var(--cellWidth);
  display: flex;
  align-items: center;
  justify-content: center;
  /* visibility: hidden; */
`

export const TopRowCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  visibility: ${({ show }) => (show ? 'auto' : 'hidden')};
  /* background-color: ${({ currentPlayer, hoverColumn, column }) =>
    column === hoverColumn && currentPlayer === 1
      ? 'red'
      : column === hoverColumn && currentPlayer === 2
      ? 'yellow'
      : 'none'}; */
  background-color: black;
  background: ${({ tileValue }) => (tileValue ? tileValue.color : 'none')};

  /* &:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ currentPlayer }) =>
    currentPlayer === 1 ? 'red' : 'yellow'};
  } */
`
