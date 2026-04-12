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
        if (request.email) 
            params.append('email', (request.email))
        if (request.profession) 
            params.append('profession', (request.profession))
        if (request.simulationType) 
            params.append('simulationType', (request.simulationType))
        if (request.startSimulation) 
            params.append('startSimulation', request.startSimulation)
        if (request.endSimulation) 
            params.append('endSimulation', request.endSimulation)
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
    }
}