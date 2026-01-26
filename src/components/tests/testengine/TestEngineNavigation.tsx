import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent } from '../../SimpleUI';
import { TestConfig } from '../types/test-types';
import { isAnswerValid } from './utils';
import './TestEngine.css';

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
      <CardContent className="test-engine-nav-content">
        <div className="test-engine-nav-title">
          Быстрая навигация по вопросам:
        </div>
        <div className="test-engine-nav-buttons">
          {testConfig.questions.map((_, idx) => {
            const isAnswered = isAnswerValid(answers[idx]);
            const isCurrent = idx === currentQuestion;
            
            let buttonClass = 'test-engine-nav-button';
            if (isAnswered) {
              buttonClass += ' test-engine-nav-button-answered';
            } else {
              buttonClass += ' test-engine-nav-button-unanswered';
            }
            if (isCurrent) {
              buttonClass += ' test-engine-nav-button-current';
            }

            return (
              <button
                key={idx}
                onClick={() => onQuestionSelect(idx)}
                disabled={isSubmitting}
                className={buttonClass}
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
