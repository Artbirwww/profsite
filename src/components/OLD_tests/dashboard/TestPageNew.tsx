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
    <div>
      <div>
        {/* Header */}
        <Card>
          <CardHeader>
            <div>
              <div>{groupData.icon}</div>
              <div>
                <CardTitle>{groupData.title}</CardTitle>
                <CardDescription>{groupData.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft />
                Назад
              </Button>
            </div>
            <div>
              <div>
                <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle>{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQ.id, option.value)}
              >
                <div>
                  <div>
                    {answers[currentQ.id] === option.value && (
                      <div />
                    )}
                  </div>
                  <span>
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent>
            <div>
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
                >
                  Завершить
                </Button>
              )}
            </div>

            {/* Progress dots */}
            <div>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}