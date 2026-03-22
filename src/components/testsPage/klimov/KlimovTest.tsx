import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"

export const KlimovTest = () => {
    const navigate = useNavigate()
    const {start, minutes, remaningSeconds, seconds} = useTimer(0, false)

    const [tasks, setTasks] = useState<Task[]>()

    useEffect(() => {
        const getTasksData = async () => {
            setTasks(tasksData as Task[])
        }
        getTasksData()
    }, [])
    useEffect(() => {
        start()
    }, [tasks])
    const handleTasksUpdate = (tasks: Task[]) => {
        setTasks(tasks)
    }
    const navigateToResults = () => {
        navigate("/tests/professional-orientation-klimov-results", {
            state: {
                klimovTasks: tasks,
                completionTimeSeconds: seconds
            }
        })
        return
    }

    if (!tasks)
        return (<p>загрузка...</p>)

    return (
        <div className="test-timer-wrapper">
            <div className="float-timer">
                {formatTime(minutes)} : {formatTime(remaningSeconds)}
            </div>
        
            <SingleOptionsPicker
                tasks={tasks}
                setTasks={handleTasksUpdate}
                navigateToResults={navigateToResults}
                classType={"type-2"} />
        </div>

    )
}