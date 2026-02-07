import { TestQuestion } from './types/test-types';

// Типы для результатов подсчета баллов
export interface ScoreResult {
  score: number;
  details: Record<string, any>;
}

// Типы для различных тестов
export interface CategoryStats {
  [category: string]: { correct: number; total: number };
}

export interface RoleScores {
  [role: string]: number;
}

export interface CategoryScores {
  humanNature: number;
  humanTech: number;
  humanHuman: number;
  humanSys: number;
  humanArt: number;
}

export interface TemperamentScores {
  extraversion: number;
  neuroticism: number;
  lieScale: number;
}

// Функция подсчета баллов для теста на инженерное мышление
export const calculateEngineeringThinkingScore = (
  answers: number[],
  questions: TestQuestion[]
): ScoreResult => {
  let totalCorrect = 0;
  const categoryStats: Record<string, { correct: number; total: number }> = {};

  answers.forEach((answer, index) => {
    const question = questions[index];
    const category = question.category || 'Неизвестно';

    if (!categoryStats[category]) {
      categoryStats[category] = { correct: 0, total: 0 };
    }

    categoryStats[category].total++;

    if (answer > 0 && answer === (question as any).correctAnswer) {
      totalCorrect++;
      categoryStats[category].correct++;
    }
  });

  const percentage = Math.round((totalCorrect / questions.length) * 100);

  return {
    score: totalCorrect,
    details: {
      percentage,
      categoryStats,
      totalQuestions: questions.length,
      answeredQuestions: answers.filter(a => a > 0).length,
    },
  };
};

// Функция подсчета баллов для теста групповых ролей (Белбин)
export const calculateGroupRolesScore = (
  answers: number[][],
  questions: TestQuestion[],
  balbinAnswer?: Record<number, number[]>,
  roleNames?: string[]
): ScoreResult => {
  // Логика подсчета ролей Белбина
  const roleCounts = Array(8).fill(0);

  answers.forEach((blockAnswers, blockIndex) => {
    if (Array.isArray(blockAnswers) && balbinAnswer) {
      const mapping = balbinAnswer[blockIndex + 1];
      if (mapping) {
        blockAnswers.forEach((value, index) => {
          const roleIndex = mapping[index];
          if (roleIndex !== undefined) {
            roleCounts[roleIndex] += value;
          }
        });
      }
    }
  });

  const maxScore = Math.max(...roleCounts);
  const dominantRoleIndex = roleCounts.indexOf(maxScore);

  return {
    score: maxScore,
    details: {
      roleCounts,
      dominantRole: roleNames ? roleNames[dominantRoleIndex] : `Роль ${dominantRoleIndex}`,
      roles: roleNames 
        ? roleNames.map((name, index) => ({
            name,
            score: roleCounts[index],
          }))
        : roleCounts.map((score, index) => ({
            name: `Роль ${index}`,
            score,
          })),
    },
  };
};

// Функция подсчета баллов для теста профессиональной направленности (правила берутся из question.scoringRules)
export const calculateProfessionalOrientationScore = (
  answers: ('A' | 'B')[],
  questions: TestQuestion[],
  categoriesObj?: Record<string, any>
): ScoreResult => {
  const counts = {
    humanNature: 0,
    humanTech: 0,
    humanHuman: 0,
    humanSys: 0,
    humanArt: 0,
  };

  answers.forEach((answer, index) => {
    const question = questions[index] as TestQuestion & { scoringRules?: { category: string; addWhenChoice: 'A' | 'B' }[] };
    const rules = question?.scoringRules;
    if (rules) {
      rules.forEach((rule) => {
        if (rule.addWhenChoice === answer && counts.hasOwnProperty(rule.category)) {
          (counts as Record<string, number>)[rule.category]++;
        }
      });
    }
  });

  const maxScore = Math.max(...Object.values(counts));
  const dominantCategory = Object.keys(counts).reduce((a, b) =>
    counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b
  ) as keyof typeof counts;

  return {
    score: maxScore,
    details: {
      categoryScores: counts,
      dominantCategory: categoriesObj ? categoriesObj[dominantCategory].name : dominantCategory,
      dominantCategoryIcon: categoriesObj ? categoriesObj[dominantCategory].icon : '',
      professionRecommendations: categoriesObj ? categoriesObj[dominantCategory].professions : [],
    },
  };
};

