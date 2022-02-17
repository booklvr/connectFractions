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

// // for real tho...all credit for this super optimized logic belongs here: Jeff Leu circa November 23, 2016
// const checkVertical = (board, pos) => {
//   // Check only if row is 3 or greater
//   // let total = 0

//   for (let r = 2; r < 6; r++) {
//     for (let c = 0; c < 7; c++) {
//       if (board[r][c]) {
//         if (
//           board[r][c] === board[r - 1][c] &&
//           board[r][c] === board[r - 2][c] &&
//           board[r][c] === board[r - 3][c]
//         ) {
//           return board[r][c]
//         }
//       }
//     }
//   }
// }

// const checkDiagonalRight = (board, pos) => {
//   // Check only if row is 3 or greater AND column is 3 or less
//   for (let r = 3; r < 6; r++) {
//     for (let c = 0; c < 4; c++) {
//       if (board[r][c]) {
//         if (
//           board[r][c] === board[r - 1][c + 1] &&
//           board[r][c] === board[r - 2][c + 2] &&
//           board[r][c] === board[r - 3][c + 3]
//         ) {
//           return board[r][c]
//         }
//       }
//     }
//   }
// }

// const checkDiagonalLeft = (board, pos) => {
//   // Check only if row is 3 or greater AND column is 3 or greater
//   for (let r = 3; r < 6; r++) {
//     for (let c = 3; c < 7; c++) {
//       if (board[r][c]) {
//         if (
//           board[r][c] === board[r - 1][c - 1] &&
//           board[r][c] === board[r - 2][c - 2] &&
//           board[r][c] === board[r - 3][c - 3]
//         ) {
//           return board[r][c]
//         }
//       }
//     }
//   }
// }

// const checkDraw = (board) => {
//   for (let r = 0; r < 6; r++) {
//     for (let c = 0; c < 7; c++) {
//       if (board[r][c] === null) {
//         return null
//       }
//     }
//   }
//   return 'draw'
// }

// export const checkForWin = (board, pos) => {
//   return (
//     checkVertical(board, pos) ||
//     checkDiagonalRight(board, pos) ||
//     checkDiagonalLeft(board, pos) ||
//     // checkHorizontal(board, pos) ||
//     checkDraw(board, pos)
//   )
// }

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
        color: null,
        id: null,
        winner: false,
        coordinate: {
          r,
          c,
        },
      })
    }
  }

  return initialArray
}

// export const getCoordinate = ({ r, c }) => {
//   console.log('getCoordinate')
//   console.log(`col: [${r}, ${c}]`)
// }

// export const getCoordinateValue = ({ r, c }, board) => {
//   console.log('getCoordinateValue')
//   console.log(board[r][c])
// }

const getVerticalArray = ({ r, c }, board) => {
  const verticalArray = []
  for (var i = r; i < 6; i++) {
    verticalArray.push(board[i][c])
    // console.log('verticalArr', verticalArr)
  }
  return verticalArray
}

const checkVertical = ({ r, c }, board) => {
  // get vertical array
  const verticalArray = getVerticalArray({ r, c }, board)

  const winners = findWinnersVertical(verticalArray)
  return winners
}

export const getHorizontalArray = ({ r, c }, board) => {
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

const checkHorizontal = ({ r, c }, board) => {
  //get horizontal array
  const array = getHorizontalArray({ r, c }, board)
  const winners = findWinners(array, board, c)

  return winners
}

const checkDiagonalUp = ({ r, c }, board) => {
  //get horizontal array
  const array = getDiagonalUpArray({ r, c }, board)
  const winners = findWinners(array, board, c)

  return winners
}

const checkDiagonalDown = ({ r, c }, board) => {
  //get horizontal array
  const array = getDiagonalDownArray({ r, c }, board)
  const winners = findWinners(array, board, c)

  return winners
}

export const getWinningArrays = ({ r, c }, board) => {
  const vertical = checkVertical({ r, c }, board)
  console.log('vertical', vertical)
  const horizontal = checkHorizontal({ r, c }, board)
  console.log(`horizontal`, horizontal)
  const diagonalUp = checkDiagonalUp({ r, c }, board)
  console.log(`diagonalUp`, diagonalUp)
  const diagonalDown = checkDiagonalDown({ r, c }, board)
  console.log(`diagonalDown`, diagonalDown)

  let winningArrays = combineWinningArrays(
    vertical,
    horizontal,
    diagonalUp,
    diagonalDown
  )

  return winningArrays
}

// REMOVE
// export const getVertical = ({ r, c }, board) => {
//   const verticalArr = []
//   for (var i = r; i < 6; i++) {
//     verticalArr.push(board[i][c])
//     // console.log('verticalArr', verticalArr)
//   }
//   let isWinningArray = getWholeNumbers(verticalArr)
//   return isWinningArray
// }

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

export const getDiagonalUpArray = ({ r, c }, board) => {
  // console.log('getDiagonalUpArray')

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

  // console.log(`array`, array)
  return array
}

export const getDiagonalDownArray = ({ r, c }, board) => {
  // console.log('getDiagonalDownArray')

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
const findWinners = (arr, board, c) => {
  if (arr.length < 3) {
    return null
  }

  const length = arr.length

  let l = length
  let n = 0

  let winningArrays = []

  while (l - 2 > 0) {
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

      if (result) {
        winningArrays.push({
          points: result,
          arr: [...slicedArray],
        })
      }
    }
    l--
    n++
  }
  if (winningArrays.length > 0) {
    return winningArrays
  }
}

// refactor??
// change vertical to array of arrays but with only a single array
// loop through all props and apply same logic
const combineWinningArrays = (
  vertical,
  horizontal,
  diagonalDown,
  diagonalUp
) => {
  let winningArrays = []
  let i = 1
  let points = 0
  if (vertical) {
    console.log(`(${i++}). vertical:`, vertical)
    points += vertical.points
    winningArrays.push({
      sum: vertical.points,
      arr: vertical.arr,
    })
  }

  if (horizontal?.length) {
    horizontal.forEach((arr) => console.log(`(${i++}). horizontal:`, arr))

    horizontal.forEach((arr) => {
      points += arr.points
      winningArrays.push({
        sum: arr.points,
        arr: arr.arr,
      })
    })
  }

  if (diagonalUp?.length) {
    diagonalUp.forEach((arr) => console.log(`(${i++}). diagonalUp:`, arr))

    diagonalUp.forEach((arr) => {
      points += arr.points
      winningArrays.push({
        sum: arr.points,
        arr: arr.arr,
      })
    })
  }

  if (diagonalDown?.length) {
    diagonalDown.forEach((arr) => console.log(`(${i++}). diagonalDown:`, arr))

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
    winningArrays,
  }
}

export const showWinningTilesOnBoard = (winningArrays, board, dispatch) => {
  // const boardCopy = deepCloneBoard(board)
  winningArrays.winningArrays.forEach((winningArray) => {
    console.log('traversed arr', winningArray)
    winningArray.arr.forEach((item) => {
      console.log('item', item)
    })
  })
  // dispatch({
  //   type: 'updateWinningCell',
  // })
}
