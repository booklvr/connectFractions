import styled from 'styled-components/macro'

export const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BoardAndTilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-
`

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`

export const MatrixContainer = styled.div`
  background-color: var(--blue);
  border-radius: 10px;
`

export const CurrentTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--cellWidth);
  width: var(--cellWidth);
  border-radius: 50%;
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'yellow')};
`

export const GameButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const NewGameButton = styled.button`
  cursor: pointer;
`
export const UndoButton = styled.button`
  cursor: pointer;
`

export const PreviousTilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const CurrentTileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const CurrentTileText = styled.p`
  margin-right: 1rem;
`
