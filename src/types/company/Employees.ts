import { Role } from "../account/role"

export interface Employee {
    id: number
    fullName: string
    email: string
    roles: string[]
    contactEmail?: string
    contactPhone?: string
    experience?: string
    jobSatisfaction?: string
    profession?: string
    gender?: string
}