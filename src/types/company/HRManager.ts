import { Role } from "../account/role"

//entitiy returned for HR
export interface HRManager {
    accountId: number
    companyId: number
    email: string
    fullName: string
    companyName: string
}
//used when admin creates hr
export interface HRManagerRequest {
    email: string
    password: string
    role: string
    name: string
    surname: string
    patronymic: string
    companyName: string
    companyInn: string
    companyOgrn: string
    companyAddress: string
    companyPhone: string
    companyEmail: string
}
//used when hr creates specialist for company
export interface CreateSpecialistRequest {
    email: string
    password: string
    role?: string
    name: string
    surname: string
    patronymic: string,
    companyName?: string
}

// Request for creating employee (single role)
export interface CreateEmployeeRequest {
    email: string
    password: string
    roles: string []  // Single role: "HR" | "SPECIALIST" | "APPLICANT"
    name: string
    surname: string
    patronymic: string
    companyName: string
}

// Response
export interface CreateEmployeeResponse {
    accountId: number
    companyId: number
    email: string
    fullName: string
    companyName: string
    roles: string[]  // All roles (backend adds SPECIALIST automatically)
}