import { useNavigate } from 'react-router-dom';
import { useTestEngine } from '../../hooks/useTestEngine';
import { TestEngineProps } from '../../types/test-types';
import { TestEngineCompleted, ActiveTestView } from '../TestEngineParts';
import { useTest } from '@/contexts/TestContext';
import { useAuth } from '@/contexts/AuthContext';
//import '../TestEngineStyle/TestEngineGeneral.css';

export function TestEngine({ testConfig, onComplete, onBack }: TestEngineProps) {
  const navigate = useNavigate();
  const { saveTestResult } = useTest();
  const { getToken } = useAuth();

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

      // Submit test results to server
      const token = getToken();
      if (token) {
        try {
          const timeSpent = testConfig.timeLimit ? testConfig.timeLimit - remainingTime : 0;

          // Prepare test result data
          const testResult = {
            testType: testConfig.id as any,
            score: results.score,
            answers: answers.map((answer, index) => ({
              questionId: testConfig.questions[index].id,
              question: testConfig.questions[index].text,
              answer,
              category: testConfig.questions[index].category,
            })),
            metadata: {
              completedAt: new Date().toISOString(),
              timeSpent,
              totalQuestions: testConfig.questions.length,
              answeredQuestions: answers.filter(a => a !== null &&
                (Array.isArray(a) ? a.some(val => val > 0) : true)).length,
              // Передаем исходные ответы и вопросы для пересчета в случае необходимости
              rawAnswers: answers,
              rawQuestions: testConfig.questions,
              ...results.details,
            },
          };

          // Save test result to server
          await saveTestResult(testResult, token);
        } catch (err) {
          console.error('Failed to save test result:', err);
          // Still navigate to results even if saving failed
        }
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
