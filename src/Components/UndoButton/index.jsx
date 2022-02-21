import React, { useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'
import { deepCloneBoard } from '../../Utils/gameUtils'
import { UndoButtonContainer } from './style'

const UndoButton = ({ replaceTile }) => {
  const { gameState, dispatchGameState } = useContext(GameContext)

  const removeTileFromBoard = (lastTile) => {
    let board = deepCloneBoard(gameState.board)
    for (let i = 5; i >= 0; i--) {
      const foundIndex = board[i].findIndex((col) => col?.id === lastTile.id)
      if (foundIndex >= 0) {
        const coordinate = board[i][foundIndex].coordinate
        board[i][foundIndex] = {
          val: null,
          num: null,
          den: null,
          hidden: false,
          color: null,
          id: null,
          coordinate,
        }
        dispatchGameState({
          type: 'updateBoard',
          board,
          currentPlayer: lastTile.color === 'red' ? 1 : 2,
        })
        break
      }
    }
  }

  const removeWinningArray = (winningArrays, tile) => {
    console.log('removeWinningArray')
    console.log('winningArrays', winningArrays)
    console.log('id :>> ', winningArrays.id)
    console.log('tile', tile.color)

    // if there were winning arrays
    if (winningArrays.points > 0) {
      console.log('we had a winner')

      if (tile.color === 'red') {
        console.log('we had a red winner')
        console.log(`red had ${winningArrays.winningArrays.length} wins`)
        const redWinnings = gameState.redWinnings
        console.log('redWinnings', redWinnings)
        redWinnings.points = redWinnings.points - winningArrays.points
        redWinnings.winningArrays.splice(0, winningArrays.winningArrays.length)

        console.log('redWinnings', redWinnings)
        // dispatchGameState({
        //   type: 'updateRedWinnings',
        //   redWinnings,
        // })
      } else {
        console.log('we had a yellow winner')
        console.log(`yellow had ${winningArrays.winningArrays.length} wins`)
        const yellowWinnings = gameState.yellowWinnings
        console.log('yellowWinnings', yellowWinnings)
        yellowWinnings.points = yellowWinnings.points - winningArrays.points
        yellowWinnings.winningArrays.splice(
          0,
          winningArrays.winningArrays.length
        )

        console.log('yellowWinnings', yellowWinnings)
      }

      // dispatch('removeRedWinningArrays')
    } else {
      console.log("let's move on, no winner to see here")
    }
  }

  const handleUndo = () => {
    // copy the array
    let previousTurns = [...gameState.previousTurns]

    // get the last tile and remove it from the previous array
    const lastTurn = previousTurns.shift()

    // revert to previous game Stage 1 or 3
    let stage = gameState.stage

    if (stage === 3 || stage === 4) {
      stage = 1
    } else {
      stage = 3
    }

    dispatchGameState({
      type: 'undoPreviousMove',
      previousTurns,
      stage,
    })

    // remove Previous Winning Arrrays

    // replace the previousTile
    replaceTile(lastTurn.tile)
    removeTileFromBoard(lastTurn.tile)
    removeWinningArray(lastTurn.winningArrays, lastTurn.tile)
  }

  return <UndoButtonContainer onClick={handleUndo}>undo</UndoButtonContainer>
}

export default UndoButton
