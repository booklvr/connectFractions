import styled from 'styled-components/macro'

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MessageText = styled.p`
  font-size: 2rem;
`

export const MessageTextSpan = styled.span`
  color: ${({ gameStage }) =>
    gameStage === 1 || gameStage === 2 ? 'red' : 'yellow'};
`

