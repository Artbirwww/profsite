import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { BelbinQuestion, BelbinRoleEN, belbinRoleMapping, belbinRoles } from "./belbinData"
import { calculateBelbinDominantRoles, calculateBelbinParams } from "./BelbinResultsCalc"
import { TestResultRequest, TestResultResponse } from "../../../types/testTypes"
import toast, { Toaster } from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { TestItem } from "../TestsData"
import { formatDateRU } from "../../../services/dates/formatDate"
import { ProgressBar } from "../generalTemplates/progressBar/ProgressBar"

interface BelbinResultsProps {
    testInfo?: TestItem
    isViewMode: boolean
}

export const BelbinResults = () => {
    const location = useLocation()
    const { getToken } = useAuth()
    const groupQuestionsResult: BelbinQuestion[][] = location.state?.groupQuestionsResult
    const [balbinResults, setBalbinResults] = useState<TestResultResponse | null>(null)
    //if proprs not null then get result by this props 
    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false

    useEffect(() => {
        if (!isViewMode)
            return

        const psychTestTemp = location.state?.psychTest
        if (!psychTestTemp)
            return

        setBalbinResults(psychTestTemp)
    }, [])

    //when data is calculated send it to the server
    useEffect(() => {
        if (isViewMode)
            return

        if (groupQuestionsResult.length <= 0)
            return

        const sendBalbinResults = async () => {

            const calculatedResults = calculateBelbinParams(groupQuestionsResult)

            try {
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

            } catch (err) {
                console.error(err)
                toast.error("Не получилось сохранить данные теста")
            }
        }
        //if tests just downloaded from somewhere show the result but dont upload it again
        //component can be used at the and of test itself and for showing result 
        sendBalbinResults()
    }, [])
    const getReadableParamName = (paramName: string, paramsMap: Record<string, BelbinRoleEN>) => {
        return Object.keys(paramsMap).find(key => paramsMap[key] === paramName)
    }
    
    if (!balbinResults)
        return (<p>Загрузка...</p>)

    
    return (
        <div
            className="test-result-item">

            <div
                className="test-result-item-content-wrapper">

                <div>
                    <h1>Роли в команде. Ваши результаты:</h1>
                </div>

                <div>
                    <h4>Доминантные роли: </h4>
                    {calculateBelbinDominantRoles(balbinResults).map(param => (<>
                            <p>{getReadableParamName(param.name, belbinRoleMapping)} : {param.param}, {belbinRoles.find(role => role.name === param.name)?.description}</p>
                            <p></p>
                        </>
                    ))}
                </div>
                    <h4>Все результаты</h4>
                <div>
                    {balbinResults.psychParams.map(result => (
                        <span>{getReadableParamName(result.name, belbinRoleMapping)}: {result.param} / 20</span>
                    ))}
                </div>

                <span>Дата прохождения {formatDateRU(balbinResults?.createdAt)}</span>

            </div>
        </div>
    )

}