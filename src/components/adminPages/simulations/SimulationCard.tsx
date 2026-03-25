import api from "../../../services/api/api"
import { BASE_URL } from "../../../services/api/baseUrl"
import { SimulationResponse } from "../../../types/simulation/Simulation"
import "./css/simulation.css"

interface SimulationCardProps {
    simulation: SimulationResponse
}
export const SimulationCard = ({simulation}: SimulationCardProps) => {

    return( 
        <div key={simulation.id} className="simulation-card">
            <h3>Логин: {simulation.simulation.email}</h3>
            <p>Профессия {simulation.simulation.profession} в {simulation.simulation.simulationType}</p>
            <p><a className="download-link" href={`${BASE_URL}/${simulation.simulation.filePath}`}>Скачать файл симуляции </a></p>
            <div className="simulation-footer">
                <small>Дата начала: {simulation.simulation.startSimulation}</small>
                <small>Дата завершения: {simulation.simulation.endSimulation}</small>
            </div>
            
        </div>)

}