// Функция подсчета баллов для теста темперамента (ответы Да=true, Нет=false; ключ в вопросе: 'extra_true' | 'extra_false' | 'neiro_true' | 'neiro_false' | 'lie_true' | 'lie_false')
export const calculateTemperamentScore = (
  answers: (boolean | number)[],
  questions: TestQuestion[],
  temperamentTypesObj?: any
): ScoreResult => {
  let countExtraIntr = 0;
  let countNeiro = 0;
  let countLie = 0;

  answers.forEach((userAnswer, index) => {
    const question = questions[index] as TestQuestion & { answer?: string };
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

  // Определение типа темперамента
  let temperamentType = temperamentTypesObj?.choleric || { name: 'Холерик', description: 'Характеристика холерика' };
  if (countExtraIntr >= 12 && countNeiro >= 12) {
    temperamentType = temperamentTypesObj?.choleric || { name: 'Холерик', description: 'Характеристика холерика' };
  } else if (countExtraIntr >= 12 && countNeiro < 12) {
    temperamentType = temperamentTypesObj?.sanguine || { name: 'Сангвиник', description: 'Характеристика сангвиника' };
  } else if (countExtraIntr < 12 && countNeiro < 12) {
    temperamentType = temperamentTypesObj?.phlegmatic || { name: 'Флегматик', description: 'Характеристика флегматика' };
  } else {
    temperamentType = temperamentTypesObj?.melancholic || { name: 'Меланхолик', description: 'Характеристика меланхолика' };
  }

  return {
    score: Math.max(countExtraIntr, countNeiro),
    details: {
      extraversion: countExtraIntr,
      neuroticism: countNeiro,
      lieScale: countLie,
      temperamentType: temperamentType.name,
      temperamentDescription: temperamentType.description,
      validForInterpretation: countLie <= 4,
    },
  };
};

// Функция подсчета баллов для теста интеллектуального потенциала
export const calculateIntellectualPotentialScore = (
  selectedAnswers: number[],
  questions: any[]
): ScoreResult => {
  const score = selectedAnswers.reduce((acc, answer, index) => {
    if (answer === questions[index]?.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  return {
    score,
    details: {
      percentage,
      totalQuestions: questions.length,
    },
  };
};

// Общий интерфейс для функций подсчета баллов
export type ScoreCalculator = (answers: any[], questions: TestQuestion[]) => ScoreResult;

// Специализированные функции для каждого типа теста
export const createEngineeringThinkingCalculator = () => (answers: number[], questions: TestQuestion[]): ScoreResult => 
  calculateEngineeringThinkingScore(answers, questions);

export const createGroupRolesCalculator = (balbinAnswer: Record<number, number[]>, roleNames: string[]) => (answers: number[][], questions: TestQuestion[]): ScoreResult => 
  calculateGroupRolesScore(answers, questions, balbinAnswer, roleNames);

export const createProfessionalOrientationCalculator = (categories: Record<string, any>) =>
  (answers: ('A' | 'B')[], questions: TestQuestion[]): ScoreResult =>
    calculateProfessionalOrientationScore(answers, questions, categories);

export const createTemperamentCalculator = (temperamentTypes: any) =>
  (answers: (boolean | number)[], questions: TestQuestion[]): ScoreResult =>
    calculateTemperamentScore(answers, questions, temperamentTypes);

// Словарь всех функций подсчета баллов
export const scoreCalculators: Record<string, ScoreCalculator> = {
  'engineering-thinking': createEngineeringThinkingCalculator(),
  'professional-orientation': () => ({ score: 0, details: {} }), // Will be created with specific parameters
  'temperament': () => ({ score: 0, details: {} }), // Will be created with specific parameters
  'intellectual-potential': calculateIntellectualPotentialScore,
};