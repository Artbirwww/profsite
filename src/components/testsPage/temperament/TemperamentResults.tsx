import "../css/testsCommonResultsStyles.css"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { calculateParams, calculateTemperament } from "./temperamentResultCalc"
import { TemperamentFormA, TemperamentFormB, TemperamentOption, TemperamentType } from "./temperamentData"
import { useAuth } from "../../../contexts/AuthContext"
import { testApi } from "../../../services/api/testApi"
import toast, { Toaster } from "react-hot-toast"
import { TestResultRequest, TestResultResponse } from "../../../types/testTypes"
import { TestItem } from "../TestsData"
import { getActualTestByDate } from "../../resultsPage/services/testSort"
import { formatDateRU } from "../../../services/dates/formatDate"

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
				toast.error("Не удалось связаться с сервером, повторите попытку позже")
			}
		}

		createTest()
	}, [])

	useEffect(() => {
		if (!psychTest) return

		setTemperamentType(calculateTemperament(psychTest))
	}, [psychTest])
	if (!psychTest || !temperamentType)
		return <p>Загрузка</p>
		
	return (
		<div
			className="test-result-grid-container">

			<div
				className="test-result-item">

				<div
					className="test-result-item-content-wrapper">

					<div>
						<h1>Набранные баллы</h1>
					</div>

					<div>
						{psychTest.psychParams.map((param) => (
							<span>{param.name}: {param.param}</span>
						))}
					</div>

				</div>

			</div>

			<div
				className="test-result-item">

				<div
					className="test-result-item-content-wrapper">

					<div>
						<h1>Итог: Вы {temperamentType.name}</h1>
					</div>

					<div>
						<span>{temperamentType.shortDescription}</span>
						<span>{temperamentType.description}</span>
					</div>

				</div>

			</div>

			<div
				className="test-result-item">

				<div
					className="test-result-item-content-wrapper">

					<div>
						<h1>Вам свойственно проявлять:</h1>
					</div>

					<div>
						{temperamentType.traits.map((trait) => (
							<span>{trait}</span>
						))}
					</div>

				</div>


			</div>

			<div
				className="test-result-item">

				<div
					className="test-result-item-content-wrapper">

					<div>
						<h1>Профессии которые могут вам подойти:</h1>
					</div>

					<div>
						{temperamentType.professions.map((profession) => (
							<span>{profession}</span>
						))}
					</div>

				</div>

			</div>

			<span>Дата прохождения: {formatDateRU(psychTest?.createdAt)}</span>
		</div>
	)
}
