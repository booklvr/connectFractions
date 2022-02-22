import React, { useState, useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'
import { deepCloneBoard } from '../../Utils/gameUtils'

import {
  EasyModeButton,
  GameModeHeader,
  HardModeButton,
  LeftArrow,
  PlayAgainButton,
  RightArrow,
  SidebarContainer,
  SideBarHeader,
  SidebarOptionText,
  SidebarRow,
  UndoButton,
} from './style.js'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const { gameState, dispatchGameState } = useContext(GameContext)

  const handleNewGame = () => {
    if (window.confirm('Are you sure you want to start a new Game?')) {
      dispatchGameState({
        type: 'newGame',
      })
    }
  }

  const removeTileFromBoard = ({ r, c }) => {
    let board = deepCloneBoard(gameState.board)
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

  const removeWinningArrays = (lastTurn) => {
    // if there were winning arrays
    const redWinnings = gameState.redWinnings
    const yellowWinnings = gameState.yellowWinnings

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

  const replaceTile = (lastTile) => {
    const yellowTiles = gameState.yellowTiles
    const redTiles = gameState.redTiles

    if (lastTile.color === 'red') {
      // red tile

      let index = redTiles.findIndex((tile) => tile.id === lastTile.id)
      redTiles[index].hidden = false

      // redTiles[index].hidden = false
    } else {
      // yellow tile

      let index = yellowTiles.findIndex((tile) => tile.id === lastTile.id)

      yellowTiles[index].hidden = false
    }
    return { redTiles, yellowTiles }
  }

  const handleUndo = () => {
    // copy the array
    let previousTurns = [...gameState.previousTurns]

    if (previousTurns.length === 0) return

    // get the last tile and remove it from the previous array
    const lastTurn = previousTurns.shift()

    // revert to previous game Stage 1 or 3
    let stage = gameState.stage

    if (stage === 3 || stage === 4) {
      stage = 1
    } else {
      stage = 3
    }

    const { redTiles, yellowTiles } = replaceTile(lastTurn.tile)
    const { redWinnings, yellowWinnings } = removeWinningArrays(lastTurn)

    dispatchGameState({
      type: 'undoPreviousMove',
      previousTurns,
      yellowTiles,
      redTiles,
      redWinnings,
      yellowWinnings,
      board: removeTileFromBoard(lastTurn.position),
      stage,
    })
  }

  const handleEasyMode = () => {
    if (gameState.mode === 'easy') return

    if (
      window.confirm(
        'Are you sure you want to change Modes? Doing so will restart the game.'
      )
    ) {
      dispatchGameState({
        type: 'easyMode',
      })
    }
  }

  const handleHardMode = () => {
    if (gameState.mode === 'hard') return

    if (
      window.confirm(
        'Are you sure you want to change Modes? Doing so will restart the game.'
      )
    ) {
      dispatchGameState({
        type: 'hardMode',
      })
    }
  }

  return (
    <SidebarContainer showSidebar={showSidebar}>
      <SidebarRow>
        {(showSidebar && (
          <LeftArrow
            onClick={() => {
              setShowSidebar(!showSidebar)
            }}
          />
        )) || (
          <RightArrow
            onClick={() => {
              setShowSidebar(!showSidebar)
            }}
          />
        )}

        <SideBarHeader>Options</SideBarHeader>
      </SidebarRow>
      <SidebarRow onClick={handleNewGame}>
        <PlayAgainButton />
        <SidebarOptionText>New Game</SidebarOptionText>
      </SidebarRow>
      <SidebarRow onClick={handleUndo}>
        <UndoButton active={gameState.previousTurns.length} />
        <SidebarOptionText active={gameState.previousTurns.length}>
          Undo
        </SidebarOptionText>
      </SidebarRow>

      <GameModeHeader>Difficulty</GameModeHeader>
      <EasyModeButton
        border={gameState.mode === 'easy'}
        onClick={handleEasyMode}
      >
        Easy
      </EasyModeButton>
      <HardModeButton
        border={gameState.mode === 'hard'}
        onClick={handleHardMode}
      >
        Hard
      </HardModeButton>
    </SidebarContainer>
  )
}

export default Sidebar
