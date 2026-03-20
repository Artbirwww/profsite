import { useEffect, useState } from "react"
import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useNavigate } from "react-router-dom"
import "../css/timer.css"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
export const EngineeringThinkingTest = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<Task[]>()
    const {start, stop, minutes, remaningSeconds, seconds} = useTimer(1500)
    useEffect(() => {
        const getTasksData = async () => {
            setTasks(tasksData as Task[])
            start()
        }
        getTasksData()
    }, [])
    //Форсим окончание теста если время вышло
    useEffect(()=> {
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
                complitionTimeSeconds: minutes * 60 + remaningSeconds
            }
        })
    }
    if (!tasks)
        return (<p>pагрузка...</p>)

    return (
        <div style={{position: "relative"}}>
            <div className="float-timer-wrapper">
                <p>{formatTime(minutes)}:{formatTime(remaningSeconds)}</p>
            </div>
            <SingleOptionsPicker
                tasks={tasks}
                setTasks={handleTasksUpdate}
                navigateToResults={navigateToResults}
                classType={"type-1"} />
        </div>
    )
}