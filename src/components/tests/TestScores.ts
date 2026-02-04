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

// Функция подсчета баллов для теста профессиональной направленности
export const calculateProfessionalOrientationScore = (
  answers: ('A' | 'B')[],
  questions: TestQuestion[],
  HumanNature?: Record<number, boolean>,
  HumanTech?: Record<number, boolean>,
  HumanHuman?: Record<number, boolean>,
  HumanSys?: Record<number, boolean>,
  HumanArt?: Record<number, boolean>,
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
    const questionNumber = index + 1;
    const isVariantA = answer === 'A';

    if (HumanNature && HumanNature[questionNumber] !== undefined && HumanNature[questionNumber] === isVariantA) {
      counts.humanNature++;
    }
    if (HumanTech && HumanTech[questionNumber] !== undefined && HumanTech[questionNumber] === isVariantA) {
      counts.humanTech++;
    }
    if (HumanHuman && HumanHuman[questionNumber] !== undefined && HumanHuman[questionNumber] === isVariantA) {
      counts.humanHuman++;
    }
    if (HumanSys && HumanSys[questionNumber] !== undefined && HumanSys[questionNumber] === isVariantA) {
      counts.humanSys++;
    }
    if (HumanArt && HumanArt[questionNumber] !== undefined && HumanArt[questionNumber] === isVariantA) {
      counts.humanArt++;
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

// Функция подсчета баллов для теста темперамента
export const calculateTemperamentScore = (
  answers: number[],
  questions: TestQuestion[],
  ExtraIntrMap?: Record<number, number>,
  NeiroMap?: Record<number, number>,
  LieMap?: Record<number, number>,
  temperamentTypesObj?: any
): ScoreResult => {
  let countExtraIntr = 0;
  let countNeiro = 0;
  let countLie = 0;

  answers.forEach((answer, index) => {
    const questionNumber = index + 1;

    if (ExtraIntrMap && ExtraIntrMap[questionNumber] !== undefined && ExtraIntrMap[questionNumber] === answer) {
      countExtraIntr++;
    }

    if (NeiroMap && NeiroMap[questionNumber] !== undefined && NeiroMap[questionNumber] === answer) {
      countNeiro++;
    }

    if (LieMap && LieMap[questionNumber] !== undefined && LieMap[questionNumber] === answer) {
      countLie++;
    }
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

export const createProfessionalOrientationCalculator = (
  HumanNature: Record<number, boolean>,
  HumanTech: Record<number, boolean>,
  HumanHuman: Record<number, boolean>,
  HumanSys: Record<number, boolean>,
  HumanArt: Record<number, boolean>,
  categories: Record<string, any>
) => (answers: ('A' | 'B')[], questions: TestQuestion[]): ScoreResult => 
  calculateProfessionalOrientationScore(answers, questions, HumanNature, HumanTech, HumanHuman, HumanSys, HumanArt, categories);

export const createTemperamentCalculator = (
  ExtraIntrMap: Record<number, number>,
  NeiroMap: Record<number, number>,
  LieMap: Record<number, number>,
  temperamentTypes: any
) => (answers: number[], questions: TestQuestion[]): ScoreResult => 
  calculateTemperamentScore(answers, questions, ExtraIntrMap, NeiroMap, LieMap, temperamentTypes);

// Словарь всех функций подсчета баллов
export const scoreCalculators: Record<string, ScoreCalculator> = {
  'engineering-thinking': createEngineeringThinkingCalculator(),
  'professional-orientation': () => ({ score: 0, details: {} }), // Will be created with specific parameters
  'temperament': () => ({ score: 0, details: {} }), // Will be created with specific parameters
  'intellectual-potential': calculateIntellectualPotentialScore,
};