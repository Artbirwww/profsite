import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { Task } from "../../testsPage/generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { VRTest } from "../../../types/vrTests/VRTest"
import toast, { Toaster } from "react-hot-toast"
import { vrTestApi } from "../../../services/api/vrTestsApi"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { formatDateRU } from "../../../services/dates/formatDate"
import { formatTime } from "../../testsPage/utils/formatTime"
import "./scss/vr-tests-results.scss"
const defaultTestType = "profession-evaluation"
export const VRTestResults = () => {
    const {profession, professionId} = useParams<{profession: string, professionId:string}>()
    const location = useLocation()
    const navigate = useNavigate()

    const {getToken} = useAuth()
    const [completedTests, setCompletedTests] = useState<VRTest[]>()
    const [isLoading, setIsLoading] = useState(true);

    const [expandedTestId, setExpandedTestId] = useState<number | null>(null);

    useEffect(() => {
        if (!location.state)
            return
        console.log(location.state)
        const createTest = async () => {
            try {
                console.log('Location state:', location.state);
                
                const results = location.state.results;
                const complitionTimeSeconds = location.state.complitionTimeSeconds;

                // Safely map answers with validation
                const answers = results.map((task: any) => {
                    // Validate userAnswer
                    const userAnswer = task.userAnswer;
                    const options = task.options || [];
                    
                    // Check if userAnswer is valid
                    if (!userAnswer || userAnswer < 1 || userAnswer > options.length) {
                        console.warn('Invalid userAnswer:', userAnswer, 'for task:', task.id);
                        return {
                            questionText: task.text || 'Unknown question',
                            answerText: 'Not answered'
                        };
                    }
                    
                    // Get the selected option
                    const selectedOption = options.find((opt: any) => opt.id === userAnswer);
                    
                    return {
                        questionText: task.text || 'Unknown question',
                        answerText: selectedOption?.text || 'Not answered'
                    };
                });
                const data: VRTest = {
                    completionTimeSeconds: complitionTimeSeconds || 0,
                    professionId: Number(professionId),
                    typeName: defaultTestType,
                    answers: answers
                };

                await vrTestApi.createTest(getToken(), data);
                toast.success('Тест успешно сохранен!');

                // Load updated tests
                const completedTestsTemp = await vrTestApi.getMyTestsByProfessionId(getToken(), professionId);
                setCompletedTests(completedTestsTemp);
                
                // Navigate to clear state
                navigate(`/vr-tests/${profession}/${professionId}/results`, { replace: true });
                
            } catch (err) {
                console.error('Error saving test:', err);
                toast.error('Возникла ошибка при сохранении теста');
                const completedTestsTemp = await vrTestApi.getMyTestsByProfessionId(getToken(), professionId);
                setCompletedTests(completedTestsTemp);
            } finally {
                setIsLoading(false);
            }
        };
        createTest()
    }, [])
    // Load existing tests when no state (direct navigation)
    useEffect(() => {
        if (location.state) return;

        const loadTests = async () => {
            try {
                console.log('Loading existing tests...');
                const completedTestsTemp = await vrTestApi.getMyTestsByProfessionId(getToken(), professionId);
                setCompletedTests(completedTestsTemp);
            } catch (err) {
                console.error('Error loading tests:', err);
                toast.error('Возникла ошибка при получении тестов');
            } finally {
                setIsLoading(false);
            }
        };

        loadTests();
    }, []);
    const toggleExpand = (testId: number) => {
        setExpandedTestId(expandedTestId === testId ? null : testId);
    };

    if (isLoading) {
        return <NoResults message="Загрузка..." variant="loading" />;
    }

    if (!completedTests || completedTests.length === 0) {
        return <NoResults message="Где же ваши тесты..." variant="empty" />;
    }

    return (
        <div className="results-page">
            <div className="results-header">
                <h1>Результаты VR-тестов</h1>
                <p className="subtitle">
                    Профессия: <strong>{profession || 'Все'}</strong>
                </p>
                <p className="test-count">Всего пройдено: {completedTests.length}</p>
            </div>

            <div className="results-wrapper">
                {completedTests.map((test, index) => (
                    <div key={test.id} className="result-card">
                        <div className="result-header">
                            <div className="result-info">
                                <span className="result-id">Тест #{index+1}</span>
                                <span className="result-date">
                                    {formatDateRU(test.createdAt || new Date().toISOString())}
                                </span>
                            </div>
                            <div className="result-meta">
                                <span className="result-time">
                                    {formatTime(test.completionTimeSeconds)} сек.
                                </span>
                                <span className="result-answers-count">
                                    {test.answers.length} ответов
                                </span>
                            </div>
                        </div>

                        <button 
                            className="toggle-details-btn"
                            onClick={() => toggleExpand(test.id!)}
                        >
                            {expandedTestId === test.id ? 'Скрыть ответы' : 'Показать ответы'}
                        </button>

                        {expandedTestId === test.id && (
                            <div className="result-details">
                                <div className="answers-list">
                                    {test.answers.map((answer, index) => (
                                        <div key={index} className="answer-item">
                                            <div className="answer-question">
                                                <span className="answer-number">{index + 1}.</span>
                                                <span>{answer.questionText}</span>
                                            </div>
                                            <div className="answer-text">
                                                <span className="answer-label">Ответ:</span>
                                                <span className="answer-value">{answer.answerText}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Toaster />
        </div>
    );
}