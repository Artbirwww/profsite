import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { SimpleProgress as Progress } from '../../ui/feedback/SimpleProgress';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Brain, Heart } from '../../ui/display/SimpleIcons';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import type { User, TestResult } from '../App';
import {
  questionsA,
  questionsB,
  ExtraIntrMap,
  NeiroMap,
  LieMap,
  temperamentTypes,
  type Question,
  type TemperamentScores
} from './TempQuestions';

interface TemperamentTestProps {
  user?: User;
  onComplete?: (result: Partial<TestResult>) => void;
  onBack?: () => void;
}

export function TemperamentTest({ user, onComplete, onBack }: TemperamentTestProps) {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { saveTestResult, isLoading: isSaving } = useTest();
  
  const [stage, setStage] = useState<'disclaimer' | 'test' | 'completed'>('disclaimer');
  const [variant, setVariant] = useState<'A' | 'B' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>(Array(57).fill(null));
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Таймер
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Проверка аутентификации
  useEffect(() => {
    if (!user && !authUser) {
      navigate('/login');
    }
  }, [user, authUser, navigate]);

  const questions = variant === 'A' ? questionsA : questionsB;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleVariantSelect = (selectedVariant: 'A' | 'B') => {
    setVariant(selectedVariant);
    setStage('test');
    setTimerRunning(true);
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    setError(null);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === null) {
      setError('Пожалуйста, выберите ответ');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
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

  // Определение типа темперамента по шкалам Айзенка
  const determineTemperamentType = (extraversion: number, neuroticism: number) => {
    if (extraversion >= 12 && neuroticism >= 12) return temperamentTypes.choleric;
    if (extraversion >= 12 && neuroticism < 12) return temperamentTypes.sanguine;
    if (extraversion < 12 && neuroticism < 12) return temperamentTypes.phlegmatic;
    if (extraversion < 12 && neuroticism >= 12) return temperamentTypes.melancholic;
    return temperamentTypes.phlegmatic; // По умолчанию
  };

  // Сохранение результатов на сервер
  const saveResultsToServer = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Подсчет баллов
      let countExtraIntr = 0;
      let countNeiro = 0;
      let countLie = 0;

      answers.forEach((answer, index) => {
        const questionNumber = index + 1;

        if (ExtraIntrMap.hasOwnProperty(questionNumber) && ExtraIntrMap[questionNumber] === answer) {
          countExtraIntr++;
        }

        if (NeiroMap.hasOwnProperty(questionNumber) && NeiroMap[questionNumber] === answer) {
          countNeiro++;
        }

        if (LieMap.hasOwnProperty(questionNumber) && LieMap[questionNumber] === answer) {
          countLie++;
        }
      });

      // Определение типа темперамента
      const temperamentType = determineTemperamentType(countExtraIntr, countNeiro);
      
      const result = {
        testType: 'temperament' as const,
        score: Math.max(countExtraIntr, countNeiro),
        answers: answers.map((answer, index) => ({
          questionId: questions[index].id,
          question: questions[index].text,
          answer,
          category: questions[index].category,
          mappedTo: {
            extraversion: ExtraIntrMap[index + 1] !== undefined,
            neuroticism: NeiroMap[index + 1] !== undefined,
            lie: LieMap[index + 1] !== undefined
          }
        })),
        metadata: {
          completedAt: new Date().toISOString(),
          timeSpent: time,
          extraversion: countExtraIntr,
          neuroticism: countNeiro,
          lieScale: countLie,
          temperamentType: temperamentType.name,
          temperamentDescription: temperamentType.description,
          userEmail: user?.email || authUser?.email,
          userName: user?.firstName || authUser?.firstName || '',
          variant: variant || 'A',
          questionsTotal: questions.length,
          questionsAnswered: answers.filter(a => a !== null).length,
          validForInterpretation: countLie <= 4, // Шкала лжи должна быть низкой
          interpretation: countLie > 4 ? 'Результат может быть искажен из-за высокой шкалы лжи' : 'Результат валиден'
        }
      };

      // Сохраняем через API
      if (onComplete) {
        // Старый режим совместимости
        const legacyResult = {
          extraversion: countExtraIntr,
          neuroticism: countNeiro,
          lie: countLie,
          time: time
        };
        onComplete({ temperament: legacyResult });
      } else {
        // Новый режим с сохранением на сервер
        await saveTestResult(result);
      }
      
      setStage('completed');
      setTimerRunning(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения результатов');
      console.error('Failed to save test results:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = () => {
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      setShowConfirmDialog(true);
    } else {
      saveResultsToServer();
    }
  };

  const isAnswered = answers[currentQuestion] !== null;
  const allAnswered = answers.every(a => a !== null);
  const answeredCount = answers.filter(a => a !== null).length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Предварительный расчет результатов
  const getCurrentScores = (): TemperamentScores => {
    let extra = 0;
    let neuro = 0;
    let lie = 0;

    answers.forEach((answer, index) => {
      const qNum = index + 1;
      if (answer !== null) {
        if (ExtraIntrMap[qNum] !== undefined && ExtraIntrMap[qNum] === answer) extra++;
        if (NeiroMap[qNum] !== undefined && NeiroMap[qNum] === answer) neuro++;
        if (LieMap[qNum] !== undefined && LieMap[qNum] === answer) lie++;
      }
    });

    return { extra, neuro, lie };
  };

  const currentScores = getCurrentScores();

  // Дисклеймер
  if (stage === 'disclaimer') {
    return (
      <div className="min-h-screen p-4 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🎭</div>
                <div className="flex-1">
                  <CardTitle className="text-2xl">Тест темперамента</CardTitle>
                  <CardDescription className="text-lg">Опросник EPI (Г. Айзенк)</CardDescription>
                </div>
                <Button variant="outline" onClick={onBack || (() => navigate('/dashboard'))}>
                  <ArrowLeft className="size-4 mr-2" />
                  Назад
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg mt-0.5">
                    <Brain className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-blue-900 mb-3">
                      <strong>Инструкция:</strong> Вам предлагается ответить на 57 вопросов. Отвечайте только «Да» или «Нет». 
                      Не тратьте много времени на обдумывание ответов — давайте тот ответ, который первым приходит в голову.
                    </p>
                    <p className="text-blue-700 text-sm">
                      Помните, что нет «правильных» или «неправильных» ответов. Отвечайте честно, так как это необходимо 
                      для получения достоверных результатов.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl mb-3">🧠</div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Что измеряется?</h3>
                      <ul className="text-sm text-gray-600 text-left space-y-1">
                        <li>• <strong>Экстраверсия/Интроверсия</strong> — направленность личности</li>
                        <li>• <strong>Нейротизм</strong> — эмоциональная устойчивость</li>
                        <li>• <strong>Шкала искренности</strong> — достоверность результатов</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl mb-3">⏱️</div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Технические детали</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Время:</strong> ~10-15 минут</div>
                        <div><strong>Вопросов:</strong> 57 в каждом варианте</div>
                        <div><strong>Тип:</strong> Личностный опросник</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Выберите вариант теста:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer border-2 transition-all duration-200 hover:shadow-lg ${
                      variant === 'A' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleVariantSelect('A')}
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">🔵</div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Вариант А</h4>
                        <p className="text-gray-600 mb-3">Классическая версия опросника</p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                          57 вопросов
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer border-2 transition-all duration-200 hover:shadow-lg ${
                      variant === 'B' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => handleVariantSelect('B')}
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">🟣</div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Вариант Б</h4>
                        <p className="text-gray-600 mb-3">Альтернативная формулировка вопросов</p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                          57 вопросов
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Завершенный тест
  if (stage === 'completed') {
    const temperamentType = determineTemperamentType(currentScores.extra, currentScores.neuro);
    
    return (
      <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Card className="max-w-4xl w-full animate-fade-in">
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="size-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Тест темперамента завершен!</CardTitle>
              <CardDescription className="text-lg">
                Ваш тип темперамента определен
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Результат темперамента */}
            <div className={`p-6 border-2 rounded-xl ${
              temperamentType.color === 'red' ? 'bg-red-50 border-red-200' :
              temperamentType.color === 'orange' ? 'bg-orange-50 border-orange-200' :
              temperamentType.color === 'green' ? 'bg-green-50 border-green-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="text-center">
                <div className="text-4xl mb-3">
                  {temperamentType.color === 'red' ? '🔥' :
                   temperamentType.color === 'orange' ? '😊' :
                   temperamentType.color === 'green' ? '😌' : '😔'}
                </div>
                <div className={`text-3xl font-bold mb-2 ${
                  temperamentType.color === 'red' ? 'text-red-700' :
                  temperamentType.color === 'orange' ? 'text-orange-700' :
                  temperamentType.color === 'green' ? 'text-green-700' :
                  'text-blue-700'
                }`}>
                  {temperamentType.name}
                </div>
                <p className="text-gray-600 mb-4">{temperamentType.description}</p>
                <div className="inline-flex flex-wrap gap-2 justify-center">
                  {temperamentType.traits.map((trait, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full bg-white border text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Баллы по шкалам */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{currentScores.extra}</div>
                    <div className="text-sm text-gray-600">Экстраверсия</div>
                    <Progress value={(currentScores.extra / 24) * 100} className="h-2 mt-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      {currentScores.extra >= 12 ? 'Экстраверт' : 'Интроверт'}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{currentScores.neuro}</div>
                    <div className="text-sm text-gray-600">Нейротизм</div>
                    <Progress value={(currentScores.neuro / 24) * 100} className="h-2 mt-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      {currentScores.neuro >= 12 ? 'Эмоциональный' : 'Стабильный'}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{currentScores.lie}</div>
                    <div className="text-sm text-gray-600">Шкала искренности</div>
                    <Progress value={(currentScores.lie / 9) * 100} className="h-2 mt-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      {currentScores.lie <= 4 ? 'Достоверно' : 'Требует проверки'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Рекомендации */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium text-gray-700 mb-3">Рекомендации для {temperamentType.name.toLowerCase()}а:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Heart className="size-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Подходящие профессии:</strong> {temperamentType.professions}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="size-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Стиль работы:</strong> {temperamentType.description}</span>
                  </li>
                  {currentScores.lie > 4 && (
                    <li className="flex items-start gap-2">
                      <AlertCircle className="size-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-orange-600">
                        <strong>Внимание:</strong> Высокий балл по шкале искренности. Результаты могут быть искажены.
                      </span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Кнопки действий */}
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/my-results?test=temperament')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12"
              >
                Сохранить и посмотреть детали
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
              Время прохождения: {formatTime(time)} • Вариант {variant}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Тест
  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-sm">
          <CardHeader>
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
                  <CardTitle className="text-xl md:text-2xl">Тест темперамента</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                      {currentQuestionData.category}
                    </span>
                    <span>Опросник EPI (Г. Айзенк) • Вариант {variant}</span>
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-gray-600" />
                  <span className="text-xl md:text-2xl font-mono text-gray-700">
                    {formatTime(time)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Вопрос {currentQuestion + 1} из {questions.length}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{answeredCount}</div>
                <div className="text-sm text-gray-600">Отвечено вопросов</div>
                <Progress value={(answeredCount / questions.length) * 100} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-gray-600">Прогресс</div>
                <Progress value={progress} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl">
                  {determineTemperamentType(currentScores.extra, currentScores.neuro).name.substring(0, 3)}
                </div>
                <div className="text-sm text-gray-600">Текущий тип</div>
                <div className="text-xs text-gray-500 mt-1">Предварительно</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">
                Вопрос {currentQuestion + 1} из {questions.length}
              </CardTitle>
              <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                {currentQuestionData.category}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {currentQuestionData.text}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                disabled={isSubmitting}
                style={
                  answers[currentQuestion] === true
                    ? {
                        borderColor: '#6362f7',
                        color: '#6362f7',
                        backgroundColor: 'rgba(99, 98, 247, 0.1)',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        transform: 'scale(1.02)',
                      }
                    : undefined
                }
                className={`p-6 text-center rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  answers[currentQuestion] === true
                    ? ''
                    : 'border-gray-200 text-gray-700 hover:border-[#6362f7]/50 hover:bg-[#6362f7]/5'
                }`}
              >
                Да
              </button>

              <button
                onClick={() => handleAnswer(false)}
                disabled={isSubmitting}
                style={
                  answers[currentQuestion] === false
                    ? {
                        borderColor: '#6362f7',
                        color: '#6362f7',
                        backgroundColor: 'rgba(99, 98, 247, 0.1)',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        transform: 'scale(1.02)',
                      }
                    : undefined
                }
                className={`p-6 text-center rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  answers[currentQuestion] === false
                    ? ''
                    : 'border-gray-200 text-gray-700 hover:border-[#6362f7]/50 hover:bg-[#6362f7]/5'
                }`}
              >
                Нет
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
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
            
            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-purple-600 hover:bg-purple-700"
              >
                Далее
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={isSubmitting || !allAnswered}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Сохранение...' : 'Завершить тест'}
              </Button>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowConfirmDialog(true)}
            disabled={isSubmitting}
            className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Завершить досрочно
          </Button>
        </div>

        {/* Question Navigation Dots */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Быстрая навигация по вопросам:
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: questions.length }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  disabled={isSubmitting}
                  className={`size-8 md:size-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    answers[idx] !== null
                      ? idx === currentQuestion
                        ? 'bg-green-500 text-white scale-110 ring-2 ring-offset-1 ring-green-300'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                      : idx === currentQuestion
                      ? 'bg-purple-500 text-white scale-110 ring-2 ring-offset-1 ring-purple-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={`Вопрос ${idx + 1}${answers[idx] !== null ? ' (отвечен)' : ''}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
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
                Вы ответили на {answeredCount} из 57 вопросов. 
                {answeredCount < 57 && ` Неотвеченные ${57 - answeredCount} вопросов будут обработаны как пропущенные.`}
              </p>
              <p className="text-sm text-gray-500">
                Текущие предварительные баллы: 
                Экстраверсия {currentScores.extra}, Нейротизм {currentScores.neuro}
              </p>
              <p className="text-sm text-gray-500">
                Оставшееся время: {formatTime(time)}
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
    </div>
  );
}

// Стили анимации
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

// Добавляем стили в документ
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default TemperamentTest;