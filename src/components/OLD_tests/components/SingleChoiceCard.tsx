import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { SingleChoiceQuestion } from '../types/test-types';

interface SingleChoiceCardProps {
  question: SingleChoiceQuestion;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export function SingleChoiceCard({
  question,
  selectedAnswer,
  onSelect,
  disabled
}: SingleChoiceCardProps) {
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

{question.image && (
  <div>
    <img
      src={(question as any).image}
      alt={`Иллюстрация к вопросу ${question.id}`}
    />
  </div>
)}

      <CardContent>
        <div>
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx + 1)}
              disabled={disabled}
            >
              <div>
                <div>
                  {selectedAnswer === idx + 1 && (
                    <div />
                  )}
                </div>
                <div>
                  <span>
                    {String.fromCharCode(65 + idx)}) {option}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}