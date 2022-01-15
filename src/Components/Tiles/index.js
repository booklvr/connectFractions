import React from 'react'
import { Tile, TilesContainer } from './style'

const Tiles = ({ color, tiles, chooseTile, disabled, gameStage }) => {
  // const handleClick = (tile) => {
  //   console.log('tile', tile)

  //   // set the tile for the game board
  //   setTileValue(tile)
  //   addToPreviousTiles(tile)

  //   // create a copy of the tileFractions array
  //   // let newArr = [...tiles]

  //   // find the index of the clicked tile
  //   // const foundIndex = newArr.findIndex((x) => x.id === tile.id)

  //   // update the show property on that tile
  //   // newArr[foundIndex].hidden = !newArr[foundIndex].hidden

  //   // console.log('tiles:', tiles)

  //   //copy the updated array into the tileFractions State
  //   // setTileFractions(newArr)

  //   // const foundIndex = tileFractions.findIndex((x) => x.id === tile.id)
  //   // tileFractions[foundIndex] = { ...tileFractions[foundIndex], show: false }
  // }

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
