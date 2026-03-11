import { useEffect, useState } from "react"
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useLocation } from "react-router-dom"
import { TestItem } from "../TestsData"
import { calculateResults } from "./engineeringThinkingResultsCalc"
import { TestResultResponse } from "../../../types/testTypes"
import toast from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { useAuth } from "../../../contexts/AuthContext"

export const EngineeringThinkingResults = () => {
    const location = useLocation()
    const { getToken } = useAuth()
    const [result, setResult] = useState<TestResultResponse>()

    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false

    useEffect(() => {
        if (!isViewMode)
            return

        const testTemp = location.state?.psychTest
        if (!testTemp)
            return

        setResult(testTemp)
    }, [])

    useEffect(() => {
        if (isViewMode)
            return

        const createTest = async () => {

            const engineerThinkingTestResult = calculateResults(location.state?.tasks)

            try {
                /**
                 * TODO
                 *     - Допилить в режим просмотра результатов 
                 *     - Сохранить тест и проверить используемые параметр 
                 *     - Протестировать на результаты
                 */
                const createdTest = await testApi.createTest(getToken(), engineerThinkingTestResult)
                setResult(engineerThinkingTestResult)

            } catch (err) {
                console.error(err)
                toast.error("Возникла ошибка при сохранения результатов")
            }
        }

        createTest()
    }, [])

    if (!result) return (<>
        <p>Загрузка ваших результатов...</p>
    </>)

    return (<>
        <div className="test-result-wrapper">
            <p>Ваш уровень инженерного мышления:  {result.psychParams[0].param}</p>
        </div>
    </>)
}