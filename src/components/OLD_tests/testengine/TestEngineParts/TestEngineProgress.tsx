import { Card, CardContent } from '../../../SimpleUI';

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
    <div>
      <Card>
        <CardContent>
          <div>
            <div>{answeredCount}</div>
            <div>Отвечено вопросов</div>
            <div>
              <div />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div>
            <div>{currentQuestion + 1}</div>
            <div>Текущий вопрос</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
