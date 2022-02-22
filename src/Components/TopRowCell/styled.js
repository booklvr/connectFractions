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
  background-color: ${({ tileValue }) =>
    tileValue ? tileValue.color : 'lightGrey'};
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.8), 0 2px 2px rgba(0, 0, 0, 1);
`
