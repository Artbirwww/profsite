import { useNavigate } from 'react-router-dom';
import { useTest } from '../../../contexts/TestContext';
import { TestEngine } from '../testengine/TestEngineMain/TestEngine';
import { testData, testConfig, calculateIQ, getMaxIQForAge, iqTable, maxIqByAge, getQuestionsForForm, Question } from './iqquestions';
import { IntellectFormSelection } from './IntellectFormSelection';
import { useState } from 'react';
import { ImageChoiceQuestion } from '../types/test-types';

interface IqPotentialTestProps {
  onBack?: () => void;
}

export function IqPotentialTest({ onBack }: IqPotentialTestProps) {
  const navigate = useNavigate();
  const { saveTestResult, userData } = useTest();
  const [selectedForm, setSelectedForm] = useState<'A' | 'B' | null>(null);

  // Функция для получения возраста из даты рождения
  const getAgeFromBirthDate = (): number => {
    const birthDate = userData?.birthDate;

    if (!birthDate) {
      console.warn('Дата рождения не указана, используется возраст по умолчанию: 12 лет');
      return 12;
    }

    try {
      // Предполагаем формат DD.MM.YYYY
      const parts = birthDate.split('.');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Месяцы начинаются с 0
        const year = parseInt(parts[2], 10);

        const birthDateObj = new Date(year, month, day);
        const today = new Date();

        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        // Если день рождения ещё не наступил в этом году, вычитаем 1 год
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
        }

        // Ограничиваем возраст диапазоном теста
        if (age < 7) return 7;
        if (age > 16) return 16;

        console.log(`Рассчитанный возраст: ${age} лет`);
        return age;
      }
    } catch (error) {
      console.error('Ошибка при расчете возраста:', error);
    }

    return 12; // Возраст по умолчанию
  };

  const handleComplete = async (results: any) => {
    try {
      const age = getAgeFromBirthDate();
      const rawScore = results.score;
      const iq = calculateIQ(rawScore, age);
      const maxIq = getMaxIQForAge(age);

      await saveTestResult({
        testType: 'intellect',
        score: rawScore,
        iq: iq,
        maxScore: testConfig.maxScore,
        answers: results.answers,
        metadata: {
          age: age,
          completionTime: results.completionTime,
          testForm: selectedForm || 'A', // Сохраняем выбранную форму
          maxIqForAge: maxIq,
          iqTable: iqTable,
          maxIqByAge: maxIqByAge
        },
      });

      // Можно добавить навигацию на страницу результатов или дашборд
      // navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save test results:', error);
      throw error;
    }
  };

  // Обработка выбора формы
  const handleFormSelection = (form: 'A' | 'B') => {
    setSelectedForm(form);
  };

  // Если форма еще не выбрана, показываем компонент выбора
  if (!selectedForm) {
    return <IntellectFormSelection onFormSelected={handleFormSelection} onBack={onBack} />;
  }

  // Преобразование вопросов в формат ImageChoiceQuestion
  const transformQuestions = (questions: Question[]): ImageChoiceQuestion[] => {
    return questions.map(question => ({
      id: question.id,
      text: 'Выберите недостающую фигуру', // Текст вопроса
      category: question.category,
      type: 'image-choice',
      image: question.image,
      options: question.a,
      correctAnswer: question.answer
    }));
  };

  // Конфигурация теста интеллекта с учетом выбранной формы
  const intellectTestConfig = {
    id: 'iq-potential',
    name: `Тест интеллекта - Форма ${selectedForm}`,
    description: `Тест для оценки уровня интеллектуального развития. Форма ${selectedForm}. Состоит из 29 вопросов с изображениями. Время выполнения: 12 минут.`,
    timeLimit: 720, // 12 минут в секундах
    questions: transformQuestions(getQuestionsForForm(selectedForm)),
    instructions: `Вы выбрали форму ${selectedForm}. Для каждого задания выберите недостающую фигуру из шести предложенных вариантов`,
    showCategory: false,
    calculateScore: (answers: any[], questions: any[]) => {
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].correctAnswer) {
          score++;
        }
      }
      return {
        score,
        details: {
          totalQuestions: questions.length,
          correctAnswers: score,
          wrongAnswers: questions.length - score
        }
      };
    }
  };

  return (
    <TestEngine
      testConfig={intellectTestConfig}
      onComplete={handleComplete}
      onBack={onBack}
    />
  );
}

export default IqPotentialTest;