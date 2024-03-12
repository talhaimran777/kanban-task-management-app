import EditBoardDialog from 'src/components/ui/custom/dialog/edit-board-dialog'
import AddBoardDialog from 'src/components/ui/custom/dialog/add-board-dialog'
import AddTaskDialog from 'src/components/ui/custom/dialog/add-task-dialog'
import ViewTaskDialog from 'src/components/ui/custom/dialog/view-task-dialog'

const Dialogs = () => {
    return (
        <>
            <AddBoardDialog />
            <EditBoardDialog />
            <AddTaskDialog />
            <ViewTaskDialog />
        </>
    )
}

export default Dialogs
