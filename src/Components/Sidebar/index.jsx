import React, { useState, useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'
import {
  deepCloneBoard,
  removeTileFromBoard,
  removeWinningArrays,
  replaceTile,
  undoStage,
} from '../../Utils/gameUtils'

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

  // const removeTileFromBoard = ({ r, c }, prevBoard) => {
  //   const board = deepCloneBoard(gameState.board)
  //   board[r][c] = {
  //     val: null,
  //     num: null,
  //     den: null,
  //     hidden: false,
  //     color: null,
  //     coordinate: { r, c },
  //   }
  //   return board
  // }

  const handleUndo = () => {
    // copy the array
    let previousTurns = [...gameState.previousTurns]

    
    if (previousTurns.length === 0) return

    // get the last tile and remove it from the previous array
    const lastTurn = previousTurns.shift()

    // revert to previous game Stage 1 or 3
    let stage = undoStage(gameState.stage)

    // replace the tile to it's colors remaining available tiles
    const { redTiles, yellowTiles } = replaceTile(
      gameState.redTiles,
      gameState.yellowTiles,
      lastTurn.tile
    )

    // if the previous turn resulted in winning arrays, remove the points and winnings arrays from that team
    const { redWinnings, yellowWinnings } = removeWinningArrays(
      gameState.redWinnings,
      gameState.yellowWinnings,
      lastTurn
    )

    // remove the tile from the board
    const board = removeTileFromBoard(lastTurn.position, gameState.board)

    dispatchGameState({
      type: 'undoPreviousMove',
      previousTurns,
      yellowTiles,
      redTiles,
      redWinnings,
      yellowWinnings,
      board,
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
