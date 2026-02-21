import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../SimpleUI';
import { TestConfig } from '../../types/test-types';
//import '../TestEngineStyle/TestEngineCompleted.css';

interface TestEngineCompletedProps {
  testConfig: TestConfig;
  results: { score: number };
  answeredCount: number;
  onBack?: () => void;
}

export function TestEngineCompleted({
  testConfig,
  results,
  answeredCount,
  onBack,
}: TestEngineCompletedProps) {
  const navigate = useNavigate();

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <div>
            </div>
            <CardTitle>
              Тест успешно завершен!
            </CardTitle>
            <CardDescription>
              Результаты сохранены на сервере
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              {results.score}
            </div>
            <div>
              баллов
            </div>
            <div>
              Вопросов отвечено: {answeredCount} из {testConfig.questions.length}
            </div>
          </div>

          <div>
            <Button
              onClick={() => navigate(`/my-results?test=${testConfig.id}`)}
            >
              Перейти к детальным результатам
            </Button>
            <Button
              variant="outline"
              onClick={onBack || (() => navigate('/dashboard'))}
            >
              Вернуться в личный кабинет
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}