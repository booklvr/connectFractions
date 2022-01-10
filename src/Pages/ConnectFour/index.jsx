import React, { useReducer } from 'react'
import Row from '../../Components/Row'
import TopRow from '../../Components/TopRow'
import {
  checkForWin,
  deepCloneBoard,
  generateNewBoard,
} from '../../Utils/gameUtils'
import { MatrixContainer, NewGameButton, PageContainer, Text } from './styled'

const gameReducer = (state, action) => {
  //1
  switch (action.type) {
    //2
    case 'newGame':
      return {
        ...initialGameState,
        board: action.board,
      }
    //3
    case 'togglePlayer':
      return {
        ...state,
        currentPlayer: action.nextPlayer,
        board: action.board,
      }
    //4
    case 'endGame':
      return {
        ...state,
        gameOver: true,
        message: action.message,
        board: action.board,
      }
    //5
    case 'updateMessage':
      return {
        ...state,
        message: action.message,
      }
    //6
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}

const initialGameState = {
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  gameOver: false,
  message: '',
}

const ConnectFour = () => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  )

  const play = (c) => {
    if (!gameState.gameOver) {
      let board = deepCloneBoard(gameState.board)
      //check if cell is taken by starting at the bottom row and working up
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = gameState.currentPlayer
          break
        }
      }

      // Check status of board
      let result = checkForWin(board)
      if (result === gameState.player1) {
        dispatchGameState({
          type: 'endGame',
          message: 'Player1 (red) wins!',
          board,
        })
      } else if (result === gameState.player2) {
        dispatchGameState({
          type: 'endGame',
          message: 'Player2 (yellow) wins!',
          board,
        })
      } else if (result === 'draw') {
        dispatchGameState({
          type: 'endGame',
          message: 'Draw Game!',
          board,
        })
      } else {
        const nextPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1

        dispatchGameState({ type: 'togglePlayer', nextPlayer, board })
      }
    }
    // it's gameover and a user clicked a cell
    else {
      dispatchGameState({
        type: 'updateMessage',
        message: 'Game Over. Please start a new game.',
      })
    }
  }

  return (
    <PageContainer>
      <NewGameButton
        onClick={() => {
          dispatchGameState({ type: 'newGame', board: generateNewBoard() })
        }}
      >
        New Game
      </NewGameButton>
      <MatrixContainer>
        <TopRow currentPlayer={gameState.currentPlayer} />
        {gameState.board.map((row, i) => (
          <Row key={i} row={row} rowIndex={i} play={play} />
        ))}
      </MatrixContainer>
      <Text>{gameState.message}</Text>
    </PageContainer>
  )
}

export default ConnectFour
