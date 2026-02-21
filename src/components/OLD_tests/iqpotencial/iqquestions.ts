export interface Question {
  id: string;
  a: string[];
  answer: number;
  category: string;
  image: string;
  form: 'A' | 'B';
}

function getImagePath(form: 'form1' | 'form2', imageName: string): string {
  try {
    const imageUrl = new URL(`../../../res/test-imgs/intellect-imgs/${form}/${imageName}`, import.meta.url);
    return imageUrl.href;
  } catch (error) {
    console.warn(`Failed to load image ${imageName} for form ${form}:`, error);
    return `/src/res/test-imgs/intellect-imgs/${form}/${imageName}`;
  }
}

// Таблица перевода баллов в IQ по возрасту
export const iqTable: Record<number, Record<number, number>> = {
  7: {
    0: 55, 1: 60, 2: 70, 3: 80, 4: 85, 5: 90, 6: 100, 7: 110,
    8: 115, 9: 120, 10: 125, 11: 130, 12: 135, 13: 135, 14: 135,
    15: 135, 16: 135, 17: 135, 18: 135, 19: 135, 20: 135, 21: 135,
    22: 135, 23: 135, 24: 135, 25: 135, 26: 135, 27: 135, 28: 135, 29: 135
  },
  8: {
    0: 55, 1: 55, 2: 55, 3: 60, 4: 70, 5: 75, 6: 80, 7: 85,
    8: 90, 9: 95, 10: 97, 11: 100, 12: 105, 13: 110, 14: 115,
    15: 120, 16: 123, 17: 125, 18: 127, 19: 130, 20: 135, 21: 136,
    22: 137, 23: 137, 24: 137, 25: 137, 26: 137, 27: 137, 28: 137, 29: 137
  },
  9: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 65, 5: 70, 6: 75, 7: 80,
    8: 85, 9: 90, 10: 95, 11: 97, 12: 100, 13: 105, 14: 110,
    15: 115, 16: 120, 17: 123, 18: 125, 19: 127, 20: 130, 21: 135,
    22: 137, 23: 137, 24: 137, 25: 137, 26: 137, 27: 137, 28: 137, 29: 137
  },
  10: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 65, 5: 70, 6: 75, 7: 80,
    8: 85, 9: 90, 10: 92, 11: 95, 12: 97, 13: 100, 14: 105,
    15: 110, 16: 113, 17: 115, 18: 118, 19: 122, 20: 125, 21: 128,
    22: 130, 23: 135, 24: 137, 25: 137, 26: 137, 27: 137, 28: 137, 29: 137
  },
  11: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 55, 5: 58, 6: 62, 7: 68,
    8: 70, 9: 75, 10: 80, 11: 85, 12: 88, 13: 92, 14: 97,
    15: 100, 16: 105, 17: 110, 18: 115, 19: 118, 20: 122, 21: 125,
    22: 128, 23: 130, 24: 132, 25: 135, 26: 137, 27: 137, 28: 137, 29: 137
  },
  12: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 55, 5: 58, 6: 62, 7: 68,
    8: 70, 9: 75, 10: 80, 11: 85, 12: 88, 13: 92, 14: 97,
    15: 100, 16: 105, 17: 110, 18: 115, 19: 118, 20: 122, 21: 125,
    22: 128, 23: 130, 24: 132, 25: 135, 26: 137, 27: 137, 28: 137, 29: 137
  },
  13: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 55, 5: 55, 6: 55, 7: 60,
    8: 65, 9: 70, 10: 73, 11: 76, 12: 79, 13: 82, 14: 85,
    15: 89, 16: 93, 17: 97, 18: 100, 19: 107, 20: 112, 21: 115,
    22: 118, 23: 120, 24: 123, 25: 125, 26: 130, 27: 135, 28: 137, 29: 137
  },
  14: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 55, 5: 55, 6: 55, 7: 55,
    8: 55, 9: 58, 10: 62, 11: 67, 12: 70, 13: 75, 14: 80,
    15: 85, 16: 88, 17: 92, 18: 97, 19: 100, 20: 105, 21: 110,
    22: 115, 23: 118, 24: 121, 25: 124, 26: 127, 27: 130, 28: 133, 29: 135
  },
  15: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 55, 5: 55, 6: 55, 7: 55,
    8: 55, 9: 55, 10: 58, 11: 62, 12: 67, 13: 70, 14: 74,
    15: 78, 16: 82, 17: 85, 18: 88, 19: 92, 20: 97, 21: 100,
    22: 105, 23: 110, 24: 115, 25: 118, 26: 121, 27: 124, 28: 127, 29: 130
  },
  16: {
    0: 55, 1: 55, 2: 55, 3: 55, 4: 55, 5: 55, 6: 55, 7: 55,
    8: 55, 9: 55, 10: 58, 11: 62, 12: 67, 13: 70, 14: 74,
    15: 78, 16: 82, 17: 85, 18: 88, 19: 92, 20: 97, 21: 100,
    22: 105, 23: 110, 24: 115, 25: 118, 26: 121, 27: 124, 28: 127, 29: 130
  }
};

