import { TestConfig, ImageChoiceQuestion } from './types/test-types';
import { questions as engineerQuestions } from './engineer/EngineerQuestions';
import { groupQuestions, belbinAnswerMapping, belbinRoleNames } from './grouproles/GroupQuestions';
import { getQuestionsForForm, Question } from './iqpotencial/iqquestions';
import { questionsA, questionsB, categories } from './profsphere/ProfQuestions';
import { temperamentTypes } from './temperament/TempQuestions';
import {
  createEngineeringThinkingCalculator,
  createGroupRolesCalculator,
  createProfessionalOrientationCalculator,
  createTemperamentCalculator,
  calculateIntellectualPotentialScore,
} from './TestScores';

// Инженерное мышление
export const engineeringThinkingConfig: TestConfig = {
  id: 'engineering-thinking',
  name: 'Тест на инженерное мышление',
  description: 'Тест технических способностей',
  timeLimit: 1500, // 25 минут
  showCategory: true,

  questions: engineerQuestions.map((q) => ({
    id: q.id,
    text: q.q,
    category: q.category,
    type: 'single-choice' as const,
    options: q.a,
    correctAnswer: q.answer,
    image: q.image,
  })),
  calculateScore: createEngineeringThinkingCalculator(),
};

// Групповые роли (Белбин) — 7 блоков, в каждом распределить 10 баллов между 8 утверждениями
const createBelbinQuestionBlocks = () => {
  const blocks = [];
  for (let i = 0; i < 7; i++) {
    const startIndex = i * 8;
    const endIndex = startIndex + 8;
    const blockQuestions = groupQuestions.slice(startIndex, endIndex);
    blocks.push({
      category: `Блок ${i + 1}`,
      questions: blockQuestions,
    });
  }
  return blocks;
};

export const groupRolesConfig: TestConfig = {
  id: 'group-roles',
  name: 'Тест групповых ролей',
  description: 'Методика Белбина',
  timeLimit: 1800, // 30 минут
  showCategory: true,
  questions: createBelbinQuestionBlocks().map((block, blockIndex) => ({
    id: `belbin-block-${blockIndex + 1}`,
    text: 'Распределите 10 баллов между утверждениями. Чем больше баллов вы даёте утверждению, тем лучше оно описывает ваше поведение.',
    category: block.category,
    type: 'distribution' as const,
    options: block.questions.map((q) => q.text),
    maxPoints: 10,
  })),
  calculateScore: createGroupRolesCalculator(belbinAnswerMapping, belbinRoleNames),
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
    scoringRules: q.scoringRules,
  })),
  calculateScore: createProfessionalOrientationCalculator(categories),
};

// Темперамент
export const temperamentConfig: TestConfig = {
  id: 'temperament',
  name: 'Тест темперамента',
  description: 'Опросник EPI (Г. Айзенк)',
  timeLimit: 1200, // 20 минут
  questions: [], // Заполняется динамически в зависимости от варианта
  calculateScore: createTemperamentCalculator(temperamentTypes),
};

// Интеллектуальный потенциал — конфиг зависит от выбранной формы (A или B)
function transformToImageChoiceQuestions(questions: Question[]): ImageChoiceQuestion[] {
  return questions.map((q) => ({
    id: q.id,
    text: 'Выберите недостающую фигуру',
    category: q.category,
    type: 'image-choice' as const,
    image: q.image,
    options: q.a,
    correctAnswer: q.answer,
  }));
}

export function getIntellectualPotentialConfig(form: 'A' | 'B'): TestConfig {
  const questions = getQuestionsForForm(form);
  return {
    id: 'iq-potential',
    name: `Тест интеллектуального потенциала — форма ${form}`,
    description: `Оценка уровня интеллектуального развития. Форма ${form}. 29 заданий с изображениями. Время: 12 минут.`,
    timeLimit: 720,
    showCategory: false,
    questions: transformToImageChoiceQuestions(questions),
    calculateScore: (answers: any[], qs: any[]) =>
      calculateIntellectualPotentialScore(answers, qs),
  };
}

export const testConfigs = {
  'engineering-thinking': engineeringThinkingConfig,
  'group-roles': groupRolesConfig,
  'professional-orientation': professionalOrientationConfig,
  'temperament': temperamentConfig,
};