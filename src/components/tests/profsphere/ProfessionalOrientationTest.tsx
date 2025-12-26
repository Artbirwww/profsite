import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Briefcase } from '../../ui/display/SimpleIcons';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Progress } from '../../ui/feedback/SimpleProgress';

interface ProfessionalOrientationTestProps {
  onBack?: () => void;
}

// Вопросы варианта А с ID и категориями
const questionsA = [
  {
    id: 'a-1',
    text: 'Ухаживать за животными.',
    description: 'Работа с живыми существами'
  },
  {
    id: 'a-2',
    text: 'Помогать больным людям, лечить их.',
    description: 'Медицинская помощь'
  },
  {
    id: 'a-3',
    text: 'Следить за качеством иллюстраций, картинок, плакатов и другого художественного контента.',
    description: 'Художественная оценка'
  },
  {
    id: 'a-4',
    text: 'Обрабатывать материалы (дерево, ткань, пластик и т.д.).',
    description: 'Материальная обработка'
  },
  {
    id: 'a-5',
    text: 'Обсуждать научно-популярные книги, статьи.',
    description: 'Научная дискуссия'
  },
  {
    id: 'a-6',
    text: 'Выращивать животных.',
    description: 'Животноводство'
  },
  {
    id: 'a-7',
    text: 'Копировать рисунки, изображения, настраивать музыкальные инструменты.',
    description: 'Творческое воспроизведение'
  },
  {
    id: 'a-8',
    text: 'Сообщать, разъяснять людям нужные для них сведения в службе поддержки, во время экскурсии и т.д.',
    description: 'Информационная помощь'
  },
  {
    id: 'a-9',
    text: 'Ремонтировать и настраивать вещи и технику.',
    description: 'Техническое обслуживание'
  },
  {
    id: 'a-10',
    text: 'Лечить животных.',
    description: 'Ветеринария'
  },
  {
    id: 'a-11',
    text: 'Выводить новые сорта растений.',
    description: 'Селекция растений'
  },
  {
    id: 'a-12',
    text: 'Разбирать споры, ссоры между людьми, убеждать, разъяснять, поощрять, наказывать.',
    description: 'Конфликтология'
  },
  {
    id: 'a-13',
    text: 'Наблюдать, изучать работу творческих коллективов.',
    description: 'Творческий анализ'
  },
  {
    id: 'a-14',
    text: 'Обслуживать, налаживать медицинские приборы и технику.',
    description: 'Медицинская техника'
  },
  {
    id: 'a-15',
    text: 'Составлять точные описания, отчёты о наблюдаемых явлениях, событиях, измеряемых объектах и др.',
    description: 'Аналитическая документация'
  },
  {
    id: 'a-16',
    text: 'Делать лабораторные анализы в больнице.',
    description: 'Медицинская диагностика'
  },
  {
    id: 'a-17',
    text: 'Расписывать стены помещений, делать иллюстрации.',
    description: 'Художественное оформление'
  },
  {
    id: 'a-18',
    text: 'Организовывать выходы людей в театры, музеи, на экскурсии, в туристические путешествия и т.п.',
    description: 'Культурная организация'
  },
  {
    id: 'a-19',
    text: 'Изготавливать что-либо по чертежам.',
    description: 'Техническое производство'
  },
  {
    id: 'a-20',
    text: 'Бороться с болезнями растений, с вредителями леса и сада.',
    description: 'Защита растений'
  }
];

