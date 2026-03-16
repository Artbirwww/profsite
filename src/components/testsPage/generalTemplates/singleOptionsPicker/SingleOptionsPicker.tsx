import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import { useEffect, useState } from "react"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, Option } from "lucide-react"
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
    classType?: string
}

export const SingleOptionsPicker = ({ tasks, setTasks, navigateToResults, classType }: SingleOptionPickerProps) => {
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
        if (currentTaskNumber >= tasks.length - 1) {
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

    return (<>

        {/*<ProgressBar currentTaskNumber={currentTaskNumber} total={tasks.length} />*/}

        <div
            className={`test-card ${classType}`}>

            <div
                className="test-card-info">

                <div
                    className="test-card-back"
                    onClick={() => { changeTask(-1) }}>

                    <ArrowLeft size={20} color="#fff" />

                </div>

                <div
                    className="test-card-count">

                    <p>Вопрос <span>{(currentTaskNumber + 1).toString().padStart(2, "0")}</span> из <span>{(tasks.length).toString().padStart(2, "0")}</span></p>

                </div>

            </div>

            {currentTask?.text &&
                <div
                    className="test-card-text">

                    {currentTask?.text}

                </div>}

            {currentTask?.imageUrl &&
                <div
                    className="test-card-img"
                    style={{ maxHeight: "180px", minHeight: "180px" }}>

                    <img src={currentTask?.imageUrl} alt="" />

                </div>}

            <div
                className="test-card-list">

                {currentTask?.options.map(option => (

                    <div
                        onClick={() => handleUserAnswer(currentTask, option)}
                        className={`test-card-selectable ${option.isPicked ? "active" : ""}`}>

                        <div
                            className="test-card-text">

                            {option?.text}

                        </div>


                    </div>))}

            </div>

            <div
                className="test-card-options">

                {currentTaskNumber < tasks.length - 1 && (
                    <Button
                        buttonLabel={"Пропустить"}
                        buttonFunction={() => changeTask(1)} />)}

                <Button
                    buttonLabel={"Завершить тест"}
                    buttonFunction={navigateToResults} />

            </div>

            <Toaster />
        </div>
    </>)
}