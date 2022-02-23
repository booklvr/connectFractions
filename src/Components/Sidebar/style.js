import styled, { css } from 'styled-components/macro'
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import {
  BiArrowFromLeft,
  BiArrowFromRight,
  BiRefresh,
  BiUndo,
} from 'react-icons/bi'

const buttonStyles = css`
  color: white;
  font-size: 1.5rem;
  cursor: ${({ active }) => (active !== 0 ? 'pointer' : 'scale(1)')};

  &:hover {
    transform: ${({ active }) => (active !== 0 ? 'scale(1.2)' : 'auto')};
  }
`

export const LeftArrow = styled(BiArrowFromLeft)`
  ${buttonStyles}
`

export const RightArrow = styled(BiArrowFromRight)`
  ${buttonStyles}
`

export const UndoButton = styled(BiUndo)`
  ${buttonStyles}
  color: ${({ active }) => (active !== 0 ? 'white' : 'grey')}
`

export const PlayAgainButton = styled(BiRefresh)`
  ${buttonStyles}
`

export const SidebarContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  width: 12rem;
  background-color: black;
  height: 100%;
  height: 100vh;

  top: 0;
  bottom: 0;
  right: ${({ showSidebar }) => (showSidebar ? '0' : '-8.5rem')};
`

export const SidebarRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
`

export const SideBarHeader = styled.h2`
  color: white;
  font-family: 'Gaegu', arial;
  font-size: 1.5rem;
  border-bottom: 4px solid white;
`

export const SidebarOptionText = styled.h3`
  color: ${({ active }) => (active !== 0 ? 'white' : 'grey')};
  font-family: 'Gaegu', arial;
  font-size: 1.2rem;
  cursor: pointer;
  /* color: white; */

  &:hover {
    border-bottom: ${({ active }) =>
      active !== 0 ? '2px solid white' : 'none'};
  }
`

export const GameModeHeader = styled.h3`
  color: white;
  font-family: 'Gaegu', arial;
  font-size: 1.5rem;
  border-bottom: 4px solid white;
`

export const ModeButtonStyle = css`
  color: white;
  font-family: 'Gaegu', arial;
  font-size: 1.2rem;
  padding: 0.2rem;
  margin: 0.8rem;
  background-color: black;
  cursor: pointer;
  border: ${({ border }) => (border ? '3px solid white' : 'none')};
`

export const EasyModeButton = styled.button`
  ${ModeButtonStyle}
`

export const HardModeButton = styled.button`
  ${ModeButtonStyle}
`
