'use client'

import { Board } from 'types/mock'
import BoardMenuItem from 'custom/board-menu-item'

const MobileMenuBoardList = ({ boards }: { boards: Board[] }) => {
  return boards.map((board) => <BoardMenuItem board={board} />)
}

export default MobileMenuBoardList
