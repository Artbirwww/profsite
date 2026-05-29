import path from "path"
import api from "../../../services/api/api"
import { BASE_URL } from "../../../services/api/baseUrl"
import { SimulationResponse } from "../../../types/simulation/Simulation"
import "./css/simulation.css"
import { FieldInput } from "../../ui/reusable/fieldInput"
import { useEffect, useRef, useState } from "react"
import { simulationAPI } from "../../../services/api/simulationApi"
import toast, { Toaster } from "react-hot-toast"

interface SimulationCardProps {
    simulation: SimulationResponse
}
export const SimulationCard = ({simulation}: SimulationCardProps) => {
    const [description, setDescription] = useState<string>(simulation.simulation.description)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const handleDescription = (e: any) => {
        const value = e.target.value
        setDescription(description)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        
        // Set new timeout (same pattern as filter bar)
        timeoutRef.current = setTimeout(async () => {
            try {
                await simulationAPI.updateSimulationDescription(simulation.simulation.id, value)
                toast.success("Описание обновлено")
            } catch(err) {
                console.error(err)
                toast.error(`Ошибка при обновлении описания для ${err}`)
            }
        }, 1500)
        
    }
    useEffect(() => {
        return () => {
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current)
        }
    }, [])
    return( 
        <div className="base-card">
            <div className="card-title">{simulation.simulation.email}</div>
            
            <div className="info-row">
                <span className="info-label">Профессия:</span>
                <span>{simulation.simulation.profession || '--'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Тип:</span>
                <span>{simulation.simulation.simulationType || '--'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Сценарий:</span>
                <span>{simulation.simulation.scenario || '--'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Источник данных:</span>
                <span>{simulation.simulation.simulationDataSource || '--'}</span>
            </div>
            
            <div className="info-row">
                <span className="info-label">Файл:</span>
                <a download href={`${BASE_URL}/${simulation.simulation.filePath}`}>
                    {simulation.simulation.filePath?.split('/').pop() || 'скачать'}
                </a>
            </div>
            <textarea 
                className="description" 
                name="description" 
                placeholder="Описание..."
                value={description}
                onChange={handleDescription}/>
            
            <div className="card-footer">
                <span>{simulation.simulation.startSimulation || '--'}</span>
                <span>{simulation.simulation.endSimulation || '--'}</span>
            </div>
            <Toaster/>
        </div>)

}