import EditBoardDialog from 'src/components/ui/custom/dialog/edit-board-dialog'
import AddBoardDialog from 'src/components/ui/custom/dialog/add-board-dialog'
import AddTaskDialog from 'src/components/ui/custom/dialog/add-task-dialog'
import ViewTaskDialog from 'src/components/ui/custom/dialog/view-task-dialog'
import EditTaskDialog from 'src/components/ui/custom/dialog/edit-task-dialog'
import DeleteTaskDialog from 'src/components/ui/custom/dialog/delete-task-dialog'
import DeleteBoardDialog from 'src/components/ui/custom/dialog/delete-board-dialog'

const Dialogs = () => {
    return (
        <>
            <AddBoardDialog />
            <EditBoardDialog />
            <AddTaskDialog />
            <ViewTaskDialog />
            <EditTaskDialog />
            <DeleteTaskDialog />
            <DeleteBoardDialog />
        </>
    )
}

export default Dialogs
