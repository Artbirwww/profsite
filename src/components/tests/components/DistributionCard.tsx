import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { Minus, Plus } from '../../ui/display/SimpleIcons';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { DistributionQuestion } from '../types/test-types';
import styles from '../styles.module.css';

interface DistributionCardProps {
  question: DistributionQuestion;
  values: number[];
  onChange: (values: number[]) => void;
  disabled?: boolean;
}

export function DistributionCard({ 
  question, 
  values, 
  onChange, 
  disabled 
}: DistributionCardProps) {
  const handleSliderChange = (index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = Math.max(0, Math.min(question.maxPoints, newValue));
    onChange(newValues);
  };

  const currentSum = values.reduce((sum, val) => sum + val, 0);

  return (
    <Card className="shadow-lg">
      <CardHeader className={styles.cardHeaderPurple}>
        <div className="flex items-center justify-between">
          <CardTitle className={styles.titleLarge}>
            {question.text}
          </CardTitle>
          <div className={`text-lg font-mono ${
            currentSum > question.maxPoints ? 'text-red-600 font-bold' :
            currentSum === question.maxPoints ? 'text-green-600 font-bold' :
            styles.textGray600
          }`}>
            {currentSum}/{question.maxPoints}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className={styles.spaceY8}>
          {question.options.map((option, index) => (
            <div key={index} className={styles.spaceY4}>
              <div className="flex items-start justify-between gap-4">
                <div className={styles.flex1}>
                  <p className={`${styles.textGray800} ${styles.leadingRelaxed}`}>
                    {option}
                  </p>
                </div>
                <div className="w-16 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {values[index] || 0}
                  </div>
                  <div className="text-xs text-gray-500">баллов</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSliderChange(index, (values[index] || 0) - 1)}
                  disabled={(values[index] || 0) === 0 || disabled}
                  className={styles.flexShrink0}
                >
                  <Minus className="size-4" />
                </Button>
                
                <div className={styles.flex1}>
                  <input
                    type="range"
                    min="0"
                    max={question.maxPoints}
                    value={values[index] || 0}
                    onChange={(e) => handleSliderChange(index, parseInt(e.target.value) || 0)}
                    disabled={disabled}
                    className={styles.slider}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>{question.maxPoints}</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSliderChange(index, (values[index] || 0) + 1)}
                  disabled={(values[index] || 0) === question.maxPoints || disabled}
                  className={styles.flexShrink0}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}