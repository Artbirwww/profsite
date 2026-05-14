import React from "react"

export interface BaseTestComponentProps<T> {
    tasks: T[]
    setTasks: React.Dispatch<React.SetStateAction<T[] | undefined>>
    navigateToResults: () => void
    description?: string
    pickerStyleType?: "squeezed" | "extended"
    optionStyleType?: "column" | "row"
}