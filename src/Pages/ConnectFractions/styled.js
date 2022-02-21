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
  align-items: space-between;
`

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  width: 100%;
`

export const GameTitleAndButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* height: var(--cellWidth * 6); */
  margin: 0;
  padding: 0;
`

export const MatrixContainer = styled.div`
  background-color: var(--blue);
  border-radius: 10px;
`

export const NewGameButton = styled.button`
  cursor: pointer;
  width: 10rem;
  height: 2rem;

  transition: all 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }
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

export const ButtonsContainer = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: lightgrey;
`
