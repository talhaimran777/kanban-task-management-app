import EditBoardDialog from 'custom/dialog/edit-board-dialog'
import AddBoardDialog from 'custom/dialog/add-board-dialog'
import AddTaskDialog from 'custom/dialog/add-task-dialog'

const Dialogs = () => {
    return (
        <>
            <AddBoardDialog />
            <EditBoardDialog />
            <AddTaskDialog />
        </>
    )
}

export default Dialogs
