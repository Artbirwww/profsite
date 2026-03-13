import { useEffect, useState } from "react"
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useLocation } from "react-router-dom"
import { TestItem } from "../TestsData"
import { calculateResults } from "./engineeringThinkingResultsCalc"
import { TestResultResponse } from "../../../types/testTypes"
import toast from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { useAuth } from "../../../contexts/AuthContext"
import { ProgressBar } from "../generalTemplates/progressBar/ProgressBar"
import './css/results.css'
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
            <p>Ваш уровень инженерного мышления:  {result.psychParams[0].param} / 70</p>
            <ProgressBar currentTaskNumber={result.psychParams[0].param} total={70} />
            <div className="gender-results-wrapper">
                <div className="results">
                    <h4>Юноши</h4>
                    <div className="gender-card">Меньше 26 Очень низкий</div>
                    <div className="gender-card">27 - 32 Низкий</div>
                    <div className="gender-card">33 - 38 Средний</div>
                    <div className="gender-card">39 - 47 Высокий</div>
                    <div className="gender-card">Больше 48 Очень высокий</div>
                </div>
                <div className="results">
                    <h4>Девушки</h4>
                        <div className="gender-card">Меньше 17 Очень низкий</div>
                        <div className="gender-card">18 - 22 Низкий</div>
                        <div className="gender-card">23 - 27 Средний</div>
                        <div className="gender-card">28 - 34 Высокий</div>
                        <div className="gender-card">Больше 35 Очень высокий</div>
                </div>
            </div>
        </div>
    </>)
}