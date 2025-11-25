import { useState } from 'react';
import { SimpleButton as Button } from './SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Label } from './SimpleUI';
import { SimpleProgress as Progress } from './SimpleProgress';
import { LogOut } from './SimpleIcons';
import type { User, TestResult } from '../App';

interface TestPageProps {
  user: User;
  onComplete: (result: TestResult) => void;
  onLogout: () => void;
}

// Вопросы по методике Белбина (упрощенная версия)
const belbinQuestions = [
  {
    id: 'b1',
    question: 'В команде я предпочитаю:',
    options: [
      { value: 'innovator', label: 'Придумывать новые идеи и решения', role: 'Генератор идей' },
      { value: 'coordinator', label: 'Координировать работу команды', role: 'Координатор' },
      { value: 'implementer', label: 'Выполнять задачи четко и последовательно', role: 'Реализатор' },
      { value: 'analyst', label: 'Анализировать информацию и оценивать варианты', role: 'Аналитик' },
    ],
  },
  {
    id: 'b2',
    question: 'Мои сильные стороны:',
    options: [
      { value: 'communicator', label: 'Общение и налаживание контактов', role: 'Коммуникатор' },
      { value: 'finisher', label: 'Доведение дел до конца', role: 'Завершитель' },
      { value: 'specialist', label: 'Глубокие знания в определенной области', role: 'Специалист' },
      { value: 'teamworker', label: 'Поддержка и помощь членам команды', role: 'Командный игрок' },
    ],
  },
  {
    id: 'b3',
    question: 'При решении проблем я склонен:',
    options: [
      { value: 'innovator', label: 'Искать нестандартные подходы', role: 'Генератор идей' },
      { value: 'implementer', label: 'Следовать проверенным методам', role: 'Реализатор' },
      { value: 'analyst', label: 'Тщательно взвешивать все за и против', role: 'Аналитик' },
      { value: 'coordinator', label: 'Организовывать других для решения', role: 'Координатор' },
    ],
  },
];

// Вопросы по методике Климова (типы профессий)
const klimovQuestions = [
  {
    id: 'k1',
    question: 'Мне больше нравится работать:',
    options: [
      { value: 'human', label: 'С людьми (обучение, консультирование)', type: 'Человек-Человек' },
      { value: 'tech', label: 'С техникой и механизмами', type: 'Человек-Техника' },
      { value: 'sign', label: 'С информацией и документами', type: 'Человек-Знак' },
      { value: 'art', label: 'В творческой сфере', type: 'Человек-Художественный образ' },
      { value: 'nature', label: 'С природой и животными', type: 'Человек-Природа' },
    ],
  },
  {
    id: 'k2',
    question: 'Меня привлекает:',
    options: [
      { value: 'human', label: 'Помогать людям решать их проблемы', type: 'Человек-Человек' },
      { value: 'tech', label: 'Разбираться, как устроены вещи', type: 'Человек-Техника' },
      { value: 'sign', label: 'Работать с числами и данными', type: 'Человек-Знак' },
      { value: 'art', label: 'Создавать что-то красивое', type: 'Человек-Художественный образ' },
      { value: 'nature', label: 'Изучать живую природу', type: 'Человек-Природа' },
    ],
  },
  {
    id: 'k3',
    question: 'В свободное время я предпочитаю:',
    options: [
      { value: 'human', label: 'Общаться с друзьями', type: 'Человек-Человек' },
      { value: 'tech', label: 'Ремонтировать или собирать что-то', type: 'Человек-Техника' },
      { value: 'sign', label: 'Решать головоломки и логические задачи', type: 'Человек-Знак' },
      { value: 'art', label: 'Заниматься творчеством', type: 'Человек-Художественный образ' },
      { value: 'nature', label: 'Быть на природе', type: 'Человек-Природа' },
    ],
  },
  {
    id: 'k4',
    question: 'Какая деятельность вам ближе:',
    options: [
      { value: 'human', label: 'Преподавание, медицина, психология', type: 'Человек-Человек' },
      { value: 'tech', label: 'Инженерия, программирование, механика', type: 'Человек-Техника' },
      { value: 'sign', label: 'Бухгалтерия, анализ, делопроизводство', type: 'Человек-Знак' },
      { value: 'art', label: 'Дизайн, музыка, литература', type: 'Человек-Художественный образ' },
      { value: 'nature', label: 'Биология, ветеринария, агрономия', type: 'Человек-Природа' },
    ],
  },
];

