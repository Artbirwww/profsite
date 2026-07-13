import { Company, CompanyWithEmployees } from "../../types/company/Company"
import { CreateSpecialistRequest, HRManager, HRManagerRequest } from "../../types/company/HRManager"
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
    createSpecialistByHR: async (token: string, specialist: CreateSpecialistRequest) => {
        const response = await api.post("/api/hr/specialists", specialist, {
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
    getSpecialistsByCompany: async (token: string): Promise<Specialist[]> => {
        const response = await api.get("/api/company/specialists", {
            headers: {Authorization: token}
        })
        return response.data
    }
}