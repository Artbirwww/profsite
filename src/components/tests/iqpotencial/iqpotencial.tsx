import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Brain } from '../../ui/display/SimpleIcons';
import { useTest } from '../../../contexts/TestContext';
import { ProgressBar } from '../../ui/reusable/progressBar';

interface IntellectualPotentialTestProps {
  onBack?: () => void;
}

// Массив вопросов на логическое мышление и математические способности
const questions = [
  {
    id: 'iq-01',
    q: 'Найдите пропущенное число в последовательности: 2, 4, 8, 16, ?',
    a: ['24', '32', '28', '36'],
    correctAnswer: 1,
    category: 'Числовые последовательности',
    difficulty: 'easy',
    explanation: 'Каждое следующее число умножается на 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32'
  },
  {
    id: 'iq-02',
    q: 'Какое число должно стоять вместо вопросительного знака? 3, 6, 12, 24, ?',
    a: ['36', '42', '48', '30'],
    correctAnswer: 2,
    category: 'Числовые последовательности',
    difficulty: 'easy',
    explanation: 'Умножение на 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48'
  },
  {
    id: 'iq-03',
    q: 'Найдите лишнее слово: Яблоко, Банан, Апельсин, Груша, Картофель',
    a: ['Банан', 'Апельсин', 'Груша', 'Картофель'],
    correctAnswer: 3,
    category: 'Вербальная логика',
    difficulty: 'easy',
    explanation: 'Картофель — это овощ, остальные — фрукты'
  },
  {
    id: 'iq-04',
    q: 'Продолжите последовательность: A, D, G, J, ?',
    a: ['M', 'N', 'K', 'L'],
    correctAnswer: 0,
    category: 'Буквенные последовательности',
    difficulty: 'medium',
    explanation: 'Буквы через две: A (+3) = D, D (+3) = G, G (+3) = J, J (+3) = M'
  },
  {
    id: 'iq-05',
    q: 'Если все Рибы — это Тибы, а все Тибы — это Зибы, то все Рибы обязательно...',
    a: ['Зибы', 'Тибы', 'Не обязательно Зибы', 'Неизвестно'],
    correctAnswer: 0,
    category: 'Логические умозаключения',
    difficulty: 'medium',
    explanation: 'По свойству транзитивности: если A⊂B и B⊂C, то A⊂C'
  },
  {
    id: 'iq-06',
    q: 'Найдите пропущенное число: 5 (15) 3, 7 (28) 4, 9 (?) 5',
    a: ['35', '40', '45', '50'],
    correctAnswer: 2,
    category: 'Математические задачи',
    difficulty: 'medium',
    explanation: 'Среднее число = произведение крайних чисел: 5×3=15, 7×4=28, 9×5=45'
  },
  {
    id: 'iq-07',
    q: 'Какая фигура следующая в последовательности? ◻ △ ◻ △ ◻ ?',
    a: ['△', '◻', '○', '◇'],
    correctAnswer: 0,
    category: 'Пространственное мышление',
    difficulty: 'easy',
    explanation: 'Чередование квадрата и треугольника'
  },
  {
    id: 'iq-08',
    q: 'Если машина едет со скоростью 60 км/ч, какое расстояние она проедет за 45 минут?',
    a: ['40 км', '45 км', '50 км', '55 км'],
    correctAnswer: 1,
    category: 'Математические задачи',
    difficulty: 'medium',
    explanation: '45 минут = 0.75 часа, 60 км/ч × 0.75 ч = 45 км'
  },
  {
    id: 'iq-09',
    q: 'Найдите лишнюю фигуру: Куб, Сфера, Цилиндр, Квадрат, Конус',
    a: ['Куб', 'Сфера', 'Квадрат', 'Конус'],
    correctAnswer: 2,
    category: 'Пространственное мышление',
    difficulty: 'medium',
    explanation: 'Квадрат — плоская фигура (2D), остальные — объёмные (3D)'
  },
  {
    id: 'iq-10',
    q: 'Продолжите последовательность: 1, 1, 2, 3, 5, 8, ?',
    a: ['11', '12', '13', '14'],
    correctAnswer: 2,
    category: 'Числовые последовательности',
    difficulty: 'medium',
    explanation: 'Числа Фибоначчи: каждое следующее равно сумме двух предыдущих'
  },
  {
    id: 'iq-11',
    q: 'Если все Ципы — это Мыпы, а некоторые Мыпы — это Тыпы, то...',
    a: ['Все Ципы — Тыпы', 'Некоторые Ципы — Тыпы', 'Ни один Цип не является Тыпой', 'Недостаточно информации'],
    correctAnswer: 3,
    category: 'Логические умозаключения',
    difficulty: 'hard',
    explanation: 'Из "все A есть B" и "некоторые B есть C" не следует связь между A и C'
  },
  {
    id: 'iq-12',
    q: 'Найдите пропущенное число: 4 (96) 8, 5 (125) 5, 6 (?) 4',
    a: ['144', '120', '96', '72'],
    correctAnswer: 0,
    category: 'Математические задачи',
    difficulty: 'hard',
    explanation: 'Среднее число = произведение квадратов крайних: 4²×8=96, 5²×5=125, 6²×4=144'
  },
  {
    id: 'iq-13',
    q: 'Какое слово лишнее? Рассвет, Полдень, Закат, Ночь, Вечер',
    a: ['Рассвет', 'Полдень', 'Закат', 'Вечер'],
    correctAnswer: 1,
    category: 'Вербальная логика',
    difficulty: 'medium',
    explanation: 'Полдень — это точное время (12:00), остальные — периоды суток'
  },
  {
    id: 'iq-14',
    q: 'Если 3 человека могут покрасить забор за 6 часов, за сколько часов его покрасят 9 человек?',
    a: ['2 часа', '3 часа', '4 часа', '5 часов'],
    correctAnswer: 0,
    category: 'Математические задачи',
    difficulty: 'medium',
    explanation: 'В 3 раза больше людей выполнит работу в 3 раза быстрее: 6 ÷ 3 = 2 часа'
  },
  {
    id: 'iq-15',
    q: 'Продолжите последовательность: 2, 6, 12, 20, 30, ?',
    a: ['40', '42', '44', '46'],
    correctAnswer: 1,
    category: 'Числовые последовательности',
    difficulty: 'hard',
    explanation: 'Разность между числами увеличивается на 2: +4, +6, +8, +10, +12 → 30+12=42'
  },
  {
    id: 'iq-16',
    q: 'Какая фигура следующая? ↗ ↘ ↗ ↘ ↗ ?',
    a: ['↘', '↗', '↑', '↓'],
    correctAnswer: 0,
    category: 'Пространственное мышление',
    difficulty: 'medium',
    explanation: 'Чередование диагональных стрелок вверх-вправо и вниз-вправо'
  },
  {
    id: 'iq-17',
    q: 'Найдите лишнее: 17, 19, 23, 29, 31, 35',
    a: ['17', '23', '31', '35'],
    correctAnswer: 3,
    category: 'Математические задачи',
    difficulty: 'easy',
    explanation: '35 — не простое число (делится на 5 и 7), остальные — простые числа'
  },
  {
    id: 'iq-18',
    q: 'Если синий смешать с желтым, получится зеленый. Если красный смешать с желтым, получится оранжевый. Какой цвет получится при смешивании красного с синим?',
    a: ['Фиолетовый', 'Коричневый', 'Черный', 'Розовый'],
    correctAnswer: 0,
    category: 'Абстрактное мышление',
    difficulty: 'easy',
    explanation: 'По цветовой модели RGB: красный + синий = пурпурный/фиолетовый'
  },
  {
    id: 'iq-19',
    q: 'Продолжите последовательность: Z, X, V, T, ?',
    a: ['R', 'S', 'Q', 'P'],
    correctAnswer: 0,
    category: 'Буквенные последовательности',
    difficulty: 'medium',
    explanation: 'Буквы через одну в обратном алфавитном порядке'
  },
  {
    id: 'iq-20',
    q: 'Человек стоит лицом на север. Он поворачивается на 90° по часовой стрелке, затем на 180° против часовой стрелки. Куда он теперь смотрит?',
    a: ['Восток', 'Запад', 'Север', 'Юг'],
    correctAnswer: 1,
    category: 'Пространственное мышление',
    difficulty: 'hard',
    explanation: 'Север → (90° по часовой) Восток → (180° против) Запад'
  },
  {
    id: 'iq-21',
    q: 'Найдите пропущенное число: 8 (27) 125, 27 (64) 343, 125 (?) 729',
    a: ['216', '512', '1000', '1331'],
    correctAnswer: 0,
    category: 'Математические задачи',
    difficulty: 'hard',
    explanation: 'Числа-кубы: 2³=8, 3³=27, 5³=125, 4³=64, 7³=343, 6³=216, 9³=729'
  },
  {
    id: 'iq-22',
    q: 'Если все птицы летают, а пингвин — птица, то...',
    a: ['Пингвин летает', 'Пингвин не летает', 'Некоторые птицы не летают', 'В условии ошибка'],
    correctAnswer: 2,
    category: 'Логические умозаключения',
    difficulty: 'medium',
    explanation: 'Из общего правила "все птицы летают" следует исключение пингвин'
  },
  {
    id: 'iq-23',
    q: 'Какое число следующее: 1, 4, 9, 16, 25, ?',
    a: ['30', '36', '40', '45'],
    correctAnswer: 1,
    category: 'Числовые последовательности',
    difficulty: 'easy',
    explanation: 'Квадраты натуральных чисел: 1², 2², 3², 4², 5², 6²=36'
  },
  {
    id: 'iq-24',
    q: 'Найдите лишнее: Килограмм, Метр, Литр, Секунда, Ватт',
    a: ['Килограмм', 'Метр', 'Литр', 'Ватт'],
    correctAnswer: 3,
    category: 'Вербальная логика',
    difficulty: 'hard',
    explanation: 'Ватт — производная единица (мощность), остальные — основные единицы СИ'
  },
  {
    id: 'iq-25',
    q: 'Если 5 машин за 5 минут производят 5 деталей, сколько деталей произведут 100 машин за 100 минут?',
    a: ['100 деталей', '500 деталей', '1000 деталей', '2000 деталей'],
    correctAnswer: 3,
    category: 'Математические задачи',
    difficulty: 'hard',
    explanation: '1 машина за 5 минут = 1 деталь, за 100 минут = 20 деталей, 100 машин = 2000 деталей'
  },
  {
    id: 'iq-26',
    q: 'Продолжите последовательность: АБ, ВГ, ДЕ, ЖЗ, ?',
    a: ['ИК', 'ЙК', 'ИЛ', 'ЙЛ'],
    correctAnswer: 0,
    category: 'Буквенные последовательности',
    difficulty: 'easy',
    explanation: 'Пары последовательных букв алфавита'
  },
  {
    id: 'iq-27',
    q: 'Какая фигура отличается от остальных? ◻ △ ○ ◻',
    a: ['Первый квадрат', 'Треугольник', 'Круг', 'Второй квадрат'],
    correctAnswer: 2,
    category: 'Пространственное мышление',
    difficulty: 'easy',
    explanation: 'Круг — единственная фигура без углов'
  },
  {
    id: 'iq-28',
    q: 'Если сегодня среда, какой день будет через 100 дней?',
    a: ['Пятница', 'Суббота', 'Воскресенье', 'Понедельник'],
    correctAnswer: 0,
    category: 'Математические задачи',
    difficulty: 'hard',
    explanation: '100 дней = 14 недель и 2 дня, среда + 2 дня = пятница'
  },
  {
    id: 'iq-29',
    q: 'Найдите пропущенное слово: Рука (Кисть) Нога (?)',
    a: ['Ступня', 'Пальцы', 'Голень', 'Бедро'],
    correctAnswer: 0,
    category: 'Вербальные аналогии',
    difficulty: 'medium',
    explanation: 'Кисть — часть руки, ступня — часть ноги'
  },
  {
    id: 'iq-30',
    q: 'Что тяжелее: килограмм пуха или килограмм железа?',
    a: ['Килограмм пуха', 'Килограмм железа', 'Одинаково', 'Зависит от условий'],
    correctAnswer: 2,
    category: 'Критическое мышление',
    difficulty: 'easy',
    explanation: 'Килограмм — единица массы, поэтому массы одинаковы'
  }
];

