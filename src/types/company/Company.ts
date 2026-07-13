import { Employee } from "./Employees"

export interface Company {
    id?: number
    name: string
    inn: string
    ogrn: string
    address: string
    phone: string
    email: string
}
export interface CompanyWithEmployees {
    id: number
    name: string
    inn: string
    ogrn: string
    address: string
    phone: string
    email: string
    employees: Employee[]
    employeesCount: number

}