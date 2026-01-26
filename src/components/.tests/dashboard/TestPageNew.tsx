import { useState } from 'react';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { SimpleProgress as Progress } from '../../ui/feedback/SimpleProgress';
import { ArrowLeft } from '../../ui/display/SimpleIcons';
import type { User, TestGroup, TestResult } from '../../../App';

interface TestPageProps {
  user: User;
  testGroup: TestGroup;
  onComplete: (result: Partial<TestResult>) => void;
  onBack: () => void;
}

export function TestPageNew({ user, testGroup, onComplete, onBack }: TestPageProps) {
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
