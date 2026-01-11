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
  psychParams: PsychParam[];
  testTypeName: string;
}

export type TestType = 
  | 'Temperament'
  | 'Group Roles'
  | 'Professional Orientation'
  | 'Engineering Thinking'
  | 'Intellectual Potential';