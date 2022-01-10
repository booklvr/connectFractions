import styled from 'styled-components/macro'

export const TopRowCellContainer = styled.div`
  width: var(--cellWidth);
  height: var(--cellWidth);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TopRowCircle = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background-color: none;

  &:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ currentPlayer }) =>
      currentPlayer === 1 ? 'yellow' : 'red'};
  }
`
