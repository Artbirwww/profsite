import { useEffect, useState } from "react"
import { Option, SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { ArrowRight } from "lucide-react"
import axios from "axios"
import api, { getBaseUrl } from "../../../services/api/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
export const iqTestPath = "public/iq_potential/data"
const initialSeconds = 720
export const IqPotentialTest = () => {
    const navigate = useNavigate()
    const {start, minutes, remaningSeconds, seconds} = useTimer(initialSeconds)
    const [iqTestForm, setIqTestForm] = useState<Task[] | undefined>(undefined)
    useEffect(()=>{
        if (!iqTestForm) return
        start()
    }, [iqTestForm])
    const handleSelect = (formName: string) => {
        const loadFormData = async() => {
            try {
                const response = await axios.get(`${getBaseUrl()}/${iqTestPath}/${formName}.json`)
                const tasks = response.data[formName].questions as Task[]
                setIqTestForm(tasks.map(task => ({...task, options: generateOptions(6)})))
            } catch(err) {
                console.error(err)
                toast.error("Возникла ошибка, проверьте интернет соединение")
            }
        }
        loadFormData()
    }
    const generateOptions = (count: number): Option[] => Array.from({length: count}, (_, num) => ({
        id: num + 1,
        text: (num + 1).toString(),
        isPicked: false
    }))
    const navigateToResults = () => {
        navigate("/tests/iq-potential-results", {
            state: {
                tasks: iqTestForm,
                completionTimeSeconds: initialSeconds - seconds
            }
        })
    }
    if (!iqTestForm) return (
            <div className="test-form-selection-grid">

                <div className="test-form-selection-grid-item" onClick={() => handleSelect("iqTestFormA")}>
                    <div className="test-form-selection-name">
                        <h4>Форма A</h4>
                    </div>

                    <div className="test-form-selection-option">
                        <div className="test-form-selection-icon">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

                <div className="test-form-selection-grid-item" onClick={() => handleSelect("iqTestFormB")}>
                    <div className="test-form-selection-name">
                        <h4>Форма B</h4>
                    </div>

                    <div className="test-form-selection-option">
                        <div className="test-form-selection-icon">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

            </div>
        )
    return (<>
    <div className="test-timer-wrapper">
        <div className="float-timer">
            {formatTime(minutes)}:{formatTime(remaningSeconds)}
        </div>
        <SingleOptionsPicker navigateToResults={navigateToResults} tasks={iqTestForm} setTasks={setIqTestForm} optionsListClass="test-card-list-row" />
    </div>
    </>)
}