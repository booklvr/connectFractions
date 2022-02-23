import React, { useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'
import { Tile, TilesContainer } from './style'

const Tiles = ({ color, tiles, disabled, gameStage }) => {
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

  const replaceCurrentTile = (tile) => {
    // RED TILE
    if (tile.color === 'red') {
      // create copy of the red tiles
      const redTiles = [...gameState.redTiles]
      const foundIndex = redTiles.findIndex((x) => x.id === tile.id)
      // update the found index to hidden
      redTiles[foundIndex].hidden = !redTiles[foundIndex].hidden
      // show hidden tile
      dispatchGameState({
        type: 'updateRedTiles',
        redTiles,
      })
    } else if (tile.color === 'yellow') {
      // YELLOW TILE
      // create copy of the yellow tiles
      const yellowTiles = [...gameState.yellowTiles]
      // remove yellow tile from yellow tiles and add to the board
      const foundIndex = yellowTiles.findIndex((x) => x.id === tile.id)
      yellowTiles[foundIndex].hidden = !yellowTiles[foundIndex].hidden
      // show hidden tile
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
        // add tile to currentTile
        dispatchGameState({
          type: 'updateTileValue',
          tileValue: tile,
        })
        dispatchGameState({
          type: 'incrementStage',
        })
        hideTile(tile)
        break
      case 2:
      case 4:
        // add the current tile back to the array
        replaceCurrentTile(gameState.tileValue)
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
          <sub>{tile.num}</sub>
          <sub>{tile.den}</sub>
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
