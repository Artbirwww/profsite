// Types for psychological test API

export interface PsychParam {
  param: number;
  name: string;
}

export interface TestResultRequest {
  completionTimeSeconds: number;
  testTypeName: string;
  psychParams: PsychParam[];
}

export interface TestResultResponse {
  completionTimeSeconds: number;
  testTypeName: TestTypeName;
  psychParams: PsychParam[];
  createdAt?: string
}

export interface SaveTestResponse {
  success: boolean;
  message?: string;
  testId?: string;
}

export type TestTypeName = 'Temperament' | 'Group-Roles' | 'Professional-Orientation' | 'Engineering-Thinking' | 'Intellectual-Potential';

export type PsychParamName = 
  | 'working_bee_score'
  | 'supervision_score'
  | 'motivation_score'
  | 'idea_generator_score'
  | 'supplier_score'
  | 'dedicator_score'
  | 'controller_score'
  | 'completion_time_seconds'
  | 'engineering_thinking_level'
  | 'nature_score'
  | 'tech_score'
  | 'human_score'
  | 'artistic_score'
  | 'signed_score'
  | 'extrav_introver_score'
  | 'neirotizm_score'
  | 'sincerity_score';