// Вопросы варианта Б с ID и категориями
const questionsB = [
  {
    id: 'b-1',
    text: 'Обслуживать машины, приборы (следить, регулировать)',
    description: 'Техническое обслуживание'
  },
  {
    id: 'b-2',
    text: 'Составлять таблицы, схемы и программировать.',
    description: 'Информационная систематизация'
  },
  {
    id: 'b-3',
    text: 'Следить за состоянием, развитием растений.',
    description: 'Ботаническое наблюдение'
  },
  {
    id: 'b-4',
    text: 'Рекламировать и продавать товары.',
    description: 'Коммерческая деятельность'
  },
  {
    id: 'b-5',
    text: 'Обсуждать художественные книги.',
    description: 'Литературная дискуссия'
  },
  {
    id: 'b-6',
    text: 'Тренировать сверстников (или младших) в выполнении каких-либо действий (учебных, спортивных и т.п.).',
    description: 'Педагогическая деятельность'
  },
  {
    id: 'b-7',
    text: 'Управлять каким-либо транспортным средством.',
    description: 'Транспортное управление'
  },
  {
    id: 'b-8',
    text: 'Творчески оформлять выставки, участвовать в подготовке концертов, пьес и т.п.',
    description: 'Творческая организация'
  },
  {
    id: 'b-9',
    text: 'Искать и исправлять ошибки в текстах, таблицах, рисунках.',
    description: 'Аналитическая проверка'
  },
  {
    id: 'b-10',
    text: 'Выполнять расчёты, вычисления.',
    description: 'Математические операции'
  },
  {
    id: 'b-11',
    text: 'Создавать новые виды технических изделий (приборы, машины, одежду, дома и т.п.).',
    description: 'Техническое творчество'
  },
  {
    id: 'b-12',
    text: 'Разбираться в чертежах, схемах, таблицах.',
    description: 'Техническая документация'
  },
  {
    id: 'b-13',
    text: 'Наблюдать, изучать жизнь микроорганизмов.',
    description: 'Микробиологическое исследование'
  },
  {
    id: 'b-14',
    text: 'Оказывать людям медицинскую помощь при ранениях, ушибах, ожогах и т.п.',
    description: 'Экстренная медицинская помощь'
  },
  {
    id: 'b-15',
    text: 'Художественно описывать, изображать события, сочинять истории.',
    description: 'Художественное творчество'
  },
  {
    id: 'b-16',
    text: 'Принимать, осматривать больных, беседовать с ними, назначать лечение.',
    description: 'Клиническая медицина'
  },
  {
    id: 'b-17',
    text: 'Строить здания или осуществлять сборку машин или техники.',
    description: 'Инженерно-строительная деятельность'
  },
  {
    id: 'b-18',
    text: 'Играть на сцене, принимать участие в концертах.',
    description: 'Сценическое искусство'
  },
  {
    id: 'b-19',
    text: 'Заниматься черчением, проектированием, создавать 3D-модели',
    description: 'Проектирование и моделирование'
  },
  {
    id: 'b-20',
    text: 'Работать со сложной техникой (3D-принтер, фрейзер, лазер и т.п.)',
    description: 'Современные технологии'
  }
];

// Словари для подсчета (true = вариант А, false = вариант Б)
const HumanNature: { [key: number]: boolean } = {
  1: true, 3: false, 6: true, 10: true, 11: true, 13: false, 16: true, 20: true
};

const HumanTech: { [key: number]: boolean } = {
  1: false, 4: true, 7: false, 9: true, 11: false, 14: true, 17: false, 19: true
};

const HumanHuman: { [key: number]: boolean } = {
  2: true, 4: false, 6: false, 8: true, 12: true, 14: false, 16: false, 18: true
};

const HumanSys: { [key: number]: boolean } = {
  2: false, 5: true, 9: false, 10: false, 12: false, 15: true, 19: false, 20: false
};

const HumanArt: { [key: number]: boolean } = {
  3: true, 5: false, 7: true, 8: false, 13: true, 15: false, 17: true, 18: false
};

// Названия и описания категорий
const categories = {
  humanNature: {
    name: 'Человек-Природа',
    description: 'Работа с живой природой, животными и растениями',
    professions: 'Биолог, ветеринар, агроном, эколог',
    icon: '🌿'
  },
  humanTech: {
    name: 'Человек-Техника',
    description: 'Работа с техникой, механизмами, материалами',
    professions: 'Инженер, механик, конструктор, технолог',
    icon: '🔧'
  },
  humanHuman: {
    name: 'Человек-Человек',
    description: 'Работа с людьми, общение, помощь, обучение',
    professions: 'Учитель, врач, психолог, менеджер',
    icon: '👥'
  },
  humanSys: {
    name: 'Человек-Знак',
    description: 'Работа со знаками, цифрами, системами, информацией',
    professions: 'Программист, бухгалтер, аналитик, исследователь',
    icon: '📊'
  },
  humanArt: {
    name: 'Человек-Художественный образ',
    description: 'Работа с образами, творчество, искусство',
    professions: 'Художник, дизайнер, музыкант, актер',
    icon: '🎨'
  }
};

