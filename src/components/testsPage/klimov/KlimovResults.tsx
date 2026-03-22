import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { calculateResults } from "./klimovResultsCalc"
import { KlimovProfession, klimovTypeTranslate } from "./klimovTypes"
import "../css/testsResultStyles.css"
import { sortByParam } from "../utils/sortByParams"
import klimovProfessionsData from "./klimovProfessions.json"
import { Button } from "../../ui/reusable/button"
import { formatTime } from "../utils/formatTime"
export const KlimovResults = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const [result, setResult] = useState<TestResultResponse>()
    //Описание профессий
    const klimovProfessions = klimovProfessionsData as KlimovProfession[]

    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false
    useEffect(() => {
        if (!isViewMode) return
        const testDataTemp = location.state?.psychTest
        if (!testDataTemp) return
        setResult({
            ...testDataTemp, 
            psychParams: sortByParam(testDataTemp.psychParams)
        })
    }, [])

    useEffect(() => {
        if (isViewMode) return
        const createTest = async () => {
            const klimovResult = {...calculateResults(location.state?.klimovTasks), completionTimeSeconds: location.state?.completionTimeSeconds}
            try {
                const createdTest = await testApi.createTest(getToken(), klimovResult)
                setResult({
                    ...createdTest, 
                    psychParams: sortByParam(createdTest.psychParams)
                })
            } catch (err) {
                console.error(err)
                toast.error("Возникла ошибка при сохранении результатов, вы заполнили профиль ?", {
                    duration: 5000
                })
            }
        }
        createTest()
    }, [])
    if (!result) return <>
        <p>Загрузка...</p>
        <Toaster/>
    </>
    return (<>
        <div className="result-wrapper">
            <h3>Склонности к профессиям результат: </h3>

                {result.psychParams.map(param => (
                    <div className="result-card">
                        {param.param >= 5 ? 
                            <p><b>{`${klimovTypeTranslate[param.name]} : ${param.param}`}</b></p> : 
                            <p>{`${klimovTypeTranslate[param.name]} : ${param.param}`}</p>}
                        <p>{klimovProfessions.find(prof => prof.name === param.name)?.description}</p>
                        <p>{klimovProfessions.find(prof => prof.name === param.name)?.traits}</p>
                    </div>
                ))}

            <p>Дата прохождения: {result.createdAt}</p>
            {result.completionTimeSeconds !== null && result.completionTimeSeconds !== 0 &&
                <span>Пройдено за: {formatTime(Math.floor(result.completionTimeSeconds / 60))} : {formatTime(result.completionTimeSeconds % 60)}</span>
            }
            <Button buttonLabel="Назад" buttonFunction={() => navigate("/my-results")}/>
        </div>
        
    </>)
}