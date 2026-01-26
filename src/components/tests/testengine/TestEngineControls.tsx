import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { TestConfig } from '../types/test-types';
//import './TestEngine.css';

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
    <div className="test-engine-controls">
      <div className="test-engine-controls-main">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0 || isSubmitting}
          className="test-engine-control-button"
        >
          Назад
        </Button>
        
        <Button
          onClick={onNext}
          disabled={isSubmitting}
          className={`test-engine-control-button ${
            isLastQuestion 
              ? 'test-engine-control-button-complete' 
              : 'test-engine-control-button-next'
          }`}
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
        className="test-engine-control-button-early"
      >
        Завершить досрочно
      </Button>
    </div>
  );
}
