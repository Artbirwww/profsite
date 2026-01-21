import React from 'react';
import { Card, CardContent, CardHeader } from '../../SimpleUI';
import { PairChoiceQuestion } from '../types/test-types';
import styles from '../styles.module.css';

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
    const baseClass = `${styles.choiceCard} transition-all duration-200`;
    const selectedClass = selectedChoice === choice ? styles.choiceCardSelected : '';
    const colorClass = choice === 'A' ? styles.choiceCardBlue : styles.choiceCardPurple;
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
    
    return `${baseClass} ${selectedClass} ${colorClass} ${disabledClass}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Вариант А */}
      <Card
        className={getCardClass('A')}
        onClick={() => onSelect('A')}
        disabled={disabled}
      >
        <CardHeader className={styles.cardHeaderBlue}>
          <div className="flex items-center justify-between">
            <div className={styles.badgeBlue}>
              Вариант А
            </div>
            {selectedChoice === 'A' && (
              <div className={styles.badgeGreen}>
                Выбрано
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className={styles.spaceY4}>
            <div className={`text-lg font-medium ${styles.textGray800} ${styles.leadingRelaxed}`}>
              {question.optionA}
            </div>
            {question.descriptionA && (
              <div className="text-sm text-gray-600 italic">
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
        <CardHeader className={styles.cardHeaderPurple}>
          <div className="flex items-center justify-between">
            <div className={styles.badgePurple}>
              Вариант Б
            </div>
            {selectedChoice === 'B' && (
              <div className={styles.badgeGreen}>
                Выбрано
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className={styles.spaceY4}>
            <div className={`text-lg font-medium ${styles.textGray800} ${styles.leadingRelaxed}`}>
              {question.optionB}
            </div>
            {question.descriptionB && (
              <div className="text-sm text-gray-600 italic">
                {question.descriptionB}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}