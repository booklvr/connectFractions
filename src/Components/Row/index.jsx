import React from 'react'
import Cell from '../Cell'
import { RowContainer } from './styled'

const Row = ({ row, rowIndex, play }) => {
  return (
    <RowContainer>
      {row.map((cell, i) => (
        <Cell
          key={i}
          value={cell}
          rowIndex={rowIndex}
          columnIndex={i}
          play={play}
        />
      ))}
    </RowContainer>
  )
}

export default Row