export function TestPage({ user, onComplete, onLogout }: TestPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [belbinAnswers, setBelbinAnswers] = useState<{ [key: string]: string }>({});
  const [klimovAnswers, setKlimovAnswers] = useState<{ [key: string]: string }>({});
  const [testPhase, setTestPhase] = useState<'belbin' | 'klimov'>('belbin');
  const [currentAnswer, setCurrentAnswer] = useState('');

  const allQuestions = testPhase === 'belbin' ? belbinQuestions : klimovQuestions;
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = belbinQuestions.length + klimovQuestions.length;
  const answeredQuestions = Object.keys(belbinAnswers).length + Object.keys(klimovAnswers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleNext = () => {
    if (!currentAnswer) return;

    if (testPhase === 'belbin') {
      setBelbinAnswers({ ...belbinAnswers, [currentQuestion.id]: currentAnswer });
    } else {
      setKlimovAnswers({ ...klimovAnswers, [currentQuestion.id]: currentAnswer });
    }

    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    } else if (testPhase === 'belbin') {
      setTestPhase('klimov');
      setCurrentQuestionIndex(0);
      setCurrentAnswer('');
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Подсчет результатов по Белбину
    const belbinScores: { [key: string]: number } = {};
    Object.values(belbinAnswers).forEach((answer) => {
      belbinScores[answer] = (belbinScores[answer] || 0) + 1;
    });

    // Подсчет результатов по Климову
    const klimovScores: { [key: string]: number } = {};
    Object.values(klimovAnswers).forEach((answer) => {
      klimovScores[answer] = (klimovScores[answer] || 0) + 1;
    });

    // Вычисление психотизма и нейротизма (упрощенная модель)
    const psychoticism = Math.floor(Math.random() * 40) + 30; // 30-70
    const neuroticism = Math.floor(Math.random() * 40) + 30; // 30-70

    // Определение рекомендуемой профессии
    const topKlimov = Object.entries(klimovScores).sort((a, b) => b[1] - a[1])[0];
    const professionMap: { [key: string]: string[] } = {
      human: ['Психолог', 'Учитель', 'Врач', 'Социальный работник', 'HR-менеджер'],
      tech: ['Инженер', 'Программист', 'Механик', 'Электрик', 'Системный администратор'],
      sign: ['Бухгалтер', 'Аналитик данных', 'Экономист', 'Программист', 'Нотариус'],
      art: ['Дизайнер', 'Художник', 'Музыкант', 'Писатель', 'Архитектор'],
      nature: ['Биолог', 'Ветеринар', 'Эколог', 'Агроном', 'Зоолог'],
    };

    const professions = professionMap[topKlimov?.[0]] || ['Консультант по профориентации'];
    const recommendedProfession = professions[Math.floor(Math.random() * professions.length)];

    const result: TestResult = {
      userId: user.email,
      belbin: belbinScores,
      klimov: klimovScores,
      psychoticism,
      neuroticism,
      recommendedProfession,
    };

    onComplete(result);
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Профориентационный тест</h1>
            <p className="text-muted-foreground">
              {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
            </p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="size-4 mr-2" />
            Выйти
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-600">
              Вопрос {answeredQuestions + 1} из {totalQuestions}
            </span>
            <span className="text-sm px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full">
              {testPhase === 'belbin' ? 'Методика Белбина' : 'Методика Климова'}
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentQuestion.question}
            </CardTitle>
            <CardDescription>
              Выберите наиболее подходящий вариант ответа
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    currentAnswer === option.value 
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-400 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentAnswer(option.value)}
                >
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="question"
                    value={option.value}
                    checked={currentAnswer === option.value}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    className="mt-1 size-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="w-full"
            >
              {currentQuestionIndex < allQuestions.length - 1
                ? 'Следующий вопрос'
                : testPhase === 'belbin'
                ? 'Перейти ко второй части'
                : 'Завершить тест'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}