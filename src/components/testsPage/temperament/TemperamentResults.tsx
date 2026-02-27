import "../css/testResultStyle.css"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { calculateParams } from "./temperamentResultCalc"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useAuth } from "../../../contexts/AuthContext"
import { testApi } from "../../../services/api/testApi"
import toast, { Toaster } from "react-hot-toast"
import { TestResultRequest, TestResultResponse } from "../../../types/testTypes"
import { TestItem } from "../TestsData"
import { getActualTestByDate } from "../../resultsPage/services/testSort"
import { formatDateRU } from "../../../services/dates/formatDate"

/**
 * TODO
 * 1. Запросить с сервака данные о темперамента пользователя
 * 2. Вызвать функцию подсчета результатов с данных сервера
 * 3. Отобразить то, что подсчиталось пользователю
 * 
 */
interface TemperamentResultsProps {
    testInfo?: TestItem
    isViewMode: boolean
}
export const TemperamentResults = () => {
    const location = useLocation()
    const { getToken } = useAuth()
    const [psychTest, setPsychTest] = useState<TestResultResponse | null>(null)
    const navigationOptions: TemperamentOption[] = location.state?.options || []
    const temperamentFormData: TemperamentOption[] = location.state?.temperamentForm === 'A' ? TemperamentFormA : TemperamentFormB

    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false
    
    useEffect(() => {
        if (!isViewMode) return
        const psychTestTemp = location.state?.psychTest
        if (!psychTestTemp) return 
        setPsychTest(psychTestTemp)
    }, [])

    useEffect(() => {
        if (isViewMode) return
        if (!navigationOptions || navigationOptions.length <= 0) return
        const createTest = async () => {
            const psychTestTemp = calculateParams(navigationOptions, 0, temperamentFormData)
            try {
                const token = getToken()
                if (!token || !psychTestTemp) return
                const createdTest = await testApi.createTest(token, psychTestTemp)
                setPsychTest(createdTest)
            } catch (err) {
                console.error(err)
                toast.error("Не удалось связаться с сервером, повторите попытку позже")
            }
        }
        createTest()
    }, [])
    if (!psychTest) return <p>Загрузка</p>
    if (psychTest)
        return (
            <div className="test-result-wrapper">
                <h3>Результаты теста темперамента</h3>

                {psychTest.psychParams.map(param => (
                    <p>{param.name} : {param.param}</p>
                ))}
                <p>Дата прохождения: {formatDateRU(psychTest?.createdAt)}</p>
            </div>
        )

}