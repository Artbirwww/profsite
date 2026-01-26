import { SimpleButton as Button } from '../../../ui/buttons/SimpleButton';
import { CardHeader, CardTitle, CardDescription } from '../../../SimpleUI';
import { ArrowLeft, Clock } from '../../../ui/display/SimpleIcons';
import { TestConfig, TestQuestion } from '../../types/test-types';
import { formatTime } from './utils';
import '../TestEngineStyle/TestEngine.css';

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
    <CardHeader className="test-engine-header">
      <div className="test-engine-header-content">
        <div className="test-engine-header-left">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onBack}
            disabled={isSubmitting}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <CardTitle className="test-engine-title">{testConfig.name}</CardTitle>
            <CardDescription className="test-engine-description">
              {currentQuestion.category && (
                <span className="test-engine-badge">
                  {currentQuestion.category}
                </span>
              )}
              <span>{testConfig.description}</span>
            </CardDescription>
          </div>
        </div>
        
        {testConfig.timeLimit && (
          <div className="test-engine-timer">
            <div className="test-engine-timer-display">
              <Clock className={`test-engine-timer-icon ${timeWarning ? 'timer-warning' : ''}`} />
              <span className={`test-engine-timer-text ${timeWarning ? 'timer-warning' : ''}`}>
                {formatTime(remainingTime)}
              </span>
            </div>
            <div className="test-engine-timer-label">
              {timeWarning ? 'Осталось менее 5 минут!' : 'До завершения теста'}
            </div>
          </div>
        )}
      </div>
    </CardHeader>
  );
}
