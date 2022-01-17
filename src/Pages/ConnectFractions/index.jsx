import React, { useReducer, createContext, useState, useMemo } from 'react'
import CurrentTile from '../../Components/CurrentTile'
import Message from '../../Components/Message'
import PreviousTiles from '../../Components/PreviousTiles'
import Row from '../../Components/Row'
import Tiles from '../../Components/Tiles'
import TopRow from '../../Components/TopRow'
import UndoButton from '../../Components/UndoButton'
import { gameReducer, initialGameState } from '../../reducers/gameReducer'
import {
  deepCloneBoard,
  generateNewBoard,
  getCoordinate,
  getCoordinateValue,
  getHorizontalArray,
  getVertical,
} from '../../Utils/gameUtils'
import {
  BoardAndTilesContainer,
  BoardContainer,
  MatrixContainer,
  NewGameButton,
  PageContainer,
} from './styled'

// context
export const GameContext = createContext()
export const HoverContext = createContext()

const ConnectFractions = () => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  )

  const [hoverColumn, setHoverColumn] = useState(null)

  const play = ({ x, y }) => {
    console.log(`x`, x)
    console.log(`y`, y)
    if (gameState.tileValue) {
      console.log(`gameState.tileValue`, gameState.tileValue)
      if (!gameState.gameOver) {
        let board = deepCloneBoard(gameState.board)
        let row = 0
        console.log('row', row)
        //check if cell is taken by starting at the bottom row and working up
        for (; row <= 5; row++) {
          console.log(`'object'`, 'object')
          console.log(`board[x]`, board[x])
          if (!board[x][row].val) {
            console.log(`board[x][row]`, board[x][row])
            board[x][row] = {
              ...board[x][row],
              ...gameState.tileValue,
              currentPlayer: gameState.currentPlayer,
            }
            // console.log('cell', board[x][y])
            break
          }
        }
        // getCoordinate({ x, y })
        // getCoordinateValue({ x, y }, board)

        // check Vertical
        // let isWinningVertical = getVertical({ x, y }, board)
        // console.log(`isWinningVertical`, isWinningVertical)
        // let isWinningHorizontal = getHorizontalArray({ x, y }, board)
        // console.log(`isWinningHorizontal`, isWinningHorizontal)

        addToPreviousTiles()
        // increment
        dispatchGameState({
          type: 'increment',
        })

        dispatchGameState({
          type: 'updateTileValue',
          tileValue: null,
          message: null,
        })

        const nextPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1

        dispatchGameState({
          type: 'togglePlayer',
          nextPlayer,
          board,
        })

        // Check status of board
        // let result = checkForWin(board)
        // if (result === gameState.player1) {
        //   dispatchGameState({
        //     type: 'endGame',
        //     message: 'Player1 (red) wins!',
        //     board,
        //   })
        // } else if (result === gameState.player2) {
        //   dispatchGameState({
        //     type: 'endGame',
        //     message: 'Player2 (yellow) wins!',
        //     board,
        //   })
        // } else if (result === 'draw') {
        //   dispatchGameState({
        //     type: 'endGame',
        //     message: 'Draw Game!',
        //     board,
        //   })
        // } else {
        //   const nextPlayer =
        //     gameState.currentPlayer === gameState.player1
        //       ? gameState.player2
        //       : gameState.player1

        // dispatchGameState({
        //   type: 'togglePlayer',
        //   nextPlayer,
        //   board,
        // })
        // }
      }
      // it's gameover and a user clicked a cell
      else {
        dispatchGameState({
          type: 'updateMessage',
          message: 'Game Over. Please start a new game.',
        })
      }
    }
  }

  // const setTileValue = (tileValue) => {
  //   dispatchGameState({
  //     type: 'updateTileValue',
  //     tileValue,
  //   })
  // }

  const replaceTile = (tile) => {
    // check the color of the current tile

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
      // yellow tile

      // create copy of the yellow tiles
      const yellowTiles = [...gameState.yellowTiles]

      const foundIndex = yellowTiles.findIndex((x) => x.id === tile.id)
      yellowTiles[foundIndex].hidden = !yellowTiles[foundIndex].hidden

      // show hidden tile
      dispatchGameState({
        type: 'updateYellowTiles',
        yellowTiles,
      })
    }
  }

  const addToPreviousTiles = () => {
    let previousTiles = [...gameState.previousTiles]
    previousTiles.unshift(gameState.tileValue)
    dispatchGameState({
      type: 'updatePreviousTiles',
      previousTiles,
    })
  }

  const gameContextValue = useMemo(() => {
    return { gameState, dispatchGameState }
  }, [gameState, dispatchGameState])

  return (
    <GameContext.Provider value={gameContextValue}>
      <HoverContext.Provider value={{ hoverColumn, setHoverColumn }}>
        <PageContainer>
          <div>game stage: {gameState.stage}</div>
          <PreviousTiles previousTiles={gameState.previousTiles} />

          <BoardAndTilesContainer>
            <Tiles
              color='red'
              tiles={[...gameState.redTiles]}
              disabled={gameState.currentPlayer === 2}
              replaceTile={replaceTile}
            />
            <BoardContainer>
              <CurrentTile />

              <TopRow
                currentPlayer={gameState.currentPlayer}
                hoverColumn={gameState.hoverColumn}
                play={play}
                tileValue={gameState.tileValue}
              />
              <MatrixContainer>
                {gameState.board.map((row, i) => (
                  <Row key={i} row={row} play={play} />
                ))}
              </MatrixContainer>
            </BoardContainer>
            <Tiles
              color='yellow'
              tiles={[...gameState.yellowTiles]}
              disabled={gameState.currentPlayer === 1}
              replaceTile={replaceTile}
            />
          </BoardAndTilesContainer>

          <Message gameStage={gameState.stage} message={gameState.message} />

          <NewGameButton
            onClick={() => {
              dispatchGameState({ type: 'newGame', board: generateNewBoard() })
            }}
          >
            New Game
          </NewGameButton>
          {gameState.previousTiles.length > 0 && (
            <UndoButton replaceTile={replaceTile} />
          )}
        </PageContainer>
      </HoverContext.Provider>
    </GameContext.Provider>
  )
}

export default ConnectFractions
