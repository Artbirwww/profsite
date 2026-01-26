import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { AlertCircle } from '../../ui/display/SimpleIcons';
import { TestConfig } from '../types/test-types';
import { formatTime } from './utils';
import './TestEngine.css';

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
    <div className="test-engine-modal-overlay">
      <Card className="test-engine-modal-card">
        <CardHeader>
          <CardTitle className="test-engine-modal-title">
            <AlertCircle className="size-5" />
            Завершить тест досрочно?
          </CardTitle>
        </CardHeader>
        <CardContent className="test-engine-modal-content">
          <p className="test-engine-modal-text">
            Вы ответили на {answeredCount} из {testConfig.questions.length} вопросов.
            {answeredCount < testConfig.questions.length && 
              ' Неотвеченные вопросы будут засчитаны как неправильные.'}
          </p>
          {testConfig.timeLimit && (
            <p className="test-engine-modal-time">
              Оставшееся время: {formatTime(remainingTime)}
            </p>
          )}
          <div className="test-engine-modal-actions">
            <Button
              variant="outline"
              onClick={onCancel}
              className="test-engine-modal-button"
            >
              Продолжить тест
            </Button>
            <Button
              onClick={onConfirm}
              className="test-engine-modal-button test-engine-modal-button-danger"
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
