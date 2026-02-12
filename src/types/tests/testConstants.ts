// Constants for test types
export const TEST_TYPES = {
  TEMPERAMENT: 'Temperament',
  GROUP_ROLES: 'Group Roles',
  PROFESSIONAL_ORIENTATION: 'Professional Orientation',
  ENGINEERING_THINKING: 'Engineering Thinking',
  INTELLECTUAL_POTENTIAL: 'Intellectual Potential',
} as const;

// Type for test type values
export type TestType = keyof typeof TEST_TYPES;

// Constants for psych parameter names
export const PSYCH_PARAM_NAMES = {
  WORKING_BEE_SCORE: 'working_bee_score',
  SUPERVISION_SCORE: 'supervision_score',
  MOTIVATION_SCORE: 'motivation_score',
  IDEA_GENERATOR_SCORE: 'idea_generator_score',
  SUPPLIER_SCORE: 'supplier_score',
  DEDICATOR_SCORE: 'dedicator_score',
  CONTROLLER_SCORE: 'controller_score',
  COMPLETION_TIME_SECONDS: 'completion_time_seconds',
  ENGINEERING_THINKING_LEVEL: 'engineering_thinking_level',
  NATURE_SCORE: 'nature_score',
  TECH_SCORE: 'tech_score',
  HUMAN_SCORE: 'human_score',
  ARTISTIC_SCORE: 'artistic_score',
  SIGNED_SCORE: 'signed_score',
  EXTRA_INTROVERT_SCORE: 'extrav_introver_score',
  NEUROTIZM_SCORE: 'neirotizm_score',
  SINCERITY_SCORE: 'sincerity_score',
} as const;

// Type for psych parameter name values
export type PsychParamName = keyof typeof PSYCH_PARAM_NAMES;

// Array of all test types
export const ALL_TEST_TYPES = Object.values(TEST_TYPES);

// Array of all psych parameter names
export const ALL_PSYCH_PARAM_NAMES = Object.values(PSYCH_PARAM_NAMES);