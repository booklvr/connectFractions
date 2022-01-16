import React, { useReducer } from 'react'
import Message from '../../Components/Message'
import PreviousTiles from '../../Components/PreviousTiles'
import Row from '../../Components/Row'
import Tiles from '../../Components/Tiles'
import TopRow from '../../Components/TopRow'
import {
  createBoard,
  createTiles,
  deepCloneBoard,
  generateNewBoard,
  getCoordinate,
  getCoordinateValue,
  getVertical,
} from '../../Utils/gameUtils'
import {
  BoardAndTilesContainer,
  BoardContainer,
  CurrentTile,
  CurrentTileContainer,
  CurrentTileText,
  MatrixContainer,
  NewGameButton,
  PageContainer,
  UndoButton,
} from './styled'

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
        message: action.message,
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
    case 'updateHoverColumn':
      return {
        ...state,
        hoverColumn: action.column,
      }
    //7
    case 'updateTileValue':
      return {
        ...state,
        tileValue: action.tileValue,
      }
    // 8
    case 'updatePreviousTiles':
      return {
        ...state,
        previousTiles: action.previousTiles,
      }
    // 9
    case 'updateRedTiles':
      return {
        ...state,
        redTiles: action.redTiles,
        message: action.message,
      }
    // 10
    case 'updateYellowTiles':
      return {
        ...state,
        yellowTiles: action.yellowTiles,
        message: action.message,
      }
    // 11
    case 'updateBoard':
      return {
        ...state,
        board: action.board,
        currentPlayer: action.currentPlayer,
      }
    case 'increment':
      return {
        ...state,
        stage: state.stage === 4 ? 1 : state.stage + 1,
      }
    case 'undoPreviousMove':
      return {
        ...state,
        previousTiles: action.previousTiles,
        tileValue: null,
        stage: action.stage,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      }
    // case 10

    //7
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}

// 4 game stages
// --------------
// 1) red chooses a fraction
// 2) red places a fraction
// 3) yellow chooses a fraction
// 4) yellow places a fraction

// createBoard()

const initialGameState = {
  stage: 1,
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  // board: [
  //   [null, null, null, null, null, null, null],
  //   [null, null, null, null, null, null, null],
  //   [null, null, null, null, null, null, null],
  //   [null, null, null, null, null, null, null],
  //   [null, null, null, null, null, null, null],
  //   [null, null, null, null, null, null, null],
  // ],
  board: createBoard(),
  redTiles: createTiles('red'),
  yellowTiles: createTiles('yellow'),
  gameOver: false,
  message: 'Red: Choose a fraction.',
  hoverColumn: null,
  tileValue: null,
  previousTiles: [],
}

