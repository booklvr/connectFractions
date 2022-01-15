import React, { useEffect } from 'react'
import {
  TopRowCellContainer,
  TopRowCircle,
  tileValue,
  hoverColumn,
} from './styled'

const TopRowCell = ({
  currentPlayer,
  column,
  play,
  tileValue,
  show,
  hoverColumn,
  setHoverColumn,
}) => {
 

  return (
    <TopRowCellContainer
      onMouseEnter={() => {
        setHoverColumn(column)
      }}
      onMouseLeave={() => {
        setHoverColumn(null)
      }}
    >
      <TopRowCircle
        currentPlayer={currentPlayer}
        hoverColumn={hoverColumn}
        column={column}
        onClick={() => play(column)}
        show={show}
        tileValue={tileValue}
      >
        {show && tileValue && (
          <>
            <sub>{tileValue.num}</sub>&frasl;
            <sub>{tileValue.den}</sub>
          </>
        )}
      </TopRowCircle>
    </TopRowCellContainer>
  )
}

export default TopRowCell
