import React, { useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'
import { CurrentTileContainer, Tile, TileText } from './style'

const CurrentTile = () => {
  const {
    gameState: { tileValue },
  } = useContext(GameContext)

  return (
    <CurrentTileContainer>
      <TileText>CurrentTile:</TileText>
      {tileValue && (
        <Tile color={tileValue.color}>
          <sup>{tileValue.num}</sup>&frasl;
          <sub>{tileValue.den}</sub>
        </Tile>
      )}
    </CurrentTileContainer>
  )
}

export default CurrentTile
