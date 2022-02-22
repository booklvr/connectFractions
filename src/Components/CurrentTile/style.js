import styled from 'styled-components/macro'

export const CurrentTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 8rem;
  padding-top: 1rem;
`
export const TileText = styled.p`
  margin-bottom: 1rem;
  font-family: 'Kbreindeergames';
  font-size: 1.5rem;
`

export const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--cellWidth);
  min-width: var(--cellWidth);
  border-radius: 50%;
  background-color: ${({ color }) => color};
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.8), 0 2px 2px rgba(0, 0, 0, 1);
`
