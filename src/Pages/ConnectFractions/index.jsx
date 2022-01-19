import React, { useReducer, createContext, useState, useMemo } from 'react'
import CurrentTile from '../../Components/CurrentTile'
import Message from '../../Components/Message'
import PreviousTiles from '../../Components/PreviousTiles'
import Row from '../../Components/Row'
import Tiles from '../../Components/Tiles'
import TopRow from '../../Components/TopRow'
import UndoButton from '../../Components/UndoButton'
import PointData from '../../Components/PointData'
// import { WinningArrays } from '../../PointData/style'
import { gameReducer, initialGameState } from '../../reducers/gameReducer'
import {
  combineWinningArrays,
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

  const play = (c) => {
    if (gameState.tileValue) {
      // console.log(`gameState.tileValue`, gameState.tileValue)
      if (!gameState.gameOver) {
        let board = deepCloneBoard(gameState.board)
        let r = board.length - 1
        //check if cell is taken by starting at the bottom row and working up
        for (; r >= 0; r--) {
          if (!board[r][c].val) {
            board[r][c] = {
              ...board[r][c],
              ...gameState.tileValue,
              currentPlayer: gameState.currentPlayer,
            }
            console.log('cell', board[r][c])
            break
          }
        }
        // getCoordinate({ r, c })
        // getCoordinateValue({ x, y }, board)

        // check Vertical
        let verticalWinningArray = getVertical({ r, c }, board)
        console.log(`verticalWinningArrays`, verticalWinningArray)
        let horizontalWinningArrays = getHorizontalArray({ r, c }, board)

        // if (horizontalWinningArrays?.length > 0) {
        //   horizontalWinningArrays.forEach((winningArray, i) => {
        //     console.log(`winning horizontal array ${i}:`, winningArray)
        //   })
        // }

        let winningData = combineWinningArrays(
          verticalWinningArray,
          horizontalWinningArrays
        )
        console.log('winningData', winningData)

        if (winningData.winningArrays?.length) {
          if (gameState.currentPlayer === 1) {
            console.log('red will get these points')
            // copy game state red winnings
            let redWinnings = gameState.redWinnings
            redWinnings.points += winningData.points
            redWinnings.winningArrays = [
              ...redWinnings.winningArrays,
              ...winningData.winningArrays,
            ]
            redWinnings.winningArrays.concat(winningData.winningArrays)

            dispatchGameState({
              type: 'updateRedWinnings',
              redWinnings,
            })
          } else {
            console.log('yellow will get these points')
            let yellowWinnings = gameState.yellowWinnings
            yellowWinnings.points += winningData.points
            yellowWinnings.winningArrays.concat(winningData.winningArrays)

            dispatchGameState({
              type: 'updateYellowWinnings',
              yellowWinnings,
            })
          }
        } else {
          console.log('fuck fuck fuck')
        }
        // connect arrays

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
            <PointData data={gameState.redWinnings} />
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
            <PointData data={gameState.yellowWinnings} />
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
