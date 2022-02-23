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
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 50%;
height: 80%;
width: 80%;
transition: background-color: 0.3s;
background-color: ${({ color }) => `${color}`};
box-shadow: inset 0 3px 1px #000;
position: relative;

sub {
  font-weight: bold;
  font-size: 1rem;

  &:last-of-type {
    border-top: 2px solid #000;
  }
}
`
