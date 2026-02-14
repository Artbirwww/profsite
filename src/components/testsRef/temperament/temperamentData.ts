import { PositiveNegativeOption } from "../PositiveNegative/PositiveNegative"

// Основные шкалы EPI
export type TemperamentParam =
    | "extrav_introver_score" | "neirotizm_score" | "sincerity_score"

// Специфические категории для детального анализа
export type Category =
    | "Активность" | "Социальность" | "Тревожность" | "Гибкость" | "Обдуманность" | "Надежность" | "Эмоциональность" | "Импульсивность"
    | "Открытость" | "Энергичность" | "Мечтательность" | "Реактивность" | "Перфекционизм" | "Внимательность" | "Решительность" | "Коммуникация"
    | "Покладистость" | "Конфликтность" | "Упрямство" | "Рефлексия" | "Чувство юмора" | "Чувствительность" | "Ответственность" | "Планирование"
    | "Здоровье" | "Прокрастинация" | "Оптимизм" | "Конкуренция"

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
        text: "Часто ли вы тяготеете к новым впечатлениям, к тому, чтобы испытать сильные ощущения?",
        param: "extrav_introver_score",
        category: "Открытость",
        answer: true
    },
    {
        id: 2,
        text: "Часто ли вы чувствуете, что нуждаетесь в друзьях, которые могут вас понять, ободрить, посочувствовать?",
        param: "neirotizm_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 3,
        text: "Считаете ли вы себя беззаботным человеком?",
        param: "extrav_introver_score",
        category: "Оптимизм",
        answer: true
    },
    {
        id: 4,
        text: "Очень ли вам трудно отказываться от своих намерений?",
        param: "neirotizm_score",
        category: "Упрямство",
        answer: true
    },
    {
        id: 5,
        text: "Вы обдумываете свои дела не спеша и предпочитаете подождать, прежде чем действовать?",
        param: "extrav_introver_score",
        category: "Обдуманность",
        answer: false
    },
    {
        id: 6,
        text: "Всегда ли вы сдерживаете свои обещания, даже если это вам невыгодно?",
        param: "sincerity_score",
        category: "Надежность",
        answer: true
    },
    {
        id: 7,
        text: "Часто ли у вас бывают спады и подъемы настроения?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 8,
        text: "Обычно вы действуете и говорите быстро, не раздумывая?",
        param: "extrav_introver_score",
        category: "Импульсивность",
        answer: true
    },
    {
        id: 9,
        text: "Часто ли вы чувствуете себя несчастным без какой-либо серьезной причины?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 10,
        text: "Сделали бы вы почти все что угодно на спор?",
        param: "extrav_introver_score",
        category: "Конкуренция",
        answer: true
    },
    {
        id: 11,
        text: "Возникает ли у вас чувство робости и смущения, когда вы хотите заговорить с симпатичным незнакомым человеком?",
        param: "neirotizm_score",
        category: "Коммуникация",
        answer: true
    },
    {
        id: 12,
        text: "Выходите ли вы иногда из себя, злитесь?",
        param: "sincerity_score",
        category: "Конфликтность",
        answer: false
    },
    {
        id: 13,
        text: "Часто ли вы действуете под влиянием минутного настроения?",
        param: "extrav_introver_score",
        category: "Импульсивность",
        answer: true
    },
    {
        id: 14,
        text: "Часто ли вы беспокоитесь о том, что вы что-то не так сделали или сказали?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 15,
        text: "Предпочитаете ли вы обычно чтение книг встречам с людьми?",
        param: "extrav_introver_score",
        category: "Мечтательность",
        answer: false
    },
    {
        id: 16,
        text: "Легко ли вас обидеть?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 17,
        text: "Любите ли вы часто бывать в компаниях?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 18,
        text: "Бывают ли у вас иногда мысли, которыми вам не хотелось бы делиться с другими?",
        param: "sincerity_score",
        category: "Рефлексия",
        answer: false
    },
    {
        id: 19,
        text: "Бывает ли у вас иногда так много энергии, что все в руках горит, а иногда вы чувствуете сильную вялость?",
        param: "neirotizm_score",
        category: "Энергичность",
        answer: true
    },
    {
        id: 20,
        text: "Предпочитаете ли вы иметь поменьше друзей, но зато особенно близких вам?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: false
    },
    {
        id: 21,
        text: "Часто ли вы мечтаете?",
        param: "neirotizm_score",
        category: "Мечтательность",
        answer: true
    },
    {
        id: 22,
        text: "Когда на вас кричат, вы отвечаете тем же?",
        param: "extrav_introver_score",
        category: "Реактивность",
        answer: true
    },
    {
        id: 23,
        text: "Часто ли вас беспокоит чувство вины?",
        param: "neirotizm_score",
        category: "Ответственность",
        answer: true
    },
    {
        id: 24,
        text: "Все ли ваши привычки хороши и желательны?",
        param: "sincerity_score",
        category: "Перфекционизм",
        answer: true
    },
    {
        id: 25,
        text: "Способны ли вы дать волю своим чувствам и вовсю повеселиться в шумной компании?",
        param: "extrav_introver_score",
        category: "Активность",
        answer: true
    },
    {
        id: 26,
        text: "Считаете ли вы себя человеком возбудимым и чувствительным?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 27,
        text: "Считают ли вас человеком живым и веселым?",
        param: "extrav_introver_score",
        category: "Оптимизм",
        answer: true
    },
    {
        id: 28,
        text: "Часто ли, сделав какое-нибудь важное дело, вы чувствуете, что могли бы сделать его лучше?",
        param: "neirotizm_score",
        category: "Перфекционизм",
        answer: true
    },
    {
        id: 29,
        text: "Вы больше молчите, когда находитесь в обществе других людей?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: false
    },
    {
        id: 30,
        text: "Вы иногда сплетничаете?",
        param: "sincerity_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 31,
        text: "Бывает ли, что вам не спится из-за того, что в голову лезут разные мысли?",
        param: "neirotizm_score",
        category: "Прокрастинация",
        answer: true
    },
    {
        id: 32,
        text: "Если вы хотите что-то узнать, вы скорее прочитаете об этом в книге, чем спросите у людей?",
        param: "extrav_introver_score",
        category: "Внимательность",
        answer: false
    },
    {
        id: 33,
        text: "Бывает ли у вас сильное сердцебиение?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 34,
        text: "Нравится ли вам работа, требующая пристального внимания?",
        param: "extrav_introver_score",
        category: "Внимательность",
        answer: false
    },
    {
        id: 35,
        text: "Бывают ли у вас приступы дрожи?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 36,
        text: "Всегда ли вы говорите правду?",
        param: "sincerity_score",
        category: "Ответственность",
        answer: true
    },
    {
        id: 37,
        text: "Вам неприятно бывать в компании, где подшучивают друг над другом?",
        param: "extrav_introver_score",
        category: "Чувство юмора",
        answer: false
    },
    {
        id: 38,
        text: "Вы раздражительны?",
        param: "neirotizm_score",
        category: "Конфликтность",
        answer: true
    },
    {
        id: 39,
        text: "Нравится ли вам работа, требующая быстроты действий?",
        param: "extrav_introver_score",
        category: "Решительность",
        answer: true
    },
    {
        id: 40,
        text: "Волнуетесь ли вы по поводу каких-то ужасных событий, которые могли бы произойти?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 41,
        text: "Вы ходите медленно и неторопливо?",
        param: "extrav_introver_score",
        category: "Гибкость",
        answer: false
    },
    {
        id: 42,
        text: "Вы когда-нибудь опаздывали на свидание или на работу?",
        param: "sincerity_score",
        category: "Планирование",
        answer: false
    },
    {
        id: 43,
        text: "Часто ли вам снятся кошмары?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 44,
        text: "Вы так любите поговорить, что не упускаете любого случая пообщаться с незнакомым человеком?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: true
    },
    {
        id: 45,
        text: "Беспокоят ли вас какие-нибудь боли?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 46,
        text: "Вы бы чувствовали себя очень несчастным, если бы долго не могли видеться с людьми?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 47,
        text: "Вы считаете себя нервным человеком?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 48,
        text: "Среди ваших знакомых есть люди, которые вам явно не нравятся?",
        param: "sincerity_score",
        category: "Покладистость",
        answer: false
    },
    {
        id: 49,
        text: "Вы уверенный в себе человек?",
        param: "extrav_introver_score",
        category: "Решительность",
        answer: true
    },
    {
        id: 50,
        text: "Легко ли вы обижаетесь на критику ваших недостатков или вашей работы?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 51,
        text: "Трудно ли вам получить истинное удовольствие от вечеринки?",
        param: "extrav_introver_score",
        category: "Активность",
        answer: false
    },
    {
        id: 52,
        text: "Беспокоит ли вас чувство, что вы чем-то хуже других?",
        param: "neirotizm_score",
        category: "Рефлексия",
        answer: true
    },
    {
        id: 53,
        text: "Вам легко внести оживление в скучную компанию?",
        param: "extrav_introver_score",
        category: "Энергичность",
        answer: true
    },
    {
        id: 54,
        text: "Вы иногда говорите о вещах, в которых совсем не разбираетесь?",
        param: "sincerity_score",
        category: "Открытость",
        answer: false
    },
    {
        id: 55,
        text: "Беспокоитесь ли вы о своем здоровье?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 56,
        text: "Любите ли вы подшутить над другими?",
        param: "extrav_introver_score",
        category: "Чувство юмора",
        answer: true
    },
    {
        id: 57,
        text: "Страдаете ли вы от бессонницы?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
]

