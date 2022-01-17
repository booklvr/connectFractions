import styled from 'styled-components/macro'

export const CurrentTileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
export const TileText = styled.p`
  margin-right: 1rem;
`

export const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--cellWidth);
  width: var(--cellWidth);
  border-radius: 50%;
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
`
