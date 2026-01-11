import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/layout/card';
import { GraduationCap, LogOut, Check, BarChart3 } from '../../ui/display/SimpleIcons';
import { useAuth } from '../../../contexts/AuthContext';
import { pupilService } from '../../../services/api/pupilApi';
import { PupilDTO } from '../../../types/pupil/pupil';

const testGroups = [
  {
    id: 'temperament',
    title: 'Темперамент',
    description: 'Определение типа темперамента и личностных характеристик',
    color: 'from-yellow-500 to-cyan-500',
    icon: '🎭',
    path: '/tests/temperament'
  },
  {
    id: 'groupRoles',
    title: 'Групповые роли',
    description: 'Выявление вашей роли в команде по методике Белбина',
    color: 'from-yellow-500 to-pink-500',
    icon: '👥',
    path: '/tests/group-roles'
  },
  {
    id: 'engineeringThinking',
    title: 'Инженерное мышление',
    description: 'Оценка технических и аналитических способностей',
    color: 'from-yellow-500 to-amber-500',
    icon: '⚙️',
    path: '/tests/engineering-thinking'
  },
  {
    id: 'professionalOrientation',
    title: 'Профессиональная направленность',
    description: 'Профессиональные предпочтения',
    color: 'from-yellow-500 to-emerald-500',
    icon: '💼',
    path: '/tests/professional-orientation'
  },
  {
    id: 'intellectualPotential',
    title: 'Интеллектуальный потенциал',
    description: 'Анализ когнитивных способностей и потенциала развития',
    color: 'from-yellow-500 to-purple-600',
    icon: '🧠',
    path: '/tests/iq-potential'
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [pupilData, setPupilData] = useState<PupilDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedTests, setCompletedTests] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          // Загружаем данные ученика
          const response = await pupilService.getPupilData();
          setPupilData(response.pupilDTO);
        } catch (error) {
          console.error('Failed to load pupil data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadData();
  }, [user]);

  const handleStartTest = (path: string) => {
    navigate(path);
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const progress = (completedTests.length / testGroups.length) * 100;
  const allCompleted = completedTests.length === testGroups.length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-xl shadow-lg">
                  <GraduationCap className="size-8 text-white" />
                </div>
                <div>
                  <CardTitle>Личный кабинет</CardTitle>
                  <CardDescription>
                    {pupilData 
                      ? `${pupilData.name} ${pupilData.surname}`
                      : user?.email}
                    {pupilData?.school && ` • ${pupilData.school}`}
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
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Прогресс прохождения тестов</span>
                <span className="text-indigo-600">{completedTests.length} из {testGroups.length}</span>
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
                    Каждая группа содержит вопросы по соответствующей тематике.
                  </p>
                  <p>
                    После прохождения группы вы можете просмотреть результаты в разделе "Результаты".
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testGroups.map((group) => {
            const isCompleted = completedTests.includes(group.id);
            
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
                      onClick={() => handleStartTest(group.path)}
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

        {/* Профиль ученика */}
        {pupilData && (
          <Card>
            <CardHeader>
              <CardTitle>Профиль ученика</CardTitle>
              <CardDescription>Ваши личные данные</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Имя</p>
                  <p className="font-medium">{pupilData.name} {pupilData.surname} {pupilData.patronymic}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Дата рождения</p>
                  <p className="font-medium">{new Date(pupilData.birthday).toLocaleDateString('ru-RU')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Школа</p>
                  <p className="font-medium">{pupilData.school}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Класс</p>
                  <p className="font-medium">{pupilData.classNumber}{pupilData.classLabel}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Дополнительные занятия</p>
                  <p className="font-medium">{pupilData.extraActivities || 'Не указано'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}