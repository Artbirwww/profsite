import { useNavigate } from 'react-router-dom';
import { Card } from '../../../SimpleUI';
import { AlertCircle } from '../../../ui/display/SimpleIcons';
import { useTestEngine } from '../../hooks/useTestEngine';
import { TestEngineProps } from '../../types/test-types';
import { TestEngineHeader } from '../TestEngineParts/TestEngineHeader';
import { TestEngineProgress } from '../TestEngineParts/TestEngineProgress';
import { TestEngineCompleted } from '../TestEngineParts/TestEngineCompleted';
import { TestEngineNavigation } from '../TestEngineParts/TestEngineNavigation';
import { TestEngineConfirmDialog } from '../TestEngineParts/TestEngineConfirmDialog';
import { TestEngineControls } from '../TestEngineParts/TestEngineControls';
import { QuestionRenderer } from '../TestEngineParts/QuestionRenderer';
import '../TestEngineStyle/TestEngine.css';

export function TestEngine({ testConfig, onComplete, onBack }: TestEngineProps) {
  const navigate = useNavigate();

  const {
    currentQuestion,
    setCurrentQuestion,
    answers,
    remainingTime,
    isCompleted,
    isSubmitting,
    error,
    showConfirmDialog,
    setShowConfirmDialog,
    answeredCount,
    completionPercentage,
    handleAnswer,
    handleNext,
    handlePrevious,
    completeTest,
  } = useTestEngine({
    testConfig,
    onComplete: async (results) => {
      if (onComplete) {
        await onComplete(results);
      }
      setTimeout(() => {
        navigate(`/my-results?test=${testConfig.id}&new=true`);
      }, 2000);
    },
  });

  const currentQ = testConfig.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  if (isCompleted) {
    const results = testConfig.calculateScore(answers, testConfig.questions);
    return (
      <TestEngineCompleted
        testConfig={testConfig}
        results={results}
        answeredCount={answeredCount}
        onBack={onBack}
      />
    );
  }

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
        />

        <TestEngineControls
          testConfig={testConfig}
          currentQuestion={currentQuestion}
          isSubmitting={isSubmitting}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCompleteEarly={() => setShowConfirmDialog(true)}
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

        <TestEngineNavigation
          testConfig={testConfig}
          currentQuestion={currentQuestion}
          answers={answers}
          isSubmitting={isSubmitting}
          onQuestionSelect={setCurrentQuestion}
        />
      </div>
    </div>
  );
}

export default TestEngine;
