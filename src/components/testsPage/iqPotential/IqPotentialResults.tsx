import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import axios from "axios"
import { getBaseUrl } from "../../../services/api/api"
import { iqTestPath } from "./iqPotentialTest"
import { calcIqTestResult, calcIqTestScore } from "./IqPotentialResultsCalc"
import { pupilApi } from "../../../services/api/pupilApi"
import { usePupilData } from "../hooks/usePupilData"
import toast from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"

export const IqPotentialResults = () => {
    const location = useLocation()
    const {getToken} = useAuth()
    const {pupilData, isLoading, getBirthdayDate} = usePupilData()
    const [result, setResult] = useState<TestResultResponse>()
    const isViewMode = location.state?.isViewMode ? location.state.isViewMode : false

    useEffect(()=> {
        if (isViewMode) return
        if (!pupilData) return 
        const loadResult = async () => {
            try {

            //completed tasks with answers and userAnswers
            const iqTasks = location.state.tasks 
            //all metrix for result
            const iqTableData = (await axios.get(`${getBaseUrl()}/${iqTestPath}/iqData.json`)).data 
            //full years (for more accurrate result)
            const birthday =  getBirthdayDate(pupilData)
            //16 by default (if there is no birthday or more then 16 years)
            const age = birthday !== undefined  ? new Date().getFullYear() - birthday.getFullYear() : 16 
            const testScore = calcIqTestScore(iqTasks)
            const resultTemp = await testApi.createTest(getToken(),calcIqTestResult(iqTableData.iqTable[age][testScore], location.state?.completionTimeSeconds))
            setResult(resultTemp)
            console.log(resultTemp)
            }
            catch(err) {
                console.error(err)
                toast.error("Возникла ошибка при подсчете результатов")
            }
        }
        loadResult()
        
    }, [pupilData])
    if (!pupilData || !result) return (<p>Загрузка</p>)
    return (<>
        <h3>Результаты теста интеллектуального потенциала: </h3>
        <p>Балл с последнего прохождения: {result.psychParams[0].param}</p>
    </>)
}