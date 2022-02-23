import { add, fraction, number } from 'mathjs'
import uuid from 'react-uuid'

export const deepCloneBoard = (board) => [
  [...board[0]],
  [...board[1]],
  [...board[2]],
  [...board[3]],
  [...board[4]],
  [...board[5]],
]

export const generateNewBoard = () => [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
]

function EasyObject(num, den, color) {
  this.val = num / den
  this.num = num
  this.den = den
  this.hidden = false
  this.color = color
  this.id = `${color === 'red' ? 1 : 2}${num}${den}`
}

export const createEasyTiles = (color) => {
  return [
    new EasyObject(1, 2, color),
    new EasyObject(1, 3, color),
    new EasyObject(2, 3, color),
    new EasyObject(1, 4, color),
    new EasyObject(2, 4, color),
    new EasyObject(3, 4, color),
    new EasyObject(2, 6, color),
    new EasyObject(3, 6, color),
    new EasyObject(4, 6, color),
    new EasyObject(2, 8, color),
    new EasyObject(4, 8, color),
    new EasyObject(6, 8, color),
    new EasyObject(5, 10, color),
    new EasyObject(2, 12, color),
    new EasyObject(3, 12, color),
    new EasyObject(4, 12, color),
    new EasyObject(6, 12, color),
    new EasyObject(8, 12, color),
    new EasyObject(9, 12, color),
    new EasyObject(5, 15, color),
    new EasyObject(10, 15, color),
  ]
}

export const createTiles = (color) => {
  const initialArray = []
  for (var i = 1; i <= 7; i++) {
    for (var j = 1; j < i; j++) {
      initialArray.push({
        val: j / i,
        num: j,
        den: i,
        hidden: false,
        color,
        id: `${color === 'red' ? 1 : 2}${j}${i}`,
      })
    }
  }
  return initialArray
}

export const createBoard = () => {
  let initialArray = []

  for (let r = 0; r < 6; r++) {
    initialArray.push([])
    for (var c = 0; c < 7; c++) {
      initialArray[r].push({
        val: null,
        num: null,
        den: null,
        hidden: false,
        // color: null,
        id: null,
        coordinate: {
          r,
          c,
        },
      })
    }
  }

  return initialArray
}

const getVerticalArray = (r, c, board) => {
  const verticalArray = []
  for (var i = r; i < 6; i++) {
    verticalArray.push(board[i][c])
  }
  return verticalArray
}

const checkVertical = (r, c, board) => {
  // get vertical array
  const verticalArray = getVerticalArray(r, c, board)

  const winners = findWinnersVertical(verticalArray)
  return winners
}

export const getHorizontalArray = (r, c, board) => {
  let horizontalArray = []

  let row = r
  let col = c

  // add tiles on the left
  // while we don't go off the board to the left, and there are tiles to the left of the placed block
  let leftCols = col - 1

  while (leftCols >= 0 && board[r][leftCols].val !== null) {
    horizontalArray.unshift(board[row][leftCols])
    leftCols--
  }

  // add the dropped tile
  horizontalArray.push(board[row][col])

  //ad the tiles on the right
  let rightCols = col + 1

  while (rightCols < 7 && board[row][rightCols].val) {
    horizontalArray.push(board[row][rightCols])
    rightCols++
  }

  return horizontalArray
}

const checkHorizontal = (r, c, board) => {
  //get horizontal array
  const array = getHorizontalArray(r, c, board)
  const winners = findWinners(array, c)

  return winners
}

const checkDiagonalUp = (r, c, board) => {
  //get horizontal array
  const array = getDiagonalUpArray(r, c, board)
  const winners = findWinners(array, c)

  return winners
}

const checkDiagonalDown = (r, c, board) => {
  //get horizontal array
  const array = getDiagonalDownArray(r, c, board)
  const winners = findWinners(array, c)

  return winners
}

export const getWinningArrays = (r, c, board) => {
  const vertical = checkVertical(r, c, board)
  const horizontal = checkHorizontal(r, c, board)
  const diagonalUp = checkDiagonalUp(r, c, board)
  const diagonalDown = checkDiagonalDown(r, c, board)

  let { points, winningArrays } = combineWinningArrays(
    vertical,
    horizontal,
    diagonalUp,
    diagonalDown
  )

  return { points, winningArrays }
}

export const checkFractionsEqualWholeNumber = (arr) => {
  // winning array must be at least three tiles
  if (arr.length <= 2) {
    return null
  }

  const reduceFraction = (acc, curVal) =>
    add(acc, fraction(`${curVal.num}/${curVal.den}`))

  const sum = number(arr.reduce(reduceFraction, fraction('0')))

  // if the sum is a whole number, return the sum;
  if (sum % 1 === 0) {
    return sum
  } else {
    return null
  }
}

// REFACTOR?????
export const findWinnersVertical = (arr) => {
  let points

  let lastWinningCellIndex

  // find whole numbers in the vertical array
  const reduceFraction = (acc, curVal, i) => {
    const sum = number(add(acc, fraction(`${curVal.num}/${curVal.den}`)))
    if (sum % 1 === 0) {
      points = sum
      lastWinningCellIndex = i
    }
    return sum
  }
  // const sum = number(arr.reduce(reduceFraction, fraction('0')))
  arr.reduce(reduceFraction, fraction('0'))

  //get the winning cells
  let i = lastWinningCellIndex
  let winningArray = []

  //if checking at least the third row up vertically
  if (i >= 2) {
    while (i >= 0) {
      winningArray.unshift(arr[i])
      i--
    }
    return {
      points,
      arr: winningArray,
    }
  } else {
    return null
  }
}

