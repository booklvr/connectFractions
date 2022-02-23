import React, { useContext } from 'react'
import { GameContext, HoverContext } from '../../Pages/ConnectFractions'
import { TopRowCellContainer, TopRowCircle } from './styled'

const TopRowCell = ({ column, play }) => {
  const { hoverColumn, setHoverColumn } = useContext(HoverContext)

  // currentPlayer, tileValue
  const {
    gameState: { currentPlayer, tileValue },
  } = useContext(GameContext)

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
        show={hoverColumn === column}
        tileValue={tileValue}
      >
        {(tileValue && (
          <>
            <sub>{tileValue.num}</sub>&frasl;
            <sub>{tileValue.den}</sub>
          </>
        )) ||
          '?'}
      </TopRowCircle>
    </TopRowCellContainer>
  )
}

export default TopRowCell
