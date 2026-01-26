import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { ArrowLeft, Clock, Minus, Plus, CheckCircle, AlertCircle } from '../../ui/display/SimpleIcons';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Progress } from '../../ui/feedback/SimpleProgress';
import {
  balbinAnswer,
  roleNames,
  roleDescriptions,
  questionBlocks,
  type QuestionBlock,
  type Question
} from './GroupQuestions';

interface GroupRolesTestProps {
  onBack?: () => void;
}

export function GroupRolesTest({ onBack }: GroupRolesTestProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveTestResult, isLoading: isSaving } = useTest();
  
  const [currentBlock, setCurrentBlock] = useState(0);
  const [blockAnswers, setBlockAnswers] = useState<number[]>(Array(8).fill(0));
  const [roleCounts, setRoleCounts] = useState<number[]>(Array(8).fill(0));
  const [timer, setTimer] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [progressHistory, setProgressHistory] = useState<number[][]>([]);

  // Таймер
  useEffect(() => {
    if (isCompleted) return;
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isCompleted]);

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

  // Вычисление текущей суммы
  const currentSum = blockAnswers.reduce((sum, val) => sum + val, 0);

  // Изменение значения слайдера
  const handleSliderChange = (index: number, newValue: number) => {
    const newAnswers = [...blockAnswers];
    newAnswers[index] = Math.max(0, Math.min(10, newValue));
    setBlockAnswers(newAnswers);
    setError(null);
  };

  // Возврат к предыдущему блоку
  const handlePrevious = () => {
    if (currentBlock > 0) {
      // Сохраняем текущие ответы в историю
      const newHistory = [...progressHistory];
      newHistory[currentBlock] = [...blockAnswers];
      setProgressHistory(newHistory);
      
      // Восстанавливаем предыдущие ответы
      setCurrentBlock(currentBlock - 1);
      setBlockAnswers(progressHistory[currentBlock - 1] || Array(8).fill(0));
    }
  };

  // Сохранение результатов на сервер
  const saveResultsToServer = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Сохраняем результаты последнего блока
      const newRoleCounts = [...roleCounts];
      const mapping = balbinAnswer[currentBlock + 1];
      
      blockAnswers.forEach((value, index) => {
        const roleIndex = mapping[index];
        newRoleCounts[roleIndex] += value;
      });

      // Формируем результат для API
      const result = {
        testType: 'group-roles' as const,
        score: Math.max(...newRoleCounts), // максимальное значение среди ролей
        answers: {
          blockAnswers: blockAnswers,
          roleCounts: newRoleCounts,
          progressHistory: progressHistory,
          finalScores: roleNames.reduce((acc, role, index) => {
            acc[role] = newRoleCounts[index];
            return acc;
          }, {} as Record<string, number>)
        },
        metadata: {
          completedAt: new Date().toISOString(),
          timeSpent: timer,
          userEmail: user?.email,
          userName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          dominantRole: roleNames[newRoleCounts.indexOf(Math.max(...newRoleCounts))],
          blocksCompleted: currentBlock + 1,
          isValid: currentSum === 10
        }
      };

      await saveTestResult(result);
      setIsCompleted(true);
      
      // Перенаправление на страницу результатов через 2 секунды
      setTimeout(() => {
        navigate('/my-results?test=group-roles&new=true');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения результатов');
      console.error('Failed to save test results:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Переход к следующему блоку
  const handleNext = () => {
    if (currentSum !== 10) {
      setError(`Распределите ровно 10 баллов. Сейчас: ${currentSum} баллов`);
      return;
    }

    // Сохраняем текущие ответы
    const newProgressHistory = [...progressHistory];
    newProgressHistory[currentBlock] = [...blockAnswers];
    setProgressHistory(newProgressHistory);

    // Сохраняем результаты текущего блока
    const newRoleCounts = [...roleCounts];
    const mapping = balbinAnswer[currentBlock + 1];
    
    blockAnswers.forEach((value, index) => {
      const roleIndex = mapping[index];
      newRoleCounts[roleIndex] += value;
    });

    setRoleCounts(newRoleCounts);

    // Если это был последний блок
    if (currentBlock === 6) {
      saveResultsToServer();
      return;
    }

    // Переходим к следующему блоку
    setCurrentBlock(currentBlock + 1);
    setBlockAnswers(Array(8).fill(0));
    setError(null);
  };

  // Цвет индикатора суммы
  const getSumColor = () => {
    if (currentSum > 10) return 'text-red-600 font-bold';
    if (currentSum === 10) return 'text-green-600 font-bold';
    return 'text-gray-600';
  };

  // Подтверждение завершения
  const confirmComplete = () => {
    if (currentSum !== 10) {
      setShowConfirmDialog(true);
    } else {
      handleNext();
    }
  };

  // Пропустить блок (только для административных целей)
  const handleSkipBlock = () => {
    if (currentBlock < 6) {
      const newProgressHistory = [...progressHistory];
      newProgressHistory[currentBlock] = Array(8).fill(0);
      setProgressHistory(newProgressHistory);
      setCurrentBlock(currentBlock + 1);
      setBlockAnswers(Array(8).fill(0));
      setError(null);
    }
  };

  // Получить текущий блок вопросов
  const currentBlockData = questionBlocks[currentBlock];

  if (isCompleted) {
    const dominantRoleIndex = roleCounts.indexOf(Math.max(...roleCounts));
    const dominantRole = roleNames[dominantRoleIndex];
    
    return (
      <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Card className="max-w-4xl w-full animate-fade-in">
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="size-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Тест Белбина завершен!</CardTitle>
              <CardDescription className="text-lg">
                Ваши командные роли определены
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Доминирующая роль */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
              <div className="text-center">
                <div className="text-sm text-blue-600 mb-2">Ваша ведущая роль</div>
                <div className="text-3xl font-bold text-blue-700 mb-2">{dominantRole}</div>
                <div className="text-gray-600 text-sm max-w-md mx-auto">
                  {roleDescriptions[dominantRoleIndex]}
                </div>
                <div className="mt-4">
                  <Progress value={(roleCounts[dominantRoleIndex] / 70) * 100} className="h-2" />
                  <div className="text-sm text-gray-500 mt-1">
                    {roleCounts[dominantRoleIndex]} баллов из 70 возможных
                  </div>
                </div>
              </div>
            </div>

            {/* Все роли */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {roleNames.map((role, index) => (
                <div 
                  key={role} 
                  className={`p-4 rounded-lg border transition-all ${
                    index === dominantRoleIndex
                      ? 'border-blue-300 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm text-gray-600 mb-1">{role}</div>
                  <div className={`text-2xl font-medium ${
                    index === dominantRoleIndex ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {roleCounts[index]}
                  </div>
                  <Progress 
                    value={(roleCounts[index] / 70) * 100} 
                    className="h-1 mt-2" 
                  />
                </div>
              ))}
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => navigate('/my-results?test=group-roles')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12"
              >
                Подробный анализ результатов
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
              Время прохождения: {formatTime(timer)} • Блоков завершено: 7 из 7
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  <CardTitle className="text-xl md:text-2xl">Тест групповых ролей</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                      {currentBlockData.category}
                    </span>
                    <span>Методика Белбина</span>
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-gray-600" />
                  <span className="text-xl md:text-2xl font-mono text-gray-700">
                    {formatTime(timer)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Блок {currentBlock + 1} из 7
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
                <div className={`text-3xl font-bold ${getSumColor().replace('font-bold', '')}`}>
                  {currentSum}/10
                </div>
                <div className="text-sm text-gray-600">Распределено баллов</div>
                <Progress value={currentSum * 10} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {currentBlock + 1}
                </div>
                <div className="text-sm text-gray-600">Текущий блок</div>
                <div className="text-xs text-gray-500 mt-1">{currentBlockData.category}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(((currentBlock + 1) / 7) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Общий прогресс</div>
                <Progress value={((currentBlock + 1) / 7) * 100} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm md:text-base">
              <h4 className="font-medium text-blue-800">Как заполнять блок:</h4>
              <ul className="space-y-2 text-gray-700 list-disc pl-5">
                <li>Распределите <strong>10 баллов</strong> между утверждениями в этом блоке</li>
                <li>Отдавайте больше баллов тем утверждениям, которые лучше описывают ваше поведение</li>
                <li>Баллы можно распределить между несколькими утверждениями</li>
                <li>В исключительных случаях можно поставить все 10 баллов одному утверждению</li>
                <li>Можно оставить 0 баллов утверждениям, которые к вам не относятся</li>
              </ul>
              <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
                <p className="text-blue-800 font-medium">Совет:</p>
                <p className="text-blue-700 text-sm">
                  Думайте о своем реальном поведении в команде, а не о том, каким вы хотели бы быть
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-red-700 font-medium">{error}</span>
              <p className="text-red-600 text-sm mt-1">
                {currentSum < 10 
                  ? `Добавьте еще ${10 - currentSum} ${currentSum === 9 ? 'балл' : 'баллов'}`
                  : `Уберите ${currentSum - 10} ${currentSum === 11 ? 'балл' : 'баллов'}`
                }
              </p>
            </div>
          </div>
        )}

        {/* Questions Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">
                Блок {currentBlock + 1}: {currentBlockData.category}
              </CardTitle>
              <div className={`text-lg font-mono ${getSumColor()}`}>
                {currentSum}/10
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-8">
              {currentBlockData.questions.map((question, index) => (
                <div key={question.id} className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed">
                        {question.text}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                          {question.role}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {blockAnswers[index]}
                      </div>
                      <div className="text-xs text-gray-500">баллов</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSliderChange(index, blockAnswers[index] - 1)}
                      disabled={blockAnswers[index] === 0 || isSubmitting}
                      className="flex-shrink-0"
                    >
                      <Minus className="size-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={blockAnswers[index]}
                        onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                        disabled={isSubmitting}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>10</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSliderChange(index, blockAnswers[index] + 1)}
                      disabled={blockAnswers[index] === 10 || isSubmitting}
                      className="flex-shrink-0"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 md:flex-1">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentBlock === 0 || isSubmitting}
              className="flex-1 h-12"
            >
              Назад
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentSum !== 10 || isSubmitting}
              className="flex-1 h-12 bg-purple-600 hover:bg-purple-700"
            >
              {currentBlock === 6 
                ? (isSubmitting ? 'Сохранение...' : 'Завершить тест')
                : 'Далее'
              }
            </Button>
          </div>
          
          <Button
            variant="outline"
                        onClick={() => setShowConfirmDialog(true)}
            disabled={isSubmitting}
            className="h-12 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
          >
            Завершить досрочно
          </Button>
        </div>

        {/* Confirm Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="size-5" />
                  Внимание: Не все баллы распределены
                </CardTitle>
                <CardDescription>
                  Вы собираетесь завершить блок с неравномерным распределением баллов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800">
                    В текущем блоке распределено <strong>{currentSum} из 10</strong> баллов.
                    {currentSum < 10 && ` Не хватает ${10 - currentSum} баллов.`}
                    {currentSum > 10 && ` Превышение на ${currentSum - 10} баллов.`}
                  </p>
                  <p className="text-sm text-amber-700 mt-2">
                    Для точных результатов рекомендуется распределить ровно 10 баллов.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmDialog(false)}
                    className="w-full h-12"
                  >
                    Вернуться к редактированию
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Indicators */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Прогресс по блокам:
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 7 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isSubmitting) {
                      setCurrentBlock(idx);
                      setBlockAnswers(progressHistory[idx] || Array(8).fill(0));
                    }
                  }}
                  disabled={isSubmitting}
                  className={`px-3 py-2 text-sm rounded-lg transition-all ${
                    idx === currentBlock
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${
                    progressHistory[idx] ? 'border border-purple-300' : 'border border-transparent'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Блок {idx + 1}
                  {progressHistory[idx] && (
                    <span className="ml-1.5 text-xs opacity-75">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Нажмите на номер блока, чтобы вернуться к нему. Отмеченные галочкой блоки уже сохранены.
            </div>
          </CardContent>
        </Card>

        

        {/* Admin Skip Button (hidden in production) */}
        {process.env.NODE_ENV === 'development' && currentBlock < 6 && (
          <div className="text-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkipBlock}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              [DEV] Пропустить блок
            </Button>
          </div>
        )}

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-sm w-full">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="animate-spin size-10 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-700 font-medium">Сохранение результатов...</p>
                <p className="text-sm text-gray-500 mt-2">Пожалуйста, не закрывайте страницу</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupRolesTest;