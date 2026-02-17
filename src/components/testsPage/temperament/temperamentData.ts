import { PositiveNegativeOption } from "../positiveNegative/PositiveNegative"

// Основные шкалы EPI
export type TemperamentParam =
    | "extrav_introver_score"
    | "neirotizm_score"
    | "sincerity_score"

export interface TemperamentOption extends PositiveNegativeOption {
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
    // Экстраверсия - true
    { id: 1, text: "Часто ли Вы испытываете тягу к новым впечатлениям, к тому, чтобы отвлечься, испытать сильные ощущения?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 2, text: "Часто ли Вы чувствуете, что нуждаетесь в друзьях, которые могут Вас понять, ободрить или посочувствовать?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 3, text: "Считаете ли Вы себя беззаботным человеком?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 4, text: "Очень ли трудно Вам отказываться от своих намерений?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 5, text: "Обдумываете ли Вы свои дела не спеша и предпочитаете ли подождать, прежде чем действовать?", param: "extrav_introver_score", answer: false },

    // Ложь - true
    { id: 6, text: "Всегда ли Вы сдерживаете свои обещания, даже если Вам это невыгодно?", param: "sincerity_score", answer: true },

    // Нейротизм - true
    { id: 7, text: "Часто ли у Вас бывают спады и подъемы настроения?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 8, text: "Быстро ли Вы обычно действуете и говорите, не тратите ли много времени на обдумывание?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 9, text: "Возникало ли у Вас когда-нибудь чувство, что Вы несчастны, хотя никакой серьезной причины для этого не было?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 10, text: "Верно ли, что на спор Вы способны решиться на всё?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 11, text: "Смущаетесь ли Вы, когда хотите познакомиться с человеком противоположного пола, который Вам симпатичен?", param: "neirotizm_score", answer: true },

    // Ложь - false
    { id: 12, text: "Бывает ли, что, разозлившись, Вы выходите из себя?", param: "sincerity_score", answer: false },

    // Экстраверсия - true
    { id: 13, text: "Часто ли Вы действуете необдуманно, под влиянием момента?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 14, text: "Часто ли Вас беспокоят мысли о том, что Вам не следовало чего-либо делать или говорить?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 15, text: "Предпочитаете ли Вы чтение книг встречам с людьми?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 16, text: "Верно ли, что Вас легко задеть?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 17, text: "Любите ли Вы часто бывать в компании?", param: "extrav_introver_score", answer: true },

