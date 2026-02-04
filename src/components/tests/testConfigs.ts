import { TestConfig } from './types/test-types';
import { answerKey, questions as engineerQuestions } from './engineer/EngineerQuestions';
import { balbinAnswer, roleNames, questionBlocks } from './grouproles/GroupQuestions';
import { questionsA, questionsB, HumanNature, HumanTech, HumanHuman, HumanSys, HumanArt, categories } from './profsphere/ProfQuestions';
import { ExtraIntrMap, NeiroMap, LieMap, temperamentTypes } from './temperament/TempQuestions';
import {
  createEngineeringThinkingCalculator,
  createGroupRolesCalculator,
  createProfessionalOrientationCalculator,
  createTemperamentCalculator,
} from './TestScores';

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
  calculateScore: createEngineeringThinkingCalculator(),
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
  ),
  calculateScore: createGroupRolesCalculator(balbinAnswer, roleNames),
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
  calculateScore: createProfessionalOrientationCalculator(HumanNature, HumanTech, HumanHuman, HumanSys, HumanArt, categories),
};

// Темперамент
export const temperamentConfig: TestConfig = {
  id: 'temperament',
  name: 'Тест темперамента',
  description: 'Опросник EPI (Г. Айзенк)',
  questions: [], // Заполняется динамически в зависимости от варианта
  calculateScore: createTemperamentCalculator(ExtraIntrMap, NeiroMap, LieMap, temperamentTypes),
};

export const testConfigs = {
  'engineering-thinking': engineeringThinkingConfig,
  'group-roles': groupRolesConfig,
  'professional-orientation': professionalOrientationConfig,
  'temperament': temperamentConfig,
};