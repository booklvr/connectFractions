import React, { useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'
import { Tile, TilesContainer } from './style'

const Tiles = ({ color, tiles, disabled, gameStage, replaceTile }) => {
  const { gameState, dispatchGameState } = useContext(GameContext)

  const hideTile = (tile) => {
    //check the team type
    // change visibility to hidden for that teams tile
    if (tile.color === 'red') {
      const redTiles = [...gameState.redTiles]
      const foundIndex = redTiles.findIndex((x) => x.id === tile.id)
      redTiles[foundIndex].hidden = !redTiles[foundIndex].hidden
      dispatchGameState({
        type: 'updateRedTiles',
        redTiles,
      })
    } else {
      const yellowTiles = [...gameState.yellowTiles]
      const foundIndex = yellowTiles.findIndex((x) => x.id === tile.id)
      yellowTiles[foundIndex].hidden = !yellowTiles[foundIndex].hidden
      dispatchGameState({
        type: 'updateYellowTiles',
        yellowTiles,
      })
    }
  }

  const chooseTile = (tile) => {
    // check if stage 1 or 2 or 3 or 4
    switch (gameState.stage) {
      case 1:
      case 3:
        dispatchGameState({
          type: 'updateTileValue',
          tileValue: tile,
        })
        dispatchGameState({
          type: 'increment',
        })
        hideTile(tile)
        break
      case 2:
      case 4:
        // add the current tile back to the array
        replaceTile(gameState.tileValue)
        dispatchGameState({
          type: 'updateTileValue',
          tileValue: tile,
        })
        hideTile(tile)
        break
      default:
        break
    }
  }

  return (
    <TilesContainer color={color} disabled={disabled}>
      {tiles.map((tile, i) => (
        <Tile
          key={i}
          hidden={tile.hidden}
          color={tile.color}
          onClick={() => chooseTile(tile)}
          gameStage={gameStage}
          disabled={disabled}
        >
          <sup>{tile.num}</sup>&frasl;<sub>{tile.den}</sub>
        </Tile>
      ))}
    </TilesContainer>
  )
}

export default Tiles

// {tileFractions.map((tile, i) => (
//     <Tile
//       key={i}
//       show={tile.show}
//       color={color}
//       onClick={() => handleClick(tile)}
//     >
//       <sup>{tile.num}</sup>&frasl;<sub>{tile.den}</sub>
//     </Tile>
//   ))}
