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
  align-items: flex-start;
  margin-
`

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  align-self: flex-end;
`

export const MatrixContainer = styled.div`
  background-color: var(--blue);
  border-radius: 10px;
`

export const GameButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const NewGameButton = styled.button`
  cursor: pointer;
  width: 10rem;
`

export const PreviousTilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const PointsAndTilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`

export const Title = styled.h1`
  width: 100%;
  text-align: center;
`
