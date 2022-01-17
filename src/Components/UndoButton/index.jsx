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

  const handleUndo = () => {
    // copy the array
    let previousTiles = [...gameState.previousTiles]

    // get the last tile and remove it from the previous array
    const lastTile = previousTiles.shift()

    // revert to previous game Stage 1 or 3
    let stage = gameState.stage

    if (stage === 3 || stage === 4) {
      stage = 1
    } else {
      stage = 3
    }

    dispatchGameState({
      type: 'undoPreviousMove',
      previousTiles,
      stage,
    })

    // replace the previousTile
    replaceTile(lastTile)
    removeTileFromBoard(lastTile)
  }

  return <UndoButtonContainer onClick={handleUndo}>undo</UndoButtonContainer>
}

export default UndoButton
