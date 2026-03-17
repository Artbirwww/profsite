import { SliderData } from "../generalTemplates/constantSumSlider/ConstantSumSlider";
/**TODO переписать роли как в БД, и при подсчете использовать их, 
 * отрпавить на сервер 
 * показать результаты пользователю текущей сессии*/

export type groupRolesDataRole =
	| "исполнитель" //company_worker
	| "кординатор" //chairman
	| "формирователь"//shaper
	| "мыслитель" //plant
	| "разведчик" //resource_investigator
	| "оценщик" //monitor_evaluation
	| "коллективист"//team_worker
	| "доводчик"//completer_finisher

export type groupRolesDataRoleEn =
	| "company_worker"
	| "chairman"
	| "shaper"
	| "plant"
	| "resource_investigator"
	| "monitor_evaluation"
	| "team_worker"
	| "completer_finisher"

export const groupRolesDataRoleMapping: Record<groupRolesDataRole, groupRolesDataRoleEn> = {
	"исполнитель": "company_worker",
	"кординатор": "chairman",
	"формирователь": "shaper",
	"мыслитель": "plant",
	"разведчик": "resource_investigator",
	"оценщик": "monitor_evaluation",
	"коллективист": "team_worker",
	"доводчик": "completer_finisher"
}

export const groupRoles = [
	{ id: 1, name: "company_worker", description: "Надежный, организованный, превращает идеи в задачи" },
	{ id: 2, name: "chairman", description: "Уверенный лидер, ставит цели, помогает принимать решения" },
	{ id: 3, name: "shaper", description: "Динамичный, бросает вызов команде, работает под давлением" },
	{ id: 4, name: "plant", description: "Креативный, генерирует оригинальные идеи" },
	{ id: 5, name: "resource_investigator", description: "Общительный, ищет возможности, налаживает связи" },
	{ id: 6, name: "monitor_evaluation", description: "Объективный судья, оценивает все варианты" },
	{ id: 7, name: "team_worker", description: "Дипломатичный, слушает, создает гармонию в команде" },
	{ id: 8, name: "completer_finisher", description: "Добросовестный, доводит до конца, проверяет детали" }
] as const

export interface GroupRolesQuestion extends SliderData {
	groupRole: groupRolesDataRole
	symbol: string
}

