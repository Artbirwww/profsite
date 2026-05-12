import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import axios from "axios"
import { getBaseUrl } from "../../../services/api/api"
import { calcIqTestResult, calcIqTestScore } from "./IqPotentialResultsCalc"
import { pupilApi } from "../../../services/api/pupilApi"
import { usePupilData } from "../hooks/usePupilData"
import toast from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { formatDateRU } from "../../../services/dates/formatDate"
import { Moon, Clock, Droplet, Repeat, MessageCircleQuestion, ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "../../ui/reusable/button"
import { formatTime } from "../utils/formatTime"
const iqTestPath = "public/iq_potential/data"
export const IqPotentialResults = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const { pupilData, isLoading, getBirthdayDate } = usePupilData()
    const [result, setResult] = useState<TestResultResponse>()

    const isViewMode = location.state?.isViewMode ? location.state.isViewMode : false

    const [allResults, setAllResults] = useState<TestResultResponse[]>()
    const [showHistory, setShowHistory] = useState(false)

    const loadTestResults = async () => {
        //Просто закроем окно
        if (showHistory) {
            setShowHistory(false)
            return
        }
        //Не нужно грузить повторно
        if (allResults && !showHistory) {
            setShowHistory(true)
            return
        }
        try {
            const results = await testApi.getTestsByType(getToken(), "Intellectual-Potential")
            setAllResults(results)
            setShowHistory(true)
        } catch (err) {
            console.error(err)
            toast.error("Произошла ошибка при загрузке теста")
        }
    }

    useEffect(() => {
        if (!isViewMode) return

        try {
            const loadTestResult = async () => {
                const resultTemp = location.state.psychTest
                setResult(resultTemp)
            }
            loadTestResult()
        } catch (err) {
            console.error(err)
            toast.error("Произошла ошибка при загрузке теста")
        }

    })
    useEffect(() => {
        if (isViewMode) return
        if (!pupilData) return
        const loadResult = async () => {
            try {

                //completed tasks with answers and userAnswers
                const iqTasks = location.state.tasks
                //all metrix for result
                const iqTableData = (await axios.get(`${getBaseUrl()}/${iqTestPath}/iqData.json`)).data
                //full years (for more accurrate result)
                const birthday = getBirthdayDate(pupilData)
                //16 by default (if there is no birthday or more then 16 years)
                const age = birthday !== undefined && birthday.getFullYear() <= 16 ? new Date().getFullYear() - birthday.getFullYear() : 16
                const testScore = calcIqTestScore(iqTasks)
                const resultTemp = await testApi.createTest(getToken(), calcIqTestResult(iqTableData.iqTable[age][testScore], location.state?.completionTimeSeconds))
                setResult(resultTemp)
                console.log(resultTemp)
            }
            catch (err) {
                console.error(err)
                toast.error("Возникла ошибка при подсчете результатов")
            }
        }
        loadResult()

    }, [pupilData])
    if (!pupilData || !result) return (<p>Загрузка</p>)
    return (<>

        <div className="result-wrapper">
            <div className="result-card">
                <h3>Результаты теста интеллектуального потенциала: </h3>
                <p>Балл с последнего прохождения: <b>{result.psychParams[0].param}</b></p>
                <div className="history-content-wrapper">
                    <div className="detailed-title">
                        <p>Подробнее</p>
                        <ChevronDown className={`rotate-item ${showHistory ? "rotated" : ""}`} onClick={() => loadTestResults()} />
                    </div>

                    <div className={`history-content ${showHistory ? "visible" : ""}`}>
                        {showHistory && allResults &&
                            <p><b>Средний Балл: {Math.round(allResults?.reduce((total, res) => total + res.psychParams[0].param, 0) / allResults?.length)}</b></p>
                        }
                        {showHistory && allResults && allResults.map(res => (
                            <div className="history-card">
                                <p><b>{res.psychParams[0].param} Баллов</b></p>
                                <p>Время - {`${formatTime(Math.floor(res.completionTimeSeconds / 60))}:${formatTime(res.completionTimeSeconds % 60)}`} Дата - {formatDateRU(res.createdAt)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="result-card">
                <div className="detailed-title">
                    <h3>На заметку</h3>
                    <MessageCircleQuestion />
                </div>
                <p>Ваш интеллект не меняется день ото дня, а вот концентрация, утомляемость и эмоциональный фон — да. Этот тест фиксирует вашу текущую продуктивность. Низкий результат сегодня — это повод отдохнуть. Исследования подтверждают: многократное прохождение в разных состояниях дает более объективную картину, чем один замер.</p>
            </div>
            <div className="test-result-grid">
                <div className="result-card">
                    <Moon />
                    <p> <b>Высыпайтесь</b> - даже легкое недосыпание снижает скорость обработки информации на 10–15% по данным исследований когнитивной психологии.</p>
                </div>
                <div className="result-card">
                    <Clock />
                    <p> <b>Выбирайте время </b> - пик умственной работоспособности у большинства людей приходится на первую половину дня, через 2–3 часа после пробуждения.</p>
                </div>
                <div className="result-card">
                    <Droplet />
                    <p> <b>Следите за гидратацией и глюкозой</b> - мозг потребляет около 20% всей энергии организма; голод или обезвоживание напрямую влияют на концентрацию.</p>
                </div>
                <div className="result-card">
                    <Repeat />
                    <p> <b>Пробуйте снова</b> - повторное прохождение снижает тревожность и дает более точную картину ваших реальных способностей. Один замер — это не истина.</p>
                </div>
            </div>
            <p>Дата последнего прохождения: {formatDateRU(result.createdAt)}</p>
            <div>
                <Button label="Назад" icon={<ArrowLeft />} onClick={() => navigate("/my-results")} />
            </div>

        </div>

    </>)
}