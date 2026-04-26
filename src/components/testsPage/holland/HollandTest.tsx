import { useEffect, useState } from "react"
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import toast, { Toaster } from "react-hot-toast"
import api, { getBaseUrl } from "../../../services/api/api"
export const HollandTest = () => {
    const [task, setTasks] = useState<Task[]>()
    useEffect(() => {
        const loadHollandTestData = async () => {
            try {
                const response = await api.get(`${getBaseUrl()}/public/prof_klimov/data/profKlimovFormA.json`)
                console.log(response.data)
                //setTasks(response.data)
            } catch(err) {
                console.error(err)
                toast("Ошибка при загрузке данных теста")
            }
        }
    }, [])
    return (<>
        <p>Holland</p>
        <Toaster />
    </>
        
    )
}