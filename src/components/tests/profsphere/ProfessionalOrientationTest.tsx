import { useState, useEffect } from 'react';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { ArrowLeft, Clock } from '../../SimpleIcons';
import type { User, TestResult } from '../App';

interface ProfessionalOrientationTestProps {
  user: User;
  onComplete: (result: Partial<TestResult>) => void;
  onBack: () => void;
}

// Вопросы варианта А
const questionsA = [
  'Ухаживать за животными.',
  'Помогать больным людям, лечить их.',
  'Следить за качеством иллюстраций, картинок, плакатов и другого художественного контента.',
  'Обрабатывать материалы (дерево, ткань, пластик и т.д.).',
  'Обсуждать научно-популярные книги, статьи.',
  'Выращивать животных.',
  'Копировать рисунки, изображения, настраивать музыкальные инструменты.',
  'Сообщать, разъяснять людям нужные для них сведения в службе поддержки, во время экскурсии и т.д.',
  'Ремонтировать и настраивать вещи и технику.',
  'Лечить животных.',
  'Выводить новые сорта растений.',
  'Разбирать споры, ссоры между людьми, убеждать, разъяснять, поощрять, наказывать.',
  'Наблюдать, изучать работу творческих коллективов.',
  'Обслуживать, налаживать медицинские приборы и технику.',
  'Составлять точные описания, отчёты о наблюдаемых явлениях, событиях, измеряемых объектах и др.',
  'Делать лабораторные анализы в больнице.',
  'Расписывать стены помещений, делать иллюстрации.',
  'Организовывать выходы людей в театры, музеи, на экскурсии, в туристические путешествия и т.п.',
  'Изготавливать что-либо по чертежам.',
  'Бороться с болезнями растений, с вредителями леса и сада.'
];

// Вопросы варианта Б
const questionsB = [
  'Обслуживать машины, приборы (следить, регулировать)',
  'Составлять таблицы, схемы и программировать.',
  'Следить за состоянием, развитием растений.',
  'Рекламировать и продавать товары.',
  'Обсуждать художественные книги.',
  'Тренировать сверстников (или младших) в выполнении каких-либо действий (учебных, спортивных и т.п.).',
  'Управлять каким-либо транспортным средством.',
  'Творчески оформлять выставки, участвовать в подготовке концертов, пьес и т.п.',
  'Искать и исправлять ошибки в текстах, таблицах, рисунках.',
  'Выполнять расчёты, вычисления.',
  'Создавать новые виды технических изделий (приборы, машины, одежду, дома и т.п.).',
  'Разбираться в чертежах, схемах, таблицах.',
  'Наблюдать, изучать жизнь микроорганизмов.',
  'Оказывать людям медицинскую помощь при ранениях, ушибах, ожогах и т.п.',
  'Художественно описывать, изображать события, сочинять истории.',
  'Принимать, осматривать больных, беседовать с ними, назначать лечение.',
  'Строить здания или осуществлять сборку машин или техники.',
  'Играть на сцене, принимать участие в концертах.',
  'Заниматься черчением, проектированием, создавать 3D-модели',
  'Работать со сложной техникой (3D-принтер, фрейзер, лазер и т.п.)'
];

// Словари для подсчета (true = вариант А, false = вариант Б)
const HumanNature: { [key: number]: boolean } = {
  1: true, 3: false, 6: true, 10: true, 11: true, 13: false, 16: true, 20: true
};

const HumanTech: { [key: number]: boolean } = {
  1: false, 4: true, 7: false, 9: true, 11: false, 14: true, 17: false, 19: true
};

const HumanHuman: { [key: number]: boolean } = {
  2: true, 4: false, 6: false, 8: true, 12: true, 14: false, 16: false, 18: true
};

const HumanSys: { [key: number]: boolean } = {
  2: false, 5: true, 9: false, 10: false, 12: false, 15: true, 19: false, 20: false
};

