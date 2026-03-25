import { useCallback, useEffect, useState } from "react"
import { SimulationsList } from "./SimulationsList"
import { simulationAPI } from "../../../services/api/simulationApi"
import { useAuth } from "../../../contexts/AuthContext"
import { PaginatedSimulationResponse, SimulationRequest, SimulationResponse } from "../../../types/simulation/Simulation"
//TODO добавить фильтрацию, сделать страницы
export const SimulationPage = () => {
    const {getToken} = useAuth()
    const [simulations, setSimulations] = useState<SimulationResponse[]>([])
    const [simulationRequest, setSimulationsRequest] = useState<SimulationRequest>({
        email: undefined, 
        startSimulation: undefined, 
        endSimulation: undefined, 
        page: 0, 
        size: 10, 
        profession: undefined, 
        simulationType: undefined 
    })
    const loadSimulations = useCallback(async (signal: AbortSignal) => {
        try {
            const token = getToken()
            //TODO can use metadata from page
            const page = await simulationAPI.getSimulationsPageable(simulationRequest, token, signal)
            setSimulations(page.content)
        } catch(err) {
            console.error(err)
        }
    }, [simulationRequest])
    useEffect(()=>{
        const controller = new AbortController()
        loadSimulations(controller.signal)
        return () => {
            controller.abort()
        }
    }, [])
    return (<>
        <SimulationsList simulations={simulations} />
    </>)
}