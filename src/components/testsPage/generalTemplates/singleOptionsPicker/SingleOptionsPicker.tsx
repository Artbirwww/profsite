import toast, { Toaster } from "react-hot-toast"
import "./singleOptionsPicker.css"
import { Button } from "../../../ui/reusable/button"
import { useEffect, useState } from "react"
import { TaskComponent } from "./Task"
import { ProgressBar } from "../progressBar/ProgressBar"
export interface Task {
    id: number
    taskNumber: number
    text: string
    options: Option[]
    imageUrl?: string
    answer: number
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
export const SingleOptionsPicker = ({tasks, setTasks, navigateToResults}: SingleOptionPickerProps) => {
    const [currentTask, setCurrentTask] = useState<Task>()
    const [currentTaskNumber, setCurrentTaskNumber] = useState<number>(0)
    useEffect(() => {
        if (!tasks) return
        setCurrentTask(tasks[currentTaskNumber])
    }, [currentTaskNumber])
    const handleUserAnswer = (task: Task, option: Option) => {
        const changedTask = changeOption(task, option)
        const tasksTemp = tasks.map(currentTask => 
            task.id === currentTask.id ? changedTask : currentTask
        )
        setTasks(tasksTemp)
        setCurrentTask(changedTask)
    }
    const changeOption = (task: Task, option: Option): Task => ({
        ...task, 
        options: task.options.map(op => ({...op, isPicked: op.id === option.id})),
        userAnswer: option.id
    })
    const changeTask = (step: number) => {
        const newNumber = currentTaskNumber + step
        //Условия не дают уйти ниже 1ого и последнего вопроса теста
        if (newNumber < 0 || newNumber >= tasks.length){
            toast("Дальше некуда идти")
            return
        }
        setCurrentTaskNumber(currentTaskNumber + step)
    }
    if (!currentTask) return (<>
            <p>Загрузка...</p>
        </>)

    return(
    <div className="single-options-card">
        <div className="tasks">
            <ProgressBar currentTaskNumber={currentTaskNumber} total={tasks.length}/>
            <p>Задача {currentTaskNumber+1}/{tasks.length}</p>
            <TaskComponent task={currentTask} handleUserAnswer={handleUserAnswer} />
        </div>
        <div className="buttons-options">
            <Button buttonLabel={"Назад"} buttonFunction={() => changeTask(-1)} />
            {currentTaskNumber < tasks.length - 1 && (
                <Button buttonLabel={"Далее"} buttonFunction={() => changeTask(1)} />)}
            <Button buttonLabel={"Завершить тест"} buttonFunction={navigateToResults} />
        </div>
        
        <Toaster />
    </div>)
}