const HumanArt: { [key: number]: boolean } = {
  3: true, 5: false, 7: true, 8: false, 13: true, 15: false, 17: true, 18: false
};

// Названия категорий
const categoryNames = {
  humanNature: 'Человек-Природа',
  humanTech: 'Человек-Техника',
  humanHuman: 'Человек-Человек',
  humanSys: 'Человек-Знак',
  humanArt: 'Человек-Художественный образ'
};

export function ProfessionalOrientationTest({ user, onComplete, onBack }: ProfessionalOrientationTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [counts, setCounts] = useState({
    humanNature: 0,
    humanTech: 0,
    humanHuman: 0,
    humanSys: 0,
    humanArt: 0
  });
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

  // Обработка выбора варианта
  const handleAnswer = (isVariantA: boolean) => {
    const questionNumber = currentQuestion + 1;
    const newCounts = { ...counts };

    // Проверяем каждую категорию
    if (HumanNature[questionNumber] !== undefined) {
      if (HumanNature[questionNumber] === isVariantA) {
        newCounts.humanNature++;
      }
    }

    if (HumanTech[questionNumber] !== undefined) {
      if (HumanTech[questionNumber] === isVariantA) {
        newCounts.humanTech++;
      }
    }

    if (HumanHuman[questionNumber] !== undefined) {
      if (HumanHuman[questionNumber] === isVariantA) {
        newCounts.humanHuman++;
      }
    }

    if (HumanSys[questionNumber] !== undefined) {
      if (HumanSys[questionNumber] === isVariantA) {
        newCounts.humanSys++;
      }
    }

    if (HumanArt[questionNumber] !== undefined) {
      if (HumanArt[questionNumber] === isVariantA) {
        newCounts.humanArt++;
      }
    }

    setCounts(newCounts);

    // Если это был последний вопрос
    if (currentQuestion === 19) {
      setIsCompleted(true);
      
      // Формируем результат
      const professionalOrientationResult: { [key: string]: number } = {
        [categoryNames.humanNature]: newCounts.humanNature,
        [categoryNames.humanTech]: newCounts.humanTech,
        [categoryNames.humanHuman]: newCounts.humanHuman,
        [categoryNames.humanSys]: newCounts.humanSys,
        [categoryNames.humanArt]: newCounts.humanArt
      };

      onComplete({
        professionalOrientation: professionalOrientationResult,
        klimov: professionalOrientationResult // для совместимости
      });
      
      return;
    }

    // Переходим к следующему вопросу
    setCurrentQuestion(currentQuestion + 1);
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
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(categoryNames).map(([key, name]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div className="text-sm text-gray-700">{name}</div>
                    <div className="text-2xl font-medium text-green-600">
                      {counts[key as keyof typeof counts]}
                    </div>
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
                  <CardTitle>Профессиональная направленность</CardTitle>
                  <CardDescription>Методика Климова</CardDescription>
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
            <p className="text-gray-700">
              Ответьте на вопрос: <strong>&quot;Мне бы больше понравилось...&quot;</strong>
            </p>
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="text-center text-sm text-gray-600">
          Вопрос {currentQuestion + 1} из 20
        </div>

        {/* Question Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Вариант А */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 border-indigo-200 hover:border-indigo-400"
            onClick={() => handleAnswer(true)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  Вариант А
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 min-h-[80px] flex items-center">
                {questionsA[currentQuestion]}
              </p>
            </CardContent>
          </Card>

          {/* Вариант Б */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 border-purple-200 hover:border-purple-400"
            onClick={() => handleAnswer(false)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Вариант Б
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 min-h-[80px] flex items-center">
                {questionsB[currentQuestion]}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-1 flex-wrap">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div
              key={idx}
              className={`size-2 rounded-full transition-all ${
                idx < currentQuestion
                  ? 'bg-green-500'
                  : idx === currentQuestion
                  ? 'bg-indigo-500 scale-125'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
