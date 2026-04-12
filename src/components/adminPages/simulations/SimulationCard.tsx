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
        <div key={simulation.id} className="simulation-card">
            <h3>Логин: {simulation.simulation.email}</h3>
            <p>Профессия: {simulation.simulation.profession ? simulation.simulation.profession : "-"}</p>
            <p>Тип симуляции: {simulation.simulation.simulationType ? simulation.simulation.simulationType : "-"}</p>
            <p><a className="download-link" download={true} href={`${BASE_URL}/${simulation.simulation.filePath}`}>Скачать файл симуляции  {simulation.simulation.filePath.split("/").pop()}</a></p>
            <div className="simulations-footer">
                <small>Дата начала: {simulation.simulation.startSimulation}</small>
                <small>Дата завершения: {simulation.simulation.endSimulation}</small>
            </div>
            
        </div>)

}