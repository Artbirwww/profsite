import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import { useEffect, useState } from "react"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, ArrowRight, CheckCheck, Option, X } from "lucide-react"

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
    description?: string
    pickerStyleType?: "squeezed" | "extended"
    optionStyleType?: "row" | "column"
}

export const SingleOptionsPicker = ({ tasks, setTasks, navigateToResults, description, pickerStyleType = "squeezed", optionStyleType = "column" }: SingleOptionPickerProps) => {
    const [currentTask, setCurrentTask] = useState<Task>()
    const [currentTaskNumber, setCurrentTaskNumber] = useState<number>(0)

    useEffect(() => {
        if (!tasks || tasks.length === 0) return

        setCurrentTask(tasks[currentTaskNumber])
    }, [currentTaskNumber, tasks])

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
                <div className="test-card-count">
                    {currentTaskNumber + 1} из {tasks.length}
                </div>

                {description && (
                    <div className="test-card-description">
                        {description}
                    </div>
                )}
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
                <Button label="Назад" variant="secondary" icon={<ArrowLeft />} disabled={currentTaskNumber === 0} onClick={() => { changeTask(-1) }} />

                {currentTaskNumber < tasks.length - 1 ? (
                    <Button label={"Пропустить"} icon={<ArrowRight />} onClick={() => changeTask(1)} />
                ) : (
                    <Button label={"Завершить"} icon={<CheckCheck />} onClick={navigateToResults} />
                )}

            </div>

            <ProgressBar currentTaskNumber={currentTaskNumber} total={tasks.length} />

            <Toaster />
        </div>
    )
}