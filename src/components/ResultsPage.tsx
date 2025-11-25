import { SimpleButton as Button } from './SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from './SimpleUI';
import { LogOut, RefreshCw, Award, BarChart3 } from './SimpleIcons';
import type { User, TestResult } from '../App';

interface ResultsPageProps {
  result: TestResult;
  user: User;
  onRetakeTest: () => void;
  onLogout: () => void;
}

export function ResultsPage({ result, user, onRetakeTest, onLogout }: ResultsPageProps) {
  // Получение названий ролей по Белбину
  const belbinRoleNames: { [key: string]: string } = {
    innovator: 'Генератор идей',
    coordinator: 'Координатор',
    implementer: 'Реализатор',
    analyst: 'Аналитик',
    communicator: 'Коммуникатор',
    finisher: 'Завершитель',
    specialist: 'Специалист',
    teamworker: 'Командный игрок',
  };

  // Получение названий типов по Климову
  const klimovTypeNames: { [key: string]: string } = {
    human: 'Человек-Человек',
    tech: 'Человек-Техника',
    sign: 'Человек-Знак',
    art: 'Человек-Художественный образ',
    nature: 'Человек-Природа',
  };

  // Сортировка результатов для отображения
  const belbinSorted = Object.entries(result.belbin)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ role: belbinRoleNames[key] || key, score: value }));

  const klimovSorted = Object.entries(result.klimov)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ type: klimovTypeNames[key] || key, score: value }));

  // Интерпретация показателей
  const getInterpretation = (value: number, type: 'psychoticism' | 'neuroticism') => {
    if (type === 'psychoticism') {
      if (value < 40) return { level: 'Низкий', description: 'Склонность к конформизму, следование правилам' };
      if (value < 60) return { level: 'Средний', description: 'Сбалансированность между креативностью и практичностью' };
      return { level: 'Высокий', description: 'Креативность, независимость мышления' };
    } else {
      if (value < 40) return { level: 'Низкий', description: 'Эмоциональная стабильность, спокойствие' };
      if (value < 60) return { level: 'Средний', description: 'Умеренная эмоциональность' };
      return { level: 'Высокий', description: 'Эмоциональная чувствительность, тревожность' };
    }
  };

  const psychoticismInfo = getInterpretation(result.psychoticism, 'psychoticism');
  const neuroticismInfo = getInterpretation(result.neuroticism, 'neuroticism');

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-5xl mx-auto">
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
              <p className="text-2xl text-indigo-700">{result.recommendedProfession}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Психологические показатели */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                  <BarChart3 className="size-5 text-white" />
                </div>
                <div>
                  <CardTitle>Психологические показатели</CardTitle>
                  <CardDescription>Основные характеристики личности</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Показатель</TableHead>
                    <TableHead>Значение</TableHead>
                    <TableHead>Уровень</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Психотизм</TableCell>
                    <TableCell>{result.psychoticism}</TableCell>
                    <TableCell>
                      <Badge variant={
                        result.psychoticism < 40 ? 'secondary' :
                        result.psychoticism < 60 ? 'default' : 'destructive'
                      }>
                        {psychoticismInfo.level}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Нейротизм</TableCell>
                    <TableCell>{result.neuroticism}</TableCell>
                    <TableCell>
                      <Badge variant={
                        result.neuroticism < 40 ? 'secondary' :
                        result.neuroticism < 60 ? 'default' : 'destructive'
                      }>
                        {neuroticismInfo.level}
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 space-y-3">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <p className="text-sm mb-1 text-blue-900">
                    <strong>Психотизм:</strong>
                  </p>
                  <p className="text-sm text-blue-700">
                    {psychoticismInfo.description}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <p className="text-sm mb-1 text-purple-900">
                    <strong>Нейротизм:</strong>
                  </p>
                  <p className="text-sm text-purple-700">
                    {neuroticismInfo.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Командные роли по Белбину */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                  <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <CardTitle>Командные роли</CardTitle>
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
                  {belbinSorted.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {item.role}
                        {index === 0 && (
                          <Badge variant="default" className="ml-2 bg-green-600">
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
        </div>

        {/* Типы профессий по Климову */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <CardTitle>Типы профессиональной деятельности</CardTitle>
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
                {klimovSorted.map((item, index) => {
                  const descriptions: { [key: string]: string } = {
                    'Человек-Человек': 'Работа с людьми: обучение, консультирование, медицина',
                    'Человек-Техника': 'Работа с техникой: инженерия, программирование',
                    'Человек-Знак': 'Работа с информацией: анализ данных, документооборот',
                    'Человек-Художественный образ': 'Творческая деятельность: дизайн, искусство',
                    'Человек-Природа': 'Работа с природой: биология, экология, сельское хозяйство',
                  };

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {item.type}
                        {index === 0 && (
                          <Badge variant="default" className="ml-2 bg-orange-600">
                            Наиболее подходящий
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {descriptions[item.type]}
                      </TableCell>
                      <TableCell className="text-right">{item.score}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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