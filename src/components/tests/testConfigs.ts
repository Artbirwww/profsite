import { TestConfig } from './types/test-types';
import { answerKey, questions as engineerQuestions } from './engineer/EngineerQuestions';
import { balbinAnswer, roleNames, questionBlocks } from './grouproles/GroupQuestions';
import { questionsA, questionsB, HumanNature, HumanTech, HumanHuman, HumanSys, HumanArt, categories } from './profsphere/ProfQuestions';
import { ExtraIntrMap, NeiroMap, LieMap, temperamentTypes } from './temperament/TempQuestions';

// Инженерное мышление
export const engineeringThinkingConfig: TestConfig = {
  id: 'engineering-thinking',
  name: 'Тест на инженерное мышление',
  description: 'Тест технических способностей',
  timeLimit: 1500, // 25 минут
  showCategory: true,

  questions: engineerQuestions.map((q, index) => ({
    id: q.id,
    text: q.q,
    category: q.category,
    type: 'single-choice' as const,
    options: q.a,
    correctAnswer: answerKey[index],
    image: q.image,
  })),
  calculateScore: (answers, questions) => {
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
  },
};

// Групповые роли (Белбин)
export const groupRolesConfig: TestConfig = {
  id: 'group-roles',
  name: 'Тест групповых ролей',
  description: 'Методика Белбина',
  showCategory: true,
  questions: questionBlocks.flatMap((block, blockIndex) => 
    block.questions.map((q, qIndex) => ({
      id: q.id,
      text: q.text,
      category: block.category,
      type: 'distribution' as const,
      options: block.questions.map(q => q.text),
      maxPoints: 10,
    }))
  ).slice(0, 8),
  calculateScore: (answers, questions) => {
    // Логика подсчета ролей Белбина
    const roleCounts = Array(8).fill(0);
    
    answers.forEach((blockAnswers, blockIndex) => {
      if (Array.isArray(blockAnswers)) {
        const mapping = balbinAnswer[blockIndex + 1];
        blockAnswers.forEach((value, index) => {
          const roleIndex = mapping[index];
          roleCounts[roleIndex] += value;
        });
      }
    });

    const maxScore = Math.max(...roleCounts);
    const dominantRoleIndex = roleCounts.indexOf(maxScore);
    
    return {
      score: maxScore,
      details: {
        roleCounts,
        dominantRole: roleNames[dominantRoleIndex],
        roles: roleNames.map((name, index) => ({
          name,
          score: roleCounts[index],
        })),
      },
    };
  },
};

// Профессиональная направленность
export const professionalOrientationConfig: TestConfig = {
  id: 'professional-orientation',
  name: 'Тест профессиональной направленности',
  description: 'Дифференциально-диагностический опросник Е.А. Климова',
  timeLimit: 1200, // 20 минут
  questions: questionsA.map((q, index) => ({
    id: q.id,
    text: `Мне бы больше понравилось:`,
    type: 'pair-choice' as const,
    optionA: q.text,
    optionB: questionsB[index].text,
    descriptionA: q.description,
    descriptionB: questionsB[index].description,
  })),
  calculateScore: (answers, questions) => {
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

      if (HumanNature[questionNumber] !== undefined && HumanNature[questionNumber] === isVariantA) {
        counts.humanNature++;
      }
      if (HumanTech[questionNumber] !== undefined && HumanTech[questionNumber] === isVariantA) {
        counts.humanTech++;
      }
      if (HumanHuman[questionNumber] !== undefined && HumanHuman[questionNumber] === isVariantA) {
        counts.humanHuman++;
      }
      if (HumanSys[questionNumber] !== undefined && HumanSys[questionNumber] === isVariantA) {
        counts.humanSys++;
      }
      if (HumanArt[questionNumber] !== undefined && HumanArt[questionNumber] === isVariantA) {
        counts.humanArt++;
      }
    });

    const maxScore = Math.max(...Object.values(counts));
    const dominantCategory = Object.keys(categories).reduce((a, b) =>
      counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b
    );

    return {
      score: maxScore,
      details: {
        categoryScores: counts,
        dominantCategory: categories[dominantCategory as keyof typeof categories].name,
        dominantCategoryIcon: categories[dominantCategory as keyof typeof categories].icon,
        professionRecommendations: categories[dominantCategory as keyof typeof categories].professions,
      },
    };
  },
};

// Темперамент
export const temperamentConfig: TestConfig = {
  id: 'temperament',
  name: 'Тест темперамента',
  description: 'Опросник EPI (Г. Айзенк)',
  questions: [], // Заполняется динамически в зависимости от варианта
  calculateScore: (answers, questions) => {
    let countExtraIntr = 0;
    let countNeiro = 0;
    let countLie = 0;

    answers.forEach((answer, index) => {
      const questionNumber = index + 1;

      if (ExtraIntrMap[questionNumber] !== undefined && ExtraIntrMap[questionNumber] === answer) {
        countExtraIntr++;
      }

      if (NeiroMap[questionNumber] !== undefined && NeiroMap[questionNumber] === answer) {
        countNeiro++;
      }

      if (LieMap[questionNumber] !== undefined && LieMap[questionNumber] === answer) {
        countLie++;
      }
    });

    // Определение типа темперамента
    let temperamentType;
    if (countExtraIntr >= 12 && countNeiro >= 12) {
      temperamentType = temperamentTypes.choleric;
    } else if (countExtraIntr >= 12 && countNeiro < 12) {
      temperamentType = temperamentTypes.sanguine;
    } else if (countExtraIntr < 12 && countNeiro < 12) {
      temperamentType = temperamentTypes.phlegmatic;
    } else {
      temperamentType = temperamentTypes.melancholic;
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
  },
};

export const testConfigs = {
  'engineering-thinking': engineeringThinkingConfig,
  'group-roles': groupRolesConfig,
  'professional-orientation': professionalOrientationConfig,
  'temperament': temperamentConfig,
};