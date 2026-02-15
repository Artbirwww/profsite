import { PositiveNegativeOption } from "../PositiveNegative/PositiveNegative"

// Основные шкалы EPI
export type TemperamentParam =
    | "extrav_introver_score"
    | "neirotizm_score"
    | "sincerity_score"

// Специфические категории для детального анализа
export type Category =
    | "Активность"
    | "Социальность"
    | "Тревожность"
    | "Гибкость"
    | "Обдуманность"
    | "Надежность"
    | "Эмоциональность"
    | "Импульсивность"
    | "Открытость"
    | "Мечтательность"
    | "Реактивность"
    | "Перфекционизм"
    | "Внимательность"
    | "Решительность"
    | "Коммуникация"
    | "Покладистость"
    | "Конфликтность"
    | "Упрямство"
    | "Рефлексия"
    | "Чувство юмора"
    | "Чувствительность"
    | "Ответственность"
    | "Планирование"
    | "Здоровье"
    | "Прокрастинация"
    | "Оптимизм"
    | "Конкуренция"
    | "Энергия"
    | "Уверенность"
    | "Осторожность"
    | "Пунктуальность"
    | "Самостоятельность"

export interface TemperamentOption extends PositiveNegativeOption {
    category: Category
    param: TemperamentParam
}

// Описания типов темпераментов
export const temperamentTypes = {
    choleric: {
        name: "Холерик",
        description: "Энергичный, активный, эмоциональный, импульсивынй",
        traits: ["Лидерские качества", "Решительность", "Энергичность", "Импульсивность"],
        professions: "Менеджер, предприниматель, спортсмен, актёр",
        color: "red",
        dataItem: "item-choleric",
    },
    sanguine: {
        name: "Сангвиник",
        description: 'Общительный, жизнерадостный, оптимистичный, адаптивный',
        traits: ['Коммуникабельность', 'Оптимизм', 'Адаптивность', 'Позитивность'],
        professions: 'Продавец, журналист, педагог, ведущий мероприятий',
        color: "orange",
        dataItem: "item-sanguine",
    },
    phlegmatic: {
        name: 'Флегматик',
        description: 'Спокойный, уравновешенный, надёжный, последовательный',
        traits: ['Спокойствие', 'Надёжность', 'Усидчивость', 'Терпеливость'],
        professions: 'Бухгалтер, аналитик, программист, исследователь',
        color: "green",
        dataItem: "item-phlegmatic",
    },
    melancholic: {
        name: 'Меланхолик',
        description: 'Чувствительный, глубокий, аналитичный, творческий',
        traits: ['Чувствительность', 'Аналитичность', 'Творчество', 'Внимательность'],
        professions: 'Художник, психолог, писатель, дизайнер',
        color: "blue",
        dataItem: "item-melancholic",
    },
}

