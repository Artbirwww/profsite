import { useState, useEffect } from 'react';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { ArrowLeft, Clock, Minus, Plus } from '../../ui/display/SimpleIcons';
import type { User, TestResult } from '../App';

interface GroupRolesTestProps {
  user: User;
  onComplete: (result: Partial<TestResult>) => void;
  onBack: () => void;
}

// Маппинг ответов на роли (из Unity кода BalbinTest)
const balbinAnswer: { [key: number]: number[] } = {
  1: [6, 3, 5, 2, 0, 7, 1, 4],
  2: [0, 1, 4, 6, 2, 3, 5, 7],
  3: [7, 0, 2, 3, 5, 6, 4, 1],
  4: [3, 7, 1, 4, 6, 2, 0, 5],
  5: [1, 5, 3, 7, 4, 0, 2, 6],
  6: [5, 2, 6, 0, 7, 4, 1, 3],
  7: [4, 6, 0, 5, 3, 1, 7, 2]
};

// Названия ролей Белбина
const roleNames = [
  'Исполнитель',
  'Координатор',
  'Формирователь',
  'Генератор идей',
  'Аналитик-стратег',
  'Исследователь ресурсов',
  'Командный работник',
  'Завершитель'
];

// Блоки вопросов
const questionBlocks = [
  // Блок 1
  [
    'Я думаю, что умею быстро находить новые возможности и использовать их.',
    'Я могу хорошо работать с разными людьми.',
    'Мне легко придумывать новые идеи.',
    'Я умею находить людей, которые могут помочь команде.',
    'Я довожу дела до конца, и это помогает мне хорошо работать.',
    'Меня не пугает неодобрение окружающих, если я уверен в пользе своих действий для результата.',
    'Если я уже сталкивался с похожей ситуацией, я быстро понимаю, что нужно делать.',
    'Моё личное мнение не мешает мне находить и объяснять другие возможные решения.'
  ],
  // Блок 2
  [
    'Я чувствую себя неуверенно на встречах, если нет четкого плана и контроля.',
    'Я готов поддержать людей, которые думают правильно, но не говорят об этом.',
    'Я могу говорить слишком много, когда обсуждаются новые идеи.',
    'Я осторожен и не спешу соглашаться с мнением других.',
    'Я могу быть строгим и требовательным, когда мне нужно чего-то добиться.',
    'Мне трудно вести людей за собой, потому что я подвержен влиянию настроения окружающих.',
    'Я увлекаюсь своими идеями и не всегда замечаю, что происходит вокруг.',
    'Окружающие считают, что я слишком беспокоюсь о мелочах и о том, что дела идут не так.'
  ],
  // Блок 3
  [
    'Я умею влиять на людей, не оказывая на них давления.',
    'Я осторожен и это помогает мне избегать ошибок.',
    'Я готов настаивать, чтобы встреча была продуктивной и не терялась основная цель.',
    'Можно ожидать от меня оригинальные идеи.',
    'Я всегда готов поддержать идеи, которые полезны для всех.',
    'Я активно ищу самые новые идеи и разработки.',
    'Я надеюсь, что все, кто меня знают, ценят мою способность быть объективным.',
    'Я могу следить за тем, чтобы важные дела были организованы правильно.'
  ],
  // Блок 4
  [
    'Я стараюсь лучше узнать людей, с которыми делаю общее дело.',
    'Мне не нравится спорить с друзьями или быть в меньшинстве.',
    'Я умею находить хорошие причины, чтобы сказать "нет" плохим идеям.',
    'Я думаю, что умею быстро организовать выполнение планов, о которых мы все договорились.',
    'Я умею находить неожиданные решения, а не просто следовать очевидным.',
    'Я стремлюсь делать свою работу в команде наилучшим образом.',
    'У меня хорошо получается налаживать продуктивные связи команды с внешним миром.',
    'Я могу слушать разные мнения и после принятия решения следую мнению большинства.'
  ],
  // Блок 5
  [
    'Мне нравится анализировать ситуации и рассматривать все возможности.',
    'Мне нравится находить практические решения для проблем.',
    'Мне приятно понимать, что я создаю хорошие отношения в группе.',
    'Я способен оказывать сильное влияние на принятие решений.',
    'Я рад встречаться с людьми, которые могут научить меня чему-то новому.',
    'Я способен убедить людей действовать в нужном направлении.',
    'Я чувствую себя комфортно, когда могу сосредоточиться на одной задаче.',
    'Мне нравится находить задачи, которые требуют творческого подхода.'
  ],
  // Блок 6
  [
    'Я бы предпочел сначала подумать в одиночестве, прежде чем действовать в сложной ситуации.',
    'Я готов работать с тем, кто предлагает хорошие идеи, даже если это трудно.',
    'Я попробую разделить задачу на части, чтобы каждый мог сделать то, что у него лучше всего получается.',
    'Моя организованность поможет нам не отставать от графика.',
    'Мне кажется, что я могу оставаться спокойным и логичным.',
    'Я буду упорно двигаться к цели, несмотря на препятствия.',
    'Я готов показать пример, если в команде не видно прогресса и все устали.',
    'Я бы устроил обсуждение, чтобы помочь команде придумать новые идеи и начать работать вместе.'
  ],
  // Блок 7
  [
    'Я иногда не терплю людей, которые, по моему мнению, мешают команде.',
    'Другие иногда говорят, что я слишком рационален и не могу принимать спонтанные или нестандартные решения.',
    'Мое желание, чтобы работа выполнялась правильно, может замедлять процесс.',
    'Я быстро теряю энтузиазм и пытаюсь вдохновиться от более активных членов группы.',
    'Мне трудно начинать работу, если у меня нет ясных целей.',
    'Иногда мне сложно разобраться в сложных ситуациях.',
    'Я стесняюсь просить помощи у других, когда не могу что-то сделать сам.',
    'Мне трудно объяснить свою точку зрения, когда сталкиваюсь с сильными возражениями.'
  ]
];

