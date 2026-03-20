import "../css/testsResultStyles.css"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { calculateParams, calculateTemperament, getScorebyName } from "./temperamentResultCalc"
import { temeperamentParamLabels, TemperamentFormA, TemperamentFormB, TemperamentOption, TemperamentParam, TemperamentType } from "./temperamentData"
import { useAuth } from "../../../contexts/AuthContext"
import { testApi } from "../../../services/api/testApi"
import toast, { Toaster } from "react-hot-toast"
import { TestResultRequest, TestResultResponse } from "../../../types/testTypes"
import { TestItem } from "../TestsData"
import { getActualTestByDate } from "../../resultsPage/services/testSort"
import { formatDateRU } from "../../../services/dates/formatDate"
import { EysenckCircle } from "./EysenckCircle"
import { EysenckScales } from "./EysenckScales"
import { Button } from "../../ui/reusable/button"

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
	const navigate = useNavigate()

	const { getToken } = useAuth()

	const [psychTest, setPsychTest] = useState<TestResultResponse | null>(null)
	const [temperamentType, setTemperamentType] = useState<TemperamentType>()

	const navigationOptions: TemperamentOption[] = location.state?.options || []
	const temperamentFormData: TemperamentOption[] = location.state?.temperamentForm === "A" ? TemperamentFormA : TemperamentFormB

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
			const psychTestTemp = calculateParams(navigationOptions, 0, temperamentFormData,)

			try {
				const token = getToken()
				if (!token || !psychTestTemp) return

				const createdTest = await testApi.createTest(token, psychTestTemp)

				setPsychTest(createdTest)

			} catch (err) {
				console.error(err)
				toast.error("Возникла ошибка при сохранении результатов, вы заполнили профиль ?", {
                    duration: 5000
                })
			}
		}

		createTest()
	}, [])

	useEffect(() => {
		if (!psychTest) return

		setTemperamentType(calculateTemperament(psychTest))
	}, [psychTest])

	const ext = psychTest?.psychParams.find(p => p.name === "extrav_introver_score")?.param || 0
	const neu = psychTest?.psychParams.find(p => p.name === "neirotizm_score")?.param || 0

	if (!psychTest || !temperamentType)
		return <>
			<p>Загрузка</p>
			<Toaster/>
		</>
		
	return (
		<div className="test-result-grid">
			<div className="test-result-grid-item result-grid-item-1">
				<EysenckCircle extraversion={ext} neuroticism={neu} />
			</div>

			<div className="test-result-grid-item result-grid-item-2">
				<EysenckScales params={psychTest.psychParams} />
			</div>

			<div className="test-result-grid-item result-grid-item-3">
				
				<div className="test-result-item-content">
					<div className="item-content-label">
						{temperamentType.name}:
					</div>
					<div className="item-content-description">
						<p>{temperamentType.shortDescription}</p>
						<p>{temperamentType.description}</p>
					</div>
				</div>

				<div className="test-result-item-content">
					<div className="item-content-label">
						Cвойственно проявлять:
					</div>
					<div className="item-content-description">
						{temperamentType.traits.map((trait) => (
							<span>{trait}</span>
						))}
					</div>
				</div>

				<div className="test-result-item-content">
					<div className="item-content-label">
						Подходящие профессии:
					</div>
					<div className="item-content-description">
						{temperamentType.professions.map((profession) => (
							<span>{profession}</span>
						))}
					</div>
				</div>

				<div className="test-result-item-content">
					<span>Дата прохождения: {formatDateRU(psychTest?.createdAt)}</span>
					<Button buttonLabel="Назад" buttonFunction={() => navigate("/my-results")}/>
				</div>
			</div>
		</div>
	)
}
