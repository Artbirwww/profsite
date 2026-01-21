import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { YesNoQuestion } from '../types/test-types';
import styles from '../styles.module.css';

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
    return `${styles.choiceButton} ${
      isSelected ? styles.choiceButtonSelected : ''
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className={styles.cardHeaderPurple}>
        <div className="flex items-center justify-between">
          <CardTitle className={styles.titleLarge}>
            {question.text}
          </CardTitle>
          {question.category && (
            <span className={styles.badgePurple}>
              {question.category}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-8">
          <h3 className={`text-lg md:text-xl font-medium ${styles.textGray800} ${styles.leadingRelaxed}`}>
            {question.text}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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