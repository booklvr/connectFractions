import styled from 'styled-components/macro'

export const WinningArrayContainer = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export const WinningTile = styled.div`
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  margin: 3px;
  border-radius: 50%;

  sub {
    letter-spacing: 2px;
  }
`

export const Fraction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export const Sum = styled.div`
  /* background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--cellWidth) * 0.9);
  width: calc(var(--cellWidth) * 0.9);
  height: 2rem;
  width: 2rem;
  margin: 3px;
  border-radius: 50%; */
  margin-right: 0.5;
  font-size: 1.5rem;
`

export const plusSign = styled.div``
