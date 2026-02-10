import { SimpleButton as Button } from '../../../ui/buttons/SimpleButton';
import { Card, CardContent } from '../../../SimpleUI';
import { TestConfig } from '../../types/test-types';
import { isAnswerValid } from './utils';

interface TestEngineNavigationProps {
  testConfig: TestConfig;
  currentQuestion: number;
  answers: any[];
  isSubmitting: boolean;
  onQuestionSelect: (index: number) => void;
}

export function TestEngineNavigation({
  testConfig,
  currentQuestion,
  answers,
  isSubmitting,
  onQuestionSelect,
}: TestEngineNavigationProps) {
  return (
    <Card>
      <CardContent>
        <div>
          Быстрая навигация по вопросам:
        </div>
        <div>
          {testConfig.questions.map((_, idx) => {
            const isAnswered = isAnswerValid(answers[idx]);
            const isCurrent = idx === currentQuestion;

            return (
              <button
                key={idx}
                onClick={() => onQuestionSelect(idx)}
                disabled={isSubmitting}
                title={`Вопрос ${idx + 1}${isAnswered ? ' (отвечен)' : ''}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
