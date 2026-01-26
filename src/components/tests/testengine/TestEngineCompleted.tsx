import { useNavigate } from 'react-router-dom';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { CheckCircle } from '../../ui/display/SimpleIcons';
import { TestConfig } from '../types/test-types';
import './TestEngine.css';

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
    <div className="test-engine-completed-container">
      <Card className="test-engine-completed-card">
        <CardHeader>
          <div className="test-engine-completed-header">
            <div className="test-engine-completed-icon">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <CardTitle className="test-engine-completed-title">
              Тест успешно завершен!
            </CardTitle>
            <CardDescription className="test-engine-completed-description">
              Результаты сохранены на сервере
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="test-engine-completed-content">
          <div className="test-engine-result-card">
            <div className="test-engine-result-score">{results.score}</div>
            <div className="test-engine-result-label">баллов</div>
            <div className="test-engine-result-info">
              Вопросов отвечено: {answeredCount} из {testConfig.questions.length}
            </div>
          </div>
          
          <div className="test-engine-completed-actions">
            <Button 
              onClick={() => navigate(`/my-results?test=${testConfig.id}`)}
              className="test-engine-button-primary"
            >
              Перейти к детальным результатам
            </Button>
            <Button 
              variant="outline"
              onClick={onBack || (() => navigate('/dashboard'))}
              className="test-engine-button-secondary"
            >
              Вернуться в личный кабинет
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
