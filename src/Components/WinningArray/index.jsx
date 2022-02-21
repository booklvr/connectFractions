import React, { useEffect } from 'react'
import { Fraction, Sum, WinningArrayContainer, WinningTile } from './style'
import { FaPlus, FaEquals } from 'react-icons/fa'

const WinningArray = ({ arr: { arr, sum } }) => {
  // useEffect(() => {
  // }, [arr, sum])

  return (
    <WinningArrayContainer>
      <Sum>{sum}</Sum>
      <FaEquals />
      {arr.map((item, index, arr) => (
        <Fraction key={index}>
          <WinningTile key={index} color={item.color}>
            <sup>{item.num}</sup>&frasl;<sub>{item.den}</sub>
          </WinningTile>
          {arr.length - 1 !== index && <FaPlus />}
        </Fraction>
      ))}
    </WinningArrayContainer>
  )
}

export default WinningArray
