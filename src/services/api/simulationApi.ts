import { PaginatedSimulationResponse, SimulationRequest, SimulationResponse } from "../../types/simulation/Simulation";
import api from "./api";

export const simulationAPI = {
    //Запрашивает страницу с симуляция применяя фильтры 
    getSimulationsPageable: async (request: SimulationRequest, page: number, size:number, token:string, signal?: AbortSignal) => {
        const params = new URLSearchParams()
        if (page !== undefined && page !== null) 
            params.append('page', page.toString())
        if (size !== undefined && size !== null) 
            params.append('size', size.toString())
        Object.entries(request).forEach(([Key, value]) => {
            if (value !== undefined && value !== null && value !== '')
                params.append(Key, value.toString())
        })
        const requestUrl = `api/simulations${params.toString() ? `?${params.toString()}` : ""}`
        const response = await api.get<PaginatedSimulationResponse>(requestUrl, {signal, headers: {Authorization: token}})
        return response.data
    },
    getSimulationsTypes: async () => {
        try {
            const response = await api.get("api/simulations/types")
            return response.data
        } catch(err) {
            console.error(err)
            throw err
        }
    },
    getSimulationsScenarios: async () => {
        const response = await api.get("api/simulations/scenarios")
        return response.data
    },
    getSimulationsDataSource: async() => {
        const response = await api.get("api/simulations/simulation-data-sources")
        return response.data
    },
    updateSimulationDescription: async(simulationId:number, description: string) => {
        const response = await api.patch(`api/simulations/${simulationId}/description`, description, {
            headers: {"Content-Type": "text/plain"}
        })
        return response.data
    }
}