import styled from 'styled-components/macro'

export const PreviousTilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const PreviousTile = styled.div`
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--cellWidth) * 0.9);
  width: calc(var(--cellWidth) * 0.9);
  margin: 3px;
  border-radius: 50%;

  sub {
    letter-spacing: 2px;
  }
`
