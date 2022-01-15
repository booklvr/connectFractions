import React from 'react'
import Cell from '../Cell'
import { RowContainer } from './styled'

const Row = ({ row, play, setHoverColumn }) => {
  return (
    <RowContainer>
      {row.map((cell, i) => (
        <Cell
          key={i}
          value={cell}
          columnIndex={i}
          play={play}
          setHoverColumn={setHoverColumn}
        />
      ))}
    </RowContainer>
  )
}

export default Row
