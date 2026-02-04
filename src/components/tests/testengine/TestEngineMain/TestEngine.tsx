import { useNavigate } from 'react-router-dom';
import { useTestEngine } from '../../hooks/useTestEngine';
import { TestEngineProps } from '../../types/test-types';
import { TestEngineCompleted, ActiveTestView } from '../TestEngineParts';
//import '../TestEngineStyle/TestEngineGeneral.css';

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
    getQuestionInfo,
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

  return (
    <ActiveTestView
      testConfig={testConfig}
      currentQuestion={currentQuestion}
      answers={answers}
      remainingTime={remainingTime}
      isSubmitting={isSubmitting}
      answeredCount={answeredCount}
      completionPercentage={completionPercentage}
      handleAnswer={handleAnswer}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      setShowConfirmDialog={setShowConfirmDialog}
      setCurrentQuestion={setCurrentQuestion}
      onBack={onBack}
      error={error}
      showConfirmDialog={showConfirmDialog}
      completeTest={completeTest}
      getQuestionInfo={getQuestionInfo}
    />
  );
}

export default TestEngine;
