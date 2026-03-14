import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";

export type KlimovType = "PP" | "PN" | "PT" | "PS" | "PA"

export interface KlimovOption {
  id: number;
  text: string;
  type: KlimovType;
  isPicked: boolean;
}

export interface KlimovTask extends Task {
  id: number;
  taskNumber: number;
  options: [KlimovOption, KlimovOption];
  userAnswer: number; 
}