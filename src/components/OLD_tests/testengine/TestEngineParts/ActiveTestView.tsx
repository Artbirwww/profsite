import { useNavigate } from 'react-router-dom';
import { Card } from '../../../SimpleUI';
import { TestEngineProps, TestConfig } from '../../types/test-types';
import {
  TestEngineHeader,
  TestEngineProgress,
  TestEngineNavigation,
  TestEngineConfirmDialog,
  TestEngineControls,
  QuestionRenderer
} from '.';

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
    <div>
      <div>
        <Card>
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
          <Card>
            <div>
              <h4>Инструкция:</h4>
              <p>{testConfig.instructions}</p>
            </div>
          </Card>
        )}

        {error && (
          <div>
            <span>{error}</span>
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