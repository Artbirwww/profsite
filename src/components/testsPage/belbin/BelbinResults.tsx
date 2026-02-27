import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { BelbinQuestion } from "./belbinData"
import { calculateBelbinParams } from "./BelbinResultsCalc"
import { TestResultRequest, TestResultResponse } from "../../../types/testTypes"
import toast, { Toaster } from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { TestItem } from "../TestsData"
import { formatDateRU } from "../../../services/dates/formatDate"
interface BelbinResultsProps {
    testInfo?: TestItem
    isViewMode: boolean
}
export const BelbinResults = () => {
    const location = useLocation()
    const {getToken} = useAuth()
    const groupQuestionsResult:BelbinQuestion[][] = location.state?.groupQuestionsResult
    const [balbinResults, setBalbinResults] = useState<TestResultResponse | null>(null)
    //if proprs not null then get result by this props 
    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false
    useEffect(() => {
        if (!isViewMode) return
        const psychTestTemp = location.state?.psychTest
        if (!psychTestTemp) return
        setBalbinResults(psychTestTemp)
    }, [])
    
    //when data is calculated send it to the server
    useEffect(() => {
        if (isViewMode) return
        if (groupQuestionsResult.length <= 0) return
        const sendBalbinResults = async () => {
            const calculatedResults = calculateBelbinParams(groupQuestionsResult)
            try {
                console.log("Отправка теста")
                const token = getToken()
                if (!token) {
                    console.error("Authentification error")
                    return
                }
                if (!calculatedResults) {
                    console.error("Balbin tests data is null")
                    return
                }
                const createdTest = await testApi.createTest(token, calculatedResults)
                setBalbinResults(createdTest)
                toast.success("Тест успешно пройден")
            } catch(err) {
                console.error(err)
                toast.error("Не получилось сохранить данные теста")
            }
        }
        //if tests just downloaded from somewhere show the result but dont upload it again
        //component can be used at the and of test itself and for showing result 
        sendBalbinResults()
    }, [])
    if (!balbinResults) return <p>Загрузка...</p>
    return(<>
        <p>Belbin Results</p>
        {balbinResults.psychParams.map(result => (
            <p>{result.name}: {result.param}/20</p>
        ))}
        <p>Дата прохождения {formatDateRU(balbinResults?.createdAt)}</p>
        <Toaster/>
    </>)
}