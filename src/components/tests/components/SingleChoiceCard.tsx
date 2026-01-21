import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { SingleChoiceQuestion } from '../types/test-types';
import styles from '../styles.module.css';

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
      src={(question as any).image} 
      alt={`Иллюстрация к вопросу ${question.id}`}
      className={styles.questionImage}
    />
  </div>
)}
      
      <CardContent className="pt-6">
        <div className={styles.spaceY3}>
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx + 1)}
              disabled={disabled}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                selectedAnswer === idx + 1
                  ? 'border-indigo-500 bg-indigo-50 shadow-sm scale-[1.02]'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`size-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedAnswer === idx + 1
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-400'
                }`}>
                  {selectedAnswer === idx + 1 && (
                    <div className="size-2.5 rounded-full bg-white" />
                  )}
                </div>
                <div className={styles.flex1}>
                  <span className={`font-medium ${
                    selectedAnswer === idx + 1
                      ? styles.textIndigo700
                      : styles.textGray700
                  }`}>
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