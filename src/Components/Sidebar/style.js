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
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
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
  right: ${({ showSidebar }) => (showSidebar ? '-8.5rem' : '0')};
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
  font-family: 'Kbreindeergames', arial;
  font-size: 1.5rem;
  border-bottom: 4px solid white;
`

export const SidebarOptionText = styled.h3`
  color: white;
  font-family: 'Kbreindeergames', arial;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid white;
  }
`
