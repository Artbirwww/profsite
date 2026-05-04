import "./css/testIntroStyles.css"

import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import api, { getBaseUrl } from "../../services/api/api"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/reusable/button"
import { ArrowRight } from "lucide-react"

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

export const TestIntro = ({ testDescriptionPath, testNavigation }: TestIntroProps) => {
    const navigate = useNavigate()
    const [description, setDescription] = useState<TestDescription>()

    useEffect(() => {
        const loadTestDescription = async () => {
            try {
                const response = await api.get(`${getBaseUrl()}/${testDescriptionPath}`)
                const descriptioTemp = response.data
                setDescription(descriptioTemp)

            } catch (err) {
                console.log(err)
                toast.error("Ошибка при загрузке данных")
            }
        }
        loadTestDescription()
    }, [])

    if (!description) {
        return <p>Загрузка описания теста...</p>
    }

    return (<>
        <div className="page-header">
            <h1>{description.title}</h1>
        </div>

        <div className="intro-wrapper">
            <div className="intro-container">
                <div className="intro-description">
                    <span>{description.fullDescription}</span>
                </div>

                <div className="intro-time-hint">
                    {description.timeHint &&
                        <span>Времени на выполнение: {description.timeHint}</span>}
                </div>

                <div className="intro-options">
                    <Button label="Начать тест" icon={<ArrowRight />} onClick={() => navigate(testNavigation)} />
                </div>
            </div>
        </div>
    </>)
}