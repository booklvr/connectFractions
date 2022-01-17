import React from 'react'
import Cell from '../Cell'
import { RowContainer } from './styled'

const Row = ({ row, play }) => {
  return (
    <RowContainer>
      {row.map((cell, i) => (
        <Cell
          key={i}
          cell={cell}
          columnIndex={i}
          play={play}
        />
      ))}
    </RowContainer>
  )
}

export default Row
