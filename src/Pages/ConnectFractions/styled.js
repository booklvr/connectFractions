import styled from 'styled-components/macro'
import blackboard from '../../assets/images/blackboard.jpeg'
import wood from '../../assets/images/wood.jpeg'

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
  background-image: url(${blackboard});
  background-repeat: no-repeat;
  background-size: cover;
  width: 330px;
  border-radius: 5px;
  border-image-source: url(${wood});
  border-image-width: 10px;
`

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-family: 'Gaegu', arial;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`
