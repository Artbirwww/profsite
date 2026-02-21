import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { ImageChoiceQuestion } from '../types/test-types';

interface ImageChoiceCardProps {
  question: ImageChoiceQuestion;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export function ImageChoiceCard({
  question,
  selectedAnswer,
  onSelect,
  disabled
}: ImageChoiceCardProps) {
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
            src={question.image}
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
                {selectedAnswer === idx + 1 && (
                  <div />
                )}
              </div>

              <span>
                {idx + 1}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}