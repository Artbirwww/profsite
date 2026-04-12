import { profession, Specialist, SpecialistRegisterRequest, SpecialistsFilter, SpecialistsPage } from "../../types/specialist/specialist";
import api from "./api";

export const specialistsAPI = {
    getSpecialistsPage: async(page: number, size: number, token: string, signal?: AbortSignal) => {
        try {
            const params = new URLSearchParams()
            if (page) params.append('page', page.toString())
            if (size) params.append("size", size.toString())
            const requestUrl = `api/specialists${params.toString() ? `?${params.toString()}` : ""}`
            const response = await api.get<SpecialistsPage>(requestUrl, {signal, headers: {Authorization: token}})
            return response.data
        } catch(err) {
            console.error(err)
            throw err
        }
        
    },
    getProfessions: async () => {
        try {
            const response = await api.get<profession[]>("api/specialists/professions")
            return response.data
        } catch(err) {
            console.error(err)
            throw err
        }
    },
    specialistRegister: async (specialistRegisterRequest: SpecialistRegisterRequest) => {
        try {
            const response = await api.post("/api/specialists/register", specialistRegisterRequest)
            return response.data
        } catch(err) {
            console.error(err)
            throw err
    }
  },
    getSpecialistData: async (token: string) => {
        try {
            const response = await api.get<Specialist>("/api/specialists/specialist", {headers: {Authorization: token}})
            return response.data
        } catch(err) {
            console.error(err)
            throw err
        }
    },
    updateSpecialist: async (token: string, specialist: Specialist) => {
        try {
            const response = await api.put<Specialist>(`/api/specialists/specialist/${specialist.id}`, specialist, {
                headers: {Authorization: token}
            })
            return response.data
        } catch(err) {
            throw err
        }
    }
  
}