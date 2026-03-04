import "../../css/testResultStyle.css";
import "./temperamentResults.css"

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  calculateParams,
  calculateTemperament,
} from "../temperamentResultCalc";
import {
  TemperamentFormA,
  TemperamentFormB,
  TemperamentOption,
  TemperamentType,
} from "../temperamentData";
import { useAuth } from "../../../../contexts/AuthContext";
import { testApi } from "../../../../services/api/testApi";
import toast, { Toaster } from "react-hot-toast";
import {
  TestResultRequest,
  TestResultResponse,
} from "../../../../types/testTypes";
import { TestItem } from "../../TestsData";
import { getActualTestByDate } from "../../../resultsPage/services/testSort";
import { formatDateRU } from "../../../../services/dates/formatDate";

/**
 * TODO
 * 1. Запросить с сервака данные о темперамента пользователя
 * 2. Вызвать функцию подсчета результатов с данных сервера
 * 3. Отобразить то, что подсчиталось пользователю
 *
 */
interface TemperamentResultsProps {
  testInfo?: TestItem;
  isViewMode: boolean;
}
export const TemperamentResults = () => {
  const location = useLocation();
  const { getToken } = useAuth();
  const [psychTest, setPsychTest] = useState<TestResultResponse | null>(null);
  const [temperamentType, setTemperamentType] = useState<TemperamentType>();
  const navigationOptions: TemperamentOption[] = location.state?.options || [];
  const temperamentFormData: TemperamentOption[] =
    location.state?.temperamentForm === "A"
      ? TemperamentFormA
      : TemperamentFormB;

  const isViewMode = location.state?.isViewMode
    ? location.state?.isViewMode
    : false;

  useEffect(() => {
    if (!isViewMode) return;
    const psychTestTemp = location.state?.psychTest;
    if (!psychTestTemp) return;
    setPsychTest(psychTestTemp);
  }, []);

  useEffect(() => {
    if (isViewMode) return;
    if (!navigationOptions || navigationOptions.length <= 0) return;
    const createTest = async () => {
      const psychTestTemp = calculateParams(
        navigationOptions,
        0,
        temperamentFormData,
      );
      try {
        const token = getToken();
        if (!token || !psychTestTemp) return;
        const createdTest = await testApi.createTest(token, psychTestTemp);
        setPsychTest(createdTest);
      } catch (err) {
        console.error(err);
        toast.error("Не удалось связаться с сервером, повторите попытку позже");
      }
    };
    createTest();
  }, []);
  useEffect(() => {
    if (!psychTest) return;
    setTemperamentType(calculateTemperament(psychTest));
  }, [psychTest]);
  if (!psychTest || !temperamentType) return <p>Загрузка</p>;
  if (psychTest && temperamentType)
    return (
      <div className="test-result-wrapper">
        <h3>Результаты теста на темперамент</h3>
        <div className="card">
          <p><b>Набранные баллы</b></p>
          {psychTest.psychParams.map((param) => (
            <p>
              {param.name} : {param.param}
            </p>
          ))}
        </div>
        <div className="card">
          <p> <b>Итог: Вы {temperamentType.name}</b></p>
          <p>{temperamentType.shortDescription}</p>
          <p>{temperamentType.description}</p>
        </div>
        <div className="card">
          <p><b>Вам свойственно проявлять:</b> </p>
          <ul>
            {temperamentType.traits.map((trait) => (
              <li>{trait}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <p><b>Профессии которые могут вам подойти:</b> </p>
          <ul>
            {temperamentType.professions.map((profession) => (
              <li>{profession}</li>
            ))}
          </ul>
        </div>

        <p>Дата прохождения: {formatDateRU(psychTest?.createdAt)}</p>
      </div>
    );
};
