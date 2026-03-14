import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import { useEffect, useState } from "react"
import { ProgressBar } from "../progressBar/ProgressBar"
import { Option } from "lucide-react"
import { useTestStore } from "../../TestStore"

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
}

export const SingleOptionsPicker = ({ tasks, setTasks, navigateToResults }: SingleOptionPickerProps) => {
    const [currentTask, setCurrentTask] = useState<Task>()
    const [currentTaskNumber, setCurrentTaskNumber] = useState<number>(0)

    const setCurrentNumber = useTestStore((store) => store.setCurrentNumber)

    useEffect(() => {
        if (!tasks)
            return
        setCurrentTask(tasks[currentTaskNumber])
        setCurrentNumber(currentTaskNumber + 1)
    }, [currentTaskNumber])
    const handleUserAnswer = (task: Task, option: Option) => {
        const changedTask = changeOption(task, option)
        console.log(changedTask)
        const tasksTemp = tasks.map(currentTask =>
            task.id === currentTask.id ? changedTask : currentTask
        )

        setTasks(tasksTemp)
        if (currentTaskNumber >= tasks.length-1) {
            setCurrentTask(changedTask)
            return
        }
        //После выбора опции, идем дальше
        changeTask(1)
        //
    }

    const changeOption = (task: Task, option: Option): Task => ({
        ...task,
        options: task.options.map(op => ({ ...op, isPicked: op.id === option.id })),
        userAnswer: option.id
    })

    const changeTask = (step: number) => {
        const newNumber = currentTaskNumber + step
        //Условия не дают уйти ниже 1ого и последнего вопроса теста
        if (newNumber < 0 || newNumber >= tasks.length) {
            toast("Дальше некуда идти")
            return
        }

        setCurrentTaskNumber(currentTaskNumber + step)
    }

    if (currentTask)
        return (
            <div
                className="test-card test-card-height-600">

                <div className="tasks">
                    {/*<ProgressBar currentTaskNumber={currentTaskNumber} total={tasks.length} />*/}
                    <p>Задача {currentTaskNumber + 1}/{tasks.length}</p>
                </div>
                {currentTask.text && 
                    <div
                        className="test-card-text">

                        {currentTask?.text}
                    </div>
                }
                {currentTask.imageUrl && 
                    <div
                        className="test-card-img">

                        <img src={currentTask?.imageUrl} alt="" />
                    </div>
                }

                <div
                    className="test-card-list">

                    {currentTask.options.map(option => (

                        <div
                            onClick={() => handleUserAnswer(currentTask, option)}
                            className={`test-card-selectable ${option.isPicked ? "active" : ""}`}>

                            {option.text}
                        </div>
                    ))}
                </div>

                <div
                    className="test-card-options">

                    <Button
                        buttonLabel={"Назад"}
                        buttonFunction={() => changeTask(-1)} />

                    {currentTaskNumber < tasks.length - 1 && (
                        <Button
                            buttonLabel={"Далее"}
                            buttonFunction={() => changeTask(1)} />)}

                    <Button
                        buttonLabel={"Завершить тест"}
                        buttonFunction={navigateToResults} />
                </div>

                <Toaster />
            </div>)

    return (
        <p>Загрузка...</p>
    )
}