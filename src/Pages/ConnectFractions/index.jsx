import React, { useReducer, createContext, useState, useMemo } from 'react'
import uuid from 'react-uuid'
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
  // createBoard,
  // combineWinningArrays,
  deepCloneBoard,
  // generateNewBoard,
  // getCoordinate,
  // getCoordinateValue,
  // getDiagonalDownArray,
  // getDiagonalUpArray,
  // getHorizontalArray,
  // getVertical,
  getWinningArrays,
  // showWinningTilesOnBoard,
} from '../../Utils/gameUtils'
import {
  BoardAndTilesContainer,
  BoardContainer,
  ButtonsContainer,
  GameTitleAndButtonsContainer,
  MatrixContainer,
  NewGameButton,
  PageContainer,
  PointsAndTilesContainer,
  Title,
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
    // if there is a currentTileValue
    if (gameState.tileValue) {
      let board = deepCloneBoard(gameState.board)
      let r = board.length - 1
      //check if cell is taken by starting at the bottom row and working up
      for (; r >= 0; r--) {
        if (!board[r][c].val) {
          board[r][c] = {
            // copy of cell
            ...board[r][c],
            // store the tile value in the cell
            ...gameState.tileValue,
            // store the current player in the cell for checking points later
            currentPlayer: gameState.currentPlayer,
          }
          break
        }
      }

      // check for winning arrays
      let { points, winningArrays } = getWinningArrays(r, c, board)

      const turn = {
        points,
        numberOfWins: winningArrays.length,
        player: gameState.currentPlayer,
        tile: gameState.tileValue,
        position: { r, c },
      }

      console.log('turn :>> ', turn)
      console.log('winningArrays :>> ', winningArrays)

      

      if (points) {
        if (gameState.currentPlayer === 1) {
          // copy game state red winnings
          let redWinnings = gameState.redWinnings

          redWinnings.points += points
          redWinnings.winningArrays = [
            ...winningArrays,
            ...redWinnings.winningArrays,
          ]
          dispatchGameState({
            type: 'updateRedWinnings',
            redWinnings,
          })
        } else {
          let yellowWinnings = gameState.yellowWinnings
          yellowWinnings.points += points
          yellowWinnings.winningArrays = [
            ...winningArrays,
            ...yellowWinnings.winningArrays,
          ]
          dispatchGameState({
            type: 'updateYellowWinnings',
            yellowWinnings,
          })
        }
      }

      dispatchGameState({
        type: 'endTurn',
        turn,
        board,
      })
    }
  }

  const handleNewGame = () => {
    dispatchGameState({
      type: 'newGame',
    })
  }

  const gameContextValue = useMemo(() => {
    return { gameState, dispatchGameState }
  }, [gameState, dispatchGameState])

  return (
    <GameContext.Provider value={gameContextValue}>
      <HoverContext.Provider value={{ hoverColumn, setHoverColumn }}>
        <PageContainer>
          <BoardAndTilesContainer>
            <PointsAndTilesContainer>
              <PointData data={gameState.redWinnings} />
              <Tiles
                color='red'
                tiles={[...gameState.redTiles]}
                disabled={gameState.currentPlayer === 2}
                // replaceTile={replaceTile}
              />
            </PointsAndTilesContainer>

            <BoardContainer>
              <GameTitleAndButtonsContainer>
                <Title>ConnectFractions</Title>
                <Message
                  gameStage={gameState.stage}
                  message={gameState.message}
                />
                <ButtonsContainer>
                  <NewGameButton
                    onClick={() => {
                      handleNewGame()
                    }}
                  >
                    New Game
                  </NewGameButton>
                  {gameState.previousTurns.length > 0 && <UndoButton />}
                </ButtonsContainer>

                <CurrentTile />
              </GameTitleAndButtonsContainer>

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
            <PointsAndTilesContainer>
              <PointData data={gameState.yellowWinnings} />
              <Tiles
                color='yellow'
                tiles={[...gameState.yellowTiles]}
                disabled={gameState.currentPlayer === 1}
                // replaceTile={replaceTile}
              />
            </PointsAndTilesContainer>
          </BoardAndTilesContainer>
        </PageContainer>
      </HoverContext.Provider>
    </GameContext.Provider>
  )
}

export default ConnectFractions
