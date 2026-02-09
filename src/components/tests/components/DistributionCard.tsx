import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../SimpleUI';
import { Minus, Plus } from '../../ui/display/SimpleIcons';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { DistributionQuestion, QuestionInfo } from '../types/test-types';

interface DistributionCardProps {
  question: DistributionQuestion;
  values: number[];
  onChange: (values: number[]) => void;
  disabled?: boolean;
  questionInfo?: QuestionInfo;
}

export function DistributionCard({
  question,
  values,
  onChange,
  disabled,
  questionInfo
}: DistributionCardProps) {
  const handleSliderChange = (index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = Math.max(0, Math.min(question.maxPoints, newValue));
    onChange(newValues);
  };

  const currentSum = values.reduce((sum, val) => sum + val, 0);

  return (
    <Card>
      <CardHeader>
        <div>
          {question.category && (
            <div>
              {question.category} • Вопрос {questionInfo?.questionInBlockIndex} из{' '}
              {questionInfo?.totalInBlock}
            </div>
          )}
          <div>
            <CardTitle>{question.text}</CardTitle>
            <div>
              {currentSum}/{question.maxPoints}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div>
          {question.options.map((option, index) => (
            <div key={index}>
              <div>
                <div>
                  <p>{option}</p>
                </div>
                <div>
                  <div>{values[index] || 0}</div>
                  <div>баллов</div>
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSliderChange(index, (values[index] || 0) - 1)}
                  disabled={(values[index] || 0) === 0 || disabled}
                >
                  <Minus />
                </Button>

                <div>
                  <input
                    type="range"
                    min="0"
                    max={question.maxPoints}
                    value={values[index] || 0}
                    onChange={(e) => handleSliderChange(index, parseInt(e.target.value) || 0)}
                    disabled={disabled}
                  />
                  <div>
                    <span>0</span>
                    <span>{question.maxPoints}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSliderChange(index, (values[index] || 0) + 1)}
                  disabled={(values[index] || 0) === question.maxPoints || disabled}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}