import React from 'react';
import { Card, CardContent, CardHeader } from '../../SimpleUI';
import { PairChoiceQuestion } from '../types/test-types';

interface PairChoiceCardProps {
  question: PairChoiceQuestion;
  selectedChoice: 'A' | 'B' | null;
  onSelect: (choice: 'A' | 'B') => void;
  disabled?: boolean;
}

export function PairChoiceCard({
  question,
  selectedChoice,
  onSelect,
  disabled
}: PairChoiceCardProps) {
  const getCardClass = (choice: 'A' | 'B') => {
    return '';
  };

  return (
    <div>
      {/* Вариант А */}
      <Card
        className={getCardClass('A')}
        onClick={() => onSelect('A')}
        disabled={disabled}
      >
        <CardHeader>
          <div>
            <div>
              Вариант А
            </div>
            {selectedChoice === 'A' && (
              <div>
                Выбрано
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              {question.optionA}
            </div>
            {question.descriptionA && (
              <div>
                {question.descriptionA}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Вариант Б */}
      <Card
        className={getCardClass('B')}
        onClick={() => onSelect('B')}
        disabled={disabled}
      >
        <CardHeader>
          <div>
            <div>
              Вариант Б
            </div>
            {selectedChoice === 'B' && (
              <div>
                Выбрано
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              {question.optionB}
            </div>
            {question.descriptionB && (
              <div>
                {question.descriptionB}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}