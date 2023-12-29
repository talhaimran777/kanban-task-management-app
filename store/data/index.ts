import data from 'mock/data'
import { Data } from 'types/mock'
import { create } from 'zustand'

interface DataStore {
    data: Data
    setData: (type: Data) => void
}

const useData = create<DataStore>((set) => ({
    data: data,
    setData: (data: Data) => set((state) => ({ ...state, data })),
}))

export default useData
