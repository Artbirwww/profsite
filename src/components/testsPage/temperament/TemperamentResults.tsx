import "../css/testResultStyle.css"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { PsychTestRequest, PsychTestResponse } from "../../../testApi"
import { calculateParams } from "./temperamentResultCalc"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useAuth } from "../../../contexts/AuthContext"
import { testApi } from "../../../services/api/testApi"
import toast, { Toaster } from "react-hot-toast"

/**
 * TODO
 * 1. Запросить с сервака данные о темперамента пользователя
 * 2. Вызвать функцию подсчета результатов с данных сервера
 * 3. Отобразить то, что подсчиталось пользователю
 * 
 */
export const TemperamentResults = () => {
    const location = useLocation()
    const { getToken } = useAuth()
    const [psychTest, setPsychTest] = useState<PsychTestRequest | null>(null)
    const navigationOptions: TemperamentOption[] = location.state?.options || []
    const temperamentFormData: TemperamentOption[] = location.state?.temperamentForm === 'A' ? TemperamentFormA : TemperamentFormB

    useEffect(() => {
        if (navigationOptions.length > 0) {
            setPsychTest(calculateParams(navigationOptions, 0, temperamentFormData))
            return
        }
    }, [])

    useEffect(() => {
        const createTest = async () => {
            try {
                const token = getToken()
                if (!token || !psychTest) return
                const responseData = await testApi.createTest(token, psychTest)
            } catch (err) {
                console.error(err)
                toast.error("Не удалось связаться с сервером, повторите попытку позже")
            }
        }
        createTest()

    }, [psychTest])

    if (psychTest)
        return (
            <div className="test-result-wrapper">
                <h3>Результаты теста темперамента</h3>

                {psychTest.psychParams.map(param => (
                    <p>{param.name} : {param.param}</p>
                ))}
            </div>
        )

    return (
        <p>Загрузка...</p>
    )

}