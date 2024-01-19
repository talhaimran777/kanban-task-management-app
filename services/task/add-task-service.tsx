import { Column, Data, Task, Board } from 'types/mock/v2'

const addTaskService = async ({ task }: { task: Task }) => {
    // const { data, setData } = useData.getState()
    //
    // const updatedBoards = data?.boards.map((board: Board) => {
    //     if (board.id === data.selectedBoard) {
    //         const selectedColumn = board.columns?.find(
    //             (col: Column) => col.name === task.status
    //         ) as Column
    //
    //         let columnsTasks: Task[] = []
    //
    //         if (!!selectedColumn.tasks?.length) {
    //             columnsTasks = selectedColumn?.tasks
    //         } else {
    //             columnsTasks = []
    //         }
    //
    //         selectedColumn['tasks'] = [...columnsTasks, task]
    //     }
    //     return board
    // }) as Board[]
    //
    // const appData: Data = {
    //     ...data,
    //     boards: [...updatedBoards],
    // }
    //
    // setData(appData)
}

export default addTaskService
