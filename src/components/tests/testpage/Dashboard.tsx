import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/layout/card';
import { GraduationCap, LogOut, Check, BarChart3 } from '../../ui/display/SimpleIcons';

// Обновленные тесты для новой архитектуры
const testGroups = [
  {
    id: 'temperament',
    title: 'Темперамент',
    description: 'Определение типа темперамента и личностных характеристик',
    color: 'from-blue-500 to-cyan-500',
    icon: '🎭',
    path: '/tests/temperament', // Новый путь
  },
  {
    id: 'groupRoles',
    title: 'Групповые роли',
    description: 'Выявление вашей роли в команде по методике Белбина',
    color: 'from-purple-500 to-pink-500',
    icon: '👥',
    path: '/tests/group-roles', // Новый путь
  },
  {
    id: 'professionalOrientation',
    title: 'Профессиональная направленность',
    description: 'Определение профессиональных предпочтений по методике Климова',
    color: 'from-green-500 to-emerald-500',
    icon: '💼',
    path: '/tests/professional-orientation', // Новый путь
  },
  {
    id: 'engineeringThinking',
    title: 'Инженерное мышление',
    description: 'Оценка технических и аналитических способностей',
    color: 'from-orange-500 to-amber-500',
    icon: '⚙️',
    path: '/tests/engineering-thinking', // Новый путь
  },
  {
    id: 'intellectualPotential',
    title: 'Интеллектуальный потенциал',
    description: 'Анализ когнитивных способностей и потенциала развития',
    color: 'from-indigo-500 to-purple-600',
    icon: '🧠',
    path: '/tests/iq-potential', // Новый путь
  },
] as const;

export function Dashboard() {
  const { currentUser, completedGroups, handleLogout: logout } = useApp();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const allCompleted = completedGroups.length === 5;
  const progress = (completedGroups.length / 5) * 100;

  const handleStartTest = (path: string) => {
    navigate(path);
  };

  const handleViewResults = () => {
    navigate('/my-results'); // Новый путь к результатам
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen p-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <GraduationCap className="size-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Личный кабинет</CardTitle>
                  <CardDescription className="text-lg">
                    {currentUser.firstName && currentUser.lastName
                      ? `${currentUser.firstName} ${currentUser.lastName}`
                      : currentUser.email}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/my-results')}
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="size-4" />
                  Мои результаты
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
          </CardHeader>
          <CardContent className="pt-6">
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Прогресс прохождения тестов</span>
                <span className="text-indigo-600 font-bold">
                  {completedGroups.length} из 5
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {allCompleted && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="size-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-green-900 font-medium mb-1">Поздравляем!</p>
                    <p className="text-sm text-green-700 mb-3">
                      Вы успешно прошли все группы тестов. Теперь вы можете просмотреть детальные результаты.
                    </p>
                    <Button
                      onClick={handleViewResults}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <BarChart3 className="size-4 mr-2" />
                      Посмотреть детальные результаты
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Groups Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Доступные тесты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testGroups.map((group) => {
              const isCompleted = completedGroups.includes(group.id as any);
              return (
                <Card
                  key={group.id}
                  className={`${isCompleted ? 'opacity-75' : 'hover:shadow-xl hover:scale-[1.02]'} transition-all duration-200`}
                >
                  <CardHeader className="border-b">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-4 bg-gradient-to-br ${group.color} rounded-xl shadow-md`}>
                        <span className="text-3xl">{group.icon}</span>
                      </div>
                      {isCompleted && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                          <Check className="size-3 text-green-600" />
                          <span className="text-xs font-medium text-green-700">Пройдено</span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl">{group.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {group.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {isCompleted ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Check className="size-4" />
                          <span>Тест пройден</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate('/my-results')}
                        >
                          Результаты
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleStartTest(group.path)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      >
                        Начать тест
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        {!allCompleted && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg mt-0.5">
                  <svg className="size-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-900 font-medium mb-2">Как это работает</p>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Для получения полных результатов необходимо пройти все 5 тестов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Каждый тест занимает от 10 до 30 минут в зависимости от типа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Вы можете проходить тесты в любом порядке</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Результаты автоматически сохраняются на сервере</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>После завершения всех тестов вы получите рекомендации по профессии</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{completedGroups.length}</div>
                <div className="text-sm text-gray-600">Пройдено тестов</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{5 - completedGroups.length}</div>
                <div className="text-sm text-gray-600">Осталось пройти</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{progress}%</div>
                <div className="text-sm text-gray-600">Общий прогресс</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">5</div>
                <div className="text-sm text-gray-600">Всего тестов</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}