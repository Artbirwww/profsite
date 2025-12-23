// src/components/tests/testpage/TestPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { SimpleProgress as Progress } from '../../ui/feedback/SimpleProgress';
import { ArrowLeft } from '../../ui/display/SimpleIcons';
import { TemperamentTest } from '../temperament/TemperamentTest';
import { GroupRolesTest } from '../grouproles/GroupRolesTest';
import { ProfessionalOrientationTest } from '../profsphere/ProfessionalOrientationTest';
import { EngineeringThinkingTest } from '../engineer/EngineeringThinkingTest';

// Данные о группах тестов (только для generic-тестов)
const groupsData = {
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

export function TestPage() {
  const { group } = useParams<{ group: string }>();
  const { currentUser, handleTestGroupComplete } = useApp();
  const navigate = useNavigate();

  // ✅ Состояния вынесены на уровень компонента — критически важно!
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!currentUser || !group) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, group, navigate]);

  if (!currentUser || !group) {
    return null;
  }

  // Специальные тесты — рендерим как есть
  if (group === 'temperament') {
    return <TemperamentTest />;
  }
  if (group === 'groupRoles') {
    return <GroupRolesTest />;
  }
  if (group === 'professionalOrientation') {
    return <ProfessionalOrientationTest />;
  }
  if (group === 'engineeringThinking') {
    return <EngineeringThinkingTest />;
  }

  // Generic-тест: intellectualPotential
  if (group === 'intellectualPotential') {
    const groupData = groupsData.intellectualPotential;
    const questions = groupData.questions;
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const handleAnswer = (questionId: string, value: string) => {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
      setCurrentQuestion(prev => prev + 1);
    };

    const handlePrevious = () => {
      setCurrentQuestion(prev => prev - 1);
    };

    const handleComplete = () => {
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

      handleTestGroupComplete({ intellectualPotential: results });
      navigate('/dashboard');
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
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  <ArrowLeft className="size-4 mr-2" />
                  Назад
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
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
                    <div
                      className={`size-5 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQ.id] === option.value
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers[currentQ.id] === option.value && (
                        <div className="size-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={
                        answers[currentQ.id] === option.value ? 'text-indigo-700' : ''
                      }
                    >
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
                  <Button onClick={handleNext} disabled={!isAnswered}>
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

  // Неизвестная группа — перенаправляем
  navigate('/dashboard', { replace: true });
  return null;
}