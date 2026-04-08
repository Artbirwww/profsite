import { SpecialistsFilter, SpecialistsPage } from "../../types/specialist/specialist";
import api from "./api";

export const specialistsAPI = {
    getSpecialistsPage: async(filter: SpecialistsFilter, token: string, signal?: AbortSignal) => {
        try {
            const params = new URLSearchParams()
            if (filter.page) params.append('page', filter.page.toString())
            if (filter.size) params.append("size", filter.size.toString())
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
            const response = await api.get("api/specialists/professions")
            return response.data
        } catch(err) {
            console.error(err)
            throw err
        }
    }
}