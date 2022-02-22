import styled from 'styled-components/macro'

export const GameButtonsContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  margin-top: 1rem;

  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 22rem;
  color: lightgrey;
`
export const NewGameButton = styled.button`
  cursor: pointer;
  width: 10rem;
  height: 2rem;

  transition: all 0.1s ease;
  background-color: blue;
  font-family: 'Kbreindeergames', arial;
  color: white;
  border-radius: 5px;
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.8), 0 2px 5px rgba(0, 0, 0, 1);

  &:hover {
    transform: scale(1.1);
  }
`
