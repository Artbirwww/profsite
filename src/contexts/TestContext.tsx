import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TestResult, TestType, PsychTestResponse, PsychTestRequest, PsychParam } from '../types/TestResult';
import { testService } from '../services/api/testApi';

// Маппинг ролей Белбина (индекс) на имена параметров API (строго по документации)
const BELBIN_ROLE_TO_API_PARAM: (string | null)[] = [
  'supervision_score',      // 0: Председатель (Координатор)
  'motivation_score',       // 1: Формирователь (Мотиватор)
  'idea_generator_score',   // 2: Генератор идей (Творец)
  null,                     // 3: Оцениватель (Аналитик) - нет в API
  'working_bee_score',      // 4: Исполнитель (Реализатор)
  'supplier_score',         // 5: Разведчик (Исследователь ресурсов)
  'dedicator_score',        // 6: Коллективист (Командный игрок)
  'controller_score',       // 7: Доводчик (Контролер)
];

interface TestContextType {
  currentTest: TestType | null;
  testResults: PsychTestResponse[];
  isLoading: boolean;
  error: string | null;
  startTest: (testType: TestType) => void;
  saveTestResult: (result: Omit<TestResult, 'id' | 'userId' | 'completedAt'>, token: string) => Promise<PsychTestResponse>;
  getTestsByPupil: (token: string) => Promise<PsychTestResponse[]>;
  clearCurrentTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTest, setCurrentTest] = useState<TestType | null>(null);
  const [testResults, setTestResults] = useState<PsychTestResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert TestResult to PsychTestRequest
  const convertToPsychTestRequest = (result: Omit<TestResult, 'id' | 'userId' | 'completedAt'>): PsychTestRequest => {
    // Extract completion time from metadata
    const completionTimeSeconds = result.metadata?.timeSpent || 0;
    
    // Map internal test type to API test type name
    const testTypeName = mapInternalTestTypeToApi(result.testType);
    
    // Convert scores to psychParams
    const psychParams = convertScoresToPsychParams(result.testType, result.score, result.metadata);
    
    return {
      completionTimeSeconds,
      testTypeName,
      psychParams
    };
  };

  // Map internal test type to API test type name
  const mapInternalTestTypeToApi = (internalType: TestType): string => {
    const typeMap: Record<TestType, string> = {
      'engineering-thinking': 'Engineering Thinking',
      'group-roles': 'Group Roles',
      'iq-potential': 'Intellectual Potential',
      'professional-orientation': 'Professional Orientation',
      'temperament': 'Temperament'
    };
    return typeMap[internalType] || internalType;
  };

  // Convert scores to psychParams based on test type
  const convertScoresToPsychParams = (testType: TestType, score: number, metadata: Record<string, any> = {}): PsychParam[] => {
    switch (testType) {
      case 'temperament':
        // Для теста темперамента используем значения из metadata
        // Если они недоступны, используем значения из details (альтернативный источник)
        let extraversion = metadata.extraversion ?? metadata.details?.extraversion ?? 0;
        let neuroticism = metadata.neuroticism ?? metadata.details?.neuroticism ?? 0;
        let lieScale = metadata.lieScale ?? metadata.details?.lieScale ?? 0;
        
        // Если все значения по-прежнему 0, проверяем, есть ли сырые ответы для пересчета
        if (extraversion === 0 && neuroticism === 0 && lieScale === 0) {
          // Попробуем пересчитать значения на основе исходных сырых ответов
          const rawAnswers = metadata.rawAnswers; // Это исходный массив ответов (true/false/null)
          const rawQuestions = metadata.rawQuestions || []; // исходные вопросы
          
          if (rawAnswers && rawQuestions.length > 0) {
            let countExtraIntr = 0;
            let countNeiro = 0;
            let countLie = 0;

            rawAnswers.forEach((userAnswer: any, index: number) => {
              const question = rawQuestions[index] as any;
              const key = question?.answer;
              if (!key) return;
              
              // Пропускаем null/undefined ответы
              if (userAnswer == null) return;
              
              // Проверяем, является ли ответ истинным (true, 1, 'true', 'yes', 'да')
              const isYes = userAnswer === true || 
                            userAnswer === 1 || 
                            userAnswer === 'true' || 
                            userAnswer === 'yes' || 
                            userAnswer === 'да' ||
                            (typeof userAnswer === 'string' && userAnswer.toLowerCase() === 'true');
                            
              const expectYes = key.endsWith('_true');
              if (isYes !== expectYes) return;
              if (key.startsWith('extra_')) countExtraIntr++;
              else if (key.startsWith('neiro_')) countNeiro++;
              else if (key.startsWith('lie_')) countLie++;
            });
            
            // Обновляем значения, если удалось пересчитать
            if (countExtraIntr > 0 || countNeiro > 0 || countLie > 0) {
              extraversion = countExtraIntr;
              neuroticism = countNeiro;
              lieScale = countLie;
            }
          }
        }
        
        return [
          { param: extraversion, name: 'extrav_introver_score' },
          { param: neuroticism, name: 'neirotizm_score' },
          { param: lieScale, name: 'sincerity_score' },
        ];
      
      case 'group-roles':
        // For group roles test - роли Белбина с маппингом на зарезервированные имена API
        const roles = metadata.roles || [];
        if (Array.isArray(roles) && roles.length > 0) {
          // Обрабатываем массив ролей, где индекс соответствует индексу роли Белбина
          return roles
            .map((role: { name?: string; score?: number }, index: number) => {
              const apiParamName = BELBIN_ROLE_TO_API_PARAM[index];
              if (!apiParamName) return null;
              return {
                param: typeof role === 'object' && role.score !== undefined ? role.score : (typeof role === 'number' ? role : 0),
                name: apiParamName,
              };
            })
            .filter((p): p is PsychParam => p !== null);
        } else if (metadata.roleCounts && Array.isArray(metadata.roleCounts)) {
          // Альтернативный способ - если переданы счетчики ролей напрямую
          return metadata.roleCounts
            .map((count: number, index: number) => {
              const apiParamName = BELBIN_ROLE_TO_API_PARAM[index];
              if (!apiParamName) return null;
              return {
                param: count,
                name: apiParamName,
              };
            })
            .filter((p): p is PsychParam => p !== null);
        }
        return [];
      
      case 'professional-orientation':
        // For professional orientation test, extract category scores
        const categoryScores = metadata.categoryScores || {};
        return Object.entries(categoryScores).map(([category, scoreValue]) => ({
          param: Number(scoreValue) || 0,
          name: `${convertCategoryToParamName(category)}_score`
        }));
      
      case 'engineering-thinking':
        // Только engineering_thinking_level (процент правильных ответов)
        return [
          { param: metadata.percentage ?? score, name: 'engineering_thinking_level' }
        ];
      
      case 'iq-potential':
        // Для теста интеллектуального потенциала отправляем общий балл
        // или процент правильных ответов, если доступен
        const iqScore = metadata.percentage ?? score ?? 0;
        return [
          { param: iqScore, name: 'engineering_thinking_level' } // Используем доступное поле для общего уровня
        ];
      
      default:
        // Generic fallback
        return [
          { param: score, name: 'overall_score' }
        ];
    }
  };

  // Маппинг категорий профессиональной направленности на имена параметров API
  const convertCategoryToParamName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'humanNature': 'nature',
      'humanTech': 'tech',
      'humanHuman': 'human',
      'humanSys': 'signed',     // Человек-Знак -> signed_score
      'humanArt': 'artistic',
    };
    return categoryMap[category] ?? category.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
  };

  const startTest = (testType: TestType) => {
    setCurrentTest(testType);
    setError(null);
  };

  const saveTestResult = async (result: Omit<TestResult, 'id' | 'userId' | 'completedAt'>, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Convert TestResult to PsychTestRequest
      const testData = convertToPsychTestRequest(result);
      const savedResult = await testService.createTest(token, testData);
      setTestResults(prev => [...prev, savedResult]);
      return savedResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save test result');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getTestsByPupil = async (token: string) => {
    setIsLoading(true);
    try {
      const results = await testService.getTestsByPupil(token);
      setTestResults(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch results');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCurrentTest = () => {
    setCurrentTest(null);
  };

  return (
    <TestContext.Provider value={{
      currentTest,
      testResults,
      isLoading,
      error,
      startTest,
      saveTestResult,
      getTestsByPupil,
      clearCurrentTest,
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};