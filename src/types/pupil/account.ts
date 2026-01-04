import type { PupilDTO } from "./pupil"

export interface Account {
    email: string
}
export interface AccountRegisterRequestDTO {
    email: string
    password: string
}

export interface AccountApiRegisterDTO {
    accountRegisterRequestDTO: AccountRegisterRequestDTO
    pupilDTO: PupilDTO
}

export type AccountRegisterRequestDTOKeys = keyof AccountRegisterRequestDTO