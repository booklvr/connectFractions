import React from 'react'
import WinningArrays from '../WinningArrays'
import {
  PointDataContainer,
  Points,
  PointsHeading,
  PointsHeadingContainer,
} from './style'

const PointData = ({ data }) => {
  const heading = data.team === 'red' ? 'Red' : 'Yellow'

  return (
    <PointDataContainer>
      <PointsHeadingContainer>
        <PointsHeading>{heading}</PointsHeading>
        <Points>{data.points}</Points>
      </PointsHeadingContainer>

      <WinningArrays winningArrays={data.winningArrays} />
    </PointDataContainer>
  )
}

export default PointData
