import React from 'react'
import {
  PointDataContainer,
  Points,
  PointsHeading,
  WinningArrays,
} from './style'

const PointData = ({ data }) => {
  console.log('in points data')
  console.log('data', data)

  return (
    <PointDataContainer>
      <PointsHeading>Heading</PointsHeading>
      <Points>points: {data.points}</Points>
      <WinningArrays>
        {data.winningArrays.map((arr, i) => (
          <div>win array: {i}</div>
        ))}
      </WinningArrays>
    </PointDataContainer>
  )
}

export default PointData