    // Ложь - false
    { id: 18, text: "Бывают ли у Вас мысли, которыми Вам не хотелось бы делиться с другими людьми?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 19, text: "Верно ли, что иногда Вы настолько полны энергии, что всё горит в руках, а иногда чувствуете сильную вялость?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 20, text: "Стараетесь ли Вы ограничить круг своих знакомств небольшим числом самых близких друзей?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 21, text: "Много ли Вы мечтаете?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 22, text: "Когда на Вас кричат, отвечаете ли Вы тем же?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 23, text: "Считаете ли Вы все свои привычки хорошими?", param: "neirotizm_score", answer: true },

    // Ложь - true
    { id: 24, text: "Часто ли у Вас появляется чувство, что Вы в чем-то виноваты?", param: "sincerity_score", answer: true },

    // Экстраверсия - true
    { id: 25, text: "Способны ли Вы иногда дать волю своим чувствам и беззаботно развлечься в веселой компании?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 26, text: "Можно ли сказать, что нервы у Вас часто бывают натянуты до предела?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 27, text: "Считают ли Вас человеком живым и веселым?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 28, text: "После того как дело сделано, часто ли Вы мысленно возвращаетесь к нему и думаете, что могли бы сделать лучше?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 29, text: "Чувствуете ли Вы себя неспокойно, находясь в большой компании?", param: "extrav_introver_score", answer: false },

    // Ложь - false
    { id: 30, text: "Бывает ли, что Вы передаете слухи?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 31, text: "Бывает ли, что Вам не спится из-за того, что в голову лезут разные мысли?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 32, text: "Если Вы хотите узнать что-либо, предпочтете ли Вы найти это в книге, чем спросить у друзей?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 33, text: "Бывают ли у Вас сильные сердцебиения?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 34, text: "Нравится ли Вам работа, требующая сосредоточения?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 35, text: "Бывают ли у Вас приступы дрожи?", param: "neirotizm_score", answer: true },

    // Ложь - true
    { id: 36, text: "Всегда ли Вы говорите только правду?", param: "sincerity_score", answer: true },

    // Экстраверсия - false
    { id: 37, text: "Бывает ли Вам неприятно находиться в компании, где все подшучивают друг над другом?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 38, text: "Раздражительны ли Вы?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 39, text: "Нравится ли Вам работа, требующая быстрого действия?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 40, text: "Верно ли, что Вам часто не дают покоя мысли о разных неприятностях и ужасах, которые могли бы произойти, хотя всё кончилось благополучно?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 41, text: "Верно ли, что Вы неторопливы в движениях и несколько медлительны?", param: "extrav_introver_score", answer: false },

    // Ложь - false
    { id: 42, text: "Опаздывали ли Вы когда-нибудь на работу или на встречу с кем-либо?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 43, text: "Часто ли Вам снятся кошмары?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 44, text: "Верно ли, что Вы так любите поговорить, что не упускаете любого удобного случая побеседовать с новым человеком?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 45, text: "Беспокоят ли Вас какие-нибудь боли?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 46, text: "Огорчились бы Вы, если бы долго не могли видеться со своими друзьями?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 47, text: "Можете ли Вы назвать себя нервным человеком?", param: "neirotizm_score", answer: true },

    // Ложь - false
    { id: 48, text: "Есть ли среди Ваших знакомых такие, которые Вам явно не нравятся?", param: "sincerity_score", answer: false },

    // Экстраверсия - true
    { id: 49, text: "Могли бы Вы сказать, что Вы уверенный в себе человек?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 50, text: "Легко ли Вас задевает критика Ваших недостатков или Вашей работы?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 51, text: "Трудно ли Вам получить настоящее удовольствие от мероприятий, в которых участвует много народа?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 52, text: "Беспокоит ли Вас чувство, что Вы чем-то хуже других?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 53, text: "Сумели бы Вы внести оживление в скучную компанию?", param: "extrav_introver_score", answer: true },

    // Ложь - false
    { id: 54, text: "Бывает ли, что Вы говорите о вещах, в которых совсем не разбираетесь?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 55, text: "Беспокоитесь ли Вы о своем здоровье?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 56, text: "Любите ли Вы подшутить над другими?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 57, text: "Страдаете ли Вы бессонницей?", param: "neirotizm_score", answer: true },
]

// Вопросы по Айзенку (форма B)
export const TemperamentFormB: TemperamentOption[] = [
    // Экстраверсия - true
    { id: 1, text: "Вам нравится, когда вокруг много людей и веселья?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 2, text: "Бывает ли у вас чувство, что вам чего-то не хватает, но вы не знаете чего?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 3, text: "Вы умеете быстро находить слова, когда хотите что-то сказать?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 4, text: "Иногда вы чувствуете себя радостным, а иногда грустным без причины?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 5, text: "Вы обычно тихо сидите на вечеринках или в компании?", param: "extrav_introver_score", answer: false },

    // Ложь - true
    { id: 6, text: "В детстве вы всегда делали то, что вам говорили, без вопросов?", param: "sincerity_score", answer: true },

    // Нейротизм - true
    { id: 7, text: "Иногда у вас бывает плохое настроение?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 8, text: "Если кто-то ссорится, вы предпочитаете молчать и надеяться, что всё уладится?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 9, text: "У вас легко меняется настроение?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 10, text: "Вам нравится быть среди людей?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 11, text: "Часто ли вы не можете уснуть из-за своих переживаний?", param: "neirotizm_score", answer: true },

    // Ложь - false
    { id: 12, text: "Бывает, что вы упрямитесь?", param: "sincerity_score", answer: false },

    // Экстраверсия - true
    { id: 13, text: "Вы считаете себя честным человеком?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 14, text: "Часто ли вам приходят отличные идеи слишком поздно?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 15, text: "Вам больше нравится работать одному?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 16, text: "Бывает ли, что вы чувствуете себя уставшим и без сил без видимой причины?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 17, text: "Вы по натуре энергичный человек?", param: "extrav_introver_score", answer: true },

    // Ложь - false
    { id: 18, text: "Вам смешно, когда кто-то шутит неприлично?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 19, text: "Часто ли что-то вас так утомляет, что вы хотите отдохнуть?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 20, text: "Вы чувствуете себя некомфортно в определенной одежде?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 21, text: "Часто ли ваши мысли блуждают, когда вы пытаетесь сосредоточиться?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 22, text: "Вы можете быстро сказать, что думаете?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 23, text: "Бывает, что вы задумаетесь и не слышите, что говорят вокруг?", param: "neirotizm_score", answer: true },

    // Ложь - true
    { id: 24, text: "Вы свободны от предвзятых мнений?", param: "sincerity_score", answer: true },

    // Экстраверсия - true
    { id: 25, text: "Вам нравятся шутки на 1 апреля?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 26, text: "Часто ли вы думаете о том, что делаете на работе?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 27, text: "Вы очень любите пробовать вкусную еду?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 28, text: "Вам нужен друг, с которым можно поговорить, когда вы злы?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 29, text: "Вам неприятно занимать деньги или что-то продавать, когда вам это нужно?", param: "extrav_introver_score", answer: false },

    // Ложь - false
    { id: 30, text: "Вы иногда хвастаетесь своими успехами?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 31, text: "Вы очень чувствительны к некоторым вещам?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 32, text: "Вам бы хотелось остаться дома, чем идти на скучную вечеринку?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 33, text: "Бывает, что вы не можете усидеть на месте от волнения?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 34, text: "Вы любите заранее планировать свои дела?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 35, text: "Бывают ли у вас головокружения?", param: "neirotizm_score", answer: true },

    // Ложь - true
    { id: 36, text: "Вы всегда сразу отвечаете на письма после прочтения?", param: "sincerity_score", answer: true },

    // Экстраверсия - false
    { id: 37, text: "Вам легче решить задачу, если вы сначала подумаете об этом сами?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 38, text: "Бывает ли у вас одышка, даже если вы не делали ничего тяжелого?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 39, text: "Вы не переживаете, если что-то идет не так?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 40, text: "Вас беспокоят ваши нервы?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 41, text: "Вам больше нравится планировать, чем делать что-то на самом деле?", param: "extrav_introver_score", answer: false },

    // Ложь - false
    { id: 42, text: "Вы иногда откладываете дела на завтра?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 43, text: "Вам страшно в лифтах или метро?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 44, text: "Вы часто первым подходите к новым людям?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 45, text: "Бывают ли у вас сильные головные боли?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 46, text: "Вы обычно верите, что всё само собой решится?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 47, text: "Вам трудно заснуть ночью?", param: "neirotizm_score", answer: true },

    // Ложь - false
    { id: 48, text: "Вы когда-нибудь обманывали других?", param: "sincerity_score", answer: false },

    // Экстраверсия - true
    { id: 49, text: "Вы иногда говорите первое, что приходит в голову?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 50, text: "Долго ли вы переживаете после неловкой ситуации?", param: "neirotizm_score", answer: true },

    // Экстраверсия - false
    { id: 51, text: "Вы обычно закрыты с людьми, кроме своих близких друзей?", param: "extrav_introver_score", answer: false },

    // Нейротизм - true
    { id: 52, text: "Часто ли у вас происходят неприятности?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 53, text: "Вам нравится рассказывать истории своим друзьям?", param: "extrav_introver_score", answer: true },

    // Ложь - false
    { id: 54, text: "Вам больше нравится выигрывать, чем проигрывать?", param: "sincerity_score", answer: false },

    // Нейротизм - true
    { id: 55, text: "Вы чувствуете себя неловко рядом с людьми, которые выше вас по статусу?", param: "neirotizm_score", answer: true },

    // Экстраверсия - true
    { id: 56, text: "Когда все идет не так, вы все равно думаете, что стоит попробовать что-то сделать?", param: "extrav_introver_score", answer: true },

    // Нейротизм - true
    { id: 57, text: "Бывает ли у вас чувство волнения перед важным событием", param: "neirotizm_score", answer: true },
]