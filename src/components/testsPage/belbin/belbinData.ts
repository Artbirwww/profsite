import { SliderData } from "../generalTemplates/constantSumSlider/ConstantSumSlider";
/**TODO переписать роли как в БД, и при подсчете использовать их, 
 * отрпавить на сервер 
 * показать результаты пользователю текущей сессии*/
export type BelbinRole = 
  | 'PL' // Plant (Creative)
  | 'RI' // Resource Investigator (Networker)
  | 'CO' // Coordinator (Chairperson)
  | 'SH' // Shaper (Driver)
  | 'ME' // Monitor Evaluator (Judge)
  | 'TW' // Teamworker (Supporter)
  | 'IMP' // Implementer (Worker)
  | 'CF' // Completer Finisher (Checker)
  | 'SP'; // Specialist (Expert)
  
export interface BelbinQuestion extends SliderData {
    belbinRole: BelbinRole
}

export const groupQuestions: BelbinQuestion[][] = [
            // Section 1 (Usually 7 sections of 8 questions each)
    [{ id: 1, text: "Я думаю, что умею быстро находить новые возможности и использовать их.", belbinRole: 'RI', min:0, max:10, value:0},
    { id: 2, text: "Я могу хорошо работать с разными людьми.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 3, text: "Мне легко придумывать новые идеи.", belbinRole: 'PL' , min:0, max:10, value:0},
    { id: 4, text: "Я умею находить людей, которые могут помочь команде.", belbinRole: 'RI' , min:0, max:10, value:0},
    { id: 5, text: "Я довожу дела до конца, и это помогает мне хорошо работать.", belbinRole: 'CF' , min:0, max:10, value:0},
    { id: 6, text: "Меня не пугает неодобрение окружающих, если я уверен в пользе своих действий для результата.", belbinRole: 'SH' , min:0, max:10, value:0},
    { id: 7, text: "Если я уже сталкивался с похожей ситуацией, я быстро понимаю, что нужно делать.", belbinRole: 'IMP' , min:0, max:10, value:0},
    { id: 8, text: "Моё личное мнение не мешает мне находить и объяснять другие возможные решения.", belbinRole: 'ME', min:0, max:10, value:0 }],
    // Section 2
    [{ id: 9, text: "Я чувствую себя неуверенно на встречах, если нет четкого плана и контроля.", belbinRole: 'CF' , min:0, max:10, value:0},
    { id: 10, text: "Я готов поддержать людей, которые думают правильно, но не говорят об этом.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 11, text: "Я могу говорить слишком много, когда обсуждаются новые идеи.", belbinRole: 'PL' , min:0, max:10, value:0},
    { id: 12, text: "Я осторожен и не спешу соглашаться с мнением других.", belbinRole: 'ME' , min:0, max:10, value:0},
    { id: 13, text: "Я могу быть строгим и требовательным, когда мне нужно чего-то добиться.", belbinRole: 'SH' , min:0, max:10, value:0},
    { id: 14, text: "Мне трудно вести людей за собой, потому что я подвержен влиянию настроения окружающих.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 15, text: "Я увлекаюсь своими идеями и не всегда замечаю, что происходит вокруг.", belbinRole: 'PL' , min:0, max:10, value:0},
    { id: 16, text: "Окружающие считают, что я слишком беспокоюсь о мелочах и о том, что дела идут не так.", belbinRole: 'CF' , min:0, max:10, value:0}],

    // Section 3
    [{ id: 17, text: "Я умею влиять на людей, не оказывая на них давления.", belbinRole: 'CO' , min:0, max:10, value:0},
    { id: 18, text: "Я осторожен и это помогает мне избегать ошибок.", belbinRole: 'ME' , min:0, max:10, value:0},
    { id: 19, text: "Я готов настаивать, чтобы встреча была продуктивной и не терялась основная цель.", belbinRole: 'SH' , min:0, max:10, value:0},
    { id: 20, text: "Можно ожидать от меня оригинальные идеи.", belbinRole: 'PL', min:0, max:10, value:0 },
    { id: 21, text: "Я всегда готов поддержать идеи, которые полезны для всех.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 22, text: "Я активно ищу самые новые идеи и разработки.", belbinRole: 'RI', min:0, max:10, value:0 },
    { id: 23, text: "Я надеюсь, что все, кто меня знают, ценят мою способность быть объективным.", belbinRole: 'ME' , min:0, max:10, value:0},
    { id: 24, text: "Я могу следить за тем, чтобы важные дела были организованы правильно.", belbinRole: 'CO', min:0, max:10, value:0 }],
    // Section 4
    [{ id: 25, text: "Я стараюсь лучше узнать людей, с которыми делаю общее дело.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 26, text: "Мне не нравится спорить с друзьями или быть в меньшинстве.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 27, text: "Я умею находить хорошие причины, чтобы сказать 'нет' плохим идеям.", belbinRole: 'ME' , min:0, max:10, value:0},
    { id: 28, text: "Я думаю, что умею быстро организовать выполнение планов, о которых мы все договорились.", belbinRole: 'IMP' , min:0, max:10, value:0},
    { id: 29, text: "Я умею находить неожиданные решения, а не просто следовать очевидным.", belbinRole: 'PL' , min:0, max:10, value:0},
    { id: 30, text: "Я стремлюсь делать свою работу в команде наилучшим образом.", belbinRole: 'SP' , min:0, max:10, value:0},
    { id: 31, text: "У меня хорошо получается налаживать продуктивные связи команды с внешним миром.", belbinRole: 'RI' , min:0, max:10, value:0},
    { id: 32, text: "Я могу слушать разные мнения и после принятия решения следую мнению большинства.", belbinRole: 'CO' , min:0, max:10, value:0}],
    // Section 5
    [{ id: 33, text: "Мне нравится анализировать ситуации и рассматривать все возможности.", belbinRole: 'ME' , min:0, max:10, value:0},
    { id: 34, text: "Мне нравится находить практические решения для проблем.", belbinRole: 'IMP' , min:0, max:10, value:0},
    { id: 35, text: "Мне приятно понимать, что я создаю хорошие отношения в группе.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 36, text: "Я способен оказывать сильное влияние на принятие решений.", belbinRole: 'SH' , min:0, max:10, value:0},
    { id: 37, text: "Я рад встречаться с людьми, которые могут научить меня чему-то новому.", belbinRole: 'RI' , min:0, max:10, value:0},
    { id: 38, text: "Я способен убедить людей действовать в нужном направлении.", belbinRole: 'CO' , min:0, max:10, value:0},
    { id: 39, text: "Я чувствую себя комфортно, когда могу сосредоточиться на одной задаче.", belbinRole: 'SP' , min:0, max:10, value:0},
    { id: 40, text: "Мне нравится находить задачи, которые требуют творческого подхода.", belbinRole: 'PL' , min:0, max:10, value:0}],
    // Section 6
    [{ id: 41, text: "Я бы предпочел сначала подумать в одиночестве, прежде чем действовать в сложной ситуации.", belbinRole: 'ME' , min:0, max:10, value:0},
    { id: 42, text: "Я готов работать с тем, кто предлагает хорошие идеи, даже если это трудно.", belbinRole: 'IMP' , min:0, max:10, value:0},
    { id: 43, text: "Я попробую разделить задачу на части, чтобы каждый мог сделать то, что у него лучше всего получается.", belbinRole: 'CO' , min:0, max:10, value:0},
    { id: 44, text: "Моя организованность поможет нам не отставать от графика.", belbinRole: 'CF' , min:0, max:10, value:0},
    { id: 45, text: "Мне кажется, что я могу оставаться спокойным и логичным.", belbinRole: 'ME' , min:0, max:10, value:0},
    { id: 46, text: "Я буду упорно двигаться к цели, несмотря на препятствия.", belbinRole: 'SH' , min:0, max:10, value:0},
    { id: 47, text: "Я готов показать пример, если в команде не видно прогресса и все устали.", belbinRole: 'SH' , min:0, max:10, value:0},
    { id: 48, text: "Я бы устроил обсуждение, чтобы помочь команде придумать новые идеи и начать работать вместе.", belbinRole: 'CO' , min:0, max:10, value:0}],
    // Section 7 (Final section)
    [{ id: 49, text: "Я иногда не терплю людей, которые, по моему мнению, мешают команде.", belbinRole: 'SH' , min:0, max:10, value:0},
    { id: 50, text: "Другие иногда говорят, что я слишком рационален и не могу принимать спонтанные или нестандартные решения.", belbinRole: 'IMP' , min:0, max:10, value:0},
    { id: 51, text: "Мое желание, чтобы работа выполнялась правильно, может замедлять процесс.", belbinRole: 'CF' , min:0, max:10, value:0},
    { id: 52, text: "Я быстро теряю энтузиазм и пытаюсь вдохновиться от более активных членов группы.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 53, text: "Мне трудно начинать работу, если у меня нет ясных целей.", belbinRole: 'CF' , min:0, max:10, value:0},
    { id: 54, text: "Иногда мне сложно разобраться в сложных ситуациях.", belbinRole: 'PL' , min:0, max:10, value:0},
    { id: 55, text: "Я стесняюсь просить помощи у других, когда не могу что-то сделать сам.", belbinRole: 'TW' , min:0, max:10, value:0},
    { id: 56, text: "Мне трудно объяснить свою точку зрения, когда сталкиваюсь с сильными возражениями.", belbinRole: 'TW' , min:0, max:10, value:0}]
];