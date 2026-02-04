import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { ImageChoiceQuestion } from '../types/test-types';
import styles from '../styles.module.css';

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
    <Card className="shadow-lg">
      <CardHeader className={styles.cardHeaderIndigo}>
        <div className="flex items-center justify-between">
          <CardTitle className={styles.titleLarge}>
            {question.text}
          </CardTitle>
          {question.category && (
            <span className={styles.badgeIndigo}>
              {question.category}
            </span>
          )}
        </div>
      </CardHeader>

      {question.image && (
        <div className={styles.imageContainer}>
          <img
            src={question.image}
            alt={`Иллюстрация к вопросу ${question.id}`}
            className={styles.questionImage}
          />
        </div>
      )}

      <CardContent className="pt-6">
        <div className={styles.grid6Cols}>
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx + 1)}
              disabled={disabled}
              className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                selectedAnswer === idx + 1
                  ? 'border-indigo-500 bg-indigo-50 shadow-sm scale-[1.02]'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`size-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 mb-2 ${
                selectedAnswer === idx + 1
                  ? 'border-indigo-600 bg-indigo-600'
                  : 'border-gray-400'
              }`}>
                {selectedAnswer === idx + 1 && (
                  <div className="size-4 rounded-full bg-white" />
                )}
              </div>

              <span className={`font-medium text-center ${
                selectedAnswer === idx + 1
                  ? styles.textIndigo700
                  : styles.textGray700
              }`}>
                {idx + 1}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}