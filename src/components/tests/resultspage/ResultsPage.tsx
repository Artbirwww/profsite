import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { PsychTestResponse } from '../../../types/TestResult';

// Иконки для типов тестов
const TestTypeIcons: Record<string, string> = {
  'Temperament': '🎭',
  'Group Roles': '👥',
  'Professional Orientation': '💼',
  'Engineering Thinking': '⚙️',
  'Intellectual Potential': '🧠',
};

// Описания тестов
const TestTypeDescriptions: Record<string, string> = {
  'Temperament': 'Определение типа темперамента по методике Айзенка',
  'Group Roles': 'Выявление роли в команде по методике Белбина',
  'Professional Orientation': 'Профессиональные склонности по методике Климова',
  'Engineering Thinking': 'Оценка технических и аналитических способностей',
  'Intellectual Potential': 'Измерение когнитивных способностей',
};

export function ResultsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { testResults, getTestsByPupil, isLoading } = useTest();
  const [selectedTestType, setSelectedTestType] = useState<string>('all');

  useEffect(() => {
    const loadResults = async () => {
      try {
        await getTestsByPupil();
      } catch (error) {
        console.error('Failed to load results:', error);
      }
    };
    
    loadResults();
  }, [getTestsByPupil]);

  const filteredResults = selectedTestType === 'all' 
    ? testResults 
    : testResults.filter(r => r.testTypeName === selectedTestType);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (test: PsychTestResponse) => {
    // Временно используем текущую дату, так как API не возвращает дату
    return new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleRetakeTest = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    // TODO: Добавить logout из AuthContext
    navigate('/login');
  };

  if (isLoading) {
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
        {/* Заголовок */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Результаты тестирования</h1>
            <p className="text-gray-600">
              {user?.email}
              {testResults.length > 0 && ` • ${testResults.length} тестов пройдено`}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={handleRetakeTest}
              className="flex items-center gap-2"
            >
              Пройти ещё тесты
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              Выйти
            </Button>
          </div>
        </div>

        {/* Фильтр тестов */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedTestType === 'all' ? "default" : "outline"}
              onClick={() => setSelectedTestType('all')}
            >
              Все тесты
            </Button>
            {Object.keys(TestTypeIcons).map((type) => (
              <Button
                key={type}
                variant={selectedTestType === type ? "default" : "outline"}
                onClick={() => setSelectedTestType(type)}
                className="flex items-center gap-2"
              >
                <span>{TestTypeIcons[type]}</span>
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Результаты */}
        {filteredResults.length > 0 ? (
          <div className="space-y-6">
            {filteredResults.map((result, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {TestTypeIcons[result.testTypeName] || '📊'}
                      </div>
                      <div>
                        <CardTitle>{result.testTypeName}</CardTitle>
                        <CardDescription>
                          {TestTypeDescriptions[result.testTypeName] || 'Результаты тестирования'}
                          {` • ${formatDate(result)}`}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Время: {formatTime(result.completionTimeSeconds)}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Параметры теста */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {result.psychParams.map((param, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg"
                        >
                          <div className="text-sm text-gray-600 mb-1 capitalize">
                            {param.name.replace(/_/g, ' ')}
                          </div>
                          <div className="text-2xl font-bold text-indigo-600">
                            {param.param}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(param.param * 10, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Интерпретация результатов */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">Интерпретация результатов:</h4>
                      {result.testTypeName === 'Temperament' && (
                        <p className="text-sm text-blue-700">
                          {getTemperamentInterpretation(result.psychParams)}
                        </p>
                      )}
                      {result.testTypeName === 'Group Roles' && (
                        <p className="text-sm text-blue-700">
                          {getGroupRolesInterpretation(result.psychParams)}
                        </p>
                      )}
                      {result.testTypeName === 'Professional Orientation' && (
                        <p className="text-sm text-blue-700">
                          {getProfessionalOrientationInterpretation(result.psychParams)}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {testResults.length === 0 ? 'Результатов пока нет' : 'Нет результатов по выбранному фильтру'}
              </h3>
              <p className="text-gray-600 mb-6">
                {testResults.length === 0 
                  ? 'Пройдите тесты, чтобы увидеть здесь свои результаты'
                  : 'Измените фильтр или пройдите новые тесты'
                }
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Перейти к тестам
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Функции интерпретации
function getTemperamentInterpretation(params: { param: number; name: string }[]): string {
  const extraversion = params.find(p => p.name === 'extrav_introver_score')?.param || 0;
  const neuroticism = params.find(p => p.name === 'neirotizm_score')?.param || 0;
  const sincerity = params.find(p => p.name === 'sincerity_score')?.param || 0;

  let type = '';
  if (extraversion >= 12 && neuroticism >= 12) type = 'Холерик';
  else if (extraversion >= 12 && neuroticism < 12) type = 'Сангвиник';
  else if (extraversion < 12 && neuroticism < 12) type = 'Флегматик';
  else type = 'Меланхолик';

  return `Ваш тип темперамента: ${type}. ${
    sincerity <= 4 
      ? 'Результаты достоверны.' 
      : 'Внимание: результаты могут быть искажены из-за высокой шкалы искренности.'
  }`;
}

function getGroupRolesInterpretation(params: { param: number; name: string }[]): string {
  const roles = params
    .filter(p => p.name.includes('_score') && !p.name.includes('completion_time'))
    .sort((a, b) => b.param - a.param);

  if (roles.length === 0) return 'Не удалось определить доминирующую роль';

  const dominantRole = roles[0];
  const roleName = dominantRole.name.replace('_score', '').replace(/_/g, ' ');
  
  return `Ваша доминирующая роль в команде: ${roleName}. Вы набрали ${dominantRole.param} баллов.`;
}

function getProfessionalOrientationInterpretation(params: { param: number; name: string }[]): string {
  const orientations = params
    .filter(p => p.name.includes('_score') && !p.name.includes('completion_time'))
    .sort((a, b) => b.param - a.param);

  if (orientations.length === 0) return 'Не удалось определить профессиональную направленность';

  const dominantOrientation = orientations[0];
  const orientationName = dominantOrientation.name.replace('_score', '');
  
  const professions: Record<string, string> = {
    'human': 'Работа с людьми: психолог, педагог, врач, менеджер',
    'tech': 'Техническая работа: инженер, программист, механик',
    'nature': 'Работа с природой: биолог, эколог, агроном',
    'artistic': 'Творческая работа: дизайнер, художник, музыкант',
    'signed': 'Работа со знаками: бухгалтер, аналитик, исследователь',
  };

  const profession = professions[orientationName] || 'разнообразная деятельность';
  
  return `Ваша профессиональная направленность: ${orientationName.replace(/_/g, ' ')}. Рекомендуемые профессии: ${profession}.`;
}