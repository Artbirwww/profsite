import { useEffect, useState } from "react"
import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
const initialSeconds = 1500
export const EngineeringThinkingTest = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<Task[]>()
    const { start, stop, minutes, remaningSeconds, seconds } = useTimer(initialSeconds)
    useEffect(() => {
        const getTasksData = async () => {
            setTasks(tasksData as Task[])
            start()
        }
        getTasksData()
    }, [])
    //Форсим окончание теста если время вышло
    useEffect(() => {
        if (seconds !== 0) return
        navigateToResults()
    }, [seconds])

    const handleTasksUpdate = (tasks: Task[]) => {
        setTasks(tasks)
    }

    const navigateToResults = () => {
        navigate("/tests/engineering-thinking-results", {
            state: {
                tasks: tasks,
                completionTimeSeconds: initialSeconds - seconds //Узнаем сколько прошло с начала теста
            }
        })
    }
    if (!tasks)
        return (<p>pагрузка...</p>)

    return (<>
        <div className="float-timer">
            {formatTime(minutes)}:{formatTime(remaningSeconds)}
        </div>

        <SingleOptionsPicker
            tasks={tasks}
            setTasks={handleTasksUpdate}
            navigateToResults={navigateToResults}
            pickerStyleType={"extended"}
            optionStyleType={"column"}/>
    </>)
}