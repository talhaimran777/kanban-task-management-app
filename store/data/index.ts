import data from 'mock/data'
import { Data } from 'types/mock'
import { create } from 'zustand'

interface DataStore {
    data: Data
}

const useData = create<DataStore>((set) => ({
    data: data,
}))

export default useData
