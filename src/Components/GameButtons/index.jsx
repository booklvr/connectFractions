import React, { useContext } from 'react'
import { GameContext } from '../../Pages/ConnectFractions'

import UndoButton from '../UndoButton'
import { GameButtonsContainer, NewGameButton } from './style'

const GameButtons = () => {
  const { gameState, dispatchGameState } = useContext(GameContext)

  const handleNewGame = () => {
    dispatchGameState({
      type: 'newGame',
    })
  }

  return (
    <GameButtonsContainer>
      <NewGameButton
        onClick={() => {
          handleNewGame()
        }}
      >
        New Game
      </NewGameButton>
      {gameState.previousTurns.length > 0 && <UndoButton />}
    </GameButtonsContainer>
  )
}

export default GameButtons
