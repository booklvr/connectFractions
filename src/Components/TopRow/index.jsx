import React from 'react'
import TopRowCell from '../TopRowCell'
import { TopRowContainer } from './styled'

const TopRow = ({
  currentPlayer,
  hoverColumn,
  play,
  tileValue,
  setHoverColumn,
}) => {
  const topRowCells = []

  for (var i = 0; i < 7; i++) {
    topRowCells.push(
      <TopRowCell
        currentPlayer={currentPlayer}
        hoverColumn={hoverColumn}
        column={i}
        key={i}
        play={play}
        tileValue={tileValue}
        show={hoverColumn === i}
        setHoverColumn={setHoverColumn}
        i={i}
      />
    )
  }

  return <TopRowContainer>{topRowCells}</TopRowContainer>
}

export default TopRow

// <TopRowCell currentPlayer={currentPlayer} hoverColumn={hoverColumn} />
//       <TopRowCell currentPlayer={currentPlayer} hoverColumn={hoverColumn} />
//       <TopRowCell currentPlayer={currentPlayer} hoverColumn={hoverColumn} />
//       <TopRowCell currentPlayer={currentPlayer} hoverColumn={hoverColumn} />
//       <TopRowCell currentPlayer={currentPlayer} hoverColumn={hoverColumn} />
//       <TopRowCell currentPlayer={currentPlayer} hoverColumn={hoverColumn} />
//       <TopRowCell currentPlayer={currentPlayer} hoverColumn={hoverColumn} />
