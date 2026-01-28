// Основные шкалы EPI
export type EPIScale =
    | "Extraversion" | "Neuroticism" | "Lie"

// Специфические категории для детального анализа
export type DetailedCategory =
    | "Активность" | "Социальность" | "Тревожность" | "Гибкость" | "Обдуманность" | "Надежность" | "Эмоциональность" | "Импульсивность"
    | "Открытость" | "Энергичность" | "Мечтательность" | "Реактивность" | "Перфекционизм" | "Внимательность" | "Решительность" | "Коммуникация"
    | "Покладистость" | "Конфликтность" | "Упрямство" | "Рефлексия" | "Чувство юмора" | "Чувствительность" | "Ответственность" | "Планирование"
    | "Здоровье" | "Прокрастинация" | "Оптимизм" | "Конкуренция"

// Описания типов темпераментов
export const TemperamentTypes = {
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

// Интерфейс для пропсов вопросов
export interface QuestionProps {
    id: number,                 // Id
    text: string,               // Текст вопроса
    scale: EPIScale,            // Шкала EPI
    category: DetailedCategory, // Детальная категория
    pointsForYes: boolean,      // true - баллы за ДА, false - баллы за НЕТ
}

// Вопросы по Айзенку (форма A)
// Все 114 вопросов EPI (57 A + 57 B)
export const epiFormA: QuestionProps[] = [
    {
        id: 1,
        text: "Часто ли вы тяготеете к новым впечатлениям, к тому, чтобы испытать сильные ощущения?",
        scale: "Extraversion",
        category: "Открытость",
        pointsForYes: true
    },
    {
        id: 2,
        text: "Часто ли вы чувствуете, что нуждаетесь в друзьях, которые могут вас понять, ободрить, посочувствовать?",
        scale: "Neuroticism",
        category: "Социальность",
        pointsForYes: true
    },
    {
        id: 3,
        text: "Считаете ли вы себя беззаботным человеком?",
        scale: "Extraversion",
        category: "Оптимизм",
        pointsForYes: true
    },
    {
        id: 4,
        text: "Очень ли вам трудно отказываться от своих намерений?",
        scale: "Neuroticism",
        category: "Упрямство",
        pointsForYes: true
    },
    {
        id: 5,
        text: "Вы обдумываете свои дела не спеша и предпочитаете подождать, прежде чем действовать?",
        scale: "Extraversion",
        category: "Обдуманность",
        pointsForYes: false
    },
    {
        id: 6,
        text: "Всегда ли вы сдерживаете свои обещания, даже если это вам невыгодно?",
        scale: "Lie",
        category: "Надежность",
        pointsForYes: true
    },
    {
        id: 7,
        text: "Часто ли у вас бывают спады и подъемы настроения?",
        scale: "Neuroticism",
        category: "Эмоциональность",
        pointsForYes: true
    },
    {
        id: 8,
        text: "Обычно вы действуете и говорите быстро, не раздумывая?",
        scale: "Extraversion",
        category: "Импульсивность",
        pointsForYes: true
    },
    {
        id: 9,
        text: "Часто ли вы чувствуете себя несчастным без какой-либо серьезной причины?",
        scale: "Neuroticism",
        category: "Чувствительность",
        pointsForYes: true
    },
    {
        id: 10,
        text: "Сделали бы вы почти все что угодно на спор?",
        scale: "Extraversion",
        category: "Конкуренция",
        pointsForYes: true
    },
    {
        id: 11,
        text: "Возникает ли у вас чувство робости и смущения, когда вы хотите заговорить с симпатичным незнакомым человеком?",
        scale: "Neuroticism",
        category: "Коммуникация",
        pointsForYes: true
    },
    {
        id: 12,
        text: "Выходите ли вы иногда из себя, злитесь?",
        scale: "Lie",
        category: "Конфликтность",
        pointsForYes: false
    },
    {
        id: 13,
        text: "Часто ли вы действуете под влиянием минутного настроения?",
        scale: "Extraversion",
        category: "Импульсивность",
        pointsForYes: true
    },
    {
        id: 14,
        text: "Часто ли вы беспокоитесь о том, что вы что-то не так сделали или сказали?",
        scale: "Neuroticism",
        category: "Тревожность",
        pointsForYes: true
    },
    {
        id: 15,
        text: "Предпочитаете ли вы обычно чтение книг встречам с людьми?",
        scale: "Extraversion",
        category: "Мечтательность",
        pointsForYes: false
    },
    {
        id: 16,
        text: "Легко ли вас обидеть?",
        scale: "Neuroticism",
        category: "Чувствительность",
        pointsForYes: true
    },
    {
        id: 17,
        text: "Любите ли вы часто бывать в компаниях?",
        scale: "Extraversion",
        category: "Социальность",
        pointsForYes: true
    },
    {
        id: 18,
        text: "Бывают ли у вас иногда мысли, которыми вам не хотелось бы делиться с другими?",
        scale: "Lie",
        category: "Рефлексия",
        pointsForYes: false
    },
    {
        id: 19,
        text: "Бывает ли у вас иногда так много энергии, что все в руках горит, а иногда вы чувствуете сильную вялость?",
        scale: "Neuroticism",
        category: "Энергичность",
        pointsForYes: true
    },
    {
        id: 20,
        text: "Предпочитаете ли вы иметь поменьше друзей, но зато особенно близких вам?",
        scale: "Extraversion",
        category: "Коммуникация",
        pointsForYes: false
    },
    {
        id: 21,
        text: "Часто ли вы мечтаете?",
        scale: "Neuroticism",
        category: "Мечтательность",
        pointsForYes: true
    },
    {
        id: 22,
        text: "Когда на вас кричат, вы отвечаете тем же?",
        scale: "Extraversion",
        category: "Реактивность",
        pointsForYes: true
    },
    {
        id: 23,
        text: "Часто ли вас беспокоит чувство вины?",
        scale: "Neuroticism",
        category: "Ответственность",
        pointsForYes: true
    },
    {
        id: 24,
        text: "Все ли ваши привычки хороши и желательны?",
        scale: "Lie",
        category: "Перфекционизм",
        pointsForYes: true
    },
    {
        id: 25,
        text: "Способны ли вы дать волю своим чувствам и вовсю повеселиться в шумной компании?",
        scale: "Extraversion",
        category: "Активность",
        pointsForYes: true
    },
    {
        id: 26,
        text: "Считаете ли вы себя человеком возбудимым и чувствительным?",
        scale: "Neuroticism",
        category: "Эмоциональность",
        pointsForYes: true
    },
    {
        id: 27,
        text: "Считают ли вас человеком живым и веселым?",
        scale: "Extraversion",
        category: "Оптимизм",
        pointsForYes: true
    },
    {
        id: 28,
        text: "Часто ли, сделав какое-нибудь важное дело, вы чувствуете, что могли бы сделать его лучше?",
        scale: "Neuroticism",
        category: "Перфекционизм",
        pointsForYes: true
    },
    {
        id: 29,
        text: "Вы больше молчите, когда находитесь в обществе других людей?",
        scale: "Extraversion",
        category: "Коммуникация",
        pointsForYes: false
    },
    {
        id: 30,
        text: "Вы иногда сплетничаете?",
        scale: "Lie",
        category: "Социальность",
        pointsForYes: false
    },
    {
        id: 31,
        text: "Бывает ли, что вам не спится из-за того, что в голову лезут разные мысли?",
        scale: "Neuroticism",
        category: "Прокрастинация",
        pointsForYes: true
    },
    {
        id: 32,
        text: "Если вы хотите что-то узнать, вы скорее прочитаете об этом в книге, чем спросите у людей?",
        scale: "Extraversion",
        category: "Внимательность",
        pointsForYes: false
    },
    {
        id: 33,
        text: "Бывает ли у вас сильное сердцебиение?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 34,
        text: "Нравится ли вам работа, требующая пристального внимания?",
        scale: "Extraversion",
        category: "Внимательность",
        pointsForYes: false
    },
    {
        id: 35,
        text: "Бывают ли у вас приступы дрожи?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 36,
        text: "Всегда ли вы говорите правду?",
        scale: "Lie",
        category: "Ответственность",
        pointsForYes: true
    },
    {
        id: 37,
        text: "Вам неприятно бывать в компании, где подшучивают друг над другом?",
        scale: "Extraversion",
        category: "Чувство юмора",
        pointsForYes: false
    },
    {
        id: 38,
        text: "Вы раздражительны?",
        scale: "Neuroticism",
        category: "Конфликтность",
        pointsForYes: true
    },
    {
        id: 39,
        text: "Нравится ли вам работа, требующая быстроты действий?",
        scale: "Extraversion",
        category: "Решительность",
        pointsForYes: true
    },
    {
        id: 40,
        text: "Волнуетесь ли вы по поводу каких-то ужасных событий, которые могли бы произойти?",
        scale: "Neuroticism",
        category: "Тревожность",
        pointsForYes: true
    },
    {
        id: 41,
        text: "Вы ходите медленно и неторопливо?",
        scale: "Extraversion",
        category: "Гибкость",
        pointsForYes: false
    },
    {
        id: 42,
        text: "Вы когда-нибудь опаздывали на свидание или на работу?",
        scale: "Lie",
        category: "Планирование",
        pointsForYes: false
    },
    {
        id: 43,
        text: "Часто ли вам снятся кошмары?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 44,
        text: "Вы так любите поговорить, что не упускаете любого случая пообщаться с незнакомым человеком?",
        scale: "Extraversion",
        category: "Коммуникация",
        pointsForYes: true
    },
    {
        id: 45,
        text: "Беспокоят ли вас какие-нибудь боли?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 46,
        text: "Вы бы чувствовали себя очень несчастным, если бы долго не могли видеться с людьми?",
        scale: "Extraversion",
        category: "Социальность",
        pointsForYes: true
    },
    {
        id: 47,
        text: "Вы считаете себя нервным человеком?",
        scale: "Neuroticism",
        category: "Эмоциональность",
        pointsForYes: true
    },
    {
        id: 48,
        text: "Среди ваших знакомых есть люди, которые вам явно не нравятся?",
        scale: "Lie",
        category: "Покладистость",
        pointsForYes: false
    },
    {
        id: 49,
        text: "Вы уверенный в себе человек?",
        scale: "Extraversion",
        category: "Решительность",
        pointsForYes: true
    },
    {
        id: 50,
        text: "Легко ли вы обижаетесь на критику ваших недостатков или вашей работы?",
        scale: "Neuroticism",
        category: "Чувствительность",
        pointsForYes: true
    },
    {
        id: 51,
        text: "Трудно ли вам получить истинное удовольствие от вечеринки?",
        scale: "Extraversion",
        category: "Активность",
        pointsForYes: false
    },
    {
        id: 52,
        text: "Беспокоит ли вас чувство, что вы чем-то хуже других?",
        scale: "Neuroticism",
        category: "Рефлексия",
        pointsForYes: true
    },
    {
        id: 53,
        text: "Вам легко внести оживление в скучную компанию?",
        scale: "Extraversion",
        category: "Энергичность",
        pointsForYes: true
    },
    {
        id: 54,
        text: "Вы иногда говорите о вещах, в которых совсем не разбираетесь?",
        scale: "Lie",
        category: "Открытость",
        pointsForYes: false
    },
    {
        id: 55,
        text: "Беспокоитесь ли вы о своем здоровье?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 56,
        text: "Любите ли вы подшутить над другими?",
        scale: "Extraversion",
        category: "Чувство юмора",
        pointsForYes: true
    },
    {
        id: 57,
        text: "Страдаете ли вы от бессонницы?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
]

// Вопросы по Айзенку (форма B)
export const epiFormB: QuestionProps[] = [
    {
        id: 1,
        text: "Часто ли вы жаждете возбуждения?",
        scale: "Extraversion",
        category: "Энергичность",
        pointsForYes: true
    },
    {
        id: 2,
        text: "Часто ли вы нуждаетесь в друзьях, которые вас понимают и могут утешить?",
        scale: "Neuroticism",
        category: "Социальность",
        pointsForYes: true
    },
    {
        id: 3,
        text: "Вы обычно беззаботны?",
        scale: "Extraversion",
        category: "Оптимизм",
        pointsForYes: true
    },
    {
        id: 4,
        text: "Вам очень трудно принимать возражения?",
        scale: "Neuroticism",
        category: "Упрямство",
        pointsForYes: true
    },
    {
        id: 5,
        text: "Вы обдумываете свои дела прежде, чем что-то предпринять?",
        scale: "Extraversion",
        category: "Планирование",
        pointsForYes: false
    },
    {
        id: 6,
        text: "Вы всегда держите свои обещания, несмотря ни на что?",
        scale: "Lie",
        category: "Надежность",
        pointsForYes: true
    },
    {
        id: 7,
        text: "Ваше настроение часто меняется?",
        scale: "Neuroticism",
        category: "Эмоциональность",
        pointsForYes: true
    },
    {
        id: 8,
        text: "Вы обычно быстро действуете и говорите?",
        scale: "Extraversion",
        category: "Импульсивность",
        pointsForYes: true
    },
    {
        id: 9,
        text: "Чувствуете ли вы себя порой несчастным без причины?",
        scale: "Neuroticism",
        category: "Чувствительность",
        pointsForYes: true
    },
    {
        id: 10,
        text: "Сделали бы вы почти все на спор?",
        scale: "Extraversion",
        category: "Конкуренция",
        pointsForYes: true
    },
    {
        id: 11,
        text: "Вы чувствуете робость при общении с незнакомыми людьми?",
        scale: "Neuroticism",
        category: "Коммуникация",
        pointsForYes: true
    },
    {
        id: 12,
        text: "Вы иногда сердитесь?",
        scale: "Lie",
        category: "Конфликтность",
        pointsForYes: false
    },
    {
        id: 13,
        text: "Часто ли вы действуете по первому побуждению?",
        scale: "Extraversion",
        category: "Импульсивность",
        pointsForYes: true
    },
    {
        id: 14,
        text: "Часто ли вы беспокоитесь о том, что сделали не так?",
        scale: "Neuroticism",
        category: "Тревожность",
        pointsForYes: true
    },
    {
        id: 15,
        text: "Вы предпочитаете книги общению с людьми?",
        scale: "Extraversion",
        category: "Мечтательность",
        pointsForYes: false
    },
    {
        id: 16,
        text: "Вас легко задеть?",
        scale: "Neuroticism",
        category: "Чувствительность",
        pointsForYes: true
    },
    {
        id: 17,
        text: "Вам нравится проводить время в компаниях?",
        scale: "Extraversion",
        category: "Социальность",
        pointsForYes: true
    },
    {
        id: 18,
        text: "У вас бывают мысли, о которых вы не хотели бы рассказывать?",
        scale: "Lie",
        category: "Рефлексия",
        pointsForYes: false
    },
    {
        id: 19,
        text: "Ваш уровень энергии часто колеблется?",
        scale: "Neuroticism",
        category: "Энергичность",
        pointsForYes: true
    },
    {
        id: 20,
        text: "Вам достаточно иметь несколько близких друзей?",
        scale: "Extraversion",
        category: "Коммуникация",
        pointsForYes: false
    },
    {
        id: 21,
        text: "Вы часто погружаетесь в мечты?",
        scale: "Neuroticism",
        category: "Мечтательность",
        pointsForYes: true
    },
    {
        id: 22,
        text: "Вы повышаете голос в ответ на крик?",
        scale: "Extraversion",
        category: "Реактивность",
        pointsForYes: true
    },
    {
        id: 23,
        text: "Вас часто мучает чувство вины?",
        scale: "Neuroticism",
        category: "Ответственность",
        pointsForYes: true
    },
    {
        id: 24,
        text: "Все ли ваши поступки безупречны?",
        scale: "Lie",
        category: "Перфекционизм",
        pointsForYes: true
    },
    {
        id: 25,
        text: "Вы умеете по-настоящему расслабиться в компании?",
        scale: "Extraversion",
        category: "Активность",
        pointsForYes: true
    },
    {
        id: 26,
        text: "Вы считаете себя эмоционально чувствительным?",
        scale: "Neuroticism",
        category: "Эмоциональность",
        pointsForYes: true
    },
    {
        id: 27,
        text: "Другие считают вас жизнерадостным?",
        scale: "Extraversion",
        category: "Оптимизм",
        pointsForYes: true
    },
    {
        id: 28,
        text: "Вы склонны перепроверять уже сделанное дело?",
        scale: "Neuroticism",
        category: "Перфекционизм",
        pointsForYes: true
    },
    {
        id: 29,
        text: "Вам комфортнее молчать в присутствии других?",
        scale: "Extraversion",
        category: "Коммуникация",
        pointsForYes: false
    },
    {
        id: 30,
        text: "Вы когда-нибудь рассказывали слухи?",
        scale: "Lie",
        category: "Социальность",
        pointsForYes: false
    },
    {
        id: 31,
        text: "Вам трудно заснуть из-за лишних мыслей?",
        scale: "Neuroticism",
        category: "Прокрастинация",
        pointsForYes: true
    },
    {
        id: 32,
        text: "Вам проще найти ответ в книге, чем у человека?",
        scale: "Extraversion",
        category: "Внимательность",
        pointsForYes: false
    },
    {
        id: 33,
        text: "Замечали ли вы у себя учащенное сердцебиение?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 34,
        text: "Вам нравится кропотливая работа?",
        scale: "Extraversion",
        category: "Внимательность",
        pointsForYes: false
    },
    {
        id: 35,
        text: "Бывает ли у вас внутренняя дрожь?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 36,
        text: "Вы всегда честны перед собой и другими?",
        scale: "Lie",
        category: "Ответственность",
        pointsForYes: true
    },
    {
        id: 37,
        text: "Вас раздражают компании с шутками?",
        scale: "Extraversion",
        category: "Чувство юмора",
        pointsForYes: false
    },
    {
        id: 38,
        text: "Вы легко выходите из себя?",
        scale: "Neuroticism",
        category: "Конфликтность",
        pointsForYes: true
    },
    {
        id: 39,
        text: "Вы любите задачи, где нужно спешить?",
        scale: "Extraversion",
        category: "Решительность",
        pointsForYes: true
    },
    {
        id: 40,
        text: "Вы часто думаете о плохом, что может случиться?",
        scale: "Neuroticism",
        category: "Тревожность",
        pointsForYes: true
    },
    {
        id: 41,
        text: "Ваши движения обычно неторопливы?",
        scale: "Extraversion",
        category: "Гибкость",
        pointsForYes: false
    },
    {
        id: 42,
        text: "Вы когда-либо обманывали ожидания людей по времени?",
        scale: "Lie",
        category: "Планирование",
        pointsForYes: false
    },
    {
        id: 43,
        text: "Вам часто снятся страшные сны?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 44,
        text: "Вы готовы заговорить с кем угодно первым?",
        scale: "Extraversion",
        category: "Коммуникация",
        pointsForYes: true
    },
    {
        id: 45,
        text: "Вас часто беспокоят недомогания?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 46,
        text: "Вам плохо без постоянного общения?",
        scale: "Extraversion",
        category: "Социальность",
        pointsForYes: true
    },
    {
        id: 47,
        text: "Вы бы назвали себя тревожным человеком?",
        scale: "Neuroticism",
        category: "Эмоциональность",
        pointsForYes: true
    },
    {
        id: 48,
        text: "Есть ли люди, которых вы терпеть не можете?",
        scale: "Lie",
        category: "Покладистость",
        pointsForYes: false
    },
    {
        id: 49,
        text: "Вы чувствуете себя уверенно в большинстве ситуаций?",
        scale: "Extraversion",
        category: "Решительность",
        pointsForYes: true
    },
    {
        id: 50,
        text: "Вас легко задеть замечанием?",
        scale: "Neuroticism",
        category: "Чувствительность",
        pointsForYes: true
    },
    {
        id: 51,
        text: "Вы редко чувствуете драйв на вечеринках?",
        scale: "Extraversion",
        category: "Активность",
        pointsForYes: false
    },
    {
        id: 52,
        text: "Вы сравниваете себя с другими не в свою пользу?",
        scale: "Neuroticism",
        category: "Рефлексия",
        pointsForYes: true
    },
    {
        id: 53,
        text: "Вы умеете «зажечь» скучающую толпу?",
        scale: "Extraversion",
        category: "Энергичность",
        pointsForYes: true
    },
    {
        id: 54,
        text: "Вы когда-нибудь притворялись экспертом?",
        scale: "Lie",
        category: "Открытость",
        pointsForYes: false
    },
    {
        id: 55,
        text: "Вы мнительны в отношении болезней?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
    {
        id: 56,
        text: "Вам нравится разыгрывать друзей?",
        scale: "Extraversion",
        category: "Чувство юмора",
        pointsForYes: true
    },
    {
        id: 57,
        text: "У вас часто прерывистый сон?",
        scale: "Neuroticism",
        category: "Здоровье",
        pointsForYes: true
    },
]