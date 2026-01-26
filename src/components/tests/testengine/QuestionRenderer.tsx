import { TestQuestion } from '../types/test-types';
import { SingleChoiceCard } from '../components/SingleChoiceCard';
import { DistributionCard } from '../components/DistributionCard';
import { PairChoiceCard } from '../components/PairChoiceCard';
import { YesNoCard } from '../components/YesNoCard';

interface QuestionRendererProps {
  question: TestQuestion;
  answer: any;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
}

export function QuestionRenderer({
  question,
  answer,
  onAnswer,
  disabled,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'single-choice':
      return (
        <SingleChoiceCard
          question={question}
          selectedAnswer={answer}
          onSelect={onAnswer}
          disabled={disabled}
        />
      );
    
    case 'distribution':
      return (
        <DistributionCard
          question={question}
          values={answer || []}
          onChange={onAnswer}
          disabled={disabled}
        />
      );
    
    case 'pair-choice':
      return (
        <PairChoiceCard
          question={question}
          selectedChoice={answer}
          onSelect={onAnswer}
          disabled={disabled}
        />
      );
    
    case 'yes-no':
      return (
        <YesNoCard
          question={question}
          selectedAnswer={answer}
          onSelect={onAnswer}
          disabled={disabled}
        />
      );
    
    default:
      return <div>Тип вопроса не поддерживается</div>;
  }
}