export const getDiagonalUpArray = (r, c, board) => {
  let array = []

  let row = r
  let col = c

  // add tiles on the left
  // while we don't go off the board to the left, and there are tiles to the left of the placed block
  let leftCol = col - 1
  let leftRow = row + 1

  while (leftCol >= 0 && leftRow < 6 && board[leftRow][leftCol].val !== null) {
    array.unshift(board[leftRow][leftCol])
    leftCol--
    leftRow++
  }

  // add the dropped tile
  array.push(board[row][col])

  //ad the tiles on the right
  let rightCol = col + 1
  let rightRow = row - 1

  while (rightCol < 7 && rightRow >= 0 && board[rightRow][rightCol].val) {
    array.push(board[rightRow][rightCol])
    rightCol++
    rightRow--
  }

  return array
}

export const getDiagonalDownArray = (r, c, board) => {
  let array = []

  let row = r
  let col = c

  // add tiles on the left
  // while we don't go off the board to the left, and there are tiles to the left of the placed block
  let leftCol = col - 1
  let leftRow = row - 1

  while (leftCol >= 0 && leftRow >= 0 && board[leftRow][leftCol].val !== null) {
    array.unshift(board[leftRow][leftCol])
    leftCol--
    leftRow--
  }

  // add the dropped tile
  array.push(board[row][col])

  //ad the tiles on the right
  let rightCol = col + 1
  let rightRow = row + 1

  while (rightCol < 7 && rightRow < 6 && board[rightRow][rightCol].val) {
    array.push(board[rightRow][rightCol])
    rightCol++
    rightRow++
  }

  return array
}

const arrayIncludesCoordinate = (arr, c) => {
  if (arr[0].coordinate.c > c || arr[arr.length - 1].coordinate.c < c) {
    return false
  }
  return true
}

// this should return the winning horizontal array if there is one
const findWinners = (arr, c) => {
  // winning array must include at least three
  if (arr.length < 3) {
    return null
  }

  const length = arr.length

  let l = length
  // n is the number of cells in the array to check for a winning combination
  let n = 0

  let winningArrays = []

  // continue to iterate over sections until arriving at arrays of three
  while (l - 2 > 0) {
    // iterate over a section of the array to check according to n
    for (let i = 0; i < length - (length - n) + 1; i++) {
      // use slice to get the next portion of the array to check
      let slicedArray = [...arr].splice(i, length - n)

      // check that the sliced array includes the dropped tile
      let arrayInBounds = arrayIncludesCoordinate(slicedArray, c)
      if (!arrayInBounds) {
        continue
      }

      // see if there is a whole number in the slices array
      let result = checkFractionsEqualWholeNumber(slicedArray)

      // if a whole number is found add it to the winningArrays.
      if (result) {
        winningArrays.push({
          points: result,
          arr: [...slicedArray],
        })
      }
    }
    // reduce the size of the array to check
    // // reduce the size of the sliced array to check
    l--
    n++
  }
  if (winningArrays.length > 0) {
    return winningArrays
  }
}

// change vertical to array of arrays but with only a single array
// loop through all props and apply same logic
const combineWinningArrays = (
  vertical,
  horizontal,
  diagonalDown,
  diagonalUp
) => {
  let winningArrays = []
  let points = 0

  // add vertical wins
  if (vertical) {
    points += vertical.points
    winningArrays.push({
      sum: vertical.points,
      arr: vertical.arr,
    })
  }

  // add horizontal wins
  if (horizontal?.length) {
    horizontal.forEach((arr) => {
      points += arr.points
      winningArrays.push({
        sum: arr.points,
        arr: arr.arr,
      })
    })
  }

  // add diagonal up wins
  if (diagonalUp?.length) {
    diagonalUp.forEach((arr) => {
      points += arr.points
      winningArrays.push({
        sum: arr.points,
        arr: arr.arr,
      })
    })
  }

  // add diagonal down wins
  if (diagonalDown?.length) {
    diagonalDown.forEach((arr) => {
      points += arr.points
      winningArrays.push({
        sum: arr.points,
        arr: arr.arr,
      })
    })
  }

  return {
    points,
    id: uuid(),
    winningArrays,
  }
}

export const removeWinningArrays = (prevRedWins, prevYellowWins, lastTurn) => {
  // if there were winning arrays
  const redWinnings = { ...prevRedWins }
  const yellowWinnings = { ...prevYellowWins }

  if (lastTurn.points) {
    if (lastTurn.tile.color === 'red') {
      redWinnings.points -= lastTurn.points
      redWinnings.winningArrays.splice(0, lastTurn.numberOfWins)
    } else {
      yellowWinnings.points -= lastTurn.points
      yellowWinnings.winningArrays.splice(0, lastTurn.numberOfWins)
    }
  }

  return { redWinnings, yellowWinnings }
}

export const replaceTile = (prevRedTiles, prevYellowTiles, lastTile) => {
  const yellowTiles = [...prevYellowTiles]
  const redTiles = [...prevRedTiles]

  if (lastTile.color === 'red') {
    // red tile

    let index = redTiles.findIndex((tile) => tile.id === lastTile.id)
    redTiles[index].hidden = false
  } else {
    // yellow tile

    let index = yellowTiles.findIndex((tile) => tile.id === lastTile.id)

    yellowTiles[index].hidden = false
  }
  return { redTiles, yellowTiles }
}

export const removeTileFromBoard = ({ r, c }, prevBoard) => {
  const board = deepCloneBoard(prevBoard)
  board[r][c] = {
    val: null,
    num: null,
    den: null,
    hidden: false,
    color: null,
    coordinate: { r, c },
  }
  return board
}

export const undoStage = (stage) => {
  return stage === 3 || stage === 4 ? 1 : 3
}
