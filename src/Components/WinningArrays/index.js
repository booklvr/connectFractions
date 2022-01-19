import React from 'react'
import WinningArray from '../WinningArray'
import { WinningArraysContainer } from './style'

const WinningArrays = ({ winningArrays }) => {
  //   console.log(`winningArrays`, winningArrays)
  return (
    <WinningArraysContainer>
      {winningArrays.map((arr, i) => (
        <WinningArray key={i} arr={arr} />
      ))}
    </WinningArraysContainer>
  )
}

export default WinningArrays
