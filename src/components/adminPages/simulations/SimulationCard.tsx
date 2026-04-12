import path from "path"
import api from "../../../services/api/api"
import { BASE_URL } from "../../../services/api/baseUrl"
import { SimulationResponse } from "../../../types/simulation/Simulation"
import "./css/simulation.css"

interface SimulationCardProps {
    simulation: SimulationResponse
}
export const SimulationCard = ({simulation}: SimulationCardProps) => {
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
                <span className="info-label">Файл:</span>
                <a download href={`${BASE_URL}/${simulation.simulation.filePath}`}>
                    {simulation.simulation.filePath?.split('/').pop() || 'скачать'}
                </a>
            </div>
            
            <div className="card-footer">
                <span>{simulation.simulation.startSimulation || '--'}</span>
                <span>{simulation.simulation.endSimulation || '--'}</span>
            </div>
        </div>)

}