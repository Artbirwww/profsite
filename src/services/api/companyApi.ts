import { PaginatedResponse } from "../../types/common"
import { Company, CompanyWithEmployees } from "../../types/company/Company"
import { Employee } from "../../types/company/Employees"
import { CreateEmployeeRequest, CreateSpecialistRequest, HRManager, HRManagerRequest } from "../../types/company/HRManager"
import { Specialist } from "../../types/specialist/specialist"
import api from "./api"


export const companyApi = {
    /*
    getHRs: async (token: string): Promise<HRManager[]> => {
        const response = await api.get("/api/hr", {
            headers: {Authorization: token}})
        return response.data
    },*/
    getCompaniesWithEmployees: async (token: string): Promise<CompanyWithEmployees[]> => {
        const response = await api.get("/api/company/companies-with-employees", {
            headers: {
                Authorization: token
            }
        })
        return response.data
    },
    createHR: async (token: string, hr: HRManagerRequest): Promise<HRManager> => {
        const response = await api.post("/api/hr", hr, {
            headers: {Authorization: token}
        })
        return response.data
    },
    createEmployeeByHR: async (token: string, employee: CreateEmployeeRequest) => {
        const response = await api.post("/api/hr/employee", employee, {
            headers:{ Authorization: token}
        })
        return response.data
    },
    getCompanyBySpecialist: async (token: string): Promise<Company> => {
        const response = await api.get("/api/company", {
            headers: {Authorization: token}
        })
        return response.data
    },
    createCompany: async (token: string, company: Company) : Promise<Company> => {
        const response = await api.post("/api/company", company, {
            headers: {
                Authorization: token
            }
        })
        return response.data
    },
    getEmployeesByCompany: async (
        token: string,
        page: number = 0,
        size: number = 10,
        role?: string
    ): Promise<PaginatedResponse<Employee>> => {
        let url = `/api/company/employees?page=${page}&size=${size}`
        if (role) {
            url += `&role=${role}`
        }
        const response = await api.get(url, {
            headers: { Authorization: token }
        })
        return response.data
    }
}