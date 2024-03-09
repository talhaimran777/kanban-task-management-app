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
    setOpen: (open: boolean) => {
        set((state) => {
            if (state.open === open) {
                return state
            }

            return { ...state, open }
        })
    },
    setType: (type: string) => {
        set((state) => {
            if (state.type === type) {
                return state
            }

            return { ...state, type }
        })
    },
}))

export default useDialog
