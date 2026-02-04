export interface Question {
  id: string;
  text: string;
  role: string;
  answer: number;
}

// Ключи правильных ответовы к тесту
export const balbinAnswer: { [key: number]: number[] } = {
  1: [6, 3, 5, 2, 0, 7, 1, 4],
  2: [0, 1, 4, 6, 2, 3, 5, 7],
  3: [7, 0, 2, 3, 5, 6, 4, 1],
  4: [3, 7, 1, 4, 6, 2, 0, 5],
  5: [1, 5, 3, 7, 4, 0, 2, 6],
  6: [5, 2, 6, 0, 7, 4, 1, 3],
  7: [4, 6, 0, 5, 3, 1, 7, 2]
};

export interface QuestionBlock {
  id: string;
  category: string;
  questions: Question[];
}


// Названия ролей Белбина
export const roleNames = [
  'Исполнитель',
  'Координатор',
  'Формирователь',
  'Генератор идей',
  'Аналитик-стратег',
  'Исследователь ресурсов',
  'Командный работник',
  'Завершитель'
];

// Описание ролей
export const roleDescriptions = [
  'Практичен, дисциплинирован, надежен. Претворяет идеи в практические действия.',
  'Зрелый, уверенный, хороший организатор. Устанавливает цели, распределяет роли.',
  'Динамичен, общителен, работает на результат. Бросает вызов, оказывает давление.',
  'Креативен, нестандартно мыслит. Генерирует новые идеи и подходы.',
  'Рассудителен, стратегичен. Анализирует варианты, видит все "за" и "против".',
  'Общителен, энтузиаст. Исследует возможности, устанавливает контакты.',
  'Сотрудничающий, мягкий, дипломатичный. Слушает, предотвращает конфликты.',
  'Добросовестный, тщательный. Ищет ошибки, упущения, соблюдает сроки.'
];

