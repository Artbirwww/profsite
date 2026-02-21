// src/components/tests/profsphere/professionalOrientationData.ts

export type ScoringCategory = 'humanNature' | 'humanTech' | 'humanHuman' | 'humanSys' | 'humanArt';

export interface ScoringRule {
  category: ScoringCategory;
  addWhenChoice: 'A' | 'B';
}

export interface Question {
  id: string;
  text: string;
  description: string;
  answer: boolean;
  /** Правила подсчёта: какой выбор (A/B) добавляет балл в какую категорию (для пары вопросов) */
  scoringRules?: ScoringRule[];
}

// Вопросы варианта А с ID, категориями и правилами подсчёта (из методики Климова)
export const questionsA: Question[] = [
  {
    id: 'a-1',
    text: 'Ухаживать за животными.',
    description: 'Работа с живыми существами',
    answer: true,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'A' },
      { category: 'humanTech', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-2',
    text: 'Помогать больным людям, лечить их.',
    description: 'Медицинская помощь',
    answer: true,
    scoringRules: [
      { category: 'humanHuman', addWhenChoice: 'A' },
      { category: 'humanSys', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-3',
    text: 'Следить за качеством иллюстраций, картинок, плакатов и другого художественного контента.',
    description: 'Художественная оценка',
    answer: false,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'B' },
      { category: 'humanArt', addWhenChoice: 'A' }
    ]
  },
  {
    id: 'a-4',
    text: 'Обрабатывать материалы (дерево, ткань, пластик и т.д.).',
    description: 'Материальная обработка',
    answer: true,
    scoringRules: [
      { category: 'humanTech', addWhenChoice: 'A' },
      { category: 'humanHuman', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-5',
    text: 'Обсуждать научно-популярные книги, статьи.',
    description: 'Научная дискуссия',
    answer: true,
    scoringRules: [
      { category: 'humanSys', addWhenChoice: 'A' },
      { category: 'humanArt', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-6',
    text: 'Выращивать животных.',
    description: 'Животноводство',
    answer: true,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'A' },
      { category: 'humanHuman', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-7',
    text: 'Копировать рисунки, изображения, настраивать музыкальные инструменты.',
    description: 'Творческое воспроизведение',
    answer: false,
    scoringRules: [
      { category: 'humanTech', addWhenChoice: 'B' },
      { category: 'humanArt', addWhenChoice: 'A' }
    ]
  },
  {
    id: 'a-8',
    text: 'Сообщать, разъяснять людям нужные для них сведения в службе поддержки, во время экскурсии и т.д.',
    description: 'Информационная помощь',
    answer: true,
    scoringRules: [
      { category: 'humanHuman', addWhenChoice: 'A' },
      { category: 'humanArt', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-9',
    text: 'Ремонтировать и настраивать вещи и технику.',
    description: 'Техническое обслуживание',
    answer: true,
    scoringRules: [
      { category: 'humanTech', addWhenChoice: 'A' },
      { category: 'humanSys', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-10',
    text: 'Лечить животных.',
    description: 'Ветеринария',
    answer: true,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'A' },
      { category: 'humanSys', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-11',
    text: 'Выводить новые сорта растений.',
    description: 'Селекция растений',
    answer: true,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'A' },
      { category: 'humanTech', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-12',
    text: 'Разбирать споры, ссоры между людьми, убеждать, разъяснять, поощрять, наказывать.',
    description: 'Конфликтология',
    answer: true,
    scoringRules: [
      { category: 'humanHuman', addWhenChoice: 'A' },
      { category: 'humanSys', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-13',
    text: 'Наблюдать, изучать работу творческих коллективов.',
    description: 'Творческий анализ',
    answer: false,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'B' },
      { category: 'humanArt', addWhenChoice: 'A' }
    ]
  },
  {
    id: 'a-14',
    text: 'Обслуживать, налаживать медицинские приборы и технику.',
    description: 'Медицинская техника',
    answer: true,
    scoringRules: [
      { category: 'humanTech', addWhenChoice: 'A' },
      { category: 'humanHuman', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-15',
    text: 'Составлять точные описания, отчёты о наблюдаемых явлениях, событиях, измеряемых объектах и др.',
    description: 'Аналитическая документация',
    answer: true,
    scoringRules: [
      { category: 'humanSys', addWhenChoice: 'A' },
      { category: 'humanArt', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-16',
    text: 'Делать лабораторные аналисы в больнице.',
    description: 'Медицинская диагностика',
    answer: true,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'A' },
      { category: 'humanHuman', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-17',
    text: 'Расписывать стены помещений, делать иллюстрации.',
    description: 'Художественное оформление',
    answer: false,
    scoringRules: [
      { category: 'humanTech', addWhenChoice: 'B' },
      { category: 'humanArt', addWhenChoice: 'A' }
    ]
  },
  {
    id: 'a-18',
    text: 'Организовывать выходы людей в театры, музеи, на экскурсии, в туристические путешествия и т.п.',
    description: 'Культурная организация',
    answer: true,
    scoringRules: [
      { category: 'humanHuman', addWhenChoice: 'A' },
      { category: 'humanArt', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-19',
    text: 'Изготавливать что-либо по чертежам.',
    description: 'Техническое производство',
    answer: true,
    scoringRules: [
      { category: 'humanTech', addWhenChoice: 'A' },
      { category: 'humanSys', addWhenChoice: 'B' }
    ]
  },
  {
    id: 'a-20',
    text: 'Бороться с болезнями растений, с вредителями леса и сада.',
    description: 'Защита растений',
    answer: true,
    scoringRules: [
      { category: 'humanNature', addWhenChoice: 'A' },
      { category: 'humanSys', addWhenChoice: 'B' }
    ]
  }
];

// Вопросы варианта Б с ID и категориями
export const questionsB: Question[] = [
  {
    id: 'b-1',
    text: 'Обслуживать машины, приборы (следить, регулировать)',
    description: 'Техническое обслуживание',
    answer: false // Question 1: HumanNature[1] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-2',
    text: 'Составлять таблицы, схемы и программировать.',
    description: 'Информационная систематизация',
    answer: false // Question 2: HumanHuman[2] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-3',
    text: 'Следить за состоянием, развитием растений.',
    description: 'Ботаническое наблюдение',
    answer: true // Question 3: HumanNature[3] = false, so B is correct
  },
  {
    id: 'b-4',
    text: 'Рекламировать и продавать товары.',
    description: 'Коммерческая деятельность',
    answer: false // Question 4: HumanTech[4] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-5',
    text: 'Обсуждать художественные книги.',
    description: 'Литературная дискуссия',
    answer: false // Question 5: HumanSys[5] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-6',
    text: 'Тренировать сверстников (или младших) в выполнении каких-либо действий (учебных, спортивных и т.п.).',
    description: 'Педагогическая деятельность',
    answer: false // Question 6: HumanNature[6] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-7',
    text: 'Управлять каким-либо транспортным средством.',
    description: 'Транспортное управление',
    answer: true // Question 7: HumanTech[7] = false, so B is correct
  },
  {
    id: 'b-8',
    text: 'Творчески оформлять выставки, участвовать в подготовке концертов, пьес и т.п.',
    description: 'Творческая организация',
    answer: false // Question 8: HumanHuman[8] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-9',
    text: 'Искать и исправлять ошибки в текстах, таблицах, рисунках.',
    description: 'Аналитическая проверка',
    answer: false // Question 9: HumanTech[9] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-10',
    text: 'Выполнять расчёты, вычисления.',
    description: 'Математические операции',
    answer: false // Question 10: HumanNature[10] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-11',
    text: 'Создавать новые виды технических изделий (приборы, машины, одежду, дома и т.п.).',
    description: 'Техническое творчество',
    answer: false // Question 11: HumanNature[11] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-12',
    text: 'Разбираться в чертежах, схемах, таблицах.',
    description: 'Техническая документация',
    answer: false // Question 12: HumanHuman[12] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-13',
    text: 'Наблюдать, изучать жизнь микроорганизмов.',
    description: 'Микробиологическое исследование',
    answer: true // Question 13: HumanNature[13] = false, so B is correct
  },
  {
    id: 'b-14',
    text: 'Оказывать людям медицинскую помощь при ранениях, ушибах, ожогах и т.п.',
    description: 'Экстренная медицинская помощь',
    answer: false // Question 14: HumanTech[14] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-15',
    text: 'Художественно описывать, изображать события, сочинять истории.',
    description: 'Художественное творчество',
    answer: false // Question 15: HumanSys[15] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-16',
    text: 'Принимать, осматривать больных, беседовать с ними, назначать лечение.',
    description: 'Клиническая медицина',
    answer: false // Question 16: HumanNature[16] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-17',
    text: 'Строить здания или осуществлять сборку машин или техники.',
    description: 'Инженерно-строительная деятельность',
    answer: true // Question 17: HumanTech[17] = false, so B is correct
  },
  {
    id: 'b-18',
    text: 'Играть на сцене, принимать участие в концертах.',
    description: 'Сценическое искусство',
    answer: false // Question 18: HumanHuman[18] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-19',
    text: 'Заниматься черчением, проектированием, создавать 3D-модели',
    description: 'Проектирование и моделирование',
    answer: false // Question 19: HumanTech[19] = true, so A is correct, B is incorrect
  },
  {
    id: 'b-20',
    text: 'Работать со сложной техникой (3D-принтер, фрейзер, лазер и т.п.)',
    description: 'Современные технологии',
    answer: false // Question 20: HumanNature[20] = true, so A is correct, B is incorrect
  }
];


// Названия и описания категорий
export const categories = {
  humanNature: {
    name: 'Человек-Природа',
    description: 'Работа с живой природой, животными и растениями',
    professions: 'Биолог, ветеринар, агроном, эколог',
    icon: '🌿'
  },
  humanTech: {
    name: 'Человек-Техника',
    description: 'Работа с техникой, механизмами, материалами',
    professions: 'Инженер, механик, конструктор, технолог',
    icon: '🔧'
  },
  humanHuman: {
    name: 'Человек-Человек',
    description: 'Работа с людьми, общение, помощь, обучение',
    professions: 'Учитель, врач, психолог, менеджер',
    icon: '👥'
  },
  humanSys: {
    name: 'Человек-Знак',
    description: 'Работа со знаками, цифрами, системами, информацией',
    professions: 'Программист, бухгалтер, аналитик, исследователь',
    icon: '📊'
  },
  humanArt: {
    name: 'Человек-Художественный образ',
    description: 'Работа с образами, творчество, искусство',
    professions: 'Художник, дизайнер, музыкант, актер',
    icon: '🎨'
  }
};

export interface CategoryCounts {
  humanNature: number;
  humanTech: number;
  humanHuman: number;
  humanSys: number;
  humanArt: number;
}