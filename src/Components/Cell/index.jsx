import React from 'react'
import { CellCircle, CellContainer } from './styled'

const Cell = ({ cell, columnIndex, play, setHoverColumn }) => {
  let color = 'whiteCircle'

  if (cell?.currentPlayer === 1) {
    color = 'redCircle'
  } else if (cell?.currentPlayer === 2) {
    color = 'yellowCircle'
  }

  let innerCircle = ''

  // console.log('value', value)

  if (cell.val) {
    innerCircle = (
      <React.Fragment>
        <sub>{cell.num}</sub>&frasl;
        <sub>{cell.den}</sub>
      </React.Fragment>
    )
  } else {
    innerCircle = (
      <React.Fragment>
        [{cell.coordinate.x}, {cell.coordinate.y}]
      </React.Fragment>
    )
  }

  return (
    <CellContainer
      onClick={() => play(cell.coordinate)}
      onMouseEnter={() => {
        setHoverColumn(columnIndex)
      }}
      onMouseLeave={() => {
        setHoverColumn(null)
      }}
    >
      <CellCircle color={color}>{innerCircle}</CellCircle>
    </CellContainer>
  )
}

export default Cell
