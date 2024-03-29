import { create } from 'zustand'

interface SidebarState {
    open: boolean
    setOpen: (open: boolean) => void
}

const useSidebar = create<SidebarState>((set) => ({
    open: true,
    setOpen: (open: boolean) => set((_state) => ({ open })),
}))

export default useSidebar
