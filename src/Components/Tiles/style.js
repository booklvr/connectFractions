import styled from 'styled-components/macro'

export const TilesContainer = styled.div`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  height: calc(var(--cellWidth) * 6);
  padding: 5px;
  /* background-color: ${({ color }) =>
    color === 'red' ? 'red' : 'yellow'}; */
`

export const Tile = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--cellWidth) * 0.9);
  width: calc(var(--cellWidth) * 0.9);
  margin: 3px;
  border-radius: 50%;
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.8), 0 2px 5px rgba(0, 0, 0, 1);

  sub {
    /* letter-spacing: 2px; */
    font-weight: bold;
    font-size: 1rem;

    &:last-of-type {
      border-top: 2px solid #000;
    }
  }
`