// Вопросы по Айзенку (форма A)
// Все 114 вопросов EPI (57 A + 57 B)
export const TemperamentFormA: TemperamentOption[] = [
    {
        id: 1,
        text: "Часто ли вам хочется попробовать что-то новое или сделать что-то захватывающее?",
        param: "extrav_introver_score",
        category: "Активность",
        answer: true,
    },
    {
        id: 2,
        text: "Нужны ли вам друзья, которые могут вас поддержать или понять, когда вам грустно?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 3,
        text: "Считаете ли вы себя человеком, который не переживает и не волнуется?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: false
    },
    {
        id: 4,
        text: "Легко ли вам изменить свои планы, если вы что-то задумали?",
        param: "neirotizm_score",
        category: "Гибкость",
        answer: true,
    },
    {
        id: 5,
        text: "Предпочитаете ли вы сначала подумать, прежде чем делать что-то?",
        param: "extrav_introver_score",
        category: "Обдуманность",
        answer: false
    },
    {
        id: 6,
        text: "Всегда ли вы выполняете обещания, даже если это сложно для вас?",
        param: "sincerity_score",
        category: "Надежность",
        answer: true,
    },
    {
        id: 7,
        text: "Бывают ли у вас дни, когда вы чувствуете себя очень хорошо, а потом вдруг плохо?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 8,
        text: "Обычно вы быстро принимаете решения и говорите, не задумываясь долго?",
        param: "extrav_introver_score",
        category: "Импульсивность",
        answer: true,
    },
    {
        id: 9,
        text: "Чувствовали ли вы когда-нибудь грусть, даже не зная, почему?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 10,
        text: "Верно ли, что вы готовы рискнуть ради спора?",
        param: "extrav_introver_score",
        category: "Активность",
        answer: true,
    },
    {
        id: 11,
        text: "Смущаетесь ли вы, когда хотите познакомиться с человеком противоположного пола, который вам симпатичен?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 12,
        text: "Бывает ли так, что вы сильно сердитесь и теряете контроль?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 13,
        text: "Часто ли вы делаете что-то, не подумав заранее, в критический момент?",
        param: "extrav_introver_score",
        category: "Импульсивность",
        answer: true,
    },
    {
        id: 14,
        text: "Часто ли вас беспокоят мысли о том, что вы сказали или сделали что-то не так?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 15,
        text: "Вам больше нравится читать книги, чем встречаться с людьми?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 16,
        text: "Легко ли вас обидеть?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 17,
        text: "Нравится ли вам проводить время с друзьями?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true,
    },
    {
        id: 18,
        text: "Бывают ли у вас мысли, которые вы не хотите рассказывать другим?",
        param: "sincerity_score",
        category: "Открытость",
        answer: false
    },
    {
        id: 19,
        text: "Верно ли, что иногда вы полны энергии и готовы ко всему, а иногда чувствуете себя очень уставшим?",
        param: "neirotizm_score",
        category: "Энергия",
        answer: true,
    },
    {
        id: 20,
        text: "Вы стараетесь дружить только с маленьким кругом самых близких друзей?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 21,
        text: "Часто ли вы мечтаете о чем-то?",
        param: "neirotizm_score",
        category: "Мечтательность",
        answer: true,
    },
    {
        id: 22,
        text: "Когда на вас кричат, отвечаете ли вы тем же?",
        param: "extrav_introver_score",
        category: "Реактивность",
        answer: true,
    },
    {
        id: 23,
        text: "Думаете ли вы, что все ваши привычки хорошие?",
        param: "neirotizm_score",
        category: "Уверенность",
        answer: false
    },
    {
        id: 24,
        text: "Часто ли вы чувствуете, что виноваты в чем-то?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 25,
        text: "Можете ли вы иногда расслабиться и повеселиться с друзьями?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true,
    },
    {
        id: 26,
        text: "Часто ли вы чувствуете себя очень напряженным?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 27,
        text: "Вам нравится общаться с веселыми и жизнерадостными людьми?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true,
    },
    {
        id: 28,
        text: "После того как что-то сделаете, часто ли вы думаете, что могли бы сделать это лучше?",
        param: "neirotizm_score",
        category: "Перфекционизм",
        answer: false
    },
    {
        id: 29,
        text: "Чувствуете ли вы себя некомфортно в большой компании?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 30,
        text: "Передаете ли вы слухи о других?",
        param: "sincerity_score",
        category: "Открытость",
        answer: false
    },
    {
        id: 31,
        text: "Бывает ли так, что вам не спится из-за разных мыслей?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 32,
        text: "Как вам удобнее узнать что-то: прочитать в книге или спросить у друзей?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 33,
        text: "Бывают ли у вас сильные удары сердца?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 34,
        text: "Нравится ли вам работа, которая требует много внимания?",
        param: "extrav_introver_score",
        category: "Внимательность",
        answer: false
    },
    {
        id: 35,
        text: "Бывают ли у вас приступы дрожи?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 36,
        text: "Всегда ли вы говорите только правду?",
        param: "sincerity_score",
        category: "Открытость",
        answer: true,
    },
    {
        id: 37,
        text: "Вам неприятно, когда все шутят друг над другом?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 38,
        text: "Часто ли вы раздражаетесь?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 39,
        text: "Нравится ли вам работа, где нужно быстро принимать решения?",
        param: "extrav_introver_score",
        category: "Решительность",
        answer: true,
    },
    {
        id: 40,
        text: "Думаете ли вы часто о разных неприятностях, которые могли бы случиться, даже если все закончилось хорошо?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 41,
        text: "Верно ли, что вы двигаетесь медленно и осторожно?",
        param: "extrav_introver_score",
        category: "Осторожность",
        answer: false
    },
    {
        id: 42,
        text: "Опаздывали ли вы когда-нибудь на занятия или встречи?",
        param: "sincerity_score",
        category: "Пунктуальность",
        answer: false
    },
    {
        id: 43,
        text: "Часто ли вам снятся плохие сны?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 44,
        text: "Вы так любите говорить, что всегда ищете возможность познакомиться с новыми людьми?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true,
    },
    {
        id: 45,
        text: "Бывают ли у вас какие-нибудь боли, которые вас беспокоят?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 46,
        text: "Огорчились бы вы, если бы долго не могли увидеться с друзьями?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true,
    },
    {
        id: 47,
        text: "Считаете ли вы себя нервным человеком?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 48,
        text: "Есть ли среди ваших знакомых те, кто вам не нравится?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 49,
        text: "Можете ли вы сказать, что вы верите в себя?",
        param: "extrav_introver_score",
        category: "Уверенность",
        answer: true,
    },
    {
        id: 50,
        text: "Легко ли вам обижаться, когда кто-то критикует вас или вашу работу?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true,
    },
    {
        id: 51,
        text: "Трудно ли вам наслаждаться мероприятиями, где много людей?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 52,
        text: "Чувствуете ли вы себя хуже других?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 53,
        text: "Можете ли вы сделать скучную компанию более веселой?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true,
    },
    {
        id: 54,
        text: "Бывает ли так, что вы говорите о вещах, в которых не разбираетесь?",
        param: "sincerity_score",
        category: "Открытость",
        answer: false
    },
    {
        id: 55,
        text: "Беспокоитесь ли вы о том, как себя чувствуете?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
    {
        id: 56,
        text: "Любите ли вы подшутить над другими людьми?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true,
    },
    {
        id: 57,
        text: "Бывает ли, что вам трудно заснуть?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true,
    },
]

// Вопросы по Айзенку (форма B)
export const TemperamentFormB: TemperamentOption[] = [
    {
        id: 1,
        text: "Вам нравится, когда вокруг много людей и веселья?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 2,
        text: "Бывает ли у вас чувство, что вам чего-то не хватает, но вы не знаете чего?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 3,
        text: "Вы умеете быстро находить слова, когда хотите что-то сказать?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: true
    },
    {
        id: 4,
        text: "Иногда вы чувствуете себя радостным, а иногда грустным без причины?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 5,
        text: "Вы обычно тихо сидите на вечеринках или в компании?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 6,
        text: "В детстве вы всегда делали то, что вам говорили, без вопросов?",
        param: "sincerity_score",
        category: "Покладистость",
        answer: true
    },
    {
        id: 7,
        text: "Иногда у вас бывает плохое настроение?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 8,
        text: "Если кто-то ссорится, вы предпочитаете молчать и надеяться, что всё уладится?",
        param: "extrav_introver_score",
        category: "Конфликтность",
        answer: false
    },
    {
        id: 9,
        text: "У вас легко меняется настроение?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 10,
        text: "Вам нравится быть среди людей?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 11,
        text: "Часто ли вы не можете уснуть из-за своих переживаний?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 12,
        text: "Бывает, что вы упрямитесь?",
        param: "sincerity_score",
        category: "Упрямство",
        answer: false
    },
    {
        id: 13,
        text: "Вы считаете себя честным человеком?",
        param: "sincerity_score",
        category: "Открытость",
        answer: true
    },
    {
        id: 14,
        text: "Часто ли вам приходят отличные идеи слишком поздно?",
        param: "neirotizm_score",
        category: "Рефлексия",
        answer: false
    },
    {
        id: 15,
        text: "Вам больше нравится работать одному?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 16,
        text: "Бывает ли, что вы чувствуете себя уставшим и без сил без видимой причины?",
        param: "neirotizm_score",
        category: "Энергия",
        answer: true
    },
    {
        id: 17,
        text: "Вы по натуре энергичный человек?",
        param: "neirotizm_score",
        category: "Энергия",
        answer: false
    },
    {
        id: 18,
        text: "Вам смешно, когда кто-то шутит неприлично?",
        param: "extrav_introver_score",
        category: "Чувство юмора",
        answer: false
    },
    {
        id: 19,
        text: "Часто ли что-то вас так утомляет, что вы хотите отдохнуть?",
        param: "neirotizm_score",
        category: "Энергия",
        answer: true
    },
    {
        id: 20,
        text: "Вы чувствуете себя некомфортно в определенной одежде?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 21,
        text: "Часто ли ваши мысли блуждают, когда вы пытаетесь сосредоточиться?",
        param: "neirotizm_score",
        category: "Внимательность",
        answer: true
    },
    {
        id: 22,
        text: "Вы можете быстро сказать, что думаете?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: true
    },
    {
        id: 23,
        text: "Бывает, что вы задумаетесь и не слышите, что говорят вокруг?",
        param: "neirotizm_score",
        category: "Внимательность",
        answer: true
    },
    {
        id: 24,
        text: "Вы свободны от предвзятых мнений?",
        param: "sincerity_score",
        category: "Открытость",
        answer: true
    },
    {
        id: 25,
        text: "Вам нравятся шутки на 1 апреля?",
        param: "extrav_introver_score",
        category: "Чувство юмора",
        answer: false
    },
    {
        id: 26,
        text: "Часто ли вы думаете о том, что делаете на работе?",
        param: "neirotizm_score",
        category: "Ответственность",
        answer: false
    },
    {
        id: 27,
        text: "Вы очень любите пробовать вкусную еду?",
        param: "extrav_introver_score",
        category: "Чувствительность",
        answer: false
    },
    {
        id: 28,
        text: "Вам нужен друг, с которым можно поговорить, когда вы злы?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 29,
        text: "Вам неприятно занимать деньги или что-то продавать, когда вам это нужно?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 30,
        text: "Вы иногда хвастаетесь своими успехами?",
        param: "sincerity_score",
        category: "Открытость",
        answer: false
    },
    {
        id: 31,
        text: "Вы очень чувствительны к некоторым вещам?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 32,
        text: "Вам бы хотелось остаться дома, чем идти на скучную вечеринку?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 33,
        text: "Бывает, что вы не можете усидеть на месте от волнения?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 34,
        text: "Вы любите заранее планировать свои дела?",
        param: "extrav_introver_score",
        category: "Планирование",
        answer: false
    },
    {
        id: 35,
        text: "Бывают ли у вас головокружения?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 36,
        text: "Вы всегда сразу отвечаете на письма после прочтения?",
        param: "sincerity_score",
        category: "Ответственность",
        answer: true
    },
    {
        id: 37,
        text: "Вам легче решить задачу, если вы сначала подумаете об этом сами?",
        param: "extrav_introver_score",
        category: "Самостоятельность",
        answer: false
    },
    {
        id: 38,
        text: "Бывает ли у вас одышка, даже если вы не делали ничего тяжелого?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 39,
        text: "Вы не переживаете, если что-то идет не так?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: false
    },
    {
        id: 40,
        text: "Вас беспокоят ваши нервы?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 41,
        text: "Вам больше нравится планировать, чем делать что-то на самом деле?",
        param: "extrav_introver_score",
        category: "Планирование",
        answer: false
    },
    {
        id: 42,
        text: "Вы иногда откладываете дела на завтра?",
        param: "sincerity_score",
        category: "Прокрастинация",
        answer: false
    },
    {
        id: 43,
        text: "Вам страшно в лифтах или метро?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 44,
        text: "Вы часто первым подходите к новым людям?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 45,
        text: "Бывают ли у вас сильные головные боли?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 46,
        text: "Вы обычно верите, что всё само собой решится?",
        param: "neirotizm_score",
        category: "Оптимизм",
        answer: false
    },
    {
        id: 47,
        text: "Вам трудно заснуть ночью?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 48,
        text: "Вы когда-нибудь обманывали других?",
        param: "sincerity_score",
        category: "Открытость",
        answer: false
    },
    {
        id: 49,
        text: "Вы иногда говорите первое, что приходит в голову?",
        param: "extrav_introver_score",
        category: "Импульсивность",
        answer: true
    },
    {
        id: 50,
        text: "Долго ли вы переживаете после неловкой ситуации?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 51,
        text: "Вы обычно закрыты с людьми, кроме своих близких друзей?",
        param: "extrav_introver_score", category: "Социальность",

        answer: false
    },
    {
        id: 52,
        text: "Часто ли у вас происходят неприятности?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 53,
        text: "Вам нравится рассказывать истории своим друзьям?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 54,
        text: "Вам больше нравится выигрывать, чем проигрывать?",
        param: "sincerity_score",
        category: "Конкуренция",
        answer: false
    },
    {
        id: 55,
        text: "Вы чувствуете себя неловко рядом с людьми, которые выше вас по статусу?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 56,
        text: "Когда все идет не так, вы все равно думаете, что стоит попробовать что-то сделать?",
        param: "neirotizm_score",
        category: "Оптимизм",
        answer: false
    },
    {
        id: 57,
        text: "Бывает ли у вас чувство волнения перед важным событием?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    }
]