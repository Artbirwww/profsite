import { Toaster } from "react-hot-toast"
import "./singleOptionsPicker.css"
import { Button } from "../../../ui/reusable/button"
export interface Task {
    id: number
    taskNumber: number
    text: string
    options: Option[]
    imageUrl?: string
    answer: number
    userAnswer: number
}
interface Option {
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
    const handleUserAnswer = (task: Task, option: Option) => {
        const tasksTemp = tasks.map(currentTask => 
            task.id === currentTask.id ? changeOption(task, option) : currentTask
        )
        setTasks(tasksTemp)
    }
    const changeOption = (task: Task, option: Option): Task => ({
        ...task, 
        options: task.options.map(op => ({...op, isPicked: op.id === option.id})),
        userAnswer: option.id
    })
    return(
    <div className="single-options-picker">
        <div className="tasks">
            {tasks.map(task => (
                <div className="task" key={task.id}>
                    <p><b>Задача номер {task.taskNumber}</b></p>
                    <p>{task.text}</p>
                    <img src={task.imageUrl} />
                    <ol>
                        {task.options.map(option => (
                            <li className={`option ${option.isPicked ? "picked" : ""}`}
                                onClick={() => handleUserAnswer(task, option)}>
                                    {option.text}
                            </li>
                        ))}
                    </ol>
                    
                </div>
            ))}
        </div>
        <Button 
            buttonLabel={"Завершить тест"}
            buttonFunction={navigateToResults} />
        <Toaster />
    </div>)
}