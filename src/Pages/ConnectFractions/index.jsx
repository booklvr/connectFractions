import React, { useReducer, createContext, useState, useMemo } from 'react'
import CurrentTile from '../../Components/CurrentTile'
import Message from '../../Components/Message'
import Row from '../../Components/Row'
import Tiles from '../../Components/Tiles'
import TopRow from '../../Components/TopRow'
import PointData from '../../Components/PointData'
// import { WinningArrays } from '../../PointData/style'
import { gameReducer, initialGameState } from '../../reducers/gameReducer'
import { deepCloneBoard, getWinningArrays } from '../../Utils/gameUtils'
import {
  BoardAndTilesContainer,
  BoardContainer,
  GameTitleAndButtonsContainer,
  MatrixContainer,
  PageContainer,
  PointsAndTilesContainer,
  Title,
} from './styled'
import Sidebar from '../../Components/Sidebar'

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

      // if there are points then update the board
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

      // save the current state of the this turn and place into previous turns in order to facilitate undo
      const turn = {
        points,
        numberOfWins: winningArrays.length,
        player: gameState.currentPlayer,
        tile: gameState.tileValue,
        position: { r, c },
      }

      dispatchGameState({
        type: 'endTurn',
        turn,
        board,
      })
    }
  }

  const gameContextValue = useMemo(() => {
    return { gameState, dispatchGameState }
  }, [gameState, dispatchGameState])

  return (
    <GameContext.Provider value={gameContextValue}>
      <HoverContext.Provider value={{ hoverColumn, setHoverColumn }}>
        <PageContainer>
          <Sidebar />
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
                <Title>Connect Fractions</Title>
                <Message
                  gameStage={gameState.stage}
                  message={gameState.message}
                />

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
