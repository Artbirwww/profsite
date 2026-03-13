import { createContext, ReactNode, useContext, useState } from "react"


interface TestContextType {
    currentNumber: number
    totalNumber: number
    setCurrentNumber: (num: number) => void
    setTotalNumber: (num: number) => void
}

const TestContext = createContext<TestContextType | undefined>(undefined)

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentNumber, setCurrentNumber] = useState(0)
    const [totalNumber, setTotalNumber] = useState(0)

    return (
        <TestContext.Provider
            value={{
                currentNumber,
                totalNumber,
                setCurrentNumber,
                setTotalNumber
            }}>

            {children}
        </TestContext.Provider>
    )
}

export const useTestContext = () => {
    const context = useContext(TestContext)

    if (!context)
        throw new Error("useTestContext must be used withen TestProvider")

    return context
}