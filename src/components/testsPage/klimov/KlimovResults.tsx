import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import toast from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { calculateResults } from "./klimovResultsCalc"
import { klimovTypeTranslate } from "./klimovTypes"

export const KlimovResults = () => {
    const location = useLocation()
    const { getToken } = useAuth()
    const [result, setResult] = useState<TestResultResponse>()

    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false
    useEffect(() => {
        if (!isViewMode) return
        const testDataTemp = location.state?.psychTest
        if (!testDataTemp) return
        setResult(testDataTemp)
    }, [])

    useEffect(() => {
        if (isViewMode) return
        const createTest = async () => {
            const klimovResult = calculateResults(location.state?.klimovTasks)
            try {
                const createdTest = await testApi.createTest(getToken(), klimovResult)
                setResult(createdTest)
            } catch (err) {
                console.error(err)
                toast.error("Возникла ошибка при сохранении результатов")
            }
        }
        createTest()
    }, [])

    if (!result)
        return (<p>загрузка...</p>)

    return (<>
        <div>
            {result.psychParams.map(param => (
                <p>{`${klimovTypeTranslate[param.name]} : ${param.param}`}</p>
            ))}
        </div>
        <p>Дата прохождения: {result.createdAt}</p>
    </>)
}