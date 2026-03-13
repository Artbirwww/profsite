import { create } from "zustand"

interface TestStoreType {
    currentNumber: number
    totalNumber: number
    setCurrentNumber: (num: number) => void
    setTotalNumber: (num: number) => void
    reset: () => void
}

export const useTestStore = create<TestStoreType>((set) => ({
    currentNumber: 0,
    totalNumber: 0,

    setCurrentNumber: (num) => set({ currentNumber: num }),
    setTotalNumber: (num) => set({ totalNumber: num }),

    reset: () => set({ currentNumber: 0, totalNumber: 0 })
}))