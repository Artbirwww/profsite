import { useNavigate } from 'react-router-dom';
import { Card } from '../../../SimpleUI';
import { AlertCircle } from '../../../ui/display/SimpleIcons';
import { TestEngineProps, TestConfig } from '../../types/test-types';
import {
  TestEngineHeader,
  TestEngineProgress,
  TestEngineNavigation,
  TestEngineConfirmDialog,
  TestEngineControls,
  QuestionRenderer
} from '../TestEngineParts';

import { ActiveTestViewExtendedProps, QuestionInfo } from '../../types/test-types';

interface ActiveTestViewProps extends Omit<ActiveTestViewExtendedProps, 'testConfig'> {
  testConfig: TestConfig;
}

export const ActiveTestView = ({
  testConfig,
  currentQuestion,
  answers,
  remainingTime,
  isSubmitting,
  answeredCount,
  completionPercentage,
  handleAnswer,
  handleNext,
  handlePrevious,
  setShowConfirmDialog,
  setCurrentQuestion,
  onBack,
  error,
  showConfirmDialog,
  completeTest,
  getQuestionInfo
}: ActiveTestViewProps) => {
  const navigate = useNavigate();
  const currentQ = testConfig.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];
  const handleBack = onBack || (() => navigate('/dashboard'));

  return (
    <div className="test-engine-container">
      <div className="test-engine-wrapper">
        <Card className="test-engine-header-card">
          <TestEngineHeader
            testConfig={testConfig}
            currentQuestion={currentQ}
            remainingTime={remainingTime}
            isSubmitting={isSubmitting}
            onBack={handleBack}
          />
        </Card>

        <TestEngineProgress
          answeredCount={answeredCount}
          currentQuestion={currentQuestion}
          completionPercentage={completionPercentage}
        />

        {testConfig.instructions && (
          <Card className="test-engine-instructions">
            <div className="test-engine-instructions-content">
              <h4 className="test-engine-instructions-title">Инструкция:</h4>
              <p className="test-engine-instructions-text">{testConfig.instructions}</p>
            </div>
          </Card>
        )}

        {error && (
          <div className="test-engine-error">
            <AlertCircle className="test-engine-error-icon" />
            <span className="test-engine-error-text">{error}</span>
          </div>
        )}

        <QuestionRenderer
          question={currentQ}
          answer={currentAnswer}
          onAnswer={(answer) => handleAnswer(currentQuestion, answer)}
          disabled={isSubmitting}
          questionInfo={getQuestionInfo ? getQuestionInfo(currentQuestion) : undefined}
        />

        <TestEngineControls
          testConfig={testConfig}
          currentQuestion={currentQuestion}
          isSubmitting={isSubmitting}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCompleteEarly={() => setShowConfirmDialog(true)}
        />

        <TestEngineNavigation
          testConfig={testConfig}
          currentQuestion={currentQuestion}
          answers={answers}
          isSubmitting={isSubmitting}
          onQuestionSelect={setCurrentQuestion}
        />

        {showConfirmDialog && (
          <TestEngineConfirmDialog
            testConfig={testConfig}
            answeredCount={answeredCount}
            remainingTime={remainingTime}
            isSubmitting={isSubmitting}
            onConfirm={completeTest}
            onCancel={() => setShowConfirmDialog(false)}
          />
        )}
      </div>
    </div>
  );
};