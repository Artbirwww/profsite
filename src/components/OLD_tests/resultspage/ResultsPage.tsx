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
  const { user, token } = useAuth();
  const { testResults, getTestsByPupil, isLoading } = useTest();
  const [selectedTestType, setSelectedTestType] = useState<string>('all');

  useEffect(() => {
    const loadResults = async () => {
      try {
        if (token) {
          await getTestsByPupil(token);
        }
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
    // Добавить logout из AuthContext
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div>
        <div>
          <div></div>
          <p>Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* Заголовок */}
        <div>
          <div>
            <h1>Результаты тестирования</h1>
            <p>
              {user?.email}
              {testResults.length > 0 && ` • ${testResults.length} тестов пройдено`}
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={handleRetakeTest}
            >
              Пройти ещё тесты
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        </div>

        {/* Фильтр тестов */}
        <div>
          <div>
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
              >
                <span>{TestTypeIcons[type]}</span>
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Результаты */}
        {filteredResults.length > 0 ? (
          <div>
            {filteredResults.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div>
                    <div>
                      <div>
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
                    <div>
                      Время: {formatTime(result.completionTimeSeconds)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div>
                    {/* Параметры теста */}
                    <div>
                      {result.psychParams?.map((param, idx) => (
                        <div
                          key={idx}
                        >
                          <div>
                            {param.name?.replace(/_/g, ' ')}
                          </div>
                          <div>
                            {param.param}
                          </div>
                          <div>
                            <div
                              style={{ width: `${Math.min(param.param * 10, 100)}%` }}
                            />
                          </div>
                        </div>
                      )) || <div>Нет данных о параметрах теста</div>}
                    </div>

                    {/* Интерпретация результатов */}
                    <div>
                      <h4>Интерпретация результатов:</h4>
                      {result.testTypeName === 'Temperament' && (
                        <p>
                          {getTemperamentInterpretation(result.psychParams || [])}
                        </p>
                      )}
                      {result.testTypeName === 'Group Roles' && (
                        <p>
                          {getGroupRolesInterpretation(result.psychParams || [])}
                        </p>
                      )}
                      {result.testTypeName === 'Professional Orientation' && (
                        <p>
                          {getProfessionalOrientationInterpretation(result.psychParams || [])}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent>
              <div>📊</div>
              <h3>
                {testResults.length === 0 ? 'Результатов пока нет' : 'Нет результатов по выбранному фильтру'}
              </h3>
              <p>
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
  if (!params || !Array.isArray(params)) {
    return 'Недостаточно данных для интерпретации';
  }

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
  if (!params || !Array.isArray(params)) {
    return 'Недостаточно данных для интерпретации';
  }

  const roles = params
    .filter(p => p.name && p.name.includes('_score') && !p.name.includes('completion_time'))
    .sort((a, b) => (b?.param || 0) - (a?.param || 0));

  if (roles.length === 0) return 'Не удалось определить доминирующую роль';

  const dominantRole = roles[0];
  const roleName = dominantRole?.name?.replace('_score', '')?.replace(/_/g, ' ') || 'неизвестная роль';

  return `Ваша доминирующая роль в команде: ${roleName}. Вы набрали ${dominantRole?.param || 0} баллов.`;
}

function getProfessionalOrientationInterpretation(params: { param: number; name: string }[]): string {
  if (!params || !Array.isArray(params)) {
    return 'Недостаточно данных для интерпретации';
  }

  const orientations = params
    .filter(p => p.name && p.name.includes('_score') && !p.name.includes('completion_time'))
    .sort((a, b) => (b?.param || 0) - (a?.param || 0));

  if (orientations.length === 0) return 'Не удалось определить профессиональную направленность';

  const dominantOrientation = orientations[0];
  const orientationName = dominantOrientation?.name?.replace('_score', '') || '';

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