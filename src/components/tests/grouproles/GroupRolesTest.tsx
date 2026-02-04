import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  groupQuestions, 
  belbinAnswerMapping, 
  belbinRoleNames, 
  belbinRoleDescriptions 
} from './GroupQuestions';

interface TestResult {
  id: string;
  testId: string;
  userId: string;
  scores: number[];
  maxScores: number[];
  timeSpent: number;
  completedAt: string;
  metadata: {
    roleNames: string[];
    roleDescriptions: string[];
  };
}

const testApi = {
  saveTestResult: async (result: Omit<TestResult, 'id'>): Promise<void> => {
    console.log('Сохранение результатов:', result);
    return new Promise(resolve => setTimeout(resolve, 100));
  }
};

interface QuestionState {
  id: number;
  value: number;
}

const GroupRolesTest: React.FC = () => {
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [scores, setScores] = useState<number[]>(Array(8).fill(0));
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  
  useEffect(() => {
    const initialQuestions = groupQuestions.slice(0, 8).map((q, index) => ({
      id: q.id,
      value: 0
    }));
    setQuestions(initialQuestions);
  }, []);
  
  useEffect(() => {
    if (currentSection >= 1 && currentSection <= 7) {
      const startIndex = (currentSection - 1) * 8;
      const endIndex = startIndex + 8;
      const sectionQuestions = groupQuestions.slice(startIndex, endIndex);
      
      const newQuestions = sectionQuestions.map((q, index) => {
        const existingQuestion = questions.find(item => item.id === q.id);
        return {
          id: q.id,
          value: existingQuestion?.value || 0
        };
      });
      
      setQuestions(newQuestions);
    }
  }, [currentSection]);
  
  useEffect(() => {
    const sum = questions.reduce((acc, q) => acc + q.value, 0);
    setTotalScore(sum);
  }, [questions]);
  
  const handleQuestionChange = (index: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[index].value = value;
    setQuestions(newQuestions);
  };
  
  const handleNextSection = () => {
    if (totalScore !== 10) {
      alert('Общая сумма баллов должна быть равна 10!');
      return;
    }
    
    const mapping = belbinAnswerMapping[currentSection];
    const newScores = [...scores];
    
    mapping.forEach((roleIndex, questionIndex) => {
      newScores[roleIndex] += questions[questionIndex].value;
    });
    
    setScores(newScores);
    
    const resetQuestions = questions.map(q => ({ ...q, value: 0 }));
    setQuestions(resetQuestions);
    
    if (currentSection < 7) {
      setCurrentSection(prev => prev + 1);
    } else {
      completeTest(newScores);
    }
  };
  
  const completeTest = async (finalScores: number[]) => {
    setTimerRunning(false);
    setIsCompleted(true);
    
    const maxScore = Math.max(...finalScores);
    const normalizedMaxScore = Math.ceil(maxScore / 5) * 5;
    
    const testResult: Omit<TestResult, 'id'> = {
      testId: 'group-roles-belbin',
      userId: localStorage.getItem('userId') || 'unknown',
      scores: finalScores,
      maxScores: Array(8).fill(normalizedMaxScore),
      timeSpent: timeElapsed,
      completedAt: new Date().toISOString(),
      metadata: {
        roleNames: belbinRoleNames,
        roleDescriptions: belbinRoleDescriptions
      }
    };
    
    try {
      await testApi.saveTestResult(testResult);
      console.log('Результаты теста сохранены');
    } catch (error) {
      console.error('Ошибка при сохранении результатов:', error);
    }
  };
  
  const handleTimeUpdate = useCallback((time: number) => {
    setTimeElapsed(time);
  }, []);
  
  const TestTimer: React.FC<{ isRunning: boolean; onTimeUpdate: (time: number) => void }> = ({ 
    isRunning, 
    onTimeUpdate 
  }) => {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      
      if (isRunning) {
        interval = setInterval(() => {
          setSeconds(prev => {
            const newTime = prev + 1;
            onTimeUpdate(newTime);
            return newTime;
          });
        }, 1000);
      }
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isRunning, onTimeUpdate]);
    
    const formatTime = (totalSeconds: number) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    return (
      <div>
        <span>Время: {formatTime(seconds)}</span>
      </div>
    );
  };
  
  const getCurrentQuestions = () => {
    const startIndex = (currentSection - 1) * 8;
    return groupQuestions.slice(startIndex, startIndex + 8);
  };
  
  const renderQuestions = () => {
    const currentQuestionTexts = getCurrentQuestions();
    
    return (
      <div>
        {questions.map((question, index) => (
          <div key={question.id}>
            <div>
              <span>Вопрос {index + 1}</span>
              <span>Баллов: {question.value}</span>
            </div>
            <p>{currentQuestionTexts[index].text}</p>
            <div>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={question.value}
                onChange={(e) => handleQuestionChange(index, parseInt(e.target.value))}
              />
              <div>
                <span>0</span>
                <span>10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderResults = () => {
    const maxScore = Math.max(...scores);
    const normalizedMaxScore = Math.ceil(maxScore / 5) * 5;
    
    return (
      <div>
        <h2>Результаты теста Белбина</h2>
        <p>
          Ваши предпочтительные роли в команде (от наиболее выраженной к наименее):
        </p>
        
        <div>
          {scores
            .map((score, index) => ({ score, index }))
            .sort((a, b) => b.score - a.score)
            .map((item, rank) => (
              <div key={item.index}>
                <div>
                  <h3>
                    {rank + 1}. {belbinRoleNames[item.index]}
                  </h3>
                  <span>{item.score} баллов</span>
                </div>
                <div>
                  <div 
                    style={{ 
                      width: `${(item.score / normalizedMaxScore) * 100}%`
                    }} 
                  />
                </div>
                <p>
                  {belbinRoleDescriptions[item.index]}
                </p>
              </div>
            ))}
        </div>
        
        <div>
          <p>Время выполнения: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</p>
          <button onClick={() => navigate('/tests')}>
            Вернуться к списку тестов
          </button>
        </div>
      </div>
    );
  };
  
  if (isCompleted) {
    return renderResults();
  }
  
  return (
    <div>
      <div>
        <h1>Тест групповых ролей (Белбин)</h1>
        <p>
          Распределите 10 баллов между утверждениями в каждой группе.
          Чем больше баллов вы даете утверждению, тем лучше оно описывает ваше поведение.
        </p>
      </div>
      
      <div>
        <div>
          <span>Секция {currentSection} из 7</span>
          <div>
            <div 
              style={{ 
                width: `${(currentSection / 7) * 100}%`
              }} 
            />
          </div>
        </div>
        
        <div>
          <TestTimer 
            isRunning={timerRunning} 
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
        
        <div>
          <div>
            Общая сумма баллов: {totalScore}/10
          </div>
        </div>
      </div>
      
      <hr />
      
      {renderQuestions()}
      
      <div>
        <button
          onClick={() => {
            if (currentSection > 1) {
              setCurrentSection(prev => prev - 1);
            } else {
              navigate('/tests');
            }
          }}
        >
          {currentSection > 1 ? 'Назад' : 'Выйти'}
        </button>
        
        <button
          onClick={handleNextSection}
          disabled={totalScore !== 10}
        >
          {currentSection < 7 ? 'Далее' : 'Завершить тест'}
        </button>
      </div>
    </div>
  );
};

export default GroupRolesTest;