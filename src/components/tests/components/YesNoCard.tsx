import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { YesNoQuestion } from '../types/test-types';

interface YesNoCardProps {
  question: YesNoQuestion;
  selectedAnswer: boolean | null;
  onSelect: (answer: boolean) => void;
  disabled?: boolean;
}

export function YesNoCard({
  question,
  selectedAnswer,
  onSelect,
  disabled
}: YesNoCardProps) {
  const getButtonClass = (isSelected: boolean) => {
    return '';
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>
            {question.text}
          </CardTitle>
          {question.category && (
            <span>
              {question.category}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div>
          <button
            onClick={() => onSelect(true)}
            disabled={disabled}
            className={getButtonClass(selectedAnswer === true)}
          >
            Да
          </button>

          <button
            onClick={() => onSelect(false)}
            disabled={disabled}
            className={getButtonClass(selectedAnswer === false)}
          >
            Нет
          </button>
        </div>
      </CardContent>
    </Card>
  );
}