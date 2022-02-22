import styled from 'styled-components/macro'

export const WinningArrayContainer = styled.div`
  width: 100%;
  margin: 0.2rem 0.2rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: white;
  font-family: 'Eraser', cursive;
`

export const WinningTile = styled.div`
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
  margin: 1px;
  border-radius: 50%;
  font-family: 'Eraser', cursive;

  sub {
    letter-spacing: 2px;
    font-size: 12px;
  }
`

export const Fraction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: black;
`

export const Sum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5;
  font-size: 1.5rem;
  width: 1.2rem;
  color: white;
  font-family: 'Eraser', cursive;
`

export const plusSign = styled.div`
  font-family: 'Eraser', cursive;
  color: pink;
`
