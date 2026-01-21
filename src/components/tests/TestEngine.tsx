import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../SimpleUI';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from '../ui/display/SimpleIcons';
import { Progress } from '../ui/feedback/SimpleProgress';
import { useTestEngine } from './hooks/useTestEngine';
import { TestEngineProps } from './types/test-types';
import { SingleChoiceCard } from './components/SingleChoiceCard';
import { DistributionCard } from './components/DistributionCard';
import { PairChoiceCard } from './components/PairChoiceCard';
import { YesNoCard } from './components/YesNoCard';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

export function TestEngine({ testConfig, onComplete, onBack }: TestEngineProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

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
    handleSkip,
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

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeWarning = remainingTime < 300;
  const currentQ = testConfig.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  if (isCompleted) {
    const results = testConfig.calculateScore(answers, testConfig.questions);
    
    return (
      <div className={`min-h-screen p-4 py-8 flex items-center justify-center ${styles.bgGradientIndigoToPurple}`}>
        <Card className={`max-w-2xl w-full ${styles.animateFadeIn}`}>
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="size-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Тест успешно завершен!</CardTitle>
              <CardDescription className="text-lg">
                Результаты сохранены на сервере
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={styles.spaceY6}>
            <div className={styles.resultCard}>
              <div className="text-center">
                <div className={styles.resultScore}>{results.score}</div>
                <div className={styles.textGray600}>баллов</div>
                <div className="mt-2 text-gray-500">
                  Вопросов отвечено: {answeredCount} из {testConfig.questions.length}
                </div>
              </div>
            </div>
            
            <div className={styles.spaceY3}>
              <Button 
                onClick={() => navigate(`/my-results?test=${testConfig.id}`)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12"
              >
                Перейти к детальным результатам
              </Button>
              <Button 
                variant="outline"
                onClick={onBack || (() => navigate('/dashboard'))}
                className="w-full h-12"
              >
                Вернуться в личный кабинет
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderQuestionCard = () => {
    switch (currentQ.type) {
      case 'single-choice':
        return (
          <SingleChoiceCard
            question={currentQ}
            selectedAnswer={currentAnswer}
            onSelect={(index) => handleAnswer(currentQuestion, index)}
            disabled={isSubmitting}
          />
        );
      
      case 'distribution':
        return (
          <DistributionCard
            question={currentQ}
            values={currentAnswer || []}
            onChange={(values) => handleAnswer(currentQuestion, values)}
            disabled={isSubmitting}
          />
        );
      
      case 'pair-choice':
        return (
          <PairChoiceCard
            question={currentQ}
            selectedChoice={currentAnswer}
            onSelect={(choice) => handleAnswer(currentQuestion, choice)}
            disabled={isSubmitting}
          />
        );
      
      case 'yes-no':
        return (
          <YesNoCard
            question={currentQ}
            selectedAnswer={currentAnswer}
            onSelect={(answer) => handleAnswer(currentQuestion, answer)}
            disabled={isSubmitting}
          />
        );
      
      default:
        return <div>Тип вопроса не поддерживается</div>;
    }
  };

  return (
    <div className="min-h-screen p-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-sm">
          <CardHeader className={styles.cardHeaderPurpleToPink}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onBack || (() => navigate('/dashboard'))}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <div>
                  <CardTitle className="text-xl md:text-2xl">{testConfig.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {currentQ.category && (
                      <span className={styles.badgeBlue}>
                        {currentQ.category}
                      </span>
                    )}
                    <span>{testConfig.description}</span>
                  </CardDescription>
                </div>
              </div>
              
              {testConfig.timeLimit && (
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className={`size-5 ${timeWarning ? `${styles.timerWarning} ${styles.timerPulse}` : styles.textGray600}`} />
                    <span className={`text-xl md:text-2xl font-mono ${timeWarning ? styles.timerWarning : styles.textGray700}`}>
                      {formatTime(remainingTime)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {timeWarning ? 'Осталось менее 5 минут!' : 'До завершения теста'}
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{answeredCount}</div>
                <div className="text-sm text-gray-600">Отвечено вопросов</div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
                    
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {currentQuestion + 1}
                </div>
                <div className="text-sm text-gray-600">Текущий вопрос</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        {testConfig.instructions && (
          <Card className={styles.bgBlue50}>
            <CardContent className="pt-6">
              <div className={`space-y-3 text-sm md:text-base ${styles.spaceY3}`}>
                <h4 className="font-medium text-blue-800">Инструкция:</h4>
                <p className={styles.textGray700}>{testConfig.instructions}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error message */}
        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className={styles.errorMessageText}>{error}</span>
          </div>
        )}

        {/* Question Card */}
        {renderQuestionCard()}

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 md:flex-1">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || isSubmitting}
              className="flex-1 h-12"
            >
              Назад
            </Button>
            
            {currentQuestion < testConfig.questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700"
              >
                Далее
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Сохранение...' : 'Завершить тест'}
              </Button>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowConfirmDialog(true)}
            disabled={isSubmitting}
            className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Завершить досрочно
          </Button>
        </div>

        {/* Confirm Dialog */}
        {showConfirmDialog && (
          <div className={styles.modalOverlay}>
            <Card className={`max-w-md w-full ${styles.animateScaleIn}`}>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertCircle className="size-5" />
                  Завершить тест досрочно?
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${styles.spaceY4}`}>
                <p className={styles.textGray600}>
                  Вы ответили на {answeredCount} из {testConfig.questions.length} вопросов.
                  {answeredCount < testConfig.questions.length && ' Неотвеченные вопросы будут засчитаны как неправильные.'}
                </p>
                {testConfig.timeLimit && (
                  <p className="text-sm text-gray-500">
                    Оставшееся время: {formatTime(remainingTime)}
                  </p>
                )}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmDialog(false)}
                    className="flex-1"
                  >
                    Продолжить тест
                  </Button>
                  <Button
                    onClick={completeTest}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Сохранение...' : 'Завершить'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Question Navigation */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Быстрая навигация по вопросам:
            </div>
            <div className="flex flex-wrap gap-2">
              {testConfig.questions.map((_, idx) => {
                const isAnswered = answers[idx] !== null && 
                  (!Array.isArray(answers[idx]) || (answers[idx] as number[]).some(v => v > 0));
                const isCurrent = idx === currentQuestion;
                
                let buttonClass = styles.questionNavButton;
                if (isAnswered) {
                  buttonClass += ` ${styles.questionNavButtonAnswered}`;
                } else {
                  buttonClass += ` ${styles.questionNavButtonUnanswered}`;
                }
                if (isCurrent) {
                  buttonClass += ` ${styles.questionNavButtonCurrent}`;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
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
      </div>
    </div>
  );
}

export default TestEngine;