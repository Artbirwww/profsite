import { FC, useEffect, useState, ComponentType } from "react";
import { TestItem, testsList } from "../testsPage/TestsData";
import { useAuth } from "../../contexts/AuthContext";
import "./resultPage.css";
import { TestResultResponse, TestTypeName } from "../../types/testTypes";
import { testApi } from "../../services/api/testApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
      if (!selectedTest.pathResults) {
        console.error(`Путь к тесту ${selectedTest.name} не найден`)
        toast.error(`Путь к тесту ${selectedTest.name} не найден`)
        return
      }
      navigate(selectedTest.pathResults, {
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
