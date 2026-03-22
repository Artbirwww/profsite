import { useEffect, useState } from "react"
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useLocation, useNavigate } from "react-router-dom"
import { TestItem } from "../TestsData"
import { calculateResults } from "./engineeringThinkingResultsCalc"
import { TestResultResponse } from "../../../types/testTypes"
import toast, { Toaster } from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { useAuth } from "../../../contexts/AuthContext"
import engineerLevelsData from "./engineerLevels.json"
import { EngineerLevels, Level } from "./engineerThinkingTypes"
import { PupilResponse } from "../../../types/pupil/pupil"
import { pupilApi } from "../../../services/api/pupilApi"
import { Button } from "../../ui/reusable/button"
import { formatTime } from "../utils/formatTime"
export const EngineeringThinkingResults = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const [result, setResult] = useState<TestResultResponse>()
    const [pupilLevel, setPupilLevel] = useState<Level>()
    const engineerLevels = engineerLevelsData as EngineerLevels[]

    const [pupilData, setPupilData] = useState<PupilResponse>()

    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false

    useEffect(() => {
        //Если все подгружено найти описание результатов пользователя
        if (!pupilData || !result) return
        const resultParam = result?.psychParams[0].param
        const levelTemp = engineerLevels.find(engineer => engineer.gender === pupilData?.pupilDTO.gender)
                            ?.levels.find(level => resultParam >= level.min && resultParam <= level.max)
        setPupilLevel(levelTemp)
    }, [pupilData, result])
    useEffect(() => {
        if (!isViewMode)
            return
        const loadResult = async () => {
            const pupilDataTemp = await pupilApi.getPupilData(getToken())
            const testTemp = location.state?.psychTest
            if (!testTemp)
                return
            setResult(testTemp)
            setPupilData(pupilDataTemp)
        }
        loadResult()
    }, [])

    useEffect(() => {
        if (isViewMode)
            return

        const createTest = async () => {

            const engineerThinkingTestResult = {...calculateResults(location.state?.tasks), completionTimeSeconds: location.state?.completionTimeSeconds}
            console.log(engineerThinkingTestResult)
            try {
                const createdTest = await testApi.createTest(getToken(), engineerThinkingTestResult)
                const pupilDataTemp = await pupilApi.getPupilData(getToken())
                setResult(createdTest)
                setPupilData(pupilDataTemp)

            } catch (err) {
                console.error(err)
                toast.error("Возникла ошибка при сохранении результатов, вы заполнили профиль ?")
            }
        }
        createTest()
    }, [])

    if (!result || !pupilData) return (<>
        <p>Загрузка ваших результатов...</p>
        <Toaster/>
    </>)

    return (<div>
            <h3>Ваш уровень инженерного мышления:  {result.psychParams[0].param} из 70 баллов</h3>
            <div className="result-wrapper" >
                <div className="result-card">
                    <h4>Ваш результат: </h4>
                    {pupilLevel && 
                    <>
                        <p>{pupilLevel.description}</p>
                        <p>{pupilLevel.techCapabilities}</p>
                    </>
                    }
                </div>
                <div className="result-card-wrapper">
                    <div className="result-card">
                        <h4>Юноши (старше 18 лет)</h4>
                        <div className="gender-card">Меньше 26 Очень низкий</div>
                        <div className="gender-card">27 - 32 Низкий</div>
                        <div className="gender-card">33 - 38 Средний</div>
                        <div className="gender-card">39 - 47 Высокий</div>
                        <div className="gender-card">Больше 48 Очень высокий</div>
                    </div>
                    <div className="result-card">
                        <h4>Девушки (старше 18 лет)</h4>
                            <div className="gender-card">Меньше 17 Очень низкий</div>
                            <div className="gender-card">18 - 22 Низкий</div>
                            <div className="gender-card">23 - 27 Средний</div>
                            <div className="gender-card">28 - 34 Высокий</div>
                            <div className="gender-card">Больше 35 Очень высокий</div>
                    </div>
                </div>
                <p>Дата прохождения: {result?.createdAt}</p>
                {result.completionTimeSeconds !== null && result.completionTimeSeconds !== 0 &&
                    <span>Пройдено за: {formatTime(Math.floor(result.completionTimeSeconds / 60))} : {formatTime(result.completionTimeSeconds % 60)} из 25:00</span>} 
                <Button buttonLabel="Назад" buttonFunction={() => navigate("/my-results")}/>
            </div>
            
    </div>)
}