export function ProfessionalOrientationTest({ onBack }: ProfessionalOrientationTestProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveTestResult, isLoading: isSaving } = useTest();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>(Array(20).fill(null));
  const [counts, setCounts] = useState({
    humanNature: 0,
    humanTech: 0,
    humanHuman: 0,
    humanSys: 0,
    humanArt: 0
  });
  const [timer, setTimer] = useState(1200); // 20 минут в секундах
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [progressHistory, setProgressHistory] = useState<boolean[]>([]);

  // Вставка CSS-анимаций
  useEffect(() => {
    if (typeof document === 'undefined') return;
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
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

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

  // Подсчет баллов по категориям
  const calculateCounts = (answers: boolean[]) => {
    const newCounts = {
      humanNature: 0,
      humanTech: 0,
      humanHuman: 0,
      humanSys: 0,
      humanArt: 0
    };

    answers.forEach((answer, index) => {
      const questionNumber = index + 1;

      if (HumanNature[questionNumber] !== undefined && HumanNature[questionNumber] === answer) {
        newCounts.humanNature++;
      }
      if (HumanTech[questionNumber] !== undefined && HumanTech[questionNumber] === answer) {
        newCounts.humanTech++;
      }
      if (HumanHuman[questionNumber] !== undefined && HumanHuman[questionNumber] === answer) {
        newCounts.humanHuman++;
      }
      if (HumanSys[questionNumber] !== undefined && HumanSys[questionNumber] === answer) {
        newCounts.humanSys++;
      }
      if (HumanArt[questionNumber] !== undefined && HumanArt[questionNumber] === answer) {
        newCounts.humanArt++;
      }
    });

    return newCounts;
  };

  // Обработка выбора варианта
  const handleAnswer = (isVariantA: boolean) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = isVariantA;
    setSelectedAnswers(newAnswers);

    // Сохраняем в историю
    const newHistory = [...progressHistory];
    newHistory[currentQuestion] = isVariantA;
    setProgressHistory(newHistory);

    // Обновляем счетчики
    const newCounts = calculateCounts(newAnswers);
    setCounts(newCounts);
    setError(null);

    // Если это был последний вопрос
    if (currentQuestion === 19) {
      completeTest();
      return;
    }

    // Переходим к следующему вопросу
    setCurrentQuestion(currentQuestion + 1);
  };

  // Возврат к предыдущему вопросу
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
      const timeSpent = 1200 - timer;
      const dominantCategory = Object.keys(categories).reduce((a, b) =>
        counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b
      );

      const result = {
        testType: 'professional-orientation' as const,
        score: Math.max(...Object.values(counts)),
        answers: selectedAnswers.map((answer, index) => ({
          questionId: index + 1,
          questionA: questionsA[index],
          questionB: questionsB[index],
          selectedAnswer: answer,
          categories: {
            humanNature: HumanNature[index + 1] === answer ? 1 : 0,
            humanTech: HumanTech[index + 1] === answer ? 1 : 0,
            humanHuman: HumanHuman[index + 1] === answer ? 1 : 0,
            humanSys: HumanSys[index + 1] === answer ? 1 : 0,
            humanArt: HumanArt[index + 1] === answer ? 1 : 0
          }
        })),
        metadata: {
          completedAt: new Date().toISOString(),
          timeSpent,
          userEmail: user?.email,
          userName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          totalQuestions: 20,
          answeredQuestions: selectedAnswers.filter(a => a !== null).length,
          categoryScores: counts,
          dominantCategory: categories[dominantCategory as keyof typeof categories].name,
          dominantCategoryIcon: categories[dominantCategory as keyof typeof categories].icon,
          professionRecommendations: categories[dominantCategory as keyof typeof categories].professions,
          testType: 'Дифференциально-диагностический опросник Е.А. Климова'
        }
      };

      await saveTestResult(result);
      setIsCompleted(true);

      // Перенаправление на страницу результатов через 2 секунды
      setTimeout(() => {
        navigate('/my-results?test=professional-orientation&new=true');
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
    const unanswered = selectedAnswers.filter(a => a === null).length;
    if (unanswered > 0) {
      setShowConfirmDialog(true);
    } else {
      saveResultsToServer();
    }
  };

  // Пропустить вопрос (только для административных целей)
  const handleSkip = () => {
    if (currentQuestion < 19) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = null;
      setSelectedAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setError(null);
    }
  };

  // Подсчет отвеченных вопросов
  const answeredCount = selectedAnswers.filter(a => a !== null).length;
  const completionPercentage = Math.round((answeredCount / 20) * 100);
  const timeWarning = timer < 300; // 5 минут
  const dominantCategory = Object.keys(categories).reduce((a, b) =>
    counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b
  );

  if (isCompleted) {
    const maxScore = Math.max(...Object.values(counts));
    const dominantCat = categories[dominantCategory as keyof typeof categories];

    return (
      <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Card className="max-w-4xl w-full animate-fade-in">
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 mb-4">
                <Briefcase className="size-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Тест профессиональной направленности завершен!</CardTitle>
              <CardDescription className="text-lg">
                Ваша ведущая профессиональная сфера определена
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Доминирующая категория */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl">
              <div className="text-center">
                <div className="text-5xl mb-3">{dominantCat.icon}</div>
                <div className="text-2xl font-bold text-green-700 mb-2">{dominantCat.name}</div>
                <div className="text-gray-600 mb-4">{dominantCat.description}</div>
                <div className="text-lg text-blue-700 font-medium">
                  Рекомендуемые профессии: {dominantCat.professions}
                </div>
                <div className="mt-4">
                  <Progress value={(maxScore / 8) * 100} className="h-2" />
                  <div className="text-sm text-gray-500 mt-1">
                    {maxScore} баллов из 8 возможных
                  </div>
                </div>
              </div>
            </div>

            {/* Все категории */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categories).map(([key, category]) => {
                const score = counts[key as keyof typeof counts];
                const isDominant = key === dominantCategory;

                return (
                  <div
                    key={key}
                    className={`p-4 rounded-lg border transition-all ${
                      isDominant
                        ? 'border-green-300 bg-green-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <span className={`text-xl font-medium ${
                        isDominant ? 'text-green-600' : 'text-gray-700'
                      }`}>
                        {score}/8
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-800 mb-1">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      {category.description}
                    </div>
                    <Progress
                      value={(score / 8) * 100}
                      className={`h-1 ${isDominant ? 'bg-green-200' : 'bg-gray-200'}`}
                    />
                    {isDominant && (
                      <div className="text-xs text-green-600 font-medium mt-2">
                        Ваша ведущая сфера
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={() => navigate('/my-results?test=professional-orientation')}
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
              Время прохождения: {formatTime(1200 - timer)} • Вопросов отвечено: {answeredCount} из 20
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestionDataA = questionsA[currentQuestion];
  const currentQuestionDataB = questionsB[currentQuestion];

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
                  <CardTitle className="text-xl md:text-2xl">Тест профессиональной направленности</CardTitle>
                  <CardDescription className="text-sm">
                    Дифференциально-диагностический опросник Е.А. Климова
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
                  Вопрос {currentQuestion + 1} из 20
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
                <Progress value={completionPercentage} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {categories[dominantCategory as keyof typeof categories].icon}
                </div>
                <div className="text-sm text-gray-600">Текущая лидирующая сфера</div>
                <div className="text-xs text-gray-500 mt-1">
                  {categories[dominantCategory as keyof typeof categories].name}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.max(...Object.values(counts))}/8
                </div>
                <div className="text-sm text-gray-600">Максимальный балл</div>
                <Progress value={(Math.max(...Object.values(counts)) / 8) * 100} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm md:text-base">
              <h4 className="font-medium text-blue-800 flex items-center gap-2">
                <Briefcase className="size-5" />
                Инструкция:
              </h4>
              <p className="text-gray-700">
                <strong>Вопрос: &quot;Мне бы больше понравилось...&quot;</strong>
              </p>
              <p className="text-gray-600">
                Выберите один из двух вариантов, который лучше описывает ваши предпочтения и склонности.
                Не задумывайтесь слишком долго - выберите тот вариант, который кажется вам более привлекательным.
              </p>
              <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
                <p className="text-blue-800 font-medium">Совет:</p>
                <p className="text-blue-700 text-sm">
                  Думайте о том, чем вам действительно нравилось бы заниматься, а не о том, что кажется более престижным или выгодным
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Question Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Вариант А */}
          <Card
            className={`cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedAnswers[currentQuestion] === true
                ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]'
                : 'border-blue-200 hover:border-blue-400 hover:shadow-lg'
            }`}
            onClick={() => handleAnswer(true)}
            disabled={isSubmitting}
          >
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
              <div className="flex items-center justify-between">
                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Вариант А
                </div>
                {selectedAnswers[currentQuestion] === true && (
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Выбрано
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-lg font-medium text-gray-800 leading-relaxed">
                  {currentQuestionDataA.text}
                </div>
                <div className="text-sm text-gray-600 italic">
                  {currentQuestionDataA.description}
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">Предпочитаю этот вариант</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Вариант Б */}
          <Card
            className={`cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedAnswers[currentQuestion] === false
                ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]'
                : 'border-purple-200 hover:border-purple-400 hover:shadow-lg'
            }`}
            onClick={() => handleAnswer(false)}
            disabled={isSubmitting}
          >
            <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
              <div className="flex items-center justify-between">
                <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Вариант Б
                </div>
                {selectedAnswers[currentQuestion] === false && (
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Выбрано
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-lg font-medium text-gray-800 leading-relaxed">
                  {currentQuestionDataB.text}
                </div>
                <div className="text-sm text-gray-600 italic">
                  {currentQuestionDataB.description}
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700 font-medium">Предпочитаю этот вариант</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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

            {currentQuestion < 19 ? (
              <Button
                onClick={() => handleSkip()}
                disabled={isSubmitting}
                className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Пропустить вопрос
              </Button>
            ) : (
              <Button
                onClick={completeTest}
                disabled={isSubmitting || selectedAnswers[currentQuestion] === null}
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

        {/* Progress Indicators */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Прогресс по вопросам:
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 20 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  disabled={isSubmitting}
                  className={`size-8 md:size-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    selectedAnswers[idx] !== null
                      ? idx === currentQuestion
                        ? 'bg-green-500 text-white scale-110 ring-2 ring-offset-1 ring-green-300'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                      : idx === currentQuestion
                        ? 'bg-blue-500 text-white scale-110 ring-2 ring-offset-1 ring-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={`Вопрос ${idx + 1}${selectedAnswers[idx] !== null ? ' (отвечен)' : ''}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Category Scores */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Текущие баллы по сферам:
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  className={`p-3 rounded-lg border text-center ${
                    key === dominantCategory
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-xl mb-1">{category.icon}</div>
                  <div className="text-xs text-gray-600 mb-1">{category.name}</div>
                  <div className="text-lg font-bold text-gray-800">
                    {counts[key as keyof typeof counts]}
                  </div>
                </div>
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
                Вы ответили на {answeredCount} из 20 вопросов.
                {answeredCount < 20 && ` Неотвеченные ${20 - answeredCount} вопросов будут автоматически распределены.`}
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">Текущие результаты:</p>
                <div className="space-y-1">
                  {Object.entries(categories).map(([key, category]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{category.name}</span>
                      <span className="font-medium">{counts[key as keyof typeof counts]} баллов</span>
                    </div>
                  ))}
                </div>
              </div>
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
    </div>
  );
}

export default ProfessionalOrientationTest;