export function IntellectualPotentialTest({ onBack }: IntellectualPotentialTestProps) {
  const navigate = useNavigate();
  const { saveTestResult, isLoading: isSaving } = useTest();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(30).fill(-1));
  const [timer, setTimer] = useState(1800); // 30 минут в секундах
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [categoryStats, setCategoryStats] = useState<Record<string, { correct: number; total: number }>>({});

  // Таймер обратного отсчета
  useEffect(() => {
    if (isCompleted || timer <= 0) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isCompleted, timer]);

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

  // Подсчет правильных ответов
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  // Обновление статистики по категориям
  const updateCategoryStats = (questionIndex: number, isCorrect: boolean) => {
    const category = questions[questionIndex].category;
    setCategoryStats(prev => ({
      ...prev,
      [category]: {
        correct: (prev[category]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[category]?.total || 0) + 1
      }
    }));
  };

  // Выбор ответа
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    
    // Обновляем статистику
    updateCategoryStats(currentQuestion, answerIndex === questions[currentQuestion].correctAnswer);
    
    setError(null);
  };

  // Навигация
  const handleNext = () => {
    if (selectedAnswers[currentQuestion] === -1) {
      setError('Пожалуйста, выберите ответ');
      return;
    }
    
    if (currentQuestion < 29) {
      setCurrentQuestion(currentQuestion + 1);
      setError(null);
    } else {
      completeTest();
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

  // Сохранение результатов на сервер
  const saveResultsToServer = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const score = calculateScore();
      const percentage = Math.round((score / 30) * 100);
      const timeSpent = 1800 - timer;
      
      // Оцениваем IQ по результатам (условная оценка)
      let iqEstimate = 90;
      if (percentage >= 90) iqEstimate = 130;
      else if (percentage >= 80) iqEstimate = 120;
      else if (percentage >= 70) iqEstimate = 115;
      else if (percentage >= 60) iqEstimate = 110;
      else if (percentage >= 50) iqEstimate = 105;
      else if (percentage >= 40) iqEstimate = 100;
      else if (percentage >= 30) iqEstimate = 95;
      
      const result = {
        testType: 'iq-potential' as const,
        score: score,
        answers: questions.map((q, index) => ({
          questionId: q.id,
          question: q.q,
          userAnswer: selectedAnswers[index],
          correctAnswer: q.correctAnswer,
          isCorrect: selectedAnswers[index] === q.correctAnswer,
          category: q.category,
          difficulty: q.difficulty
        })),
        metadata: {
          completedAt: new Date().toISOString(),
          timeSpent,
          percentage,
          iqEstimate,
          categoryStats,
          totalQuestions: 30,
          answeredQuestions: selectedAnswers.filter(a => a !== -1).length,
          timeLimit: 1800,
          difficultyBreakdown: {
            easy: questions.filter(q => q.difficulty === 'easy').length,
            medium: questions.filter(q => q.difficulty === 'medium').length,
            hard: questions.filter(q => q.difficulty === 'hard').length
          }
        }
      };

      await saveTestResult(result);
      setIsCompleted(true);
      
      // Перенаправление на страницу результатов через 2 секунды
      setTimeout(() => {
        navigate('/my-results?test=iq-potential&new=true');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения результатов');
      console.error('Failed to save test results:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Завершение теста
  const completeTest = () => {
    const unanswered = selectedAnswers.filter(a => a === -1).length;
    if (unanswered > 0) {
      setShowConfirmDialog(true);
    } else {
      saveResultsToServer();
    }
  };

  // Подсчет отвеченных вопросов
  const answeredCount = selectedAnswers.filter(a => a !== -1).length;
  const completionPercentage = Math.round((answeredCount / 30) * 100);
  const timeWarning = timer < 300; // 5 минут
  const currentQuestionData = questions[currentQuestion];
  const score = calculateScore();

  if (isCompleted) {
    const percentage = Math.round((score / 30) * 100);
    let iqLevel = 'Средний';
    if (percentage >= 90) iqLevel = 'Высокий';
    else if (percentage >= 70) iqLevel = 'Выше среднего';
    else if (percentage >= 50) iqLevel = 'Средний';
    else if (percentage >= 30) iqLevel = 'Ниже среднего';
    else iqLevel = 'Низкий';
    
    return (
      <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Card className="max-w-2xl w-full animate-fade-in">
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 mb-4">
                <Brain className="size-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Тест интеллектуального потенциала завершен!</CardTitle>
              <CardDescription className="text-lg">
                Ваш результат сохранен
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{score}</div>
                <div className="text-gray-600 text-lg">из 30 правильных ответов</div>
                <div className="text-3xl text-green-700 mt-3 font-semibold">
                  {percentage}%
                </div>
                <div className="mt-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {iqLevel} уровень
                  </div>
                </div>
                <div className="mt-2 text-gray-500">
                  Затраченное время: {formatTime(1800 - timer)}
                </div>
              </div>
            </div>
            
            {/* Статистика по категориям */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Результаты по категориям:</h3>
              {Object.entries(categoryStats).map(([category, stats]) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">
                      {stats.correct} из {stats.total}
                    </span>
                  </div>
                  <ProgressBar value={(stats.correct / stats.total) * 100} max={100} />
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/my-results?test=iq-potential')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12"
              >
                Подробный анализ
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
              Результат основан на 30 вопросах различных категорий сложности
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
                  <CardTitle className="text-xl md:text-2xl">Тест интеллектуального потенциала</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {currentQuestionData.category}
                    </span>
                    <span>Оценка логико-математических способностей</span>
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2">
                  <Clock className={`size-5 ${timeWarning ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
                  <span className={`text-xl md:text-2xl font-mono ${timeWarning ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                    {formatTime(timer)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {timeWarning ? 'Осталось менее 5 минут!' : 'До завершения теста'}
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
                <ProgressBar value={completionPercentage} max={100} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Правильных ответов</div>
                <ProgressBar value={(score / 30) * 100} max={100} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {currentQuestion + 1}
                </div>
                <div className="text-sm text-gray-600">Текущий вопрос</div>
                <div className="text-xs text-gray-500 mt-1 capitalize">{currentQuestionData.difficulty}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">
                Вопрос {currentQuestion + 1} из 30
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {currentQuestionData.category}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  currentQuestionData.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentQuestionData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestionData.difficulty === 'easy' ? 'Легкий' :
                   currentQuestionData.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Question Text */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {currentQuestionData.q}
              </h3>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestionData.a.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={isSubmitting}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedAnswers[currentQuestion] === idx
                      ? 'border-blue-500 bg-blue-50 shadow-sm scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswers[currentQuestion] === idx
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswers[currentQuestion] === idx && (
                        <div className="size-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${
                        selectedAnswers[currentQuestion] === idx
                          ? 'text-blue-700'
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
            
            {currentQuestion < 29 ? (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
              >
                Далее
              </Button>
            ) : (
              <Button
                onClick={completeTest}
                disabled={isSubmitting}
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
                Вы ответили на {answeredCount} из 30 вопросов. 
                {answeredCount < 30 && ` Неотвеченные ${30 - answeredCount} вопросов будут засчитаны как неправильные.`}
              </p>
              <p className="text-sm text-gray-500">
                Текущий счет: {score} из {answeredCount} отвеченных
              </p>
              <p className="text-sm text-gray-500">
                Оставшееся время: {formatTime(timer)}
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

        {/* Question Navigation Dots */}
<Card>
  <CardContent className="pt-6">
    <div className="text-sm font-medium text-gray-700 mb-3">
      Быстрая навигация по вопросам:
    </div>
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 30 }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentQuestion(idx)}
          disabled={isSubmitting}
          className={`size-8 md:size-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
            selectedAnswers[idx] !== -1
              ? idx === currentQuestion
                ? 'bg-green-500 text-white scale-110 ring-2 ring-offset-1 ring-green-300'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
              : idx === currentQuestion
              ? 'bg-purple-500 text-white scale-110 ring-2 ring-offset-1 ring-purple-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={`Вопрос ${idx + 1}${
            selectedAnswers[idx] !== -1 ? ' (отвечен)' : ''
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  </CardContent>
</Card>

      </div>
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

export default IntellectualPotentialTest;