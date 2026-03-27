import { useCallback, useEffect, useState } from "react"
import { SimulationsList } from "./SimulationsList"
import { simulationAPI } from "../../../services/api/simulationApi"
import { useAuth } from "../../../contexts/AuthContext"
import { PaginatedSimulationResponse, SimulationRequest, SimulationResponse } from "../../../types/simulation/Simulation"
import { SimulationFilerBar } from "./SimulationFilterBar"
import toast, { Toaster } from "react-hot-toast"
//TODO добавить фильтрацию, сделать страницы
export const SimulationPage = () => {
    const {getToken} = useAuth()
    const [simulations, setSimulations] = useState<SimulationResponse[]>([])
    const [simulationRequest, setSimulationsRequest] = useState<SimulationRequest>({
        email: undefined, 
        startSimulation: undefined, 
        endSimulation: undefined, 
        page: 0, 
        size: 5, 
        profession: undefined, 
        simulationType: undefined 
    })
    const [totalPages, setTotalPages] = useState<number>(0)
    const loadSimulations = useCallback(async (signal: AbortSignal) => {
        try {
            const token = getToken()
            //TODO can use metadata from page
            const page = await simulationAPI.getSimulationsPageable(simulationRequest, token, signal)
            console.log("Симуляции: ", page)
            setSimulations(page.content)
            setTotalPages(page.totalPages)
        } catch(err) {
            console.error(err)
            toast("Не удалось загрузить симуляции, проверьте даты")
        }
    }, [simulationRequest])
    useEffect(()=>{
        if (!simulationRequest) return
        const controller = new AbortController()
        loadSimulations(controller.signal)
        return () => {
            controller.abort()
        }
    }, [simulationRequest])
    useEffect(()=> {
        const controller = new AbortController()
        loadSimulations(controller.signal)
        return () => {
            controller.abort()
        }
    }, [])
    const changePage = (pageNumber: number) => {
        if (pageNumber === simulationRequest.page) return
        setSimulationsRequest(prev => ({...prev, page: pageNumber}))
    }
    return (<>
    <div className="simulations-page">
        <div className="simulations-content">
            <SimulationFilerBar 
                simulationsRequest = {simulationRequest} 
                setSimulationsRequest = {setSimulationsRequest} />
            <SimulationsList simulations={simulations} />
        </div>
        {totalPages && totalPages !== 0 && 
        <div className="pagination">
            {Array.from({length: totalPages}, (_, pageNumber) => (
                <p className={`${pageNumber === simulationRequest.page ? "current-page" : "page"}`} onClick={() => changePage(pageNumber)}>{pageNumber+1}</p>
            ))}
        </div>}
        <Toaster/>
    </div>
    </>)
}