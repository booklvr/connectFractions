import React from 'react'
import WinningArrays from '../WinningArrays'
import { PointDataContainer, Points, PointsHeading } from './style'

const PointData = ({ data }) => {
  const heading = data.team === 'red' ? 'Red Team' : 'Yellow Team'

  return (
    <PointDataContainer>
      <PointsHeading>{heading}</PointsHeading>
      <Points>points: {data.points}</Points>
      <WinningArrays winningArrays={data.winningArrays} />
    </PointDataContainer>
  )
}

export default PointData
