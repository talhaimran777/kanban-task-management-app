import EditBoardDialog from 'src/components/ui/custom/dialog/edit-board-dialog'
import AddBoardDialog from 'src/components/ui/custom/dialog/add-board-dialog'
import AddTaskDialog from 'src/components/ui/custom/dialog/add-task-dialog'

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