// Максимальный IQ по возрасту
export const maxIqByAge: Record<number, number> = {
  7: 135, 8: 137, 9: 137, 10: 137, 11: 137,
  12: 137, 13: 137, 14: 135, 15: 130, 16: 130
};

// Вопросы для теста интеллекта
export const questions: Question[] = [
  // Форма A
  {
    id: 'a1',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form1', '1.png'),
    form: 'A'
  },
  {
    id: 'a2',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form1', '2.png'),
    form: 'A'
  },
  {
    id: 'a3',
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form1', '3.png'),
    form: 'A'
  },
  {
    id: 'a4',
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form1', '4.png'),
    form: 'A'
  },
  {
    id: 'a5',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form1', '5.png'),
    form: 'A'
  },
  {
    id: 'a6',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form1', '6.png'),
    form: 'A'
  },
  {
    id: 'a7',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form1', '7.png'),
    form: 'A'
  },
  {
    id: 'a8',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form1', '8.png'),
    form: 'A'
  },
  {
    id: 'a9',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form1', '9.png'),
    form: 'A'
  },
  {
    id: 'a10',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form1', '10.png'),
    form: 'A'
  },
  {
    id: 'a11',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form1', '11.png'),
    form: 'A'
  },
  {
    id: 'a12',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form1', '12.png'),
    form: 'A'
  },
  {
    id: 'a13',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form1', '13.png'),
    form: 'A'
  },
  {
    id: 'a14',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form1', '14.png'),
    form: 'A'
  },
  {
    id: 'a15',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form1', '15.png'),
    form: 'A'
  },
  {
    id: 'a16',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form1', '16.png'),
    form: 'A'
  },
  {
    id: 'a17',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form1', '17.png'),
    form: 'A'
  },
  {
    id: 'a18',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form1', '18.png'),
    form: 'A'
  },
  {
    id: 'a19',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form1', '19.png'),
    form: 'A'
  },
  {
    id: 'a20',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form1', '20.png'),
    form: 'A'
  },
  {
    id: 'a21',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form1', '21.png'),
    form: 'A'
  },
  {
    id: 'a22',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 1,
    category: 'Логика',
    image: getImagePath('form1', '22.png'),
    form: 'A'
  },
  {
    id: 'a23',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form1', '23.png'),
    form: 'A'
  },
  {
    id: 'a24',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form1', '24.png'),
    form: 'A'
  },
  {
    id: 'a25',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form1', '25.png'),
    form: 'A'
  },
  {
    id: 'a26',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 1,
    category: 'Логика',
    image: getImagePath('form1', '26.png'),
    form: 'A'
  },
  {
    id: 'a27',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form1', '27.png'),
    form: 'A'
  },
  {
    id: 'a28',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form1', '28.png'),
    form: 'A'
  },
  {
    id: 'a29',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form1', '29.png'),
    form: 'A'
  },
  // Форма B
  {
    id: 'b1',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form2', '1.png'),
    form: 'B'
  },
  {
    id: 'b2',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form2', '2.png'),
    form: 'B'
  },
  {
    id: 'b3',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form2', '3.png'),
    form: 'B'
  },
  {
    id: 'b4',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form2', '4.png'),
    form: 'B'
  },
  {
    id: 'b5',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form2', '5.png'),
    form: 'B'
  },
  {
    id: 'b6',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form2', '6.png'),
    form: 'B'
  },
  {
    id: 'b7',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form2', '7.png'),
    form: 'B'
  },
  {
    id: 'b8',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form2', '8.png'),
    form: 'B'
  },
  {
    id: 'b9',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form2', '9.png'),
    form: 'B'
  },
  {
    id: 'b10',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form2', '10.png'),
    form: 'B'
  },
  {
    id: 'b11',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form2', '11.png'),
    form: 'B'
  },
  {
    id: 'b12',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form2', '12.png'),
    form: 'B'
  },
  {
    id: 'b13',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form2', '13.png'),
    form: 'B'
  },
  {
    id: 'b14',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form2', '14.png'),
    form: 'B'
  },
  {
    id: 'b15',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form2', '15.png'),
    form: 'B'
  },
  {
    id: 'b16',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 1,
    category: 'Логика',
    image: getImagePath('form2', '16.png'),
    form: 'B'
  },
  {
    id: 'b17',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form2', '17.png'),
    form: 'B'
  },
  {
    id: 'b18',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form2', '18.png'),
    form: 'B'
  },
  {
    id: 'b19',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form2', '19.png'),
    form: 'B'
  },
  {
    id: 'b20',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form2', '20.png'),
    form: 'B'
  },
  {
    id: 'b21',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form2', '21.png'),
    form: 'B'
  },
  {
    id: 'b22',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form2', '22.png'),
    form: 'B'
  },
  {
    id: 'b23',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 1,
    category: 'Логика',
    image: getImagePath('form2', '23.png'),
    form: 'B'
  },
  {
    id: 'b24',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 4,
    category: 'Логика',
    image: getImagePath('form2', '24.png'),
    form: 'B'
  },
  {
    id: 'b25',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 2,
    category: 'Логика',
    image: getImagePath('form2', '25.png'),
    form: 'B'
  },
  {
    id: 'b26',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 3,
    category: 'Логика',
    image: getImagePath('form2', '26.png'),
    form: 'B'
  },
  {
    id: 'b27',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 1,
    category: 'Логика',
    image: getImagePath('form2', '27.png'),
    form: 'B'
  },
  {
    id: 'b28',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 6,
    category: 'Логика',
    image: getImagePath('form2', '28.png'),
    form: 'B'
  },
  {
    id: 'b29',
    
    a: ['1', '2', '3', '4', '5', '6'],
    answer: 5,
    category: 'Логика',
    image: getImagePath('form2', '29.png'),
    form: 'B'
  }
];

// Функция для расчета IQ
export function calculateIQ(rawScore: number, age: number): number {
  // Корректировка возраста
  if (age < 7) age = 7;
  if (age > 16) age = 16;
  
  // Корректировка баллов
  if (rawScore > 29) rawScore = 29;
  if (rawScore < 0) rawScore = 0;
  
  // Получение IQ из таблицы
  if (iqTable[age] && iqTable[age][rawScore] !== undefined) {
    return iqTable[age][rawScore];
  }
  
  return 100; // Значение по умолчанию
}

// Функция для получения максимального IQ для возраста
export function getMaxIQForAge(age: number): number {
  if (age < 7) age = 7;
  if (age > 16) age = 16;
  
  return maxIqByAge[age] || 137;
}

// Конфигурация теста
export const testConfig = {
  totalQuestions: 29,
  totalTime: 720, // 12 минут в секундах
  maxScore: 29,
  answerOptions: 6
};

// Получение вопросов для определенной формы
export function getQuestionsForForm(form: 'A' | 'B'): Question[] {
  return questions.filter(q => q.form === form);
}

export const testData = {
  questions,
  testConfig,
  iqTable,
  maxIqByAge,
  calculateIQ,
  getMaxIQForAge,
  getQuestionsForForm
};