const ConnectFractions = () => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  )

  const play = ({ x, y }) => {
    if (gameState.tileValue) {
      console.log(`gameState.tileValue`, gameState.tileValue)
      if (!gameState.gameOver) {
        let board = deepCloneBoard(gameState.board)
        let x = 5
        //check if cell is taken by starting at the bottom row and working up
        for (; x >= 0; x--) {
          if (!board[x][y].val) {
            board[x][y] = {
              ...board[x][y],
              ...gameState.tileValue,
              currentPlayer: gameState.currentPlayer,
            }
            console.log('cell', board[x][y])
            break
          }
        }
        getCoordinate({ x, y })
        getCoordinateValue({ x, y }, board)
        getVertical({ x, y }, board)

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

  const setHoverColumn = (column) => {
    // console.log('column:', column)
    dispatchGameState({
      type: 'updateHoverColumn',
      column,
    })
  }

  const setTileValue = (tileValue) => {
    dispatchGameState({
      type: 'updateTileValue',
      tileValue,
    })
  }

  const chooseTile = (tile) => {
    // check if stage 1 or 2 or 3 or 4
    switch (gameState.stage) {
      case 1:
      case 3:
        console.log('stage: ', gameState.stage)
        dispatchGameState({
          type: 'updateTileValue',
          tileValue: tile,
        })
        // addToPreviousTiles(tile)
        dispatchGameState({
          type: 'increment',
        })
        hideTile(tile)
        break
      case 2:
      case 4:
        // add the current tile back to the array
        replaceTile(gameState.tileValue)
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

  const addToPreviousTiles = () => {
    let previousTiles = [...gameState.previousTiles]
    previousTiles.unshift(gameState.tileValue)
    dispatchGameState({
      type: 'updatePreviousTiles',
      previousTiles,
    })
  }

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
    // remove the tile from the board

    // dispatchGameState({
    //   type: 'updatePreviousTiles',
    //   previousTiles,
    // })
    // console.log('previousTiles', gameState.previousTiles)

    // console.log('lastTile', lastTile)

    // check the color of the previous tile
    // if (lastTile?.color === 'red') {
    //   // red tile

    //   // create copy of the red tiles
    //   const redTiles = [...gameState.redTiles]

    //   const foundIndex = redTiles.findIndex((x) => x.id === lastTile.id)
    //   redTiles[foundIndex].hidden = !redTiles[foundIndex].hidden

    //   // show hidden tile
    //   dispatchGameState({
    //     type: 'updateRedTiles',
    //     redTiles,
    //   })
    // } else if (lastTile?.color === 'yellow') {
    //   // yellow tile

    //   // create copy of the yellow tiles
    //   const yellowTiles = [...gameState.yellowTiles]

    //   const foundIndex = yellowTiles.findIndex((x) => x.id === lastTile.id)
    //   yellowTiles[foundIndex].hidden = !yellowTiles[foundIndex].hidden

    //   // show hidden tile
    //   dispatchGameState({
    //     type: 'updateYellowTiles',
    //     yellowTiles,
    //   })
    // }

    // let board = deepCloneBoard(gameState.board)

    // for (let i = 5; i >= 0; i--) {
    //   // console.log(board[i])
    //   // console.log('row break')
    //   const foundIndex = board[i].findIndex((col) => col?.id === lastTile.id)

    //   console.log('foundIndex', foundIndex)
    //   if (foundIndex >= 0) {
    //     board[i][foundIndex] = null
    //     dispatchGameState({
    //       type: 'updateBoard',
    //       board,
    //       currentPlayer: lastTile.color === 'red' ? 1 : 2,
    //     })
    //     break
    //   }
    // }
  }

  return (
    <PageContainer>
      <div>game stage: {gameState.stage}</div>
      <PreviousTiles previousTiles={gameState.previousTiles} />

      <BoardAndTilesContainer>
        <Tiles
          color='red'
          tiles={[...gameState.redTiles]}
          setTileValue={setTileValue}
          chooseTile={chooseTile}
          gameStage={gameState.stage}
          disabled={gameState.currentPlayer === 2}
        />
        <BoardContainer>
          <CurrentTileContainer>
            <CurrentTileText>CurrentTile:</CurrentTileText>
            {gameState.tileValue && (
              <CurrentTile color={gameState.tileValue.color}>
                <sup>{gameState.tileValue.num}</sup>&frasl;
                <sub>{gameState.tileValue.den}</sub>
              </CurrentTile>
            )}
          </CurrentTileContainer>

          <TopRow
            currentPlayer={gameState.currentPlayer}
            hoverColumn={gameState.hoverColumn}
            play={play}
            tileValue={gameState.tileValue}
            setHoverColumn={setHoverColumn}
          />
          <MatrixContainer>
            {gameState.board.map((row, i) => (
              <Row
                key={i}
                row={row}
                play={play}
                setHoverColumn={setHoverColumn}
              />
            ))}
          </MatrixContainer>
        </BoardContainer>
        <Tiles
          color='yellow'
          tiles={gameState.yellowTiles}
          setTileValue={setTileValue}
          // addToPreviousTiles={addToPreviousTiles}
          chooseTile={chooseTile}
          disabled={gameState.currentPlayer === 1}
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
        <UndoButton
          onClick={() => {
            handleUndo()
          }}
        >
          Undo
        </UndoButton>
      )}
    </PageContainer>
  )
}

export default ConnectFractions
