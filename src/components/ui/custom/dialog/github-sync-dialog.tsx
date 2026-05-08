'use client'

import { GithubSyncSettings } from 'src/components/providers/github-sync-settings'
import Typography from 'src/components/ui/custom/typography'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'
import useDialog from 'src/store/dialog'

const GithubSyncDialog = () => {
    const { open, type, setOpen, setType } = useDialog()

    return (
        <Dialog
            open={open && type === 'github-sync-dialog'}
            onOpenChange={() => {
                setOpen(false)
                setType('')
            }}
        >
            <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto sm:max-w-xl'>
                <DialogTitle className='flex justify-between items-center'>
                    <Typography
                        text='GitHub sync'
                        variant='heading'
                        size='large'
                        className='text-black dark:text-white'
                    />
                </DialogTitle>
                <DialogDescription>
                    <GithubSyncSettings />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default GithubSyncDialog
