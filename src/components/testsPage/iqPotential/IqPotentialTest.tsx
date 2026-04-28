import { useEffect, useState } from "react"
import { Option, SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { ArrowRight } from "lucide-react"
import axios from "axios"
import { getBaseUrl } from "../../../services/api/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
import { TestFormConfig, TestFormSelection } from "../generalTemplates/formSelection/TestFormSelection"

const IQ_FORMS: TestFormConfig<Task>[] = [
    { id: "iqTestFormA", label: "Форма A", data: [] },
    { id: "iqTestFormB", label: "Форма B", data: [] },
]

export const iqTestPath = "public/iq_potential/data"
const initialSeconds = 720

export const IqPotentialTest = () => {
    const navigate = useNavigate()

    const { start, minutes, remaningSeconds, seconds } = useTimer(initialSeconds)

    const [iqTestForm, setIqTestForm] = useState<Task[] | undefined>(undefined)

    useEffect(() => {
        if (!iqTestForm) return
        start()
    }, [iqTestForm])

    const generateOptions = (count: number): Option[] => Array.from({ length: count }, (_, num) => ({
        id: num + 1,
        text: (num + 1).toString(),
        isPicked: false
    }))

    const handleSelect = async (formName: string) => {
        try {
            const response = await axios.get(`${getBaseUrl()}/${iqTestPath}/${formName}.json`)
            const tasks = response.data[formName].questions as Task[]

            setIqTestForm(tasks.map(task => ({
                ...task,
                options: generateOptions(6)
            })))

        } catch (err) {
            console.error(err)
            toast.error("Возникла ошибка, проверьте интернет соединение")
        }
    }

    const navigateToResults = () => {
        navigate("/tests/iq-potential-results", {
            state: {
                tasks: iqTestForm,
                completionTimeSeconds: initialSeconds - seconds
            }
        })
    }

    if (!iqTestForm) {
        return <TestFormSelection forms={IQ_FORMS} onSelect={handleSelect} />
    }

    return (<>
        <div className="float-timer">
            {formatTime(minutes)} : {formatTime(remaningSeconds)}
        </div>

        <SingleOptionsPicker
            navigateToResults={navigateToResults}
            tasks={iqTestForm}
            setTasks={setIqTestForm}
            pickerStyleType={"squeezed"}
            optionStyleType={"row"} />
    </>)
}