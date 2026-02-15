import { SimpleButton as Button } from '../../../ui/buttons/SimpleButton';
import { TestConfig } from '../../types/test-types';

interface TestEngineControlsProps {
  testConfig: TestConfig;
  currentQuestion: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCompleteEarly: () => void;
}

export function TestEngineControls({
  testConfig,
  currentQuestion,
  isSubmitting,
  onPrevious,
  onNext,
  onCompleteEarly,
}: TestEngineControlsProps) {
  const isLastQuestion = currentQuestion >= testConfig.questions.length - 1;

  return (
    <div>
      <div>
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0 || isSubmitting}
        >
          Назад
        </Button>

        <Button
          onClick={onNext}
          disabled={isSubmitting}
        >
          {isLastQuestion
            ? (isSubmitting ? 'Сохранение...' : 'Завершить тест')
            : 'Далее'}
        </Button>
      </div>

      <Button
        variant="outline"
        onClick={onCompleteEarly}
        disabled={isSubmitting}
      >
        Завершить досрочно
      </Button>
    </div>
  );
}