export const groupQuestions: GroupRolesQuestion[][] = [
	// Section 1 (Symbols: a,b,c,d,e,f,g,h)
	[{ id: 1, text: "Я думаю, что умею быстро находить новые возможности и использовать их.", groupRole: "разведчик", min: 0, max: 10, value: 0, symbol: "a" },      // a = разведчик
	{ id: 2, text: "Я могу хорошо работать с разными людьми.", groupRole: "коллективист", min: 0, max: 10, value: 0, symbol: "b" },                           // b = коллективист
	{ id: 3, text: "Мне легко придумывать новые идеи.", groupRole: "мыслитель", min: 0, max: 10, value: 0, symbol: "c" },                             // c = мыслитель
	{ id: 4, text: "Я умею находить людей, которые могут помочь команде.", groupRole: "кординатор", min: 0, max: 10, value: 0, symbol: "d" },                // d = supervior
	{ id: 5, text: "Я довожу дела до конца, и это помогает мне хорошо работать.", groupRole: "доводчик", min: 0, max: 10, value: 0, symbol: "e" },       // e = исполнитель
	{ id: 6, text: "Меня не пугает неодобрение окружающих, если я уверен в пользе своих действий для результата.", groupRole: "формирователь", min: 0, max: 10, value: 0, symbol: "f" }, // f = формирователь
	{ id: 7, text: "Если я уже сталкивался с похожей ситуацией, я быстро понимаю, что нужно делать.", groupRole: "исполнитель", min: 0, max: 10, value: 0, symbol: "g" },          // g = исполнитель
	{ id: 8, text: "Моё личное мнение не мешает мне находить и объяснять другие возможные решения.", groupRole: "оценщик", min: 0, max: 10, value: 0, symbol: "h" }],            // h = оценщик

	// Section 2 (Symbols: a,b,c,d,e,f,g,h)
	[{ id: 9, text: "Я чувствую себя неуверенно на встречах, если нет четкого плана и контроля.", groupRole: "исполнитель", min: 0, max: 10, value: 0, symbol: "a" },               // a = исполнитель
	{ id: 10, text: "Я готов поддержать людей, которые думают правильно, но не говорят об этом.", groupRole: "кординатор", min: 0, max: 10, value: 0, symbol: "b" },                // b = supervior
	{ id: 11, text: "Я могу говорить слишком много, когда обсуждаются новые идеи.", groupRole: "разведчик", min: 0, max: 10, value: 0, symbol: "c" },                         // c = мыслитель
	{ id: 12, text: "Я осторожен и не спешу соглашаться с мнением других.", groupRole: "оценщик", min: 0, max: 10, value: 0, symbol: "d" },                                     // d = формирователь
	{ id: 13, text: "Я могу быть строгим и требовательным, когда мне нужно чего-то добиться.", groupRole: "формирователь", min: 0, max: 10, value: 0, symbol: "e" },                  // e = коллективист
	{ id: 14, text: "Мне трудно вести людей за собой, потому что я подвержен влиянию настроения окружающих.", groupRole: "коллективист", min: 0, max: 10, value: 0, symbol: "f" },   // f = supervior
	{ id: 15, text: "Я увлекаюсь своими идеями и не всегда замечаю, что происходит вокруг.", groupRole: "мыслитель", min: 0, max: 10, value: 0, symbol: "g" },                     // g = оценщик
	{ id: 16, text: "Окружающие считают, что я слишком беспокоюсь о мелочах и о том, что дела идут не так.", groupRole: "доводчик", min: 0, max: 10, value: 0, symbol: "h" }],     // h = оценщикitic

	// Section 3 (Symbols: a,b,c,d,e,f,g,h)
	[{ id: 17, text: "Я умею влиять на людей, не оказывая на них давления.", groupRole: "кординатор", min: 0, max: 10, value: 0, symbol: "a" },            // a = supervior
	{ id: 18, text: "Я осторожен и это помогает мне избегать ошибок.", groupRole: "доводчик", min: 0, max: 10, value: 0, symbol: "b" },                  // b = формирователь
	{ id: 19, text: "Я готов настаивать, чтобы встреча была продуктивной и не терялась основная цель.", groupRole: "формирователь", min: 0, max: 10, value: 0, symbol: "c" }, // c = мыслитель
	{ id: 20, text: "Можно ожидать от меня оригинальные идеи.", groupRole: "мыслитель", min: 0, max: 10, value: 0, symbol: "d" },                          // d = разведчик
	{ id: 21, text: "Я всегда готов поддержать идеи, которые полезны для всех.", groupRole: "коллективист", min: 0, max: 10, value: 0, symbol: "e" },      // e = исполнитель
	{ id: 22, text: "Я активно ищу самые новые идеи и разработки.", groupRole: "разведчик", min: 0, max: 10, value: 0, symbol: "f" },                     // f = supervior
	{ id: 23, text: "Я надеюсь, что все, кто меня знают, ценят мою способность быть объективным.", groupRole: "оценщик", min: 0, max: 10, value: 0, symbol: "g" }, // g = коллективист
	{ id: 24, text: "Я могу следить за тем, чтобы важные дела были организованы правильно.", groupRole: "исполнитель", min: 0, max: 10, value: 0, symbol: "h" }], // h = формирователь

	// Section 4 (Symbols: a,b,c,d,e,f,g,h)
	[{ id: 25, text: "Я стараюсь лучше узнать людей, с которыми делаю общее дело.", groupRole: "коллективист", min: 0, max: 10, value: 0, symbol: "a" },     // a = исполнитель
	{ id: 26, text: "Мне не нравится спорить с друзьями или быть в меньшинстве.", groupRole: "формирователь", min: 0, max: 10, value: 0, symbol: "b" },         // b = оценщик
	{ id: 27, text: "Я умею находить хорошие причины, чтобы сказать 'нет' плохим идеям.", groupRole: "оценщик", min: 0, max: 10, value: 0, symbol: "c" }, // c = мыслитель
	{ id: 28, text: "Я думаю, что умею быстро организовать выполнение планов, о которых мы все договорились.", groupRole: "исполнитель", min: 0, max: 10, value: 0, symbol: "d" }, // d = разведчик
	{ id: 29, text: "Я умею находить неожиданные решения, а не просто следовать очевидным.", groupRole: "мыслитель", min: 0, max: 10, value: 0, symbol: "e" }, // e = оценщикitic
	{ id: 30, text: "Я стремлюсь делать свою работу в команде наилучшим образом.", groupRole: "доводчик", min: 0, max: 10, value: 0, symbol: "f" },        // f = формирователь
	{ id: 31, text: "У меня хорошо получается налаживать продуктивные связи команды с внешним миром.", groupRole: "разведчик", min: 0, max: 10, value: 0, symbol: "g" }, // g = коллективист
	{ id: 32, text: "Я могу слушать разные мнения и после принятия решения следую мнению большинства.", groupRole: "кординатор", min: 0, max: 10, value: 0, symbol: "h" }], // h = разведчик

	// Section 5 (Symbols: a,b,c,d,e,f,g,h)
	[{ id: 33, text: "Мне нравится анализировать ситуации и рассматривать все возможности.", groupRole: "оценщик", min: 0, max: 10, value: 0, symbol: "a" }, // a = исполнитель
	{ id: 34, text: "Мне нравится находить практические решения для проблем.", groupRole: "исполнитель", min: 0, max: 10, value: 0, symbol: "b" },                // b = коллективист
	{ id: 35, text: "Мне приятно понимать, что я создаю хорошие отношения в группе.", groupRole: "коллективист", min: 0, max: 10, value: 0, symbol: "c" },          // c = оценщик
	{ id: 36, text: "Я способен оказывать сильное влияние на принятие решений.", groupRole: "формирователь", min: 0, max: 10, value: 0, symbol: "d" },               // d = формирователь
	{ id: 37, text: "Я рад встречаться с людьми, которые могут научить меня чему-то новому.", groupRole: "разведчик", min: 0, max: 10, value: 0, symbol: "e" }, // e = мыслитель
	{ id: 38, text: "Я способен убедить людей действовать в нужном направлении.", groupRole: "кординатор", min: 0, max: 10, value: 0, symbol: "f" },               // f = оценщикitic
	{ id: 39, text: "Я чувствую себя комфортно, когда могу сосредоточиться на одной задаче.", groupRole: "доводчик", min: 0, max: 10, value: 0, symbol: "g" },    // g = разведчик
	{ id: 40, text: "Мне нравится находить задачи, которые требуют творческого подхода.", groupRole: "мыслитель", min: 0, max: 10, value: 0, symbol: "h" }],      // h = supervior

	// Section 6 (Symbols: a,b,c,d,e,f,g,h)
	[{ id: 41, text: "Я бы предпочел сначала подумать в одиночестве, прежде чем действовать в сложной ситуации.", groupRole: "мыслитель", min: 0, max: 10, value: 0, symbol: "a" }, // a = оценщик
	{ id: 42, text: "Я готов работать с тем, кто предлагает хорошие идеи, даже если это трудно.", groupRole: "коллективист", min: 0, max: 10, value: 0, symbol: "b" },                  // b = разведчик
	{ id: 43, text: "Я попробую разделить задачу на части, чтобы каждый мог сделать то, что у него лучше всего получается.", groupRole: "кординатор", min: 0, max: 10, value: 0, symbol: "c" }, // c = формирователь
	{ id: 44, text: "Моя организованность поможет нам не отставать от графика.", groupRole: "доводчик", min: 0, max: 10, value: 0, symbol: "d" },                                 // d = оценщикitic
	{ id: 45, text: "Мне кажется, что я могу оставаться спокойным и логичным.", groupRole: "оценщик", min: 0, max: 10, value: 0, symbol: "e" },                                // e = исполнитель
	{ id: 46, text: "Я буду упорно двигаться к цели, несмотря на препятствия.", groupRole: "исполнитель", min: 0, max: 10, value: 0, symbol: "f" },                                 // f = supervior
	{ id: 47, text: "Я готов показать пример, если в команде не видно прогресса и все устали.", groupRole: "формирователь", min: 0, max: 10, value: 0, symbol: "g" },                // g = коллективист
	{ id: 48, text: "Я бы устроил обсуждение, чтобы помочь команде придумать новые идеи и начать работать вместе.", groupRole: "разведчик", min: 0, max: 10, value: 0, symbol: "h" }], // h = мыслитель

	// Section 7 (Final section)
	[{ id: 49, text: "Я иногда не терплю людей, которые, по моему мнению, мешают команде.", groupRole: "формирователь", min: 0, max: 10, value: 0, symbol: "a" }, // a = мыслитель
	{ id: 50, text: "Другие иногда говорят, что я слишком рационален и не могу принимать спонтанные или нестандартные решения.", groupRole: "оценщик", min: 0, max: 10, value: 0, symbol: "b" }, // b = оценщикitic
	{ id: 51, text: "Мое желание, чтобы работа выполнялась правильно, может замедлять процесс.", groupRole: "доводчик", min: 0, max: 10, value: 0, symbol: "c" }, // c = оценщик
	{ id: 52, text: "Я быстро теряю энтузиазм и пытаюсь вдохновиться от более активных членов группы.", groupRole: "разведчик", min: 0, max: 10, value: 0, symbol: "d" }, // d = исполнитель
	{ id: 53, text: "Мне трудно начинать работу, если у меня нет ясных целей.", groupRole: "исполнитель", min: 0, max: 10, value: 0, symbol: "e" },                   // e = разведчик
	{ id: 54, text: "Иногда мне сложно разобраться в сложных ситуациях.", groupRole: "мыслитель", min: 0, max: 10, value: 0, symbol: "f" },                       // f = формирователь
	{ id: 55, text: "Я стесняюсь просить помощи у других, когда не могу что-то сделать сам.", groupRole: "кординатор", min: 0, max: 10, value: 0, symbol: "g" },   // g = коллективист
	{ id: 56, text: "Мне трудно объяснить свою точку зрения, когда сталкиваюсь с сильными возражениями.", groupRole: "коллективист", min: 0, max: 10, value: 0, symbol: "h" }] // h = supervior
];