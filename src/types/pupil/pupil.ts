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
    className?: string = "";
    gender: Gender = Gender.FEMALE;

    constructor(data?: Partial<PupilDTO>) {
        if (data) Object.assign(this, data)
    }
    static getFields(): (keyof PupilDTO)[] {
        return Object.keys(new PupilDTO()) as (keyof PupilDTO)[]
    }
}

export const PupilDataKeys = ["name", "surname", "patronymic", 
    "birthday", "school", "healthCondition", "nationality", 
    "extraActivities", "className", "gender", "email", "password"]

export type PupilDTOKeys = keyof PupilDTO