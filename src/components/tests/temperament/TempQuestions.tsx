export interface Question {
  id: string;
  text: string;
  category: string;
  answer: string; // Required field for answer mapping
}

// Вопросы для варианта А
export const questionsA: Question[] = [
  { id: 'temp-a-01', text: 'Часто ли вам хочется попробовать что-то новое или сделать что-то захватывающее?', category: 'Активность', answer: 'extra_true' },
  { id: 'temp-a-02', text: 'Нужны ли вам друзья, которые могут вас поддержать или понять, когда вам грустно?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-03', text: 'Считаете ли вы себя человеком, который не переживает и не волнуется?', category: 'Тревожность', answer: 'neiro_false' },
  { id: 'temp-a-04', text: 'Легко ли вам изменить свои планы, если вы что-то задумали?', category: 'Гибкость', answer: 'neiro_true' },
  { id: 'temp-a-05', text: 'Предпочитаете ли вы сначала подумать, прежде чем делать что-то?', category: 'Обдуманность', answer: 'extra_false' },
  { id: 'temp-a-06', text: 'Всегда ли вы выполняете обещания, даже если это сложно для вас?', category: 'Надежность', answer: 'lie_true' },
  { id: 'temp-a-07', text: 'Бывают ли у вас дни, когда вы чувствуете себя очень хорошо, а потом вдруг плохо?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-08', text: 'Обычно вы быстро принимаете решения и говорите, не задумываясь долго?', category: 'Импульсивность', answer: 'extra_true' },
  { id: 'temp-a-09', text: 'Чувствовали ли вы когда-нибудь грусть, даже не зная, почему?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-10', text: 'Верно ли, что вы готовы рискнуть ради спора?', category: 'Активность', answer: 'extra_true' },
  { id: 'temp-a-11', text: 'Смущаетесь ли вы, когда хотите познакомиться с человеком противоположного пола, который вам симпатичен?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-12', text: 'Бывает ли так, что вы сильно сердитесь и теряете контроль?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-13', text: 'Часто ли вы делаете что-то, не подумав заранее, в критический момент?', category: 'Импульсивность', answer: 'extra_true' },
  { id: 'temp-a-14', text: 'Часто ли вас беспокоят мысли о том, что вы сказали или сделали что-то не так?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-15', text: 'Вам больше нравится читать книги, чем встречаться с людьми?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-16', text: 'Легко ли вас обидеть?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-17', text: 'Нравится ли вам проводить время с друзьями?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-a-18', text: 'Бывают ли у вас мысли, которые вы не хотите рассказывать другим?', category: 'Открытость', answer: 'lie_false' },
  { id: 'temp-a-19', text: 'Верно ли, что иногда вы полны энергии и готовы ко всему, а иногда чувствуете себя очень уставшим?', category: 'Энергия', answer: 'neiro_true' },
  { id: 'temp-a-20', text: 'Вы стараетесь дружить только с маленьким кругом самых близких друзей?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-21', text: 'Часто ли вы мечтаете о чем-то?', category: 'Мечтательность', answer: 'neiro_true' },
  { id: 'temp-a-22', text: 'Когда на вас кричат, отвечаете ли вы тем же?', category: 'Реактивность', answer: 'extra_true' },
  { id: 'temp-a-23', text: 'Думаете ли вы, что все ваши привычки хорошие?', category: 'Уверенность', answer: 'neiro_false' },
  { id: 'temp-a-24', text: 'Часто ли вы чувствуете, что виноваты в чем-то?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-25', text: 'Можете ли вы иногда расслабиться и повеселиться с друзьями?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-a-26', text: 'Часто ли вы чувствуете себя очень напряженным?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-27', text: 'Вам нравится общаться с веселыми и жизнерадостными людьми?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-a-28', text: 'После того как что-то сделаете, часто ли вы думаете, что могли бы сделать это лучше?', category: 'Перфекционизм', answer: 'neiro_false' },
  { id: 'temp-a-29', text: 'Чувствуете ли вы себя некомфортно в большой компании?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-30', text: 'Передаете ли вы слухи о других?', category: 'Открытость', answer: 'lie_false' },
  { id: 'temp-a-31', text: 'Бывает ли так, что вам не спится из-за разных мыслей?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-32', text: 'Как вам удобнее узнать что-то: прочитать в книге или спросить у друзей?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-33', text: 'Бывают ли у вас сильные удары сердца?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-34', text: 'Нравится ли вам работа, которая требует много внимания?', category: 'Внимательность', answer: 'extra_false' },
  { id: 'temp-a-35', text: 'Бывают ли у вас приступы дрожи?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-36', text: 'Всегда ли вы говорите только правду?', category: 'Открытость', answer: 'lie_true' },
  { id: 'temp-a-37', text: 'Вам неприятно, когда все шутят друг над другом?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-38', text: 'Часто ли вы раздражаетесь?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-39', text: 'Нравится ли вам работа, где нужно быстро принимать решения?', category: 'Решительность', answer: 'extra_true' },
  { id: 'temp-a-40', text: 'Думаете ли вы часто о разных неприятностях, которые могли бы случиться, даже если все закончилось хорошо?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-41', text: 'Верно ли, что вы двигаетесь медленно и осторожно?', category: 'Осторожность', answer: 'extra_false' },
  { id: 'temp-a-42', text: 'Опаздывали ли вы когда-нибудь на занятия или встречи?', category: 'Пунктуальность', answer: 'lie_false' },
  { id: 'temp-a-43', text: 'Часто ли вам снятся плохие сны?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-44', text: 'Вы так любите говорить, что всегда ищете возможность познакомиться с новыми людьми?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-a-45', text: 'Бывают ли у вас какие-нибудь боли, которые вас беспокоят?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-46', text: 'Огорчились бы вы, если бы долго не могли увидеться с друзьями?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-a-47', text: 'Считаете ли вы себя нервным человеком?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-48', text: 'Есть ли среди ваших знакомых те, кто вам не нравится?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-49', text: 'Можете ли вы сказать, что вы верите в себя?', category: 'Уверенность', answer: 'extra_true' },
  { id: 'temp-a-50', text: 'Легко ли вам обижаться, когда кто-то критикует вас или вашу работу?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-a-51', text: 'Трудно ли вам наслаждаться мероприятиями, где много людей?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-a-52', text: 'Чувствуете ли вы себя хуже других?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-53', text: 'Можете ли вы сделать скучную компанию более веселой?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-a-54', text: 'Бывает ли так, что вы говорите о вещах, в которых не разбираетесь?', category: 'Открытость', answer: 'lie_false' },
  { id: 'temp-a-55', text: 'Беспокоитесь ли вы о том, как себя чувствуете?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-a-56', text: 'Любите ли вы подшутить над другими людьми?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-a-57', text: 'Бывает ли, что вам трудно заснуть?', category: 'Тревожность', answer: 'neiro_true' }
];

