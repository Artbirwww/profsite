import { FC, useEffect, useState, ComponentType } from "react";
import { TestItem, testsList } from "../testsPage/TestsData";
import { useAuth } from "../../contexts/AuthContext";
import "./resultPage.css";
import { TemperamentResults } from "../testsPage/temperament/TemperamentResults";
import { BelbinResults } from "../testsPage/groupRoles/GroupRolesResults";
import { TestResultResponse, TestTypeName } from "../../types/testTypes";
import { testApi } from "../../services/api/testApi";
import { getActualTestByDate } from "./services/testSort";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
type testType = "Temperament" | "Group-Roles" | "Engineering-Thinking";
const testsResultPages: Record<TestTypeName, string> = {
  "Temperament": "/tests/temperament-results",
  "Group-Roles": "/tests/group-roles-results",
  "Engineering-Thinking" : "/tests/engineering-thinking-results", 
  "Professional-Orientation-Klimov": "/tests/professional-orientation-klimov-results",
  "Intellectual-Potential": "",
  "Professional-Orientation": ""
};
export const ResultsPage: FC = () => {
  //const [psychTest, setPsychTest] = useState<TestResultResponse | null>(null)
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [completedTests, setCompletedTests] = useState<TestItem []>([])
  useEffect(() => {
    console.log(completedTests)
  }, [completedTests])
  useEffect(()=>{
    const getAvailableTests = async () => {
      try {
        const token = getToken()
        const completedTestsByUser = await testApi.getTestsByPupil(token)
        setCompletedTests(testsList
          .filter((test) =>  test !== null && completedTestsByUser.some(completedTest => completedTest.testTypeName === test.name)))
      } catch(err) {
        toast.error("Не удалось загрузить пройденные тесты")
      }
    }
    getAvailableTests()
  }, [])
  const handleSelectTest = async (selectedTest: TestItem) => {
    const TestResultComponent = testsResultPages[selectedTest.name as testType];
    try {
      const token = getToken();
      if (!token || !selectedTest.name) throw new Error("Can't load test");
      const psychTests = await testApi.getTestsByType(token, selectedTest.name);
      console.log(psychTests)
      const actualTest = getActualTestByDate(psychTests);
      const testTypeName = selectedTest.name as testType;
      navigate(testsResultPages[testTypeName], {
        state: {
          isViewMode: true,
          psychTest: actualTest,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Возникла ошибка при загрузке теста");
    }
  };
  if (!completedTests) return (
    <>
      <p>Загрузка...</p>
    </>
  )

  return (
    <div className="results-wrapper">
      <h1>Results</h1>
      <div className="tests-container">
        {completedTests.map((test) => (
          <div
            className="test-result-card"
            onClick={() => handleSelectTest(test)}
          >
            <p>Тест: {test.label}</p>
            <p>{test.description}</p>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};
