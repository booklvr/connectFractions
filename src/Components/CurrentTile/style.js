import styled from 'styled-components/macro'

export const CurrentTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  height: 8rem;
`
export const TileText = styled.p`
  margin-bottom: 1rem;
`

export const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--cellWidth);
  min-width: var(--cellWidth);
  border-radius: 50%;
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
`
