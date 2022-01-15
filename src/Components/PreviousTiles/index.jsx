import React from 'react'
import { PreviousTilesContainer } from '../../Pages/ConnectFractions/styled'
import { PreviousTile } from './style'

const PreviousTiles = ({ previousTiles }) => {
  return (
    <PreviousTilesContainer>
      {previousTiles.length > 0 &&
        previousTiles.map((tile, index) => (
          <PreviousTile key={index} color={tile.color}>
            <sup>{tile.num}</sup>&frasl;<sub>{tile.den}</sub>
          </PreviousTile>
        ))}
    </PreviousTilesContainer>
  )
}

export default PreviousTiles
