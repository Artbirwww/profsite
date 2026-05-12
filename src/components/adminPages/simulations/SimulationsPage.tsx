import { useCallback, useEffect, useState } from "react"
import { SimulationsList } from "./SimulationsList"
import { simulationAPI } from "../../../services/api/simulationApi"
import { useAuth } from "../../../contexts/AuthContext"
import { PaginatedSimulationResponse, SimulationRequest, SimulationResponse } from "../../../types/simulation/Simulation"
import { SimulationFilerBar } from "./SimulationFilterBar"
import toast, { Toaster } from "react-hot-toast"
import { Pagination } from "../../ui/reusable/Pagination"

//TODO добавить фильтрацию, сделать страницы
export const SimulationPage = () => {
    const { getToken } = useAuth()
    const [simulations, setSimulations] = useState<SimulationResponse[]>([])
    const [simulationRequest, setSimulationsRequest] = useState<SimulationRequest>({
        email: undefined,
        startSimulation: undefined,
        endSimulation: undefined,
        profession: undefined,
        simulationType: undefined
    })
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [totalPages, setTotalPages] = useState<number>(0)
    const loadSimulations = useCallback(async (signal: AbortSignal) => {
        try {
            const token = getToken()
            //TODO can use metadata from page
            const page = await simulationAPI.getSimulationsPageable(simulationRequest, currentPage, size, token, signal)
            console.log("Симуляции: ", page)
            console.log(currentPage)
            setSimulations(page.content)
            setTotalPages(page.totalPages)
        } catch (err) {
            console.error(err)
            toast("Не удалось загрузить симуляции, проверьте даты")
        }
    }, [simulationRequest, currentPage, size])
    useEffect(() => {
        //if (!simulationRequest) return
        const controller = new AbortController()
        loadSimulations(controller.signal)
        return () => {
            controller.abort()
        }
    }, [simulationRequest, currentPage, size])

    return (<>
        <div className="simulations-page">

            <SimulationFilerBar
                simulationsRequest={simulationRequest}
                setSimulationsRequest={setSimulationsRequest} />
            <SimulationsList simulations={simulations} />


            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={totalPages} />
            <Toaster />
        </div>
    </>)
}