// Вопросы для варианта Б
export const questionsB: Question[] = [
  { id: 'temp-b-01', text: 'Вам нравится, когда вокруг много людей и веселья?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-b-02', text: 'Бывает ли у вас чувство, что вам чего-то не хватает, но вы не знаете чего?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-03', text: 'Вы умеете быстро находить слова, когда хотите что-то сказать?', category: 'Коммуникация', answer: 'extra_true' },
  { id: 'temp-b-04', text: 'Иногда вы чувствуете себя радостным, а иногда грустным без причины?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-b-05', text: 'Вы обычно тихо сидите на вечеринках или в компании?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-b-06', text: 'В детстве вы всегда делали то, что вам говорили, без вопросов?', category: 'Покладистость', answer: 'lie_true' },
  { id: 'temp-b-07', text: 'Иногда у вас бывает плохое настроение?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-b-08', text: 'Если кто-то ссорится, вы предпочитаете молчать и надеяться, что всё уладится?', category: 'Конфликтность', answer: 'extra_false' },
  { id: 'temp-b-09', text: 'У вас легко меняется настроение?', category: 'Эмоциональность', answer: 'neiro_true' },
  { id: 'temp-b-10', text: 'Вам нравится быть среди людей?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-b-11', text: 'Часто ли вы не можете уснуть из-за своих переживаний?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-12', text: 'Бывает, что вы упрямитесь?', category: 'Упрямство', answer: 'lie_false' },
  { id: 'temp-b-13', text: 'Вы считаете себя честным человеком?', category: 'Открытость', answer: 'lie_true' },
  { id: 'temp-b-14', text: 'Часто ли вам приходят отличные идеи слишком поздно?', category: 'Рефлексия', answer: 'neiro_false' },
  { id: 'temp-b-15', text: 'Вам больше нравится работать одному?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-b-16', text: 'Бывает ли, что вы чувствуете себя уставшим и без сил без видимой причины?', category: 'Энергия', answer: 'neiro_true' },
  { id: 'temp-b-17', text: 'Вы по натуре энергичный человек?', category: 'Энергия', answer: 'neiro_false' },
  { id: 'temp-b-18', text: 'Вам смешно, когда кто-то шутит неприлично?', category: 'Чувство юмора', answer: 'extra_false' },
  { id: 'temp-b-19', text: 'Часто ли что-то вас так утомляет, что вы хотите отдохнуть?', category: 'Энергия', answer: 'neiro_true' },
  { id: 'temp-b-20', text: 'Вы чувствуете себя некомфортно в определенной одежде?', category: 'Чувствительность', answer: 'neiro_true' },
  { id: 'temp-b-21', text: 'Часто ли ваши мысли блуждают, когда вы пытаетесь сосредоточиться?', category: 'Внимательность', answer: 'neiro_true' },
  { id: 'temp-b-22', text: 'Вы можете быстро сказать, что думаете?', category: 'Коммуникация', answer: 'extra_true' },
  { id: 'temp-b-23', text: 'Бывает, что вы задумаетесь и не слышите, что говорят вокруг?', category: 'Внимательность', answer: 'neiro_true' },
  { id: 'temp-b-24', text: 'Вы свободны от предвзятых мнений?', category: 'Открытость', answer: 'lie_true' },
  { id: 'temp-b-25', text: 'Вам нравятся шутки на 1 апреля?', category: 'Чувство юмора', answer: 'extra_false' },
  { id: 'temp-b-26', text: 'Часто ли вы думаете о том, что делаете на работе?', category: 'Ответственность', answer: 'neiro_false' },
  { id: 'temp-b-27', text: 'Вы очень любите пробовать вкусную еду?', category: 'Чувствительность', answer: 'extra_false' },
  { id: 'temp-b-28', text: 'Вам нужен друг, с которым можно поговорить, когда вы злы?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-b-29', text: 'Вам неприятно занимать деньги или что-то продавать, когда вам это нужно?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-b-30', text: 'Вы иногда хвастаетесь своими успехами?', category: 'Открытость', answer: 'lie_false' },
  { id: 'temp-b-31', text: 'Вы очень чувствительны к некоторым вещам?', category: 'Чувствительность', answer: 'neiro_true' },
  { id: 'temp-b-32', text: 'Вам бы хотелось остаться дома, чем идти на скучную вечеринку?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-b-33', text: 'Бывает, что вы не можете усидеть на месте от волнения?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-34', text: 'Вы любите заранее планировать свои дела?', category: 'Планирование', answer: 'extra_false' },
  { id: 'temp-b-35', text: 'Бывают ли у вас головокружения?', category: 'Здоровье', answer: 'neiro_true' },
  { id: 'temp-b-36', text: 'Вы всегда сразу отвечаете на письма после прочтения?', category: 'Ответственность', answer: 'lie_true' },
  { id: 'temp-b-37', text: 'Вам легче решить задачу, если вы сначала подумаете об этом сами?', category: 'Самостоятельность', answer: 'extra_false' },
  { id: 'temp-b-38', text: 'Бывает ли у вас одышка, даже если вы не делали ничего тяжелого?', category: 'Здоровье', answer: 'neiro_true' },
  { id: 'temp-b-39', text: 'Вы не переживаете, если что-то идет не так?', category: 'Тревожность', answer: 'neiro_false' },
  { id: 'temp-b-40', text: 'Вас беспокоят ваши нервы?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-41', text: 'Вам больше нравится планировать, чем делать что-то на самом деле?', category: 'Планирование', answer: 'extra_false' },
  { id: 'temp-b-42', text: 'Вы иногда откладываете дела на завтра?', category: 'Прокрастинация', answer: 'lie_false' },
  { id: 'temp-b-43', text: 'Вам страшно в лифтах или метро?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-44', text: 'Вы часто первым подходите к новым людям?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-b-45', text: 'Бывают ли у вас сильные головные боли?', category: 'Здоровье', answer: 'neiro_true' },
  { id: 'temp-b-46', text: 'Вы обычно верите, что всё само собой решится?', category: 'Оптимизм', answer: 'neiro_false' },
  { id: 'temp-b-47', text: 'Вам трудно заснуть ночью?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-48', text: 'Вы когда-нибудь обманывали других?', category: 'Открытость', answer: 'lie_false' },
  { id: 'temp-b-49', text: 'Вы иногда говорите первое, что приходит в голову?', category: 'Импульсивность', answer: 'extra_true' },
  { id: 'temp-b-50', text: 'Долго ли вы переживаете после неловкой ситуации?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-51', text: 'Вы обычно закрыты с людьми, кроме своих близких друзей?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-b-52', text: 'Часто ли у вас происходят неприятности?', category: 'Тревожность', answer: 'neiro_true' },
  { id: 'temp-b-53', text: 'Вам нравится рассказывать истории своим друзьям?', category: 'Социальность', answer: 'extra_true' },
  { id: 'temp-b-54', text: 'Вам больше нравится выигрывать, чем проигрывать?', category: 'Конкуренция', answer: 'lie_false' },
  { id: 'temp-b-55', text: 'Вы чувствуете себя неловко рядом с людьми, которые выше вас по статусу?', category: 'Социальность', answer: 'extra_false' },
  { id: 'temp-b-56', text: 'Когда все идет не так, вы все равно думаете, что стоит попробовать что-то сделать?', category: 'Оптимизм', answer: 'neiro_false' },
  { id: 'temp-b-57', text: 'Бывает ли у вас чувство волнения перед важным событием?', category: 'Тревожность', answer: 'neiro_true' }
];

