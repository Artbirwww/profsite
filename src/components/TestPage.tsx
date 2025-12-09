import { useState } from 'react';
import { SimpleButton as Button } from './SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './SimpleUI';
import { SimpleProgress as Progress } from './SimpleProgress';
import { ArrowLeft } from './SimpleIcons';
import { TemperamentTest } from './TemperamentTest';
import { GroupRolesTest } from './GroupRolesTest';
import { ProfessionalOrientationTest } from './ProfessionalOrientationTest';
import type { User, TestGroup, TestResult } from '../App';

interface TestPageProps {
  user: User;
  testGroup: TestGroup;
  onComplete: (result: Partial<TestResult>) => void;
  onBack: () => void;
}

// Данные о группах тестов
const groupsData = {
  temperament: {
    title: 'Темперамент',
    description: 'Определение типа темперамента',
    icon: '🎭',
    questions: [
      {
        id: 't1',
        question: 'В новой компании я обычно:',
        options: [
          { value: 'sanguine', label: 'Легко завожу новые знакомства', score: 3 },
          { value: 'choleric', label: 'Стремлюсь занять лидирующую позицию', score: 2 },
          { value: 'phlegmatic', label: 'Наблюдаю и присматриваюсь', score: 1 },
          { value: 'melancholic', label: 'Чувствую себя напряженно', score: 0 },
        ],
      },
      {
        id: 't2',
        question: 'Мое настроение:',
        options: [
          { value: 'sanguine', label: 'Часто меняется в течение дня', score: 3 },
          { value: 'choleric', label: 'Зависит от достижения целей', score: 2 },
          { value: 'phlegmatic', label: 'Обычно стабильное и ровное', score: 1 },
          { value: 'melancholic', label: 'Склонно к переживаниям', score: 0 },
        ],
      },
      {
        id: 't3',
        question: 'В стрессовой ситуации я:',
        options: [
          { value: 'sanguine', label: 'Стараюсь отвлечься и не думать о проблеме', score: 3 },
          { value: 'choleric', label: 'Активно ищу решение проблемы', score: 2 },
          { value: 'phlegmatic', label: 'Сохраняю спокойствие и действую методично', score: 1 },
          { value: 'melancholic', label: 'Глубоко переживаю и анализирую ситуацию', score: 0 },
        ],
      },
      {
        id: 't4',
        question: 'Моя работоспособность:',
        options: [
          { value: 'sanguine', label: 'Высокая, но быстро пропадает интерес', score: 3 },
          { value: 'choleric', label: 'Максимальная при наличии цели', score: 2 },
          { value: 'phlegmatic', label: 'Стабильная и равномерная', score: 1 },
          { value: 'melancholic', label: 'Зависит от эмоционального состояния', score: 0 },
        ],
      },
      {
        id: 't5',
        question: 'В общении я:',
        options: [
          { value: 'sanguine', label: 'Открытый и разговорчивый', score: 3 },
          { value: 'choleric', label: 'Прямой и категоричный', score: 2 },
          { value: 'phlegmatic', label: 'Сдержанный и немногословный', score: 1 },
          { value: 'melancholic', label: 'Осторожный и тактичный', score: 0 },
        ],
      },
    ],
  },
  groupRoles: {
    title: 'Групповые роли',
    description: 'Определение роли в команде по Белбину',
    icon: '👥',
    questions: [
      {
        id: 'g1',
        question: 'В команде я предпочитаю:',
        options: [
          { value: 'innovator', label: 'Придумывать новые идеи и решения', score: 3 },
          { value: 'coordinator', label: 'Координировать работу команды', score: 2 },
          { value: 'implementer', label: 'Выполнять задачи четко и последовательно', score: 1 },
          { value: 'analyst', label: 'Анализировать информацию и оценивать варианты', score: 0 },
        ],
      },
      {
        id: 'g2',
        question: 'Мои сильные стороны:',
        options: [
          { value: 'communicator', label: 'Общение и налаживание контактов', score: 3 },
          { value: 'finisher', label: 'Доведение дел до конца', score: 2 },
          { value: 'specialist', label: 'Глубокие знания в определенной области', score: 1 },
          { value: 'teamworker', label: 'Поддержка и помощь членам команды', score: 0 },
        ],
      },
      {
        id: 'g3',
        question: 'При решении проблем я склонен:',
        options: [
          { value: 'innovator', label: 'Искать нестандартные подходы', score: 3 },
          { value: 'implementer', label: 'Следовать проверенным методам', score: 2 },
          { value: 'analyst', label: 'Тщательно взвешивать все за и против', score: 1 },
          { value: 'coordinator', label: 'Организовывать других для решения', score: 0 },
        ],
      },
      {
        id: 'g4',
        question: 'В групповых проектах я обычно:',
        options: [
          { value: 'innovator', label: 'Генерирую креативные идеи', score: 3 },
          { value: 'coordinator', label: 'Распределяю задачи и контролирую сроки', score: 2 },
          { value: 'implementer', label: 'Выполняю конкретные задания', score: 1 },
          { value: 'teamworker', label: 'Поддерживаю позитивную атмосферу', score: 0 },
        ],
      },
      {
        id: 'g5',
        question: 'Что мне дается легче всего:',
        options: [
          { value: 'communicator', label: 'Находить общий язык с разными людьми', score: 3 },
          { value: 'specialist', label: 'Углубляться в детали и становиться экспертом', score: 2 },
          { value: 'finisher', label: 'Доводить начатое до идеального результата', score: 1 },
          { value: 'analyst', label: 'Критически оценивать предложения', score: 0 },
        ],
      },
    ],
  },
  professionalOrientation: {
    title: 'Профессиональная направленность',
    description: 'Типы профессий по Климову',
    icon: '💼',
    questions: [
      {
        id: 'p1',
        question: 'Мне больше нравится работать:',
        options: [
          { value: 'human', label: 'С людьми (обучение, консультирование)', score: 3 },
          { value: 'tech', label: 'С техникой и механизмами', score: 2 },
          { value: 'sign', label: 'С информацией и документами', score: 1 },
          { value: 'art', label: 'В творческой сфере', score: 0 },
        ],
      },
      {
        id: 'p2',
        question: 'Меня привлекает:',
        options: [
          { value: 'human', label: 'Помогать людям решать их проблемы', score: 3 },
          { value: 'tech', label: 'Разбираться, как устроены вещи', score: 2 },
          { value: 'sign', label: 'Работать с числами и данными', score: 1 },
          { value: 'art', label: 'Создавать что-то красивое', score: 0 },
        ],
      },
      {
        id: 'p3',
        question: 'В свободное время я предпочитаю:',
        options: [
          { value: 'human', label: 'Общаться с друзьями', score: 3 },
          { value: 'tech', label: 'Ремонтировать или собирать что-то', score: 2 },
          { value: 'sign', label: 'Решать головоломки и логические задачи', score: 1 },
          { value: 'art', label: 'Заниматься творчеством', score: 0 },
        ],
      },
      {
        id: 'p4',
        question: 'Я бы хотел работать:',
        options: [
          { value: 'human', label: 'Учителем, психологом, врачом', score: 3 },
          { value: 'tech', label: 'Инженером, программистом, механиком', score: 2 },
          { value: 'sign', label: 'Бухгалтером, аналитиком, секретарем', score: 1 },
          { value: 'art', label: 'Дизайнером, художником, музыкантом', score: 0 },
        ],
      },
      {
        id: 'p5',
        question: 'Мои сильные стороны:',
        options: [
          { value: 'human', label: 'Эмпатия и понимание людей', score: 3 },
          { value: 'tech', label: 'Техническое мышление', score: 2 },
          { value: 'sign', label: 'Внимательность к деталям', score: 1 },
          { value: 'art', label: 'Креативность и воображение', score: 0 },
        ],
      },
    ],
  },
  engineeringThinking: {
    title: 'Инженерное мышление',
    description: 'Оценка технических способностей',
    icon: '⚙️',
    questions: [
      {
        id: 'e1',
        question: 'Когда вижу сложный механизм:',
        options: [
          { value: 'high', label: 'Хочу разобраться, как он работает', score: 3 },
          { value: 'medium', label: 'Интересуюсь его назначением', score: 2 },
          { value: 'low', label: 'Просто использую по инструкции', score: 1 },
          { value: 'none', label: 'Предпочитаю не разбираться', score: 0 },
        ],
      },
      {
        id: 'e2',
        question: 'Решение технических задач:',
        options: [
          { value: 'high', label: 'Увлекает и доставляет удовольствие', score: 3 },
          { value: 'medium', label: 'Интересно, если задача практична', score: 2 },
          { value: 'low', label: 'Делаю, если необходимо', score: 1 },
          { value: 'none', label: 'Вызывает затруднения', score: 0 },
        ],
      },
      {
        id: 'e3',
        question: 'Работа с чертежами и схемами:',
        options: [
          { value: 'high', label: 'Легко понимаю и создаю сам', score: 3 },
          { value: 'medium', label: 'Могу разобраться при необходимости', score: 2 },
          { value: 'low', label: 'Требуется время и объяснения', score: 1 },
          { value: 'none', label: 'Сложно понять', score: 0 },
        ],
      },
      {
        id: 'e4',
        question: 'Ремонт и сборка техники:',
        options: [
          { value: 'high', label: 'Люблю и часто занимаюсь этим', score: 3 },
          { value: 'medium', label: 'Могу справиться с простым ремонтом', score: 2 },
          { value: 'low', label: 'Предпочитаю обратиться к специалисту', score: 1 },
          { value: 'none', label: 'Избегаю таких задач', score: 0 },
        ],
      },
      {
        id: 'e5',
        question: 'Логические и пространственные задачи:',
        options: [
          { value: 'high', label: 'Решаю быстро и с интересом', score: 3 },
          { value: 'medium', label: 'Справляюсь, но требуется время', score: 2 },
          { value: 'low', label: 'Даются с трудом', score: 1 },
          { value: 'none', label: 'Избегаю таких заданий', score: 0 },
        ],
      },
    ],
  },
  intellectualPotential: {
    title: 'Интеллектуальный потенциал',
    description: 'Анализ когнитивных способностей',
    icon: '🧠',
    questions: [
      {
        id: 'i1',
        question: 'Новую информацию я:',
        options: [
          { value: 'high', label: 'Усваиваю быстро и легко запоминаю', score: 3 },
          { value: 'medium', label: 'Понимаю после объяснения', score: 2 },
          { value: 'low', label: 'Требуется повторение', score: 1 },
          { value: 'none', label: 'Усваиваю с трудом', score: 0 },
        ],
      },
      {
        id: 'i2',
        question: 'При решении сложных задач:',
        options: [
          { value: 'high', label: 'Нахожу несколько способов решения', score: 3 },
          { value: 'medium', label: 'Следую известному алгоритму', score: 2 },
          { value: 'low', label: 'Нужна помощь или подсказка', score: 1 },
          { value: 'none', label: 'Испытываю значительные затруднения', score: 0 },
        ],
      },
      {
        id: 'i3',
        question: 'Моя память:',
        options: [
          { value: 'high', label: 'Отличная, легко запоминаю детали', score: 3 },
          { value: 'medium', label: 'Хорошая для важной информации', score: 2 },
          { value: 'low', label: 'Средняя, иногда забываю', score: 1 },
          { value: 'none', label: 'Часто испытываю трудности с запоминанием', score: 0 },
        ],
      },
      {
        id: 'i4',
        question: 'Анализ и синтез информации:',
        options: [
          { value: 'high', label: 'Легко выделяю главное и делаю выводы', score: 3 },
          { value: 'medium', label: 'Справляюсь при наличии времени', score: 2 },
          { value: 'low', label: 'Требуется структурированная информация', score: 1 },
          { value: 'none', label: 'Вызывает затруднения', score: 0 },
        ],
      },
      {
        id: 'i5',
        question: 'Обучение новым навыкам:',
        options: [
          { value: 'high', label: 'Осваиваю быстро и самостоятельно', score: 3 },
          { value: 'medium', label: 'Требуется практика и инструкции', score: 2 },
          { value: 'low', label: 'Нужно много времени и помощь', score: 1 },
          { value: 'none', label: 'Предпочитаю не учиться новому', score: 0 },
        ],
      },
    ],
  },
};

