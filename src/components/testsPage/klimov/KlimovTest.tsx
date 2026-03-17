import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"

export const KlimovTest = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<Task[]>()

    useEffect(() => {
        const getTasksData = async () => {
            setTasks(tasksData as Task[])
        }
        getTasksData()
    }, [])
    const handleTasksUpdate = (tasks: Task[]) => {
        setTasks(tasks)
    }
    const navigateToResults = () => {
        navigate("/tests/professional-orientation-klimov-results", {
            state: {
                klimovTasks: tasks
            }
        })
        return
    }

    if (!tasks)
        return (<p>загрузка...</p>)

    return (
        <SingleOptionsPicker
            tasks={tasks}
            setTasks={handleTasksUpdate}
            navigateToResults={navigateToResults}
            classType={"type-2"} />

    )
}