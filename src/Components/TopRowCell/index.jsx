import React from 'react'
import { TopRowCellContainer, TopRowCircle } from './styled'

const TopRowCell = ({ currentPlayer }) => {
  return (
    <TopRowCellContainer>
      <TopRowCircle currentPlayer={currentPlayer} />
    </TopRowCellContainer>
  )
}

export default TopRowCell
