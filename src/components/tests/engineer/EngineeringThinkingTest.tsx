import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from '../../ui/display/SimpleIcons';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Progress } from '../../ui/feedback/SimpleProgress';
import { testData } from './EngineerQuestions';

interface EngineeringThinkingTestProps {
  onBack?: () => void;
}

interface Question {
  id: string;
  q: string;
  a: string[];
  category: string;
}

export function EngineeringThinkingTest({ onBack }: EngineeringThinkingTestProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveTestResult, isLoading: isSaving } = useTest();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(70).fill(0));
  const [remainingTime, setRemainingTime] = useState(1500); // 25 минут в секундах
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Таймер обратного отсчета
  useEffect(() => {
    if (isCompleted || remainingTime <= 0) return;
    
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isCompleted, remainingTime]);

  // Проверка аутентификации
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Подсчет правильных ответов и категорий
  const calculateResults = () => {
    if (!testData) return { totalCorrect: 0, categoryStats: {} };
    
    let totalCorrect = 0;
    const categoryStats: Record<string, { correct: number; total: number }> = {};
    
    selectedAnswers.forEach((answer, index) => {
      const question = testData.questions[index];
      const category = question?.category || 'Неизвестно';
      
      if (!categoryStats[category]) {
        categoryStats[category] = { correct: 0, total: 0 };
      }
      
      categoryStats[category].total++;
      
      if (answer > 0 && answer === testData.answerKey[index]) {
        totalCorrect++;
        categoryStats[category].correct++;
      }
    });

    return { totalCorrect, categoryStats };
  };

  // Выбор ответа
  const handleAnswerSelect = (answerNumber: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerNumber;
    setSelectedAnswers(newAnswers);
    setError(null);
  };

  // Навигация
  const handleNext = () => {
    if (selectedAnswers[currentQuestion] === 0) {
      setError('Пожалуйста, выберите ответ');
      return;
    }
    
    if (currentQuestion < 69) {
      setCurrentQuestion(currentQuestion + 1);
      setError(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError(null);
    }
  };

  // Завершение теста при истечении времени
  const handleTimeUp = () => {
    if (!isCompleted) {
      setShowConfirmDialog(true);
    }
  };

  // Сохранение результатов на сервере
  const saveResultsToServer = async () => {
    if (!testData) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { totalCorrect, categoryStats } = calculateResults();
      const percentage = Math.round((totalCorrect / 70) * 100);
      const timeSpent = 1500 - remainingTime;
      
      const result = {
        testType: 'engineering-thinking' as const,
        score: totalCorrect,
        answers: selectedAnswers.map((answer, index) => ({
          questionId: testData.questions[index]?.id || `q${index + 1}`,
          answer,
          correctAnswer: testData.answerKey[index],
          isCorrect: answer > 0 && answer === testData.answerKey[index]
        })),
        metadata: {
          completedAt: new Date().toISOString(),
          timeSpent,
          percentage,
          categoryStats,
          userEmail: user?.email,
          userName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          totalQuestions: 70,
          answeredQuestions: selectedAnswers.filter(a => a > 0).length
        }
      };

      await saveTestResult(result);
      setIsCompleted(true);
      
      // Перенаправление на страницу результатов через 2 секунды
      setTimeout(() => {
        navigate('/my-results?test=engineering-thinking&new=true');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения результатов');
      console.error('Failed to save test results:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Подтверждение завершения
  const confirmComplete = () => {
    if (selectedAnswers.filter(a => a > 0).length < 70) {
      setShowConfirmDialog(true);
    } else {
      saveResultsToServer();
    }
  };

  // Подсчет отвеченных вопросов
  const answeredCount = selectedAnswers.filter(a => a > 0).length;
  const completionPercentage = Math.round((answeredCount / 70) * 100);
  const timeWarning = remainingTime < 300; // 5 минут

  // Проверка наличия данных
  if (!testData || testData.questions.length === 0) {
    return (
      <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Ошибка загрузки теста</CardTitle>
            <CardDescription>Не удалось загрузить данные теста</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={onBack || (() => navigate('/dashboard'))}
              className="w-full"
            >
              Вернуться назад
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleted) {
    const { totalCorrect } = calculateResults();
    const percentage = Math.round((totalCorrect / 70) * 100);
    
    return (
      <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Card className="max-w-2xl w-full animate-fade-in">
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="size-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Тест успешно завершен!</CardTitle>
              <CardDescription className="text-lg">
                Результаты сохранены на сервере
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-sm">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-600 mb-2">{totalCorrect}</div>
                <div className="text-gray-600 text-lg">из 70 правильных ответов</div>
                <div className="text-3xl text-green-700 mt-3 font-semibold">
                  {percentage}%
                </div>
                <div className="mt-2 text-gray-500">
                  Затраченное время: {formatTime(1500 - remainingTime)}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/my-results?test=engineering-thinking')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12"
              >
                Перейти к детальным результатам
              </Button>
              <Button 
                variant="outline"
                onClick={onBack || (() => navigate('/dashboard'))}
                className="w-full h-12"
              >
                Вернуться в личный кабинет
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              Результаты сохранены в вашем профиле и доступны в любое время
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = testData.questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onBack || (() => navigate('/dashboard'))}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <div>
                  <CardTitle className="text-xl md:text-2xl">Тест на инженерное мышление</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {currentQ.category}
                    </span>
                    <span>Тест технических способностей</span>
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2">
                  <Clock className={`size-5 ${timeWarning ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
                  <span className={`text-xl md:text-2xl font-mono ${timeWarning ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                    {formatTime(remainingTime)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {timeWarning ? 'Осталось менее 5 минут!' : 'До завершения теста'}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Статистика и прогресс */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{answeredCount}</div>
                <div className="text-sm text-gray-600">Отвечено вопросов</div>
                <Progress value={completionPercentage} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {calculateResults().totalCorrect}
                </div>
                <div className="text-sm text-gray-600">Правильных ответов</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {currentQuestion + 1}
                </div>
                <div className="text-sm text-gray-600">Текущий вопрос</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Карточка */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">
                Вопрос {currentQuestion + 1} из 70
              </CardTitle>
              <span className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                {currentQ.category}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Текст вопроса */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {currentQ.q}
              </h3>
            </div>
            <p>
              <br></br>
            </p>
            {/* Плейсхолдер для картинки */}
            <div className="mb-8 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 text-center">
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="text-center">
                              <p>
              <br></br>
            </p>
                  <div className="text-4xl mb-2">🔧</div>

                  <div className="text-gray-600">Схема к вопросу {currentQuestion + 1}</div>
                  <div className="text-sm text-gray-400 mt-2">
                    На реальном тесте здесь была бы схематическая иллюстрация
                  </div>
                              <p>
              <br></br>
            </p>
                </div>
              </div>
            </div>
                        <p>
              <br></br>
            </p>

            {/* Ошибка */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Кнопки выбора ответа */}
            <div className="space-y-3">
              {currentQ.a.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx + 1)}
                  disabled={isSubmitting}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedAnswers[currentQuestion] === idx + 1
                      ? 'border-indigo-500 bg-indigo-50 shadow-sm scale-[1.02]'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswers[currentQuestion] === idx + 1
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswers[currentQuestion] === idx + 1 && (
                        <div className="size-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${
                        selectedAnswers[currentQuestion] === idx + 1
                          ? 'text-indigo-700'
                          : 'text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + idx)}) {answer}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Кнопки навигации */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 md:flex-1">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || isSubmitting}
              className="flex-1 h-12"
            >
              Назад
            </Button>
            
            {currentQuestion < 69 ? (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700"
              >
                Далее
              </Button>
            ) : (
              <Button
                onClick={confirmComplete}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Сохранение...' : 'Завершить тест'}
              </Button>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={confirmComplete}
            disabled={isSubmitting}
            className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Завершить досрочно
          </Button>
        </div>

        {/* Подтверждение */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full animate-scale-in">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertCircle className="size-5" />
                Завершить тест досрочно?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Вы ответили на {answeredCount} из 70 вопросов. 
                {answeredCount < 70 && ' Неотвеченные вопросы будут засчитаны как неправильные.'}
              </p>
              <p className="text-sm text-gray-500">
                Оставшееся время: {formatTime(remainingTime)}
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1"
                >
                  Продолжить тест
                </Button>
                <Button
                  onClick={() => {
                    setShowConfirmDialog(false);
                    saveResultsToServer();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Сохранение...' : 'Завершить'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

        {/* Быстрая навигация по вопросам */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Быстрая навигация по вопросам:
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 70 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  disabled={isSubmitting}
                  className={`size-8 md:size-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    selectedAnswers[idx] > 0
                      ? idx === currentQuestion
                        ? 'bg-green-500 text-white scale-110'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                      : idx === currentQuestion
                      ? 'bg-indigo-500 text-white scale-110'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${idx === currentQuestion ? 'ring-2 ring-offset-1 ring-indigo-300' : ''}`}
                  title={`Вопрос ${idx + 1}${selectedAnswers[idx] > 0 ? ' (отвечен)' : ''}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Легенда */}
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-100 border border-green-300"></div>
            <span className="text-gray-600">Отвечено</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-gray-100 border border-gray-300"></div>
            <span className="text-gray-600">Не отвечено</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-indigo-500"></div>
            <span className="text-gray-600">Текущий</span>
          </div>
        </div>
      </div>

      
    </div>
  );
}

// Cтили анимации
const styles = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default EngineeringThinkingTest;