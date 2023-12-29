import { create } from 'zustand'

interface DialogState {
    open: boolean
    type: string
    setOpen: (open: boolean) => void
    setType: (type: string) => void
}

const useDialog = create<DialogState>((set) => ({
    open: false,
    type: '',
    setOpen: (open: boolean) => set((state) => ({ ...state, open })),
    setType: (type: string) => set((state) => ({ ...state, type })),
}))

export default useDialog
