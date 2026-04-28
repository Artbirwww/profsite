import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import toast, { Toaster } from "react-hot-toast"
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { HollandProfession, HollandTask } from "./hollandTypes"
import api, { getBaseUrl } from "../../../services/api/api"
import { testApi } from "../../../services/api/testApi"
import { sortByParam } from "../utils/sortByParams"

export const HollandResults = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {getToken} = useAuth()

    const [result, setResult] = useState<TestResultResponse>()
    const [hollandProfessions, setHollandProfessions] = useState<HollandProfession[]>()
    const isViewMode = location.state?.isViewMode ? location.state?.isViewMode : false

    useEffect(() => {
        const loadProfessions = async() => {
            try {
                const response = await api.get(`${getBaseUrl()}/public/prof_holland/data/profHollandTypes.json`)
                setHollandProfessions(response.data as HollandProfession[])
            } catch(err) {
                console.error(`Ошибка при загрузке профессий ${err}`)
                toast.error("Проверьте интернет соединение")
            }
        }
        loadProfessions()
    }, [])
    useEffect(() => {
        if (!isViewMode) return
        const psychTestData = location.state?.psychTest
        if (!psychTestData) return
        setResult({...psychTestData, psychParams: sortByParam(psychTestData.psychParams)})
    }, [])
    useEffect(() => {
        if (isViewMode) return
        const saveResults = async () => {
            try {
                const resultsTemp = {...calculateResults(location.state.hollandTasks as HollandTask[]), 
                    completionTimeSeconds: location.state?.completionTimeSeconds}
                const token = getToken()
                const createdTest = await testApi.createTest(token, resultsTemp)
                console.log(createdTest)
                setResult({
                    ...createdTest,
                    psychParams: sortByParam(createdTest.psychParams)
                })
            } catch(err) {
                console.error(err)
                toast.error("Возникла ошибка при сохранении результатов")
            }
        }
        saveResults()
    }, [])

    const calculateResults = (answers: HollandTask[]) => {
        const stats =  answers.reduce<Record<string, number>>((acc, question) => {
            const selectedOption = question.options.find(opt => opt.id === question.userAnswer)
            if (selectedOption?.type) 
                acc[selectedOption.type] = (acc[selectedOption.type] || 0) + 1
            return acc

        }, {})
        const resultsArray =  Object.entries(stats).map(([name, param]) => ({name, param}))
        return {
            testTypeName: "Professional-Orientation-Holland",
            psychParams: resultsArray
        }
    }
    if (!result || !hollandProfessions) return (<>
        <p>Загрузка теста...</p>
    </>)
    const renderProfessionCard = (param: { name: string; param: number }, profession: HollandProfession) => {
        const isHigh = param.param >= 10
        
        return (
            <div key={param.name} className="result-card">
                {isHigh ? (
                    <b><p>{profession.title}: {param.param}</p></b>
                ) : (
                    <p>{profession.title}: {param.param}</p>
                )}
                
                <p>{profession.short}</p>
                <p>{profession.description}</p>
                <p><strong>Подходящие профессии:</strong> {profession.suitable_professions}</p>
                <p><strong>Ключевые качества:</strong> {profession.traits}</p>
            </div>
        )
    }
    return (<>
        <div className="result-wrapper" style={{overflowX: "scroll", height: "100%"}}>
            {result.psychParams.map((param) => {
                const profession = hollandProfessions.find(prof => prof.name === param.name)
                if (!profession) return
                return renderProfessionCard(param, profession)
            })}
        </div>
        <Toaster/>
    </>)

}