// Описания типов
export const temperamentTypes = {
  choleric: {
    name: 'Холерик',
    description: 'Энергичный, активный, эмоциональный, импульсивный',
    traits: ['Лидерские качества', 'Решительность', 'Энергичность', 'Импульсивность'],
    professions: 'Менеджер, предприниматель, спортсмен, актёр',
    color: 'red'
  },
  sanguine: {
    name: 'Сангвиник',
    description: 'Общительный, жизнерадостный, оптимистичный, адаптивный',
    traits: ['Коммуникабельность', 'Оптимизм', 'Адаптивность', 'Позитивность'],
    professions: 'Продавец, журналист, педагог, ведущий мероприятий',
    color: 'orange'
  },
  phlegmatic: {
    name: 'Флегматик',
    description: 'Спокойный, уравновешенный, надёжный, последовательный',
    traits: ['Спокойствие', 'Надёжность', 'Усидчивость', 'Терпеливость'],
    professions: 'Бухгалтер, аналитик, программист, исследователь',
    color: 'green'
  },
  melancholic: {
    name: 'Меланхолик',
    description: 'Чувствительный, глубокий, аналитичный, творческий',
    traits: ['Чувствительность', 'Аналитичность', 'Творчество', 'Внимательность'],
    professions: 'Художник, психолог, писатель, дизайнер',
    color: 'blue'
  }
};

export interface TemperamentScores {
  extra: number;
  neuro: number;
  lie: number;
}