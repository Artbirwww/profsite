import { SimpleButton as Button } from '../../../ui/buttons/SimpleButton';
import { Card, CardContent, CardHeader, CardTitle } from '../../../SimpleUI';
import { TestConfig } from '../../types/test-types';
import { formatTime } from './utils';

interface TestEngineConfirmDialogProps {
  testConfig: TestConfig;
  answeredCount: number;
  remainingTime: number;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TestEngineConfirmDialog({
  testConfig,
  answeredCount,
  remainingTime,
  isSubmitting,
  onConfirm,
  onCancel,
}: TestEngineConfirmDialogProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            Завершить тест досрочно?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Вы ответили на {answeredCount} из {testConfig.questions.length} вопросов.
            {answeredCount < testConfig.questions.length &&
              ' Неотвеченные вопросы будут засчитаны как неправильные.'}
          </p>
          {testConfig.timeLimit && (
            <p>
              Оставшееся время: {formatTime(remainingTime)}
            </p>
          )}
          <div>
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Продолжить тест
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Сохранение...' : 'Завершить'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}