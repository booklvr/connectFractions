import React from 'react'
import TopRowCell from '../TopRowCell'
import { TopRowContainer } from './styled'

const TopRow = ({ play }) => {
  const topRowCells = []

  for (var i = 0; i < 7; i++) {
    topRowCells.push(<TopRowCell column={i} key={i} play={play} i={i} />)
  }

  return <TopRowContainer>{topRowCells}</TopRowContainer>
}

export default TopRow
