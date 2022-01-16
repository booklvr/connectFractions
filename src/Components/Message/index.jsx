import React from 'react'
import { MessageContainer, MessageText } from './style'

const Message = ({ message, gameStage }) => {
  let stage = ''

  switch (gameStage) {
    case 1:
      stage = 'Red: Choose your fraction.'
      break
    case 2:
      stage = 'Red: Place your tile.'
      break
    case 3:
      stage = 'Yellow: Choose your fraction.'
      break
    case 4:
      stage = 'Yellow: Place your tile.'
      break
    default:
      break
  }

  return (
    <MessageContainer>
      <MessageText>{(message && message) || stage}</MessageText>
    </MessageContainer>
  )
}

export default Message
