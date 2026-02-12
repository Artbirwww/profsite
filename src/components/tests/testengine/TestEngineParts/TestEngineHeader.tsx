import { SimpleButton as Button } from '../../../ui/buttons/SimpleButton';
import { CardHeader, CardTitle, CardDescription } from '../../../SimpleUI';
import { TestConfig, TestQuestion } from '../../types/test-types';
import { formatTime } from './utils';

interface TestEngineHeaderProps {
  testConfig: TestConfig;
  currentQuestion: TestQuestion;
  remainingTime: number;
  isSubmitting: boolean;
  onBack?: () => void;
}

export function TestEngineHeader({
  testConfig,
  currentQuestion,
  remainingTime,
  isSubmitting,
  onBack,
}: TestEngineHeaderProps) {
  const timeWarning = remainingTime < 300;

  return (
    <CardHeader>
      <div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            disabled={isSubmitting}
          >
          </Button>
          <div>
            <CardTitle>{testConfig.name}</CardTitle>
            <CardDescription>
              {currentQuestion.category && (
                <span>
                  {currentQuestion.category}
                </span>
              )}
              <span>{testConfig.description}</span>
            </CardDescription>
          </div>
        </div>

        {testConfig.timeLimit && (
          <div>
            <div>
              <span>
                {formatTime(remainingTime)}
              </span>
            </div>
            <div>
              {timeWarning ? 'Осталось менее 5 минут!' : 'До завершения теста'}
            </div>
          </div>
        )}
      </div>
    </CardHeader>
  );
}
