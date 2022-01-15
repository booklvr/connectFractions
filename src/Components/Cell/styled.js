import styled from 'styled-components/macro'

export const CellContainer = styled.div`
  width: var(--cellWidth);
  height: var(--cellWidth);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: var(--blue); */
  /* background-color: var(--black); */
`

export const CellCircle = styled.div`
display: flex;
align-items: center;
justify-content: center;
  border-radius: 50%;
  height: 80%;
  width: 80%;
  transition: background-color: 0.3s;
  background-color: ${({ color }) =>
    color === 'whiteCircle'
      ? 'white'
      : color === 'redCircle'
      ? 'red'
      : 'yellow'};
`
