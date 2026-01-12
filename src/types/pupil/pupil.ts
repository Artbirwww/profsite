import { Gender } from "./gender"

export class PupilDTO {
    name: string = "";
    surname?: string = "";
    patronymic?: string = "";
    birthday: string = ""; // ISO date string: "YYYY-MM-DD"
    school?: string = "";
    healthCondition?: string = "";
    nationality?: string = "";
    extraActivities?: string = "";
    classNumber?: number = 0;
    classLabel?: string = "";
    gender: Gender = Gender.FEMALE;

    constructor(data?: Partial<PupilDTO>) {
        if (data) Object.assign(this, data)
    }
    static getFields(): (keyof PupilDTO)[] {
        return Object.keys(new PupilDTO()) as (keyof PupilDTO)[]
    }
}
export interface PupilResponse {
    pupilDTO?: PupilDTO;
    email: string;
}

export interface PupilListResponse {
    content: PupilResponse[];
    numberOfElements: number;
    size: number;
    number: number; //number of the current page u in
    totalElements: number;
    totalPages: number;
}

export const PupilDataKeys = ["name", "surname", "patronymic", 
    "birthday", "school", "healthCondition", "nationality", 
    "extraActivities", "classNumber", "classLabel", "gender", "email", "password"]

export type PupilDTOKeys = keyof PupilDTO