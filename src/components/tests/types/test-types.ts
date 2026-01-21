export type QuestionType = 'single-choice' | 'multiple-choice' | 'distribution' | 'pair-choice' | 'yes-no';

export interface BaseQuestion {
  id: string;
  text: string;
  category?: string;
  type: QuestionType;
  image?: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice';
  options: string[];
  correctAnswer?: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswers?: number[];
}

export interface DistributionQuestion extends BaseQuestion {
  type: 'distribution';
  options: string[];
  maxPoints: number;
}

export interface PairChoiceQuestion extends BaseQuestion {
  type: 'pair-choice';
  optionA: string;
  optionB: string;
  descriptionA?: string;
  descriptionB?: string;
  correctChoice?: 'A' | 'B';
}

export interface YesNoQuestion extends BaseQuestion {
  type: 'yes-no';
  correctAnswer?: boolean;
}

export type TestQuestion = 
  | SingleChoiceQuestion 
  | MultipleChoiceQuestion 
  | DistributionQuestion 
  | PairChoiceQuestion 
  | YesNoQuestion;

export interface TestConfig {
  id: string;
  name: string;
  description: string;
  timeLimit?: number;
  questions: TestQuestion[];
  instructions?: string;
  showCategory?: boolean;
  calculateScore: (answers: any[], questions: TestQuestion[]) => {
    score: number;
    details: Record<string, any>;
  };
}

export interface TestEngineProps {
  testConfig: TestConfig;
  onComplete?: (results: any) => void;
  onBack?: () => void;
}