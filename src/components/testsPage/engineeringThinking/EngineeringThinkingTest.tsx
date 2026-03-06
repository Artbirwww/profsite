import { useEffect, useState } from "react"
import {tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useNavigate } from "react-router-dom"
import { TestResultResponse } from "../../../types/testTypes"
export const EngineeringThinkingTest = () => {
    const [tasks, setTasks] = useState<Task[]>()
    const navigate = useNavigate()
    useEffect(()=> {
        const getTasksData = async () => {
            //В будущем можно подгружать данные тестов с сервера
            setTasks(tasksData as Task[])
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
    if (!tasks) return (<>
        <p>Загрузка...</p>
    </>)
    return (<>
        <SingleOptionsPicker tasks={tasks}  setTasks={handleTasksUpdate} navigateToResults={navigateToResults}/>
    </>)
}