import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import { useEffect, useState } from "react"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, Option } from "lucide-react"

export interface Task {
    id: number
    taskNumber: number
    text?: string
    options: Option[]
    imageUrl?: string
    answer?: number
    userAnswer: number
}

export interface Option {
    id: number
    text: string
    isPicked: boolean
}

interface SingleOptionPickerProps {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
    navigateToResults: () => void
    pickerStyleType?: "squeezed" | "extended"
    optionStyleType?: "row" | "column"
}

export const SingleOptionsPicker = ({ tasks, setTasks, navigateToResults, pickerStyleType = "squeezed", optionStyleType = "column" }: SingleOptionPickerProps) => {
    const [currentTask, setCurrentTask] = useState<Task>()
    const [currentTaskNumber, setCurrentTaskNumber] = useState<number>(0)

    useEffect(() => {
        if (!tasks)
            return

        setCurrentTask(tasks[currentTaskNumber])
    }, [currentTaskNumber])

    const handleUserAnswer = (task: Task, option: Option) => {
        const changedTask = changeOption(task, option)

        const tasksTemp = tasks.map(currentTask =>
            task.id === currentTask.id ? changedTask : currentTask
        )

        setTasks(tasksTemp)

        if (currentTaskNumber >= tasks.length - 1) {
            setCurrentTask(changedTask)
            return
        }

        changeTask(1)
    }

    const changeOption = (task: Task, option: Option): Task => ({
        ...task,
        options: task.options.map(op => ({ ...op, isPicked: op.id === option.id })),
        userAnswer: option.id
    })

    const changeTask = (step: number) => {
        const newNumber = currentTaskNumber + step

        if (newNumber < 0 || newNumber >= tasks.length) {
            toast("Дальше некуда идти")
            return
        }

        setCurrentTaskNumber(currentTaskNumber + step)
    }

    return (
        <div className={`test-card single-options-picker ${pickerStyleType && pickerStyleType}`}>

            <div className="test-card-info">
                <div className="test-card-back" onClick={() => { changeTask(-1) }}>
                    <ArrowLeft size={20} />
                </div>

                <div className="test-card-count">
                    <p><span>Вопрос</span> <span>{(currentTaskNumber + 1).toString().padStart(2, "0")}</span> из <span>{(tasks.length).toString().padStart(2, "0")}</span></p>
                </div>
            </div>

            {currentTask?.text &&
                <div className="test-card-text">
                    {currentTask?.text}
                </div>
            }

            {currentTask?.imageUrl &&
                <div className="test-card-img">
                    <img src={currentTask?.imageUrl} alt="" />
                </div>
            }

            <div className={`test-card-list ${optionStyleType ? optionStyleType : ""}`}>
                {currentTask?.options.map(option => (
                    <div onClick={() => handleUserAnswer(currentTask, option)} className={`test-card-selectable ${option.isPicked ? "active" : ""}`}>
                        {option?.text}
                    </div>
                ))}
            </div>

            <div className="test-card-options">
                {currentTaskNumber < tasks.length - 1 && (
                    <Button
                        buttonLabel={"Пропустить"}
                        buttonFunction={() => changeTask(1)} />
                )}
                <Button
                    buttonLabel={"Завершить"}
                    buttonFunction={navigateToResults} />
            </div>

            <ProgressBar currentTaskNumber={currentTaskNumber} total={tasks.length} />

            <Toaster />

        </div>
    )
}