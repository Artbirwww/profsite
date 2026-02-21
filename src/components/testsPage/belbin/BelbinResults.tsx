import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { BelbinQuestion } from "./belbinData"
import { calculateBelbinParams } from "./BelbinResultsCalc"
import { TestResultRequest } from "../../../types/testTypes"
import toast, { Toaster } from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"

export const BelbinResults = () => {
    const location = useLocation()
    const {getToken} = useAuth()
    const groupQuestionsResult:BelbinQuestion[][] = location.state?.groupQuestionsResult
    const [balbinResults, setBalbinResults] = useState<TestResultRequest | null>(null)
    useEffect(() => {
        if (groupQuestionsResult.length > 0) {
            console.log(groupQuestionsResult)
            console.log(calculateBelbinParams(groupQuestionsResult))
            setBalbinResults(calculateBelbinParams(groupQuestionsResult))
        }
    }, [])
    useEffect(() => {
        const sendBalbinResults = async () => {
            try {
                console.log("Отправка теста")
                const token = getToken()
                if (!token) {
                    console.error("Authentification error")
                    return
                }
                if (!balbinResults) {
                    console.error("Balbin tests data is null")
                    return
                }
                const data = await testApi.createTest(token, balbinResults)
                toast.success("Тест успешно пройден")
            } catch(err) {
                console.error(err)
                toast.error("Не получилось сохранить данные теста")
            }
        }
        sendBalbinResults()
    }, [balbinResults])
    if (!groupQuestionsResult || !balbinResults) return <p>Загрузка...</p>
    return(<>
        <p>Belbin Results</p>
        {balbinResults.psychParams.map(result => (
            <p>{result.name}: {result.param}/20</p>
        ))}
        <Toaster/>
    </>)
}