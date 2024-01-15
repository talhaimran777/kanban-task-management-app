import useData from 'store/data'
import useBoards from 'store/data/boards'
import { Board } from 'types/mock/v2'

const addBoardService = ({ board }: { board: Board }) => {
    const { boards, setBoards } = useBoards.getState()

    setBoards([...boards, board])
}

export default addBoardService
