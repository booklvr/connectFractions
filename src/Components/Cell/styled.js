import styled from 'styled-components/macro'

export const CellContainer = styled.div`
  width: var(--cellWidth);
  height: var(--cellWidth);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--blue);
  /* background-color: var(--black); */
`

export const CellCircle = styled.div`
  border-radius: 50%;
  height: 90%;
  width: 90%;
  transition: background-color: 0.3s;
  background-color: ${({ color }) =>
    color === 'whiteCircle'
      ? 'white'
      : color === 'redCircle'
      ? 'red'
      : 'yellow'};
`
