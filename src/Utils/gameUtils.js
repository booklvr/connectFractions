// import { add, fraction, number } from 'mathjs'

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

  for (let i = 0; i < 6; i++) {
    initialArray.push([])
    for (var j = 0; j < 7; j++) {
      initialArray[i].push({
        val: null,
        num: null,
        den: null,
        hidden: false,
        color: null,
        id: null,
        coordinate: {
          x: i,
          y: j,
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

export const getCoordinate = ({ x, y }) => {
  console.log('getCoordinate')
  console.log(`col: [${x}, ${y}]`)
}

export const getCoordinateValue = ({ x, y }, board) => {
  console.log('getCoordinateValue')
  console.log(board[x][y])
}

export const getVertical = (matrix, board) => {
  console.log('getVertical')
  const verticalArr = []
  for (var i = matrix.x; i < 6; i++) {
    // console.log(`col: [${matrix.i}, ${matrix.y}]`)
    console.log('x', i)
    console.log('y', matrix.y)
    verticalArr.push(board[i][matrix.y])
    console.log('verticalArr', verticalArr)
  }
  getWholeNumbers(verticalArr)
}

export const getWholeNumbers = (arr) => {
  // let total = arr.reduce(
  //   (acc, curVal) => add(acc, fraction(`${curVal.num} / ${curVal.den}`)),
  //   0
  // )
  // console.log('total', total)
  // let wholeNumber = fraction('0')
  // wholeNumber = add(wholeNumber, fraction('6/7'))
  // console.log(`wholeNumber`, wholeNumber)
  // wholeNumber = add(wholeNumber, fraction('6/7'))
  // console.log(`wholeNumber`, wholeNumber)
  // wholeNumber = add(wholeNumber, fraction('1/7'))
  // console.log(`wholeNumber`, wholeNumber)
  // wholeNumber = add(wholeNumber, fraction('1/7'))
  // console.log(`wholeNumber`, wholeNumber)
  // console.log(number(wholeNumber))
  // arr.forEach((cell) => {
  //   console.log('val', cell.val)
  // })
  // const total = arr.reduce((acc, curVal) => {
  //   const temp = acc + curVal.val
  //   if (temp % 1 === 0) {
  //     wholeNumber += 1
  //   }
  //   return temp
  // }, fraction('0'))
  // console.log('total', total)
  // console.log(`wholeNumber`, wholeNumber)
}