// Вопросы по Айзенку (форма B)
export const TemperamentFormB: TemperamentOption[] = [
    {
        id: 1,
        text: "Часто ли вы жаждете возбуждения?",
        param: "extrav_introver_score",
        category: "Энергичность",
        answer: true
    },
    {
        id: 2,
        text: "Часто ли вы нуждаетесь в друзьях, которые вас понимают и могут утешить?",
        param: "neirotizm_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 3,
        text: "Вы обычно беззаботны?",
        param: "extrav_introver_score",
        category: "Оптимизм",
        answer: true
    },
    {
        id: 4,
        text: "Вам очень трудно принимать возражения?",
        param: "neirotizm_score",
        category: "Упрямство",
        answer: true
    },
    {
        id: 5,
        text: "Вы обдумываете свои дела прежде, чем что-то предпринять?",
        param: "extrav_introver_score",
        category: "Планирование",
        answer: false
    },
    {
        id: 6,
        text: "Вы всегда держите свои обещания, несмотря ни на что?",
        param: "sincerity_score",
        category: "Надежность",
        answer: true
    },
    {
        id: 7,
        text: "Ваше настроение часто меняется?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 8,
        text: "Вы обычно быстро действуете и говорите?",
        param: "extrav_introver_score",
        category: "Импульсивность",
        answer: true
    },
    {
        id: 9,
        text: "Чувствуете ли вы себя порой несчастным без причины?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 10,
        text: "Сделали бы вы почти все на спор?",
        param: "extrav_introver_score",
        category: "Конкуренция",
        answer: true
    },
    {
        id: 11,
        text: "Вы чувствуете робость при общении с незнакомыми людьми?",
        param: "neirotizm_score",
        category: "Коммуникация",
        answer: true
    },
    {
        id: 12,
        text: "Вы иногда сердитесь?",
        param: "sincerity_score",
        category: "Конфликтность",
        answer: false
    },
    {
        id: 13,
        text: "Часто ли вы действуете по первому побуждению?",
        param: "extrav_introver_score",
        category: "Импульсивность",
        answer: true
    },
    {
        id: 14,
        text: "Часто ли вы беспокоитесь о том, что сделали не так?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 15,
        text: "Вы предпочитаете книги общению с людьми?",
        param: "extrav_introver_score",
        category: "Мечтательность",
        answer: false
    },
    {
        id: 16,
        text: "Вас легко задеть?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 17,
        text: "Вам нравится проводить время в компаниях?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 18,
        text: "У вас бывают мысли, о которых вы не хотели бы рассказывать?",
        param: "sincerity_score",
        category: "Рефлексия",
        answer: false
    },
    {
        id: 19,
        text: "Ваш уровень энергии часто колеблется?",
        param: "neirotizm_score",
        category: "Энергичность",
        answer: true
    },
    {
        id: 20,
        text: "Вам достаточно иметь несколько близких друзей?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: false
    },
    {
        id: 21,
        text: "Вы часто погружаетесь в мечты?",
        param: "neirotizm_score",
        category: "Мечтательность",
        answer: true
    },
    {
        id: 22,
        text: "Вы повышаете голос в ответ на крик?",
        param: "extrav_introver_score",
        category: "Реактивность",
        answer: true
    },
    {
        id: 23,
        text: "Вас часто мучает чувство вины?",
        param: "neirotizm_score",
        category: "Ответственность",
        answer: true
    },
    {
        id: 24,
        text: "Все ли ваши поступки безупречны?",
        param: "sincerity_score",
        category: "Перфекционизм",
        answer: true
    },
    {
        id: 25,
        text: "Вы умеете по-настоящему расслабиться в компании?",
        param: "extrav_introver_score",
        category: "Активность",
        answer: true
    },
    {
        id: 26,
        text: "Вы считаете себя эмоционально чувствительным?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 27,
        text: "Другие считают вас жизнерадостным?",
        param: "extrav_introver_score",
        category: "Оптимизм",
        answer: true
    },
    {
        id: 28,
        text: "Вы склонны перепроверять уже сделанное дело?",
        param: "neirotizm_score",
        category: "Перфекционизм",
        answer: true
    },
    {
        id: 29,
        text: "Вам комфортнее молчать в присутствии других?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: false
    },
    {
        id: 30,
        text: "Вы когда-нибудь рассказывали слухи?",
        param: "sincerity_score",
        category: "Социальность",
        answer: false
    },
    {
        id: 31,
        text: "Вам трудно заснуть из-за лишних мыслей?",
        param: "neirotizm_score",
        category: "Прокрастинация",
        answer: true
    },
    {
        id: 32,
        text: "Вам проще найти ответ в книге, чем у человека?",
        param: "extrav_introver_score",
        category: "Внимательность",
        answer: false
    },
    {
        id: 33,
        text: "Замечали ли вы у себя учащенное сердцебиение?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 34,
        text: "Вам нравится кропотливая работа?",
        param: "extrav_introver_score",
        category: "Внимательность",
        answer: false
    },
    {
        id: 35,
        text: "Бывает ли у вас внутренняя дрожь?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 36,
        text: "Вы всегда честны перед собой и другими?",
        param: "sincerity_score",
        category: "Ответственность",
        answer: true
    },
    {
        id: 37,
        text: "Вас раздражают компании с шутками?",
        param: "extrav_introver_score",
        category: "Чувство юмора",
        answer: false
    },
    {
        id: 38,
        text: "Вы легко выходите из себя?",
        param: "neirotizm_score",
        category: "Конфликтность",
        answer: true
    },
    {
        id: 39,
        text: "Вы любите задачи, где нужно спешить?",
        param: "extrav_introver_score",
        category: "Решительность",
        answer: true
    },
    {
        id: 40,
        text: "Вы часто думаете о плохом, что может случиться?",
        param: "neirotizm_score",
        category: "Тревожность",
        answer: true
    },
    {
        id: 41,
        text: "Ваши движения обычно неторопливы?",
        param: "extrav_introver_score",
        category: "Гибкость",
        answer: false
    },
    {
        id: 42,
        text: "Вы когда-либо обманывали ожидания людей по времени?",
        param: "sincerity_score",
        category: "Планирование",
        answer: false
    },
    {
        id: 43,
        text: "Вам часто снятся страшные сны?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 44,
        text: "Вы готовы заговорить с кем угодно первым?",
        param: "extrav_introver_score",
        category: "Коммуникация",
        answer: true
    },
    {
        id: 45,
        text: "Вас часто беспокоят недомогания?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 46,
        text: "Вам плохо без постоянного общения?",
        param: "extrav_introver_score",
        category: "Социальность",
        answer: true
    },
    {
        id: 47,
        text: "Вы бы назвали себя тревожным человеком?",
        param: "neirotizm_score",
        category: "Эмоциональность",
        answer: true
    },
    {
        id: 48,
        text: "Есть ли люди, которых вы терпеть не можете?",
        param: "sincerity_score",
        category: "Покладистость",
        answer: false
    },
    {
        id: 49,
        text: "Вы чувствуете себя уверенно в большинстве ситуаций?",
        param: "extrav_introver_score",
        category: "Решительность",
        answer: true
    },
    {
        id: 50,
        text: "Вас легко задеть замечанием?",
        param: "neirotizm_score",
        category: "Чувствительность",
        answer: true
    },
    {
        id: 51,
        text: "Вы редко чувствуете драйв на вечеринках?",
        param: "extrav_introver_score",
        category: "Активность",
        answer: false
    },
    {
        id: 52,
        text: "Вы сравниваете себя с другими не в свою пользу?",
        param: "neirotizm_score",
        category: "Рефлексия",
        answer: true
    },
    {
        id: 53,
        text: "Вы умеете «зажечь» скучающую толпу?",
        param: "extrav_introver_score",
        category: "Энергичность",
        answer: true
    },
    {
        id: 54,
        text: "Вы когда-нибудь притворялись экспертом?",
        param: "sincerity_score",
        category: "Открытость",
        answer: false
    },
    {
        id: 55,
        text: "Вы мнительны в отношении болезней?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
    {
        id: 56,
        text: "Вам нравится разыгрывать друзей?",
        param: "extrav_introver_score",
        category: "Чувство юмора",
        answer: true
    },
    {
        id: 57,
        text: "У вас часто прерывистый сон?",
        param: "neirotizm_score",
        category: "Здоровье",
        answer: true
    },
]