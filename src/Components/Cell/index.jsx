import React, { useContext, Fragment } from 'react'

import { HoverContext } from '../../Pages/ConnectFractions'
import { CellCircle, CellContainer } from './styled'

const Cell = ({ cell, columnIndex, play }) => {
  const { setHoverColumn } = useContext(HoverContext)

  let color = 'white'

  if (cell?.currentPlayer === 1) {
    color = 'red'
  } else if (cell?.currentPlayer === 2) {
    color = 'yellow'
  }

  // if (cell.winner) {
  //   color = 'purple'
  // }

  let innerCircle = ''

  if (cell.val) {
    innerCircle = (
      <Fragment>
        <sub>{cell.num}</sub>
        <sub>{cell.den}</sub>
      </Fragment>
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
