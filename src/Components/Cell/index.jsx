import React, { useContext, Fragment } from 'react'
import { HoverContext } from '../../Pages/ConnectFractions'
import { CellCircle, CellContainer } from './styled'

const Cell = ({ cell, columnIndex, play }) => {
  const { setHoverColumn } = useContext(HoverContext)

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
      <Fragment>
        <sub>{cell.num}</sub>&frasl;
        <sub>{cell.den}</sub>
      </Fragment>
    )
  } else {
    innerCircle = (
      <React.Fragment>
        [{cell.coordinate.r}, {cell.coordinate.c}]
      </React.Fragment>
    )
  }

  return (
    <CellContainer
      onClick={() => play(cell.coordinate.c)}
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
