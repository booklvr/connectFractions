import { createBoard, createTiles, createEasyTiles } from '../Utils/gameUtils'

export const initialGameState = {
  stage: 1,
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: createBoard(),
  redTiles: createEasyTiles('red'),
  yellowTiles: createEasyTiles('yellow'),
  // winningArrays: [],
  redWinnings: {
    team: 'red',
    points: 0,
    winningArrays: [],
  },
  yellowWinnings: {
    team: 'yellow',
    points: 0,
    winningArrays: [],
  },
  // gameOver: false,
  message: 'Red: Choose a fraction.',
  tileValue: null,
  previousTurns: [],
  mode: 'easy',
}

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'newGame':
      return {
        ...initialGameState,
        redTiles:
          state.mode === 'hard' ? createTiles('red') : createEasyTiles('red'),
        yellowTiles:
          state.mode === 'hard'
            ? createTiles('yellow')
            : createEasyTiles('yellow'),
        redWinnings: {
          team: 'red',
          points: 0,
          winningArrays: [],
        },
        yellowWinnings: {
          team: 'yellow',
          points: 0,
          winningArrays: [],
        },
      }

    case 'easyMode':
      return {
        ...initialGameState,
        redTiles: createEasyTiles('red'),
        yellowTiles: createEasyTiles('yellow'),
        redWinnings: {
          team: 'red',
          points: 0,
          winningArrays: [],
        },
        yellowWinnings: {
          team: 'yellow',
          points: 0,
          winningArrays: [],
        },
        mode: 'easy',
      }
    case 'hardMode':
      return {
        ...initialGameState,
        redTiles: createTiles('red'),
        yellowTiles: createTiles('yellow'),
        redWinnings: {
          team: 'red',
          points: 0,
          winningArrays: [],
        },
        yellowWinnings: {
          team: 'yellow',
          points: 0,
          winningArrays: [],
        },
        mode: 'hard',
      }

    case 'updateTileValue':
      return {
        ...state,
        tileValue: action.tileValue,
      }

    case 'updateRedTiles':
      return {
        ...state,
        redTiles: action.redTiles,
        message: action.message,
      }
    case 'updateYellowTiles':
      return {
        ...state,
        yellowTiles: action.yellowTiles,
        message: action.message,
      }

    case 'increment':
      return {
        ...state,
        stage: state.stage === 4 ? 1 : state.stage + 1,
      }
    case 'undoPreviousMove':
      return {
        ...state,
        previousTurns: action.previousTurns,
        tileValue: null,
        stage: action.stage,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        board: action.board,
      }
    case 'updateRedWinnings':
      return {
        ...state,
        redWinnings: action.redWinnings,
      }
    case 'updateYellowWinnings':
      return {
        ...state,
        yellowWinnings: action.yellowWinnings,
      }

    case 'endTurn':
      return {
        ...state,
        previousTurns: [action.turn, ...state.previousTurns],
        stage: state.stage === 4 ? 1 : state.stage + 1,
        tileValue: null,
        board: action.board,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      }
    // case 10

    //7
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}
