import React from 'react'
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
            <sub>{item.num}</sub>
            <sub>{item.den}</sub>
          </WinningTile>
          {arr.length - 1 !== index && (
            <FaPlus style={{ color: 'white', fontSize: '0.75rem' }} />
          )}
        </Fraction>
      ))}
    </WinningArrayContainer>
  )
}

export default WinningArray
