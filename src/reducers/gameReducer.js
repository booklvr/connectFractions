import { createBoard, createTiles } from '../Utils/gameUtils'

export const initialGameState = {
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
  redWinnings: {
    points: 0,
    winningArrays: [],
  },
  yellowWinnings: {
    points: 0,
    winningArrays: [],
  },
  yellowTiles: createTiles('yellow'),
  gameOver: false,
  message: 'Red: Choose a fraction.',
  // hoverColumn: null,
  tileValue: null,
  previousTiles: [],
}

export const gameReducer = (state, action) => {
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
    case 'updateRedWinnings':
      return {
        ...state,
        redWinnings: action.redWinnings,
      }
    case 'updateYellowWinnings':
      return {
        ...state,
        yellowWinnings: action.redWinnings,
      }
    // case 10

    //7
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}
