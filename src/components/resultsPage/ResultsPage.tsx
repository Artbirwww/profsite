import { FC, useEffect, useState, ComponentType } from "react";
import { TestItem, testsList } from "../testsPage/TestsData";
import { useAuth } from "../../contexts/AuthContext";
import "./resultPage.css"
import { TemperamentResults } from "../testsPage/temperament/TemperamentResults";
import { BelbinResults } from "../testsPage/belbin/BelbinResults";
import { TestResultResponse, TestTypeName } from "../../types/testTypes";
import { testApi } from "../../services/api/testApi";
import { getActualTestByDate } from "./services/testSort";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
type testType = "Temperament" | "Group-Roles"
const testsResultPages: Record<testType, string> = {
    "Temperament": "/tests/temperament-results",
    "Group-Roles": "/tests/group-roles-results"
}
export const ResultsPage: FC = () => {
    //const [psychTest, setPsychTest] = useState<TestResultResponse | null>(null)
    const {getToken} = useAuth()
    const navigate = useNavigate()
    const handleSelectTest = async (selectedTest: TestItem) => {
        const TestResultComponent = testsResultPages[selectedTest.name as testType]
        try {
            const token = getToken()
            if (!token || !selectedTest.name) throw new Error("Can't load test")
            const psychTests = await testApi.getTestByType(token, selectedTest.name)

            const actualTest = getActualTestByDate(psychTests)
            const testTypeName = selectedTest.name as testType
            navigate(testsResultPages[testTypeName], {
                state: {
                    isViewMode: true,
                    psychTest: actualTest
                }
            })
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка при загрузке теста")
        }
    }

    return (
        <div>
            <h1>Results</h1>
            <div className="tests-container">
                {testsList.map(test => (
                    <div className="test-result-card" onClick={() => handleSelectTest(test)}>
                        <p>Тест: {test.label}</p>
                        <p>{test.description}</p>
                    </div>
                ))}
            </div>
            <Toaster />
        </div>
    )
}