// Вопросы
export const questionBlocks: QuestionBlock[] = [
  {
    id: 'block-1',
    category: 'Самооценка возможностей',
    questions: [
      {
        id: 'q1-1',
        text: 'Я думаю, что умею быстро находить новые возможности и использовать их.',
        role: 'Исследователь ресурсов',
        answer: 7 // From balbinAnswer[1][5] = 7 (Исследователь ресурсов is at index 5 in the roleNames array)
      },
      {
        id: 'q1-2',
        text: 'Я могу хорошо работать с разными людьми.',
        role: 'Командный работник',
        answer: 1 // From balbinAnswer[1][6] = 1 (Командный работник is at index 6 in the roleNames array)
      },
      {
        id: 'q1-3',
        text: 'Мне легко придумывать новые идеи.',
        role: 'Генератор идей',
        answer: 2 // From balbinAnswer[1][3] = 2 (Генератор идей is at index 3 in the roleNames array)
      },
      {
        id: 'q1-4',
        text: 'Я умею находить людей, которые могут помочь команде.',
        role: 'Формирователь',
        answer: 5 // From balbinAnswer[1][2] = 5 (Формирователь is at index 2 in the roleNames array)
      },
      {
        id: 'q1-5',
        text: 'Я довожу дела до конца, и это помогает мне хорошо работать.',
        role: 'Исполнитель',
        answer: 6 // From balbinAnswer[1][0] = 6 (Исполнитель is at index 0 in the roleNames array)
      },
      {
        id: 'q1-6',
        text: 'Меня не пугает неодобрение окружающих, если я уверен в пользе своих действий для результата.',
        role: 'Завершитель',
        answer: 4 // From balbinAnswer[1][7] = 4 (Завершитель is at index 7 in the roleNames array)
      },
      {
        id: 'q1-7',
        text: 'Если я уже сталкивался с похожей ситуацией, я быстро понимаю, что нужно делать.',
        role: 'Координатор',
        answer: 3 // From balbinAnswer[1][1] = 3 (Координатор is at index 1 in the roleNames array)
      },
      {
        id: 'q1-8',
        text: 'Моё личное мнение не мешает мне находить и объяснять другие возможные решения.',
        role: 'Аналитик-стратег',
        answer: 0 // From balbinAnswer[1][4] = 0 (Аналитик-стратег is at index 4 in the roleNames array)
      }
    ]
  },
  {
    id: 'block-2',
    category: 'Восприятие себя в команде',
    questions: [
      {
        id: 'q2-1',
        text: 'Я чувствую себя неуверенно на встречах, если нет четкого плана и контроля.',
        role: 'Координатор',
        answer: 1 // From balbinAnswer[2][1] = 1 (Координатор is at index 1 in the roleNames array)
      },
      {
        id: 'q2-2',
        text: 'Я готов поддержать людей, которые думают правильно, но не говорят об этом.',
        role: 'Командный работник',
        answer: 5 // From balbinAnswer[2][6] = 5 (Командный работник is at index 6 in the roleNames array)
      },
      {
        id: 'q2-3',
        text: 'Я могу говорить слишком много, когда обсуждаются новые идеи.',
        role: 'Генератор идей',
        answer: 6 // From balbinAnswer[2][3] = 6 (Генератор идей is at index 3 in the roleNames array)
      },
      {
        id: 'q2-4',
        text: 'Я осторожен и не спешу соглашаться с мнением других.',
        role: 'Аналитик-стратег',
        answer: 2 // From balbinAnswer[2][4] = 2 (Аналитик-стратег is at index 4 in the roleNames array)
      },
      {
        id: 'q2-5',
        text: 'Я могу быть строгим и требовательным, когда мне нужно чего-то добиться.',
        role: 'Формирователь',
        answer: 4 // From balbinAnswer[2][2] = 4 (Формирователь is at index 2 in the roleNames array)
      },
      {
        id: 'q2-6',
        text: 'Мне трудно вести людей за собой, потому что я подвержен влиянию настроения окружающих.',
        role: 'Исследователь ресурсов',
        answer: 3 // From balbinAnswer[2][5] = 3 (Исследователь ресурсов is at index 5 in the roleNames array)
      },
      {
        id: 'q2-7',
        text: 'Я увлекаюсь своими идеями и не всегда замечаю, что происходит вокруг.',
        role: 'Завершитель',
        answer: 7 // From balbinAnswer[2][7] = 7 (Завершитель is at index 7 in the roleNames array)
      },
      {
        id: 'q2-8',
        text: 'Окружающие считают, что я слишком беспокоюсь о мелочах и о том, что дела идут не так.',
        role: 'Исполнитель',
        answer: 0 // From balbinAnswer[2][0] = 0 (Исполнитель is at index 0 in the roleNames array)
      }
    ]
  },
  {
    id: 'block-3',
    category: 'Влияние на команду',
    questions: [
      {
        id: 'q3-1',
        text: 'Я умею влиять на людей, не оказывая на них давления.',
        role: 'Командный работник',
        answer: 1 // From balbinAnswer[3][6] = 1 (Командный работник is at index 6 in the roleNames array)
      },
      {
        id: 'q3-2',
        text: 'Я осторожен и это помогает мне избегать ошибок.',
        role: 'Аналитик-стратег',
        answer: 4 // From balbinAnswer[3][4] = 4 (Аналитик-стратег is at index 4 in the roleNames array)
      },
      {
        id: 'q3-3',
        text: 'Я готов настаивать, чтобы встреча была продуктивной и не терялась основная цель.',
        role: 'Формирователь',
        answer: 2 // From balbinAnswer[3][2] = 2 (Формирователь is at index 2 in the roleNames array)
      },
      {
        id: 'q3-4',
        text: 'Можно ожидать от меня оригинальные идеи.',
        role: 'Генератор идей',
        answer: 3 // From balbinAnswer[3][3] = 3 (Генератор идей is at index 3 in the roleNames array)
      },
      {
        id: 'q3-5',
        text: 'Я всегда готов поддержать идеи, которые полезны для всех.',
        role: 'Исполнитель',
        answer: 7 // From balbinAnswer[3][0] = 7 (Исполнитель is at index 0 in the roleNames array)
      },
      {
        id: 'q3-6',
        text: 'Я активно ищу самые новые идеи и разработки.',
        role: 'Исследователь ресурсов',
        answer: 5 // From balbinAnswer[3][5] = 5 (Исследователь ресурсов is at index 5 in the roleNames array)
      },
      {
        id: 'q3-7',
        text: 'Я надеюсь, что все, кто меня знают, ценят мою способность быть объективным.',
        role: 'Координатор',
        answer: 6 // From balbinAnswer[3][1] = 6 (Координатор is at index 1 in the roleNames array)
      },
      {
        id: 'q3-8',
        text: 'Я могу следить за тем, чтобы важные дела были организованы правильно.',
        role: 'Завершитель',
        answer: 1 // From balbinAnswer[3][7] = 1 (Завершитель is at index 7 in the roleNames array)
      }
    ]
  },
  {
    id: 'block-4',
    category: 'Межличностные отношения',
    questions: [
      {
        id: 'q4-1',
        text: 'Я стараюсь лучше узнать людей, с которыми делаю общее дело.',
        role: 'Командный работник',
        answer: 5 // From balbinAnswer[4][6] = 5 (Командный работник is at index 6 in the roleNames array)
      },
      {
        id: 'q4-2',
        text: 'Мне не нравится спорить с друзьями или быть в меньшинстве.',
        role: 'Исполнитель',
        answer: 3 // From balbinAnswer[4][0] = 3 (Исполнитель is at index 0 in the roleNames array)
      },
      {
        id: 'q4-3',
        text: 'Я умею находить хорошие причины, чтобы сказать "нет" плохим идеям.',
        role: 'Аналитик-стратег',
        answer: 4 // From balbinAnswer[4][4] = 4 (Аналитик-стратег is at index 4 in the roleNames array)
      },
      {
        id: 'q4-4',
        text: 'Я думаю, что умею быстро организовать выполнение планов, о которых мы все договорились.',
        role: 'Координатор',
        answer: 1 // From balbinAnswer[4][1] = 1 (Координатор is at index 1 in the roleNames array)
      },
      {
        id: 'q4-5',
        text: 'Я умею находить неожиданные решения, а не просто следовать очевидным.',
        role: 'Генератор идей',
        answer: 2 // From balbinAnswer[4][3] = 2 (Генератор идей is at index 3 in the roleNames array)
      },
      {
        id: 'q4-6',
        text: 'Я стремлюсь делать свою работу в команде наилучшим образом.',
        role: 'Завершитель',
        answer: 5 // From balbinAnswer[4][7] = 5 (Завершитель is at index 7 in the roleNames array)
      },
      {
        id: 'q4-7',
        text: 'У меня хорошо получается налаживать продуктивные связи команды с внешним миром.',
        role: 'Исследователь ресурсов',
        answer: 6 // From balbinAnswer[4][5] = 6 (Исследователь ресурсов is at index 5 in the roleNames array)
      },
      {
        id: 'q4-8',
        text: 'Я могу слушать разные мнения и после принятия решения следую мнению большинства.',
        role: 'Формирователь',
        answer: 4 // From balbinAnswer[4][2] = 4 (Формирователь is at index 2 in the roleNames array)
      }
    ]
  },
  {
    id: 'block-5',
    category: 'Мотивация и предпочтения',
    questions: [
      {
        id: 'q5-1',
        text: 'Мне нравится анализировать ситуации и рассматривать все возможности.',
        role: 'Аналитик-стратег',
        answer: 4 // From balbinAnswer[5][4] = 4 (Аналитик-стратег is at index 4 in the roleNames array)
      },
      {
        id: 'q5-2',
        text: 'Мне нравится находить практические решения для проблем.',
        role: 'Исполнитель',
        answer: 1 // From balbinAnswer[5][0] = 1 (Исполнитель is at index 0 in the roleNames array)
      },
      {
        id: 'q5-3',
        text: 'Мне приятно понимать, что я создаю хорошие отношения в группе.',
        role: 'Командный работник',
        answer: 2 // From balbinAnswer[5][6] = 2 (Командный работник is at index 6 in the roleNames array)
      },
      {
        id: 'q5-4',
        text: 'Я способен оказывать сильное влияние на принятие решений.',
        role: 'Формирователь',
        answer: 3 // From balbinAnswer[5][2] = 3 (Формирователь is at index 2 in the roleNames array)
      },
      {
        id: 'q5-5',
        text: 'Я рад встречаться с людьми, которые могут научить меня чему-то новому.',
        role: 'Исследователь ресурсов',
        answer: 0 // From balbinAnswer[5][5] = 0 (Исследователь ресурсов is at index 5 in the roleNames array)
      },
      {
        id: 'q5-6',
        text: 'Я способен убедить людей действовать в нужном направлении.',
        role: 'Координатор',
        answer: 5 // From balbinAnswer[5][1] = 5 (Координатор is at index 1 in the roleNames array)
      },
      {
        id: 'q5-7',
        text: 'Я чувствую себя комфортно, когда могу сосредоточиться на одной задаче.',
        role: 'Завершитель',
        answer: 6 // From balbinAnswer[5][7] = 6 (Завершитель is at index 7 in the roleNames array)
      },
      {
        id: 'q5-8',
        text: 'Мне нравится находить задачи, которые требуют творческого подхода.',
        role: 'Генератор идей',
        answer: 7 // From balbinAnswer[5][3] = 7 (Генератор идей is at index 3 in the roleNames array)
      }
    ]
  },
  {
    id: 'block-6',
    category: 'Поведение в сложных ситуациях',
    questions: [
      {
        id: 'q6-1',
        text: 'Я бы предпочел сначала подумать в одиночестве, прежде чем действовать в сложной ситуации.',
        role: 'Аналитик-стратег',
        answer: 7 // From balbinAnswer[6][4] = 7 (Аналитик-стратег is at index 4 in the roleNames array)
      },
      {
        id: 'q6-2',
        text: 'Я готов работать с тем, кто предлагает хорошие идеи, даже если это трудно.',
        role: 'Исполнитель',
        answer: 5 // From balbinAnswer[6][0] = 5 (Исполнитель is at index 0 in the roleNames array)
      },
      {
        id: 'q6-3',
        text: 'Я попробую разделить задачу на части, чтобы каждый мог сделать то, что у него лучше всего получается.',
        role: 'Координатор',
        answer: 2 // From balbinAnswer[6][1] = 2 (Координатор is at index 1 in the roleNames array)
      },
      {
        id: 'q6-4',
        text: 'Моя организованность поможет нам не отставать от графика.',
        role: 'Завершитель',
        answer: 3 // From balbinAnswer[6][7] = 3 (Завершитель is at index 7 in the roleNames array)
      },
      {
        id: 'q6-5',
        text: 'Мне кажется, что я могу оставаться спокойным и логичным.',
        role: 'Формирователь',
        answer: 6 // From balbinAnswer[6][2] = 6 (Формирователь is at index 2 in the roleNames array)
      },
      {
        id: 'q6-6',
        text: 'Я буду упорно двигаться к цели, несмотря на препятствия.',
        role: 'Генератор идей',
        answer: 0 // From balbinAnswer[6][3] = 0 (Генератор идей is at index 3 in the roleNames array)
      },
      {
        id: 'q6-7',
        text: 'Я готов показать пример, если в команде не видно прогресса и все устали.',
        role: 'Исследователь ресурсов',
        answer: 4 // From balbinAnswer[6][5] = 4 (Исследователь ресурсов is at index 5 in the roleNames array)
      },
      {
        id: 'q6-8',
        text: 'Я бы устроил обсуждение, чтобы помочь команде придумать новые идеи и начать работать вместе.',
        role: 'Командный работник',
        answer: 1 // From balbinAnswer[6][6] = 1 (Командный работник is at index 6 in the roleNames array)
      }
    ]
  },
  {
    id: 'block-7',
    category: 'Слабые стороны и ограничения',
    questions: [
      {
        id: 'q7-1',
        text: 'Я иногда не терплю людей, которые, по моему мнению, мешают команде.',
        role: 'Формирователь',
        answer: 0 // From balbinAnswer[7][2] = 0 (Формирователь is at index 2 in the roleNames array)
      },
      {
        id: 'q7-2',
        text: 'Другие иногда говорят, что я слишком рационален и не могу принимать спонтанные или нестандартные решения.',
        role: 'Аналитик-стратег',
        answer: 3 // From balbinAnswer[7][4] = 3 (Аналитик-стратег is at index 4 in the roleNames array)
      },
      {
        id: 'q7-3',
        text: 'Мое желание, чтобы работа выполнялась правильно, может замедлять процесс.',
        role: 'Завершитель',
        answer: 2 // From balbinAnswer[7][7] = 2 (Завершитель is at index 7 in the roleNames array)
      },
      {
        id: 'q7-4',
        text: 'Мне быстро теряю энтузиазм и пытаюсь вдохновиться от более активных членов группы.',
        role: 'Генератор идей',
        answer: 5 // From balbinAnswer[7][3] = 5 (Генератор идей is at index 3 in the roleNames array)
      },
      {
        id: 'q7-5',
        text: 'Мне трудно начинать работу, если у меня нет ясных целей.',
        role: 'Координатор',
        answer: 6 // From balbinAnswer[7][1] = 6 (Координатор is at index 1 in the roleNames array)
      },
      {
        id: 'q7-6',
        text: 'Иногда мне сложно разобраться в сложных ситуациях.',
        role: 'Исполнитель',
        answer: 4 // From balbinAnswer[7][0] = 4 (Исполнитель is at index 0 in the roleNames array)
      },
      {
        id: 'q7-7',
        text: 'Я стесняюсь просить помощи у других, когда не могу что-то сделать сам.',
        role: 'Командный работник',
        answer: 7 // From balbinAnswer[7][6] = 7 (Командный работник is at index 6 in the roleNames array)
      },
      {
        id: 'q7-8',
        text: 'Мне трудно объяснить свою точку зрения, когда сталкиваюсь с сильными возражениями.',
        role: 'Исследователь ресурсов',
        answer: 1 // From balbinAnswer[7][5] = 1 (Исследователь ресурсов is at index 5 in the roleNames array)
      }
    ]
  }
];