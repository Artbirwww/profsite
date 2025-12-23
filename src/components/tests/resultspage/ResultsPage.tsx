import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '../../SimpleUI';
import { LogOut, RefreshCw, Award } from '../../ui/display/SimpleIcons';
import type { User, TestResult } from '../App';

interface ResultsPageProps {
  result: TestResult;
  user: User;
  onRetakeTest: () => void;
  onLogout: () => void;
}

export function ResultsPage({ result, user, onRetakeTest, onLogout }: ResultsPageProps) {
  // Названия для результатов темперамента (тест Айзенка)
  const temperamentNames: { [key: string]: string } = {
    extraversion: 'Экстраверсия',
    neuroticism: 'Нейротизм',
    lie: 'Шкала лжи',
    time: 'Время (сек)',
  };
  
  // Определение типа темперамента по результатам Айзенка
  const getTemperamentType = (extraversion: number, neuroticism: number): string => {
    if (extraversion >= 12 && neuroticism >= 12) return 'Холерик';
    if (extraversion >= 12 && neuroticism < 12) return 'Сангвиник';
    if (extraversion < 12 && neuroticism < 12) return 'Флегматик';
    if (extraversion < 12 && neuroticism >= 12) return 'Меланхолик';
    return 'Не определен';
  };

  // Названия ролей по Белбину
  const groupRoleNames: { [key: string]: string } = {
    'Исполнитель': 'Исполнитель',
    'Координатор': 'Координатор',
    'Формирователь': 'Формирователь',
    'Генератор идей': 'Генератор идей',
    'Аналитик-стратег': 'Аналитик-стратег',
    'Исследователь ресурсов': 'Исследователь ресурсов',
    'Командный работник': 'Командный работник',
    'Завершитель': 'Завершитель',
    // Старые названия для совместимости
    innovator: 'Генератор идей',
    coordinator: 'Координатор',
    implementer: 'Реализатор',
    analyst: 'Аналитик',
    communicator: 'Коммуникатор',
    finisher: 'Завершитель',
    specialist: 'Специалист',
    teamworker: 'Командный игрок',
  };

  // Названия типов по Климову
  const professionalOrientationNames: { [key: string]: string } = {
    human: 'Человек-Человек',
    tech: 'Человек-Техника',
    sign: 'Человек-Знак',
    art: 'Человек-Художественный образ',
    nature: 'Человек-Природа',
  };

  // Названия уровней инженерного мышления
  const engineeringThinkingNames: { [key: string]: string } = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий',
    none: 'Не развито',
  };

  // Названия уровней интеллектуального потенциала
  const intellectualPotentialNames: { [key: string]: string } = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий',
    none: 'Требует развития',
  };

  // Функции для получения отсортированных результатов
  const getSortedResults = (data: { [key: string]: number } | undefined, nameMap: { [key: string]: string }) => {
    if (!data) return [];
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({ key, name: nameMap[key] || key, score: value }));
  };

  const temperamentSorted = getSortedResults(result.temperament, temperamentNames);
  
  // Получаем тип темперамента
  const temperamentType = result.temperament ? 
    getTemperamentType(
      result.temperament.extraversion || 0, 
      result.temperament.neuroticism || 0
    ) : 'Не определен';
  const groupRolesSorted = getSortedResults(result.groupRoles, groupRoleNames);
  const professionalOrientationSorted = getSortedResults(result.professionalOrientation, professionalOrientationNames);
  const engineeringThinkingSorted = getSortedResults(result.engineeringThinking, engineeringThinkingNames);
  const intellectualPotentialSorted = getSortedResults(result.intellectualPotential, intellectualPotentialNames);

  // Определение рекомендуемой профессии на основе результатов
  const getRecommendedProfession = () => {
    if (professionalOrientationSorted.length > 0) {
      const topOrientation = professionalOrientationSorted[0].key;
      const professions: { [key: string]: string } = {
        human: 'Учитель, психолог, врач, социальный работник',
        tech: 'Инженер, программист, механик, системный администратор',
        sign: 'Бухгалтер, аналитик данных, секретарь, экономист',
        art: 'Дизайнер, художник, музыкант, архитектор',
        nature: 'Биолог, эколог, агроном, ветеринар',
      };
      return professions[topOrientation] || 'Требуется дополнительное тестирование';
    }
    return 'Пройдите все тесты для получения рекомендации';
  };

  const recommendedProfession = result.recommendedProfession || getRecommendedProfession();

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Результаты тестирования</h1>
            <p className="text-muted-foreground">
              {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onRetakeTest}>
              <RefreshCw className="size-4 mr-2" />
              Пройти заново
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="size-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        {/* Рекомендуемая профессия */}
        <Card className="mb-6 border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Award className="size-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-indigo-900">Рекомендуемая профессия</CardTitle>
                <CardDescription className="text-indigo-700">На основе анализа ваших ответов</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white/80 backdrop-blur rounded-xl border border-indigo-200">
              <p className="text-2xl text-indigo-700">{recommendedProfession}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Темперамент */}
          {temperamentSorted.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🎭</div>
                  <div>
                    <CardTitle>Темперамент - {temperamentType}</CardTitle>
                    <CardDescription>Тест Айзенка (EPQ)</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-blue-900 mb-1">
                    <strong>Ваш тип темперамента: {temperamentType}</strong>
                  </p>
                  <p className="text-sm text-blue-700">
                    {temperamentType === 'Холерик' && 'Активный, энергичный, решительный, импульсивный'}
                    {temperamentType === 'Сангвиник' && 'Общительный, оптимистичный, жизнерадостный, уравновешенный'}
                    {temperamentType === 'Флегматик' && 'Спокойный, уравновешенный, медлительный, надёжный'}
                    {temperamentType === 'Меланхолик' && 'Чувствительный, глубокий, тревожный, аналитичный'}
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Показатель</TableHead>
                      <TableHead className="text-right">Баллы</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {temperamentSorted.map((item) => (
                      <TableRow key={item.key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">
                          {item.key === 'time' 
                            ? `${Math.floor(item.score / 60)}:${(item.score % 60).toString().padStart(2, '0')}`
                            : item.score
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Групповые роли */}
          {groupRolesSorted.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">👥</div>
                  <div>
                    <CardTitle>Групповые роли</CardTitle>
                    <CardDescription>По методике Белбина</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Роль</TableHead>
                      <TableHead className="text-right">Баллы</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupRolesSorted.map((item, index) => (
                      <TableRow key={item.key}>
                        <TableCell>
                          {item.name}
                          {index === 0 && (
                            <Badge variant="default" className="ml-2 bg-purple-600">
                              Доминирующая
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">{item.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Профессиональная направленность */}
        {professionalOrientationSorted.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-3xl">💼</div>
                <div>
                  <CardTitle>Профессиональная направленность</CardTitle>
                  <CardDescription>По методике Климова - предпочтительные сферы работы</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Тип деятельности</TableHead>
                    <TableHead>Описание</TableHead>
                    <TableHead className="text-right">Баллы</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professionalOrientationSorted.map((item, index) => {
                    const descriptions: { [key: string]: string } = {
                      'Человек-Человек': 'Работа с людьми: обучение, консультирование, медицина',
                      'Человек-Техника': 'Работа с техникой: инженерия, программирование',
                      'Человек-Знак': 'Работа с информацией: анализ данных, документооборот',
                      'Человек-Художественный образ': 'Творческая деятельность: дизайн, искусство',
                      'Человек-Природа': 'Работа с природой: биология, экология',
                    };

                    return (
                      <TableRow key={item.key}>
                        <TableCell>
                          {item.name}
                          {index === 0 && (
                            <Badge variant="default" className="ml-2 bg-green-600">
                              Наиболее подходящий
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {descriptions[item.name]}
                        </TableCell>
                        <TableCell className="text-right">{item.score}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Инженерное мышление */}
          {engineeringThinkingSorted.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⚙️</div>
                  <div>
                    <CardTitle>Инженерное мышление</CardTitle>
                    <CardDescription>Технические способности</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Уровень</TableHead>
                      <TableHead className="text-right">Баллы</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {engineeringThinkingSorted.map((item, index) => (
                      <TableRow key={item.key}>
                        <TableCell>
                          {item.name}
                          {index === 0 && (
                            <Badge variant="default" className="ml-2 bg-orange-600">
                              Текущий
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">{item.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Интеллектуальный потенциал */}
          {intellectualPotentialSorted.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🧠</div>
                  <div>
                    <CardTitle>Интеллектуальный потенциал</CardTitle>
                    <CardDescription>Когнитивные способности</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Уровень</TableHead>
                      <TableHead className="text-right">Баллы</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {intellectualPotentialSorted.map((item, index) => (
                      <TableRow key={item.key}>
                        <TableCell>
                          {item.name}
                          {index === 0 && (
                            <Badge variant="default" className="ml-2 bg-indigo-600">
                              Текущий
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">{item.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg mt-0.5">
              <svg className="size-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-blue-900 mb-1">
                <strong>Обратите внимание</strong>
              </p>
              <p className="text-sm text-blue-800">
                Результаты тестирования носят рекомендательный характер. 
                Для более точной профориентации рекомендуется консультация со специалистом.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}