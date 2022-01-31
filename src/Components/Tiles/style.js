import styled from 'styled-components/macro'

export const TilesContainer = styled.div`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: calc(var(--cellWidth) * 6);
  /* background-color: ${({ color }) =>
    color === 'red' ? 'red' : 'yellow'}; */
  width: 320px;

  border: 10px solid ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
`

export const Tile = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
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
