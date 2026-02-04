import { useState, useEffect, useCallback } from 'react';
import { TestConfig, TestQuestion } from '../types/test-types';

interface UseTestEngineProps {
  testConfig: TestConfig;
  onComplete: (results: any) => void;
}

export function useTestEngine({ testConfig, onComplete }: UseTestEngineProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [remainingTime, setRemainingTime] = useState(testConfig.timeLimit || 0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Инициализация ответов
  useEffect(() => {
    const initialAnswers = testConfig.questions.map((question) => {
      if (question.type === 'distribution') {
        return Array(question.options?.length || 0).fill(0);
      }
      return null;
    });
    setAnswers(initialAnswers);
  }, [testConfig]);

  // Таймер обратного отсчета
  useEffect(() => {
    if (isCompleted || !testConfig.timeLimit || remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted, remainingTime]);

  const handleTimeUp = useCallback(() => {
    if (!isCompleted) {
      completeTest();
    }
  }, [isCompleted]);

  const handleAnswer = useCallback((questionIndex: number, answer: any) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
    setError(null);
  }, []);

  const handleNext = useCallback(() => {
    const currentAnswer = answers[currentQuestion];
    const currentQ = testConfig.questions[currentQuestion];

    // Проверка на обязательный ответ для некоторых типов вопросов
    if (currentQ.type === 'single-choice' && currentAnswer === null) {
      setError('Пожалуйста, выберите ответ');
      return;
    }

    // Убираем проверку распределения баллов при переходе к следующему вопросу
    // Проверка будет происходить только при завершении теста
    /*
    if (currentQ.type === 'distribution') {
      const sum = (currentAnswer as number[]).reduce((a, b) => a + b, 0);
      const maxPoints = (currentQ as any).maxPoints || 10;
      if (sum !== maxPoints) {
        setError(`Распределите ровно ${maxPoints} баллов. Сейчас: ${sum} баллов`);
        return;
      }
    }
    */

    if (currentQuestion < testConfig.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setError(null);
    } else {
      completeTest();
    }
  }, [currentQuestion, answers, testConfig.questions]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setError(null);
    }
  }, [currentQuestion]);

  const completeTest = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Проверяем, что все вопросы типа 'distribution' имеют корректное распределение баллов
      for (let i = 0; i < testConfig.questions.length; i++) {
        const question = testConfig.questions[i];
        const answer = answers[i];

        if (question.type === 'distribution') {
          // Если ответа нет, инициализируем массив нулей
          const values = answer || Array(question.options?.length || 0).fill(0);
          const sum = values.reduce((a: number, b: number) => a + b, 0);
          const maxPoints = (question as any).maxPoints || 10;

          if (sum !== maxPoints) {
            setError(`Вопрос ${i + 1}: Распределите ровно ${maxPoints} баллов. Сейчас: ${sum} баллов`);
            setIsSubmitting(false);
            return;
          }
        }
      }

      const results = testConfig.calculateScore(answers, testConfig.questions);

      const finalResults = {
        testId: testConfig.id,
        score: results.score,
        answers: answers.map((answer, index) => ({
          questionId: testConfig.questions[index].id,
          question: testConfig.questions[index].text,
          answer,
          category: testConfig.questions[index].category,
        })),
        metadata: {
          completedAt: new Date().toISOString(),
          timeSpent: testConfig.timeLimit ? testConfig.timeLimit - remainingTime : 0,
          totalQuestions: testConfig.questions.length,
          answeredQuestions: answers.filter(a => a !== null &&
            (Array.isArray(a) ? a.some(val => val > 0) : true)).length,
          ...results.details,
        },
      };

      await onComplete(finalResults);
      setIsCompleted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения результатов');
      console.error('Failed to complete test:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, testConfig, remainingTime, onComplete]);

  const handleSkip = useCallback(() => {
    if (currentQuestion < testConfig.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setError(null);
    }
  }, [currentQuestion, testConfig.questions.length]);

  const answeredCount = answers.filter(a =>
    a !== null && (Array.isArray(a) ? a.some(val => val > 0) : true)
  ).length;

  const completionPercentage = Math.round((answeredCount / testConfig.questions.length) * 100);

  // Функция для получения информации о текущем вопросе в блоке
  const getQuestionInfo = useCallback((questionIndex: number) => {
    if (!testConfig.questions || testConfig.questions.length === 0) {
      return { blockIndex: 0, questionInBlockIndex: 0, totalInBlock: 0 };
    }

    const currentCategory = testConfig.questions[questionIndex].category;

    // Найти первый вопрос с такой же категорией
    let blockStartIndex = questionIndex;
    while (blockStartIndex > 0 && testConfig.questions[blockStartIndex - 1].category === currentCategory) {
      blockStartIndex--;
    }

    // Найти последний вопрос с такой же категорией
    let blockEndIndex = questionIndex;
    while (blockEndIndex < testConfig.questions.length - 1 && testConfig.questions[blockEndIndex + 1].category === currentCategory) {
      blockEndIndex++;
    }

    const questionInBlockIndex = questionIndex - blockStartIndex + 1; // 1-based
    const totalInBlock = blockEndIndex - blockStartIndex + 1;

    // Определить индекс блока среди уникальных категорий
    let uniqueCategoriesEncountered = 0;
    let currentCat = '';
    for (let i = 0; i <= blockStartIndex; i++) {
      if (testConfig.questions[i].category !== currentCat) {
        currentCat = testConfig.questions[i].category;
        if (i === blockStartIndex) {
          break;
        }
        uniqueCategoriesEncountered++;
      }
    }

    return {
      blockIndex: uniqueCategoriesEncountered + 1, // 1-based
      questionInBlockIndex,
      totalInBlock
    };
  }, [testConfig.questions]);

  return {
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
    getQuestionInfo,
  };
}