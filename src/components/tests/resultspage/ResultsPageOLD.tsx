import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '../../SimpleUI';
// import { LogOut, RefreshCw, Award, Download, Share2, Eye, BarChart3 } from '../../../ui/display/SimpleIcons';
import { useTest } from '../../../contexts/TestContext'; // Правильный путь
import { useAuth } from '../../../contexts/AuthContext';
import type { User, TestResult } from '../App';

interface ResultsPageProps {
  result?: TestResult;
  user?: User;
  onRetakeTest?: () => void;
  onLogout?: () => void;
}

export function ResultsPage({ result: propResult, user: propUser, onRetakeTest, onLogout }: ResultsPageProps) {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const { testResults, getUserResults, isLoading } = useTest();
  
  const [selectedTest, setSelectedTest] = useState<string>('all');
  const [showAllTests, setShowAllTests] = useState(false);
  const [resultsData, setResultsData] = useState<TestResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<TestResult[]>([]);

  // Определяем, используем ли пропсы или данные из контекста
  const user = propUser || authUser;
  const result = propResult;
  const isLegacyMode = !!propResult; // Режим совместимости со старым кодом

  // Загружаем результаты с сервера
  useEffect(() => {
    if (!isLegacyMode && authUser) {
      getUserResults();
    }
  }, [isLegacyMode, authUser, getUserResults]);

  // Обновляем данные результатов
  useEffect(() => {
    if (isLegacyMode && result) {
      setResultsData([result]);
    } else {
      setResultsData(testResults);
    }
  }, [isLegacyMode, result, testResults]);

  // Фильтруем результаты
  useEffect(() => {
    if (selectedTest === 'all') {
      setFilteredResults(resultsData);
    } else {
      setFilteredResults(resultsData.filter(r => r.testType === selectedTest));
    }
  }, [selectedTest, resultsData]);

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
  };

  // Названия типов по Климову
  const professionalOrientationNames: { [key: string]: string } = {
    'Человек-Природа': 'Человек-Природа',
    'Человек-Техника': 'Человек-Техника',
    'Человек-Человек': 'Человек-Человек',
    'Человек-Знак': 'Человек-Знак',
    'Человек-Художественный образ': 'Человек-Художественный образ',
    humanNature: 'Человек-Природа',
    humanTech: 'Человек-Техника',
    humanHuman: 'Человек-Человек',
    humanSys: 'Человек-Знак',
    humanArt: 'Человек-Художественный образ'
  };

  // Названия тестов для фильтра
  const testTypes: { [key: string]: string } = {
    'all': 'Все тесты',
    'engineering-thinking': 'Инженерное мышление',
    'group-roles': 'Групповые роли',
    'iq-potential': 'Интеллектуальный потенциал',
    'professional-orientation': 'Профессиональная ориентация',
    'temperament': 'Темперамент'
  };

  // Описания тестов
  const testDescriptions: { [key: string]: string } = {
    'engineering-thinking': 'Оценка технических и пространственных способностей',
    'group-roles': 'Определение вашей роли в командной работе',
    'iq-potential': 'Измерение логико-математических способностей',
    'professional-orientation': 'Определение профессиональных склонностей',
    'temperament': 'Анализ типа темперамента'
  };

  // Функции для получения отсортированных результатов
  const getSortedResults = (data: { [key: string]: number } | undefined, nameMap: { [key: string]: string }) => {
    if (!data) return [];
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({ key, name: nameMap[key] || key, score: value }));
  };

  // Получение результата для отображения (режим совместимости)
  const getResultData = () => {
    if (isLegacyMode && result) {
      return {
        temperamentSorted: getSortedResults(result.temperament, temperamentNames),
        temperamentType: result.temperament ? 
          getTemperamentType(
            result.temperament.extraversion || 0, 
            result.temperament.neuroticism || 0
          ) : 'Не определен',
        groupRolesSorted: getSortedResults(result.groupRoles, groupRoleNames),
        professionalOrientationSorted: getSortedResults(result.professionalOrientation, professionalOrientationNames),
        engineeringThinkingSorted: getSortedResults(result.engineeringThinking, {}),
        intellectualPotentialSorted: getSortedResults(result.intellectualPotential, {}),
        recommendedProfession: result.recommendedProfession || getRecommendedProfession(result)
      };
    }
    return null;
  };

  // Определение рекомендуемой профессии на основе результатов
  const getRecommendedProfession = (resultData?: TestResult) => {
    if (!resultData?.professionalOrientation) {
      return 'Пройдите тест профессиональной ориентации для получения рекомендации';
    }

    const professionalOrientationSorted = getSortedResults(resultData.professionalOrientation, professionalOrientationNames);
    if (professionalOrientationSorted.length > 0) {
      const topOrientation = professionalOrientationSorted[0].name;
      const professions: { [key: string]: string } = {
        'Человек-Человек': 'Психолог, педагог, врач, менеджер по персоналу',
        'Человек-Техника': 'Инженер, программист, механик, системный администратор',
        'Человек-Знак': 'Бухгалтер, аналитик данных, экономист, исследователь',
        'Человек-Художественный образ': 'Дизайнер, художник, архитектор, музыкант',
        'Человек-Природа': 'Биолог, эколог, агроном, ветеринар',
      };
      return professions[topOrientation] || 'Требуется дополнительное тестирование';
    }
    return 'Требуется дополнительное тестирование';
  };

  // Получение иконки для теста
  const getTestIcon = (testType: string) => {
    const icons: { [key: string]: string } = {
      'engineering-thinking': '⚙️',
      'group-roles': '👥',
      'iq-potential': '🧠',
      'professional-orientation': '💼',
      'temperament': '🎭'
    };
    return icons[testType] || '📊';
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Получение процента правильных ответов
  const getScorePercentage = (score: number, total: number) => {
    return Math.round((score / total) * 100);
  };

  // Обработка выхода
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate('/login');
    }
  };

  // Обработка перепрохождения теста
  const handleRetakeTest = () => {
    if (onRetakeTest) {
      onRetakeTest();
    } else {
      navigate('/dashboard');
    }
  };

  // Экспорт результатов в PDF
  const handleExportPDF = () => {
    alert('Функция экспорта в PDF будет доступна в ближайшее время');
  };

  // Поделиться результатами
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Мои результаты тестирования',
        text: 'Посмотрите мои результаты профессионального тестирования!',
        url: window.location.href,
      });
    } else {
      alert('Функция "Поделиться" доступна только в современных браузерах');
    }
  };

  // Печать результатов
  const handlePrint = () => {
    window.print();
  };

  // Получаем данные для режима совместимости
  const legacyResultData = getResultData();

  if (isLoading && !isLegacyMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок и навигация */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Результаты тестирования</h1>
            <p className="text-gray-600">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.email}
              {!isLegacyMode && ` • ${resultsData.length} тестов пройдено`}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {!isLegacyMode && (
              <div className="flex gap-2">
                <Button 
                  variant={showAllTests ? "default" : "outline"}
                  onClick={() => setShowAllTests(!showAllTests)}
                  className="flex items-center gap-2"
                >
                  <Eye className="size-4" />
                  {showAllTests ? 'Скрыть список' : 'Показать все тесты'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleExportPDF}
                  className="flex items-center gap-2"
                >
                  <Download className="size-4" />
                  Экспорт
                </Button>
              </div>
            )}
            <Button 
              variant="outline" 
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="size-4" />
              Поделиться
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRetakeTest}
              className="flex items-center gap-2"
            >
              <RefreshCw className="size-4" />
              Пройти ещё тесты
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Выйти
            </Button>
          </div>
        </div>

        {/* Фильтр тестов (только для нового режима) */}
        {!isLegacyMode && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={selectedTest === 'all' ? "default" : "outline"}
                onClick={() => setSelectedTest('all')}
              >
                Все тесты
              </Button>
              {Object.entries(testTypes).filter(([key]) => key !== 'all').map(([key, name]) => (
                <Button
                  key={key}
                  variant={selectedTest === key ? "default" : "outline"}
                  onClick={() => setSelectedTest(key)}
                  className="flex items-center gap-2"
                >
                  <span>{getTestIcon(key)}</span>
                  {name}
                </Button>
              ))}
            </div>
            
            {showAllTests && filteredResults.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="size-5" />
                    История тестирования
                  </CardTitle>
                  <CardDescription>
                    {selectedTest === 'all' 
                      ? 'Все пройденные тесты' 
                      : testDescriptions[selectedTest]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredResults.map((resultItem, index) => (
                      <Card key={resultItem.id || index} className="border hover:border-gray-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">
                                {getTestIcon(resultItem.testType)}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {testTypes[resultItem.testType] || resultItem.testType}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {formatDate(resultItem.metadata?.completedAt || new Date().toISOString())}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-xl font-bold text-indigo-600">
                                  {resultItem.score}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {resultItem.metadata?.totalQuestions 
                                    ? `${getScorePercentage(resultItem.score, resultItem.metadata.totalQuestions)}%`
                                    : 'баллов'
                                  }
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/my-results/${resultItem.testType}?id=${resultItem.id}`)}
                              >
                                Подробнее
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Рекомендуемая профессия */}
        <Card className="mb-8 border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Award className="size-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-indigo-900 text-xl">Рекомендации по профессии</CardTitle>
                <CardDescription className="text-indigo-700">
                  На основе анализа ваших результатов тестирования
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-white/90 backdrop-blur rounded-xl border border-indigo-200">
              <p className="text-2xl font-medium text-indigo-700 mb-4">
                {isLegacyMode 
                  ? (legacyResultData?.recommendedProfession || 'Пройти тесты для получения рекомендаций')
                  : getRecommendedProfession(resultsData.find(r => r.testType === 'professional-orientation'))
                }
              </p>
              <div className="flex items-center gap-2 text-sm text-indigo-600">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Рекомендация сформирована на основе ваших способностей и склонностей
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Режим совместимости (старые результаты) */}
        {isLegacyMode && legacyResultData && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Темперамент */}
              {legacyResultData.temperamentSorted.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🎭</div>
                      <div>
                        <CardTitle>Темперамент - {legacyResultData.temperamentType}</CardTitle>
                        <CardDescription>Тест Айзенка (EPQ)</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
                      <p className="text-blue-900 mb-1">
                        <strong>Ваш тип темперамента: {legacyResultData.temperamentType}</strong>
                      </p>
                      <p className="text-sm text-blue-700">
                        {legacyResultData.temperamentType === 'Холерик' && 'Активный, энергичный, решительный, импульсивный'}
                        {legacyResultData.temperamentType === 'Сангвиник' && 'Общительный, оптимистичный, жизнерадостный, уравновешенный'}
                        {legacyResultData.temperamentType === 'Флегматик' && 'Спокойный, уравновешенный, медлительный, надёжный'}
                        {legacyResultData.temperamentType === 'Меланхолик' && 'Чувствительный, глубокий, тревожный, аналитичный'}
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
                        {legacyResultData.temperamentSorted.map((item) => (
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
              {legacyResultData.groupRolesSorted.length > 0 && (
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
                        {legacyResultData.groupRolesSorted.map((item, index) => (
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
            {legacyResultData.professionalOrientationSorted.length > 0 && (
              <Card className="mb-8">
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
                      {legacyResultData.professionalOrientationSorted.map((item, index) => {
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Инженерное мышление */}
              {legacyResultData.engineeringThinkingSorted.length > 0 && (
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
                          <TableHead>Показатель</TableHead>
                          <TableHead className="text-right">Значение</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {legacyResultData.engineeringThinkingSorted.map((item, index) => (
                          <TableRow key={item.key}>
                            <TableCell>
                              {item.name}
                              {index === 0 && (
                                <Badge variant="default" className="ml-2 bg-orange-600">
                                  Основной
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
              {legacyResultData.intellectualPotentialSorted.length > 0 && (
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
                          <TableHead>Показатель</TableHead>
                          <TableHead className="text-right">Значение</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {legacyResultData.intellectualPotentialSorted.map((item, index) => (
                          <TableRow key={item.key}>
                            <TableCell>
                              {item.name}
                              {index === 0 && (
                                <Badge variant="default" className="ml-2 bg-indigo-600">
                                  Основной
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
          </>
        )}

        {/* Режим нового API */}
        {!isLegacyMode && filteredResults.length > 0 && !showAllTests && (
          <div className="space-y-8">
            {filteredResults.slice(0, 3).map((resultItem, index) => (
              <Card key={resultItem.id || index} className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {getTestIcon(resultItem.testType)}
                      </div>
                      <div>
                        <CardTitle>{testTypes[resultItem.testType] || resultItem.testType}</CardTitle>
                        <CardDescription>
                          {formatDate(resultItem.metadata?.completedAt || new Date().toISOString())}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {resultItem.metadata?.totalQuestions 
                        ? `${getScorePercentage(resultItem.score, resultItem.metadata.totalQuestions)}%`
                        : `${resultItem.score} баллов`
                      }
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {resultItem.metadata?.dominantRole && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Ведущая роль: {resultItem.metadata.dominantRole}</p>
                        {resultItem.metadata?.professionRecommendations && (
                          <p className="text-sm text-blue-700 mt-1">
                            Рекомендуемые профессии: {resultItem.metadata.professionRecommendations}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {resultItem.metadata?.iqEstimate && (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <p className="font-medium text-green-800">Оценка IQ: {resultItem.metadata.iqEstimate}</p>
                        <p className="text-sm text-green-700 mt-1">
                          Уровень: {resultItem.metadata.iqEstimate >= 130 ? 'Высокий' : 
                                   resultItem.metadata.iqEstimate >= 110 ? 'Выше среднего' : 
                                   resultItem.metadata.iqEstimate >= 90 ? 'Средний' : 'Ниже среднего'}
                        </p>
                      </div>
                    )}
                    
                    {/* Детали результатов */}
                    {resultItem.metadata?.categoryStats && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">Результаты по категориям:</h4>
                        <div className="space-y-3">
                          {Object.entries(resultItem.metadata.categoryStats).map(([category, stats]) => (
                            <div key={category} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{category}</span>
                                <span className="font-medium">
                                  {stats.correct} из {stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
                                </span>
                              </div>
                              <Progress value={(stats.correct / stats.total) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Дополнительная информация */}
                    <div className="pt-4 border-t">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Время</div>
                          <div className="font-medium">
                            {resultItem.metadata?.timeSpent 
                              ? `${Math.floor(resultItem.metadata.timeSpent / 60)}:${(resultItem.metadata.timeSpent % 60).toString().padStart(2, '0')}`
                              : '—'
                            }
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Вопросов</div>
                          <div className="font-medium">
                            {resultItem.metadata?.answeredQuestions || 0}/{resultItem.metadata?.totalQuestions || 0}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Процент</div>
                          <div className="font-medium">
                            {resultItem.metadata?.percentage || getScorePercentage(resultItem.score, resultItem.metadata?.totalQuestions || 100)}%
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Дата</div>
                          <div className="font-medium">
                            {new Date(resultItem.metadata?.completedAt || Date.now()).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Пустой состояние */}
        {!isLegacyMode && filteredResults.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Результатов пока нет</h3>
              <p className="text-gray-600 mb-6">
                Пройдите тесты, чтобы увидеть здесь свои результаты
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Перейти к тестам
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Информационное сообщение */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg mt-0.5">
                <svg className="size-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-900 font-medium mb-2">Обратите внимание</p>
                <p className="text-sm text-blue-800">
                  Результаты тестирования носят рекомендательный характер. 
                  Для более точной профориентации рекомендуется консультация со специалистом-профконсультантом.
                  Вы можете сохранить эти результаты для обсуждения с карьерным консультантом.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Стили для печати */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .min-h-screen {
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}