import React from 'react'
import { CellCircle, CellContainer } from './styled'

const Cell = ({ value, rowIndex, columnIndex, play }) => {
  let color = 'whiteCircle'

  if (value === 1) {
    color = 'redCircle'
  } else if (value === 2) {
    color = 'yellowCircle'
  }

  return (
    <CellContainer onClick={() => play(columnIndex)}>
      <CellCircle color={color} />
    </CellContainer>
  )
}

export default Cell
