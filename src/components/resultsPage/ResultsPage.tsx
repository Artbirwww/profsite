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
  "Intellectual-Potential": "/tests/iq-potential-results",
  "Professional-Orientation": ""
};
export const ResultsPage: FC = () => {
  //const [psychTest, setPsychTest] = useState<TestResultResponse | null>(null)
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [completedTests, setCompletedTests] = useState<TestItem []>([])
  const [recentTests, setRecentTests] = useState<Record<string, TestResultResponse>>([])
  useEffect(() => {
    console.log(completedTests)
  }, [completedTests])
  useEffect(()=>{
    const getAvailableTests = async () => {
      try {
        const token = getToken()
        const recentTestsTemp = await testApi.getRecentTests(token)
        setRecentTests(recentTestsTemp)
        setCompletedTests(testsList.filter((testItem => testItem.name in recentTestsTemp)))
      } catch(err) {
        toast.error("Не удалось загрузить пройденные тесты")
      }
    }
    getAvailableTests()
  }, [])
  const handleSelectTest = async (selectedTest: TestItem) => {
    try {
      const testTypeName = selectedTest.name as testType;
      navigate(testsResultPages[testTypeName], {
        state: {
          isViewMode: true,
          psychTest: recentTests[selectedTest.name],
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
      <h1>Результаты</h1>
      <div className="tests-container">
        {completedTests.map((test) => (
          <div
            className="test-result-card"
            onClick={() => handleSelectTest(test)}
          >
            
            <div className="test-result-title">
              
              <test.icon />
              <h3>{test.label}</h3>
            </div>
            <p>{test.description}</p>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};
