import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { TestEngine } from '../testengine/TestEngineMain/TestEngine';
import { temperamentConfig } from '../testConfigs';
import { questionsA, questionsB } from './TempQuestions';

interface TemperamentTestProps {
  onBack?: () => void;
}

export function TemperamentTest({ onBack }: TemperamentTestProps) {
  const navigate = useNavigate();
  const { saveTestResult } = useTest();
  const { getToken } = useAuth();
  const [variant, setVariant] = useState<'A' | 'B' | null>(null);

  const handleComplete = async (results: any) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      await saveTestResult({
        testType: 'temperament',
        score: results.score,
        answers: results.answers, // Это массив объектов {questionId, question, answer, category}
        metadata: {
          ...results.metadata,
          questions: config.questions, // Передаем вопросы для пересчета
          variant: variant || 'A',
          extraversion: results.details?.extraversion ?? 0,
          neuroticism: results.details?.neuroticism ?? 0,
          lieScale: results.details?.lieScale ?? 0,
          temperamentType: results.details?.temperamentType ?? 'Unknown',
        },
      }, token);
    } catch (error) {
      console.error('Failed to save test results:', error);
      throw error;
    }
  };

  // Если вариант не выбран, показываем выбор варианта
  if (!variant) {
    return (
      <div className="min-h-screen p-4 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Компонент выбора варианта */}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Выберите вариант теста</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setVariant('A')}
                className="p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400"
              >
                Вариант А
              </button>
              <button
                onClick={() => setVariant('B')}
                className="p-6 border-2 border-green-200 rounded-lg hover:border-green-400"
              >
                Вариант Б
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Создаем конфигурацию для выбранного варианта
  const config = {
    ...temperamentConfig,
    name: `Тест темперамента (Вариант ${variant})`,
    questions: (variant === 'A' ? questionsA : questionsB).map((q) => ({
      id: q.id,
      text: q.text,
      category: q.category,
      type: 'yes-no' as const,
      answer: q.answer,
    })),
  };

  return (
    <TestEngine
      testConfig={config}
      onComplete={handleComplete}
      onBack={onBack}
    />
  );
}

export default TemperamentTest;