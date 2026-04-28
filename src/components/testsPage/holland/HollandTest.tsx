import { useEffect, useState } from "react"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import toast, { Toaster } from "react-hot-toast"
import api, { getBaseUrl } from "../../../services/api/api"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
import { HollandProfession } from "./hollandTypes"

export const HollandTest = () => {
    const navigate = useNavigate()
    const {start, minutes, remaningSeconds, seconds} = useTimer(0, false)

    const [tasks, setTasks] = useState<Task[]>()
    useEffect(() => {
        const loadHollandTestData = async () => {
            try {
                const response = await api.get(`${getBaseUrl()}/public/prof_holland/data/profHollandFormA.json`)
                setTasks(response.data.data as Task[])
            } catch(err) {
                console.error(err)
                toast("Ошибка при загрузке данных теста")
            }
        }
        loadHollandTestData()
    }, [])
    useEffect(() => {
        start()
    }, [tasks])
    const navigateToResults = () => {
        navigate("/tests/prof-holland-results", {
            state: {
                hollandTasks: tasks,
                completionTimeSeconds: seconds
            }
        })
    }
    if (!tasks) 
        return (<p>Загрузка...</p>)
    return (<>
        <div className="float-timer">
            {formatTime(minutes)} : {formatTime(remaningSeconds)}
        </div>

        <SingleOptionsPicker 
            tasks={tasks} 
            setTasks={setTasks} 
            navigateToResults={navigateToResults}
            pickerStyleType={"squeezed"}
            optionStyleType={"column"}/>
        <Toaster />
    </>
        
    )
}