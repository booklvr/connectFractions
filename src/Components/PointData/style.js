import styled from 'styled-components/macro'

export const PointDataContainer = styled.div`
  display: flex;
  width: 320px;
  height: calc(var(--cellWidth) * 6);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  font-family: 'Eraser', cursive;
`
export const PointsHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
`

export const PointsHeading = styled.h1`
  font-family: 'Eraser', cursive;
  color: white;
`

export const Points = styled.p`
  font-family: 'Eraser', cursive;
  color: white;
  border-left: 3px solid white;
  border-bottom: 3px solid white;
  font-size: 3rem;
  padding-left: 0.5rem;
  padding-bottom: 0rem;
  border-bottom-width: ;
  width: 5rem;
`
