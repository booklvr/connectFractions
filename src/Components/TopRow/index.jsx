import React from 'react'
import TopRowCell from '../TopRowCell'
import { TopRowContainer } from './styled'

const TopRow = ({ currentPlayer }) => {
  return (
    <TopRowContainer>
      <TopRowCell currentPlayer={currentPlayer} />
      <TopRowCell />
      <TopRowCell />
      <TopRowCell />
      <TopRowCell />
      <TopRowCell />
      <TopRowCell />
    </TopRowContainer>
  )
}

export default TopRow
