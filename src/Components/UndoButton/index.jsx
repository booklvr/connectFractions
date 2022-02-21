import React, { useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'
import { deepCloneBoard } from '../../Utils/gameUtils'
import { UndoButtonContainer } from './style'

const UndoButton = () => {
  const { gameState, dispatchGameState } = useContext(GameContext)

  const removeTileFromBoard = ({ r, c }) => {
    let board = deepCloneBoard(gameState.board)
    board[r][c] = {
      val: null,
      num: null,
      den: null,
      hidden: false,
      color: null,
      coordinate: { r, c },
    }
    return board
  }

  const removeWinningArrays = (lastTurn) => {
    // if there were winning arrays
    const redWinnings = gameState.redWinnings
    const yellowWinnings = gameState.yellowWinnings

    console.log('lastTurn', lastTurn)

    if (lastTurn.points) {
      if (lastTurn.tile.color === 'red') {
        console.log('red tile')
        redWinnings.points -= lastTurn.points
        redWinnings.winningArrays.splice(0, lastTurn.numberOfWins)
      } else {
        yellowWinnings.points -= lastTurn.points
        yellowWinnings.winningArrays.splice(0, lastTurn.numberOfWins)
      }
    }

    return { redWinnings, yellowWinnings }
  }

  const replaceTile = (lastTile) => {
    const yellowTiles = gameState.yellowTiles
    const redTiles = gameState.redTiles

    if (lastTile.color === 'red') {
      // red tile

      let index = redTiles.findIndex((tile) => tile.id === lastTile.id)
      redTiles[index].hidden = false

      // redTiles[index].hidden = false
    } else {
      // yellow tile

      let index = yellowTiles.findIndex((tile) => tile.id === lastTile.id)

      yellowTiles[index].hidden = false
    }
    return { redTiles, yellowTiles }
  }

  const handleUndo = () => {
    // copy the array
    let previousTurns = [...gameState.previousTurns]

    // get the last tile and remove it from the previous array
    const lastTurn = previousTurns.shift()

    console.log('lastTurn', lastTurn)

    // revert to previous game Stage 1 or 3
    let stage = gameState.stage

    if (stage === 3 || stage === 4) {
      stage = 1
    } else {
      stage = 3
    }

    const { redTiles, yellowTiles } = replaceTile(lastTurn.tile)
    const { redWinnings, yellowWinnings } = removeWinningArrays(lastTurn)

    dispatchGameState({
      type: 'undoPreviousMove',
      previousTurns,
      yellowTiles,
      redTiles,
      redWinnings,
      yellowWinnings,
      board: removeTileFromBoard(lastTurn.position),
      stage,
    })

    // remove Previous Winning Arrrays

    // replace the previousTile
    // replaceTile(lastTurn.tile)
    // removeTileFromBoard(lastTurn.tile)
    // removeWinningArray(lastTurn.winningArrays, lastTurn.tile)
  }

  return <UndoButtonContainer onClick={handleUndo}>undo</UndoButtonContainer>
}

export default UndoButton
