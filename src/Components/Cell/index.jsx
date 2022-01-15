import React from 'react'
import { CellCircle, CellContainer } from './styled'

const Cell = ({ value, columnIndex, play, setHoverColumn }) => {
  let color = 'whiteCircle'

  if (value?.currentPlayer === 1) {
    color = 'redCircle'
  } else if (value?.currentPlayer === 2) {
    color = 'yellowCircle'
  }

  let innerCircle = ''

  // console.log('value', value)

  if (value) {
    innerCircle = (
      <React.Fragment>
        <sub>{value.num}</sub>&frasl;
        <sub>{value.den}</sub>
      </React.Fragment>
    )
  }

  return (
    <CellContainer
      onClick={() => play(columnIndex)}
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
