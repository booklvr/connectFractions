import { add, fraction, number } from 'mathjs'

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

// for real tho...all credit for this super optimized logic belongs here: Jeff Leu circa November 23, 2016
const checkVertical = (board, pos) => {
  // Check only if row is 3 or greater
  // let total = 0

  for (let r = 2; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c] &&
          board[r][c] === board[r - 2][c] &&
          board[r][c] === board[r - 3][c]
        ) {
          return board[r][c]
        }
      }
    }
  }
}

const checkDiagonalRight = (board, pos) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let r = 3; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r][c] === board[r - 2][c + 2] &&
          board[r][c] === board[r - 3][c + 3]
        ) {
          return board[r][c]
        }
      }
    }
  }
}

const checkDiagonalLeft = (board, pos) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let r = 3; r < 6; r++) {
    for (let c = 3; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c - 1] &&
          board[r][c] === board[r - 2][c - 2] &&
          board[r][c] === board[r - 3][c - 3]
        ) {
          return board[r][c]
        }
      }
    }
  }
}

const checkDraw = (board) => {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c] === null) {
        return null
      }
    }
  }
  return 'draw'
}

export const checkForWin = (board, pos) => {
  return (
    checkVertical(board, pos) ||
    checkDiagonalRight(board, pos) ||
    checkDiagonalLeft(board, pos) ||
    checkHorizontal(board, pos) ||
    checkDraw(board, pos)
  )
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

  let row = 6

  for (let r = 0; r < 6; r++) {
    initialArray.push([])
    for (var c = 0; c < 7; c++) {
      initialArray[r].push({
        val: null,
        num: null,
        den: null,
        hidden: false,
        color: null,
        id: null,
        coordinate: {
          r,
          c,
        },
      })
    }
  }

  // for (var k = 0; k < 6; k++) {
  //   for (var l = 0; l < 7; l++) {
  //     console.log(initialArray[k][l])
  //   }
  // }

  return initialArray
}

export const getCoordinate = ({ r, c }) => {
  console.log('getCoordinate')
  console.log(`col: [${r}, ${c}]`)
}

export const getCoordinateValue = ({ r, c }, board) => {
  console.log('getCoordinateValue')
  console.log(board[r][c])
}

export const getVertical = (matrix, board) => {
  console.log('getVertical')
  const verticalArr = []
  for (var i = matrix.r; i < 6; i++) {
    // console.log(`col: [${matrix.i}, ${matrix.y}]`)
    console.log('r', i)
    console.log('c', matrix.c)
    verticalArr.push(board[i][matrix.c])
    console.log('verticalArr', verticalArr)
  }
  let isWinningArray = getWholeNumbers(verticalArr)
  return isWinningArray
}

export const getWholeNumberFromHorizontalArray = (arr) => {
  // winning array must be at least three tiles
  if (arr.length <= 2) {
    return null
  }

  const reduceFraction = (acc, curVal) =>
    add(acc, fraction(`${curVal.num}/${curVal.den}`))

  const sum = number(arr.reduce(reduceFraction, fraction('0')))
  console.log('sum', sum)

  // if the sum is a whole number, return the sum;
  if (sum % 1 === 0) {
    return sum
  } else {
    return null
  }
}

export const getWholeNumbers = (arr) => {
  let wholeNumber = 0

  let lastWinningCellIndex

  const reduceFraction = (acc, curVal, i) => {
    // console.log('acc', number(acc))
    const sum = add(acc, fraction(`${curVal.num}/${curVal.den}`))
    if (sum % 1 === 0) {
      // alert('we have a whole number', curVal)
      wholeNumber += 1
      lastWinningCellIndex = i
    }
    return sum
    // return add(acc, fraction(`${curVal.num}/${curVal.den}`))
  }

  arr.reduce(reduceFraction, fraction('0'))

  // console.log('total', total)
  console.log('wholeNumber', wholeNumber)
  // console.log(`lastWinningCellIndex`, lastWinningCellIndex)

  //get the winning cells
  let i = lastWinningCellIndex
  let winningArray = []

  //if checking checking the third down vertically
  if (i >= 2) {
    while (i >= 0) {
      winningArray.push(arr[i])
      i--
    }
    return {
      points: wholeNumber,
      winningArray,
    }
  } else {
    return null
  }
}

export const getHorizontalArray = ({ r, c }, board, color) => {
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

  // check the array for a winner
  let winningArrays = checkHorizontalArray(horizontalArray, board, c)
  if (winningArrays) {
    console.log('YES MOTHER FUCKER WE DID IT')
    console.log(`winningArray`, winningArrays)
  } else {
    console.log('sadly we lost this round')
  }

  return winningArrays
}

const checkHorizontal = (board, pos) => {
  // Check only if column is 3 or less
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2] &&
          board[r][c] === board[r][c + 3]
        ) {
          return board[r][c]
        }
      }
    }
  }
}

const arrayIncludesCoordinate = (arr, c) => {
  console.log('c', c)
  console.log(`start of array`, arr[0])
  console.log('end of array', arr[arr.length - 1])

  if (arr[0].coordinate.c > c || arr[arr.length - 1].coordinate.c < c) {
    console.log('that array is outside our perview, fuck off')
    return false
  }
  console.log('that array is in the fucking sweet spot')
  return true

  // return arr[0].coordinate.c > c || arr[arr.length - 1].coordinate.c < c
  //   ? true
  //   : false
}

// this should return the winning horizontal array if there is one
const checkHorizontalArray = (arr, board, c) => {
  if (arr.length < 3) {
    return null
  }
  console.log(`horizontalArrayToCheck`, arr)

  const length = arr.length

  let l = length
  let n = 0

  let points = 0
  // let wholeNumber = 0
  let winningArrays = []

  while (l - 2 > 0) {
    // console.log('loop: 1')
    console.log(`l`, l)
    console.log(`n`, n)

    //
    for (let i = 0; i < length - (length - n) + 1; i++) {
      console.log('lengthOfArrayToCheck', length - n)
      // let copy = [...arr]

      // use slice to get the next portion of the array to check
      let slicedArray = [...arr].splice(i, length - n)
      console.log(`slicedArray`, slicedArray)

      // check that the sliced array includes the dropped tile
      let arrayInBounds = arrayIncludesCoordinate(slicedArray, c)
      if (!arrayInBounds) {
        continue
      }

      console.log(`arrayInBounds`, arrayInBounds)

      // see if there is a whole number in the slices array
      let result = getWholeNumberFromHorizontalArray(slicedArray)

      if (result > points) {
        points = result
        winningArrays.push([...slicedArray])
      }
    }
    l--
    n++
  }
  if (winningArrays.length > 0) {
    console.log(`winningArray`, winningArrays)
    return winningArrays
  }
}