export function TestPage({ user, testGroup, onComplete, onBack }: TestPageProps) {
  // Если это тест темперамента, используем специальный компонент
  if (testGroup === 'temperament') {
    return <TemperamentTest user={user} onComplete={onComplete} onBack={onBack} />;
  }

  // Если это тест групповых ролей, используем специальный компонент
  if (testGroup === 'groupRoles') {
    return <GroupRolesTest user={user} onComplete={onComplete} onBack={onBack} />;
  }

  // Если это тест профессиональной направленности, используем специальный компонент
  if (testGroup === 'professionalOrientation') {
    return <ProfessionalOrientationTest user={user} onComplete={onComplete} onBack={onBack} />;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const groupData = groupsData[testGroup];
  const questions = groupData.questions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    // Подсчет результатов
    const results: { [key: string]: number } = {};
    
    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          results[answer] = (results[answer] || 0) + option.score;
        }
      }
    });

    // Формируем результат для этой группы
    const groupResult: Partial<TestResult> = {};
    
    switch (testGroup) {
      case 'temperament':
        groupResult.temperament = results;
        break;
      case 'groupRoles':
        groupResult.groupRoles = results;
        break;
      case 'professionalOrientation':
        groupResult.professionalOrientation = results;
        break;
      case 'engineeringThinking':
        groupResult.engineeringThinking = results;
        break;
      case 'intellectualPotential':
        groupResult.intellectualPotential = results;
        break;
    }

    onComplete(groupResult);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = !!answers[currentQ.id];
  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{groupData.icon}</div>
              <div className="flex-1">
                <CardTitle>{groupData.title}</CardTitle>
                <CardDescription>{groupData.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="size-4 mr-2" />
                Назад
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Вопрос {currentQuestion + 1} из {questions.length}</span>
                <span className="text-indigo-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  answers[currentQ.id] === option.value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQ.id] === option.value
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQ.id] === option.value && (
                      <div className="size-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className={answers[currentQ.id] === option.value ? 'text-indigo-700' : ''}>
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Назад
              </Button>

              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                >
                  Далее
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!allAnswered}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Завершить
                </Button>
              )}
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`size-2 rounded-full transition-all ${
                    answers[q.id]
                      ? 'bg-green-500'
                      : idx === currentQuestion
                      ? 'bg-indigo-500 scale-125'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}