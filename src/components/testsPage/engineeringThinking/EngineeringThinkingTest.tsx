import { useEffect, useState } from "react"
import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useNavigate } from "react-router-dom"
import { useTestStore } from "../TestStore"

export const EngineeringThinkingTest = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<Task[]>()

    const setTotalNumber = useTestStore((store) => store.setTotalNumber)

    useEffect(() => {
        const getTasksData = async () => {
            //В будущем можно подгружать данные тестов с сервера
            setTasks(tasksData as Task[])

            setTotalNumber(tasksData.length)
        }
        getTasksData()
    }, [])

    const handleTasksUpdate = (tasks: Task[]) => {
        setTasks(tasks)
    }

    const navigateToResults = () => {
        navigate("/tests/engineering-thinking-results", {
            state: {
                tasks: tasks
            }
        })
    }
    if(!tasks)
        return (
            <p>Загрузка...</p>
        )

    return (
        <div
            className="test-viewer-container">

            <SingleOptionsPicker
                tasks={tasks}
                setTasks={handleTasksUpdate}
                navigateToResults={navigateToResults} />
        </div>

    )

    
}