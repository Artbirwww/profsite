import { Card, CardContent } from '../../SimpleUI';
import './TestEngine.css';

interface TestEngineProgressProps {
  answeredCount: number;
  currentQuestion: number;
  completionPercentage: number;
}

export function TestEngineProgress({
  answeredCount,
  currentQuestion,
  completionPercentage,
}: TestEngineProgressProps) {
  return (
    <div className="test-engine-progress-grid">
      <Card className="test-engine-progress-card">
        <CardContent className="test-engine-progress-content">
          <div className="test-engine-progress-stat">
            <div className="test-engine-progress-number">{answeredCount}</div>
            <div className="test-engine-progress-label">Отвечено вопросов</div>
            <div className="test-engine-progress-bar">
              <div 
                className="test-engine-progress-fill"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="test-engine-progress-card">
        <CardContent className="test-engine-progress-content">
          <div className="test-engine-progress-stat">
            <div className="test-engine-progress-number">{currentQuestion + 1}</div>
            <div className="test-engine-progress-label">Текущий вопрос</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
