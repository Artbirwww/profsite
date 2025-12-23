// src/components/tests/testpage/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/layout/card';
import { GraduationCap, LogOut, Check, BarChart3 } from '../../ui/display/SimpleIcons';

const testGroups = [
  {
    id: 'temperament',
    title: 'Темперамент',
    description: 'Определение типа темперамента и личностных характеристик',
    color: 'from-blue-500 to-cyan-500',
    icon: '🎭',
  },
  {
    id: 'groupRoles',
    title: 'Групповые роли',
    description: 'Выявление вашей роли в команде по методике Белбина',
    color: 'from-purple-500 to-pink-500',
    icon: '👥',
  },
  {
    id: 'professionalOrientation',
    title: 'Профессиональная направленность',
    description: 'Определение профессиональных предпочтений по методике Климова',
    color: 'from-green-500 to-emerald-500',
    icon: '💼',
  },
  {
    id: 'engineeringThinking',
    title: 'Инженерное мышление',
    description: 'Оценка технических и аналитических способностей',
    color: 'from-orange-500 to-amber-500',
    icon: '⚙️',
  },
  {
    id: 'intellectualPotential',
    title: 'Интеллектуальный потенциал',
    description: 'Анализ когнитивных способностей и потенциала развития',
    color: 'from-indigo-500 to-purple-600',
    icon: '🧠',
  },
] as const;

export function Dashboard() {
  const { currentUser, completedGroups } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null; // Защита (хотя Guard уже есть)

  const allCompleted = completedGroups.length === 5;
  const progress = (completedGroups.length / 5) * 100;

  const handleStartTest = (groupId: string) => {
    navigate(`/test/${groupId}`);
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  const handleLogout = () => {
    const { handleLogout: logout } = useApp();
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <GraduationCap className="size-8 text-white" />
                </div>
                <div>
                  <CardTitle>Личный кабинет</CardTitle>
                  <CardDescription>
                    {currentUser.firstName && currentUser.lastName
                      ? `${currentUser.firstName} ${currentUser.lastName}`
                      : currentUser.email}
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="size-4 mr-2" />
                Выйти
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Прогресс прохождения тестов</span>
                <span className="text-indigo-600">{completedGroups.length} из 5</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {allCompleted && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="size-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-green-900 mb-1">Поздравляем!</p>
                    <p className="text-sm text-green-700 mb-3">
                      Вы успешно прошли все группы тестов. Теперь вы можете просмотреть результаты.
                    </p>
                    <Button
                      onClick={handleViewResults}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <BarChart3 className="size-4 mr-2" />
                      Посмотреть результаты
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testGroups.map((group) => {
            const isCompleted = completedGroups.includes(group.id as any);
            return (
              <Card
                key={group.id}
                className={`${isCompleted ? 'opacity-60' : ''} transition-all hover:shadow-xl`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 bg-gradient-to-br ${group.color} rounded-xl shadow-md`}>
                      <span className="text-2xl">{group.icon}</span>
                    </div>
                    {isCompleted && (
                      <div className="p-2 bg-green-100 rounded-full">
                        <Check className="size-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg">{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isCompleted ? (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="size-4" />
                      <span>Пройдено</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleStartTest(group.id)}
                      className="w-full"
                    >
                      Начать тест
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        {!allCompleted && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <svg className="size-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="mb-2">
                    Для получения полных результатов необходимо пройти все 5 групп тестирования.
                    Каждая группа содержит 5 вопросов.
                  </p>
                  <p>
                    После прохождения группы она станет недоступной, и вы вернётесь в личный кабинет.
                    Как только вы завершите все группы, кнопка «Посмотреть результаты» станет активной.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}