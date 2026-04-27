import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import api, { getBaseUrl } from "../../services/api/api"
import { useNavigate } from "react-router-dom"
import "./css/testIntroStyles.css"
interface TestIntroProps {
    testDescriptionPath: string,
    testNavigation: string
}
interface TestDescription {
    testId: string,
    title: string,
    summary: string,
    fullDescription: string,
    timeHint: string
}
export const TestIntro = ({testDescriptionPath, testNavigation}: TestIntroProps) => {
    const navigate = useNavigate()
    const [description, setDescription] = useState<TestDescription>()

    useEffect(() => {

        const loadTestDescription = async () => {
            try {
                const response = await api.get(`${getBaseUrl()}/${testDescriptionPath}`)
                const descriptioTemp = response.data
                setDescription(descriptioTemp)
            } catch(err) {
                console.log(err)
                toast.error("Ошибка при загрузке данных")
            }
        }
        loadTestDescription()
    }, [])
    if (!description) {
        return (<>
            <p>Загрузка описания теста...</p>
        </>)
    }
    return (<>
        <div className="intro-card">
            <h3>{description.title}</h3>
            <p>{description.fullDescription}</p>
            {description.timeHint && <p>Времени на выполнение: {description.timeHint}</p>}
            <button onClick={() => navigate(testNavigation)}>Начать</button>
        </div>
        <Toaster/>
    
    </>
        
    )
    
}