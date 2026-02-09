export interface PsychParam {
  param: number;
  name: string;
}

export interface PsychTestRequest {
  completionTimeSeconds: number;
  testTypeName: string;
  psychParams: PsychParam[];
}

export interface PsychTestResponse {
  completionTimeSeconds: number;
  testTypeName: string;
  psychParams: PsychParam[];
}

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