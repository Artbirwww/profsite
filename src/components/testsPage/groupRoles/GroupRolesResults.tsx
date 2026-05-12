import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { GroupRolesQuestion, groupRolesDataRoleEn, groupRolesDataRoleMapping, groupRoles } from "./groupRolesData"
import { calculateGroupRolesDominantRoles, calculateGroupRolesParams } from "./groupRolesResultsCalc"
import { PsychParam, TestResultRequest, TestResultResponse } from "../../../types/testTypes"
import toast, { Toaster } from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { TestItem } from "../TestsData"
import { formatDateRU } from "../../../services/dates/formatDate"
import { ProgressBar } from "../generalTemplates/progressBar/ProgressBar"
import "../css/testsResultStyles.css"
import { sortByParam } from "../utils/sortByParams"
import { Button } from "../../ui/reusable/button"
import { formatTime } from "../utils/formatTime"
import { ArrowLeft } from "lucide-react"
export const GroupRolesResults = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { getToken } = useAuth()

    const groupQuestionsResult: GroupRolesQuestion[][] = location.state?.groupQuestionsResult
    const [groupRolesResults, setGroupRolesResults] = useState<TestResultResponse | null>(null)

    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false

    useEffect(() => {
        if (!isViewMode)
            return

        if (!location.state?.psychTest)
            return
        setGroupRolesResults({
            ...location.state?.psychTest,
            psychParams: sortByParam(location.state?.psychTest.psychParams)
        })
    }, [])

    //when data is calculated send it to the server
    useEffect(() => {
        if (isViewMode)
            return

        if (groupQuestionsResult.length <= 0)
            return

        const sendGroupRolesResults = async () => {

            const calculatedResults = { ...calculateGroupRolesParams(groupQuestionsResult), completionTimeSeconds: location.state?.completionTimeSeconds }

            try {
                const token = getToken()

                if (!token) {
                    console.error("Authentification error")
                    return
                }

                if (!calculatedResults) {
                    console.error("Group roles tests data is null")
                    return
                }

                const createdTest = await testApi.createTest(token, calculatedResults)
                setGroupRolesResults({ ...createdTest, psychParams: sortByParam(createdTest.psychParams) })
                toast.success("Тест успешно пройден")

            } catch (err) {
                console.error(err)
                toast.error("Возникла ошибка при сохранении результатов, вы заполнили профиль ?", {
                    duration: 5000
                })
            }
        }
        //if tests just downloaded from somewhere show the result but dont upload it again
        //component can be used at the and of test itself and for showing result 
        sendGroupRolesResults()
    }, [])
    const getReadableParamName = (paramName: string, paramsMap: Record<string, groupRolesDataRoleEn>) => {
        return Object.keys(paramsMap).find(key => paramsMap[key] === paramName)
    }

    if (!groupRolesResults)
        return <>
            <p>Загрузка...</p>
            <Toaster />
        </>


    return (
        <>
            <div className="result-wrapper">

                <h3>Роли в команде. Ваши результаты:</h3>
                <div className="result-card">
                    <h4>Доминантные роли: </h4>
                    {calculateGroupRolesDominantRoles(groupRolesResults).map(param => (<>
                        <p><b>{getReadableParamName(param.name, groupRolesDataRoleMapping)}</b> : {param.param} баллов, Ваш тип {groupRoles.find(role => role.name === param.name)?.description}</p>
                        <p></p>
                    </>
                    ))}
                </div>

                <div className="result-card">
                    <h4>Все результаты: </h4>
                    {groupRolesResults.psychParams.map(result => (
                        <p>{getReadableParamName(result.name, groupRolesDataRoleMapping)}: {result.param} баллов {groupRoles.find(role => role.name === result.name)?.description}</p>
                    ))}
                </div>

                <span>Дата прохождения {formatDateRU(groupRolesResults?.createdAt)}</span>
                {groupRolesResults.completionTimeSeconds !== null && groupRolesResults.completionTimeSeconds !== 0 &&
                    <span>Пройдено за: {formatTime(Math.floor(groupRolesResults.completionTimeSeconds / 60))} : {formatTime(groupRolesResults.completionTimeSeconds % 60)}</span>
                }
                <div>
                    <Button label="Назад" icon={<ArrowLeft />} onClick={() => navigate("/my-results")} />
                </div>

            </div>
        </>
    )

}