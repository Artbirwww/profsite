import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";

export type KlimovType = "PP" | "PN" | "PT" | "PS" | "PA"
export const klimovTypeParam: Record<KlimovType, string> = {
    PP: "human_score",
    PN: "nature_score",
    PT: "tech_score",
    PS: "sign_score",
    PA: "artistic_score"
}
export const klimovTypeTranslate: Record<string, string> = {
    "human_score": "Человек-Человек",
    "nature_score": "Человек-Природа",
    "tech_score": "Человек-Техника",
    "sign_score": "Человек-Знаковая система",
    "artistic_score": "Человек-Художественный образ"
}
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

export interface KlimovProfession {
    name: string
    description: string
    traits: string
}