export function GroupRolesTest({ user, onComplete, onBack }: GroupRolesTestProps) {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [blockAnswers, setBlockAnswers] = useState<number[]>(Array(8).fill(0));
  const [roleCounts, setRoleCounts] = useState<number[]>(Array(8).fill(0));
  const [timer, setTimer] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Таймер
  useEffect(() => {
    if (isCompleted) return;
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Вычисление текущей суммы
  const currentSum = blockAnswers.reduce((sum, val) => sum + val, 0);

  // Изменение значения слайдера
  const handleSliderChange = (index: number, newValue: number) => {
    const newAnswers = [...blockAnswers];
    newAnswers[index] = Math.max(0, Math.min(10, newValue));
    setBlockAnswers(newAnswers);
  };

  // Переход к следующему блоку
  const handleNext = () => {
    if (currentSum !== 10) {
      return;
    }

    // Сохраняем результаты текущего блока
    const newRoleCounts = [...roleCounts];
    const mapping = balbinAnswer[currentBlock + 1];
    
    blockAnswers.forEach((value, index) => {
      const roleIndex = mapping[index];
      newRoleCounts[roleIndex] += value;
    });

    setRoleCounts(newRoleCounts);

    // Если это был последний блок
    if (currentBlock === 6) {
      setIsCompleted(true);
      
      // Формируем результат
      const groupRolesResult: { [key: string]: number } = {};
      roleNames.forEach((name, index) => {
        groupRolesResult[name] = newRoleCounts[index];
      });

      onComplete({
        groupRoles: groupRolesResult,
        belbin: groupRolesResult // для совместимости
      });
      
      return;
    }

    // Переходим к следующему блоку
    setCurrentBlock(currentBlock + 1);
    setBlockAnswers(Array(8).fill(0));
  };

  // Возврат к предыдущему блоку
  const handlePrevious = () => {
    if (currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
      setBlockAnswers(Array(8).fill(0));
    }
  };

  // Цвет индикатора суммы
  const getSumColor = () => {
    if (currentSum > 10) return 'text-red-500';
    if (currentSum === 10) return 'text-green-500';
    return 'text-gray-600';
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen p-4 py-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-center">Тест завершен!</CardTitle>
            <CardDescription className="text-center">
              Ваши результаты сохранены. Время прохождения: {formatTime(timer)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {roleNames.map((role, index) => (
                  <div key={role} className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">{role}</div>
                    <div className="text-2xl font-medium text-indigo-600">{roleCounts[index]}</div>
                  </div>
                ))}
              </div>
              <Button onClick={onBack} className="w-full">
                Вернуться в личный кабинет
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={onBack}>
                  <ArrowLeft className="size-4" />
                </Button>
                <div>
                  <CardTitle>Тест: Групповые роли</CardTitle>
                  <CardDescription>Методика Белбина</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="size-5" />
                <span className="text-lg">{formatTime(timer)}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm text-gray-700">
              <p>Распределите 10 баллов в каждом блоке утверждений.</p>
              <p>Отдавайте больше баллов тем утверждениям, которые, по вашему мнению, лучше всего описывают ваше поведение.</p>
              <p>Баллы необходимо распределить по нескольким утверждениям.</p>
              <p>В исключительных случаях баллы можно распределить между всеми утверждениями или все десять баллов поставить напротив одного утверждения.</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Блок {currentBlock + 1} из 7</span>
          <div className={`text-lg ${getSumColor()}`}>
            Сумма: {currentSum}/10
          </div>
        </div>

        {/* Questions */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {questionBlocks[currentBlock].map((question, index) => (
                <div key={index} className="space-y-3">
                  <p className="text-gray-700">{question}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSliderChange(index, blockAnswers[index] - 1)}
                      disabled={blockAnswers[index] === 0}
                    >
                      <Minus className="size-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={blockAnswers[index]}
                        onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSliderChange(index, blockAnswers[index] + 1)}
                      disabled={blockAnswers[index] === 10}
                    >
                      <Plus className="size-4" />
                    </Button>
                    
                    <div className="w-12 text-center text-lg">
                      {blockAnswers[index]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentBlock === 0}
            className="flex-1"
          >
            Назад
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentSum !== 10}
            className="flex-1"
          >
            {currentBlock === 6 ? 'Завершить' : 'Далее'}
          </Button>
        </div>

        {currentSum !== 10 && (
          <div className="text-center text-sm text-gray-600">
            {currentSum < 10 
              ? `Распределите еще ${10 - currentSum} ${currentSum === 9 ? 'балл' : 'баллов'}`
              : `Уберите ${currentSum - 10} ${currentSum === 11 ? 'балл' : 'баллов'}`
            }
          </div>
        )}
      </div>
    </div>
  );
}
