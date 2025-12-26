export interface TestResult {
  id: string;
  userId: string;
  testType: TestType;
  score: number;
  answers: Record<string, any>;
  completedAt: Date;
  metadata?: Record<string, any>;
}

export type TestType = 
  | 'engineering-thinking'
  | 'group-roles'
  | 'iq-potential'
  | 'professional-orientation'
  | 'temperament';