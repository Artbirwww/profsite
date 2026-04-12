import { SimulationResponse } from "../../../types/simulation/Simulation"
import { SimulationCard } from "./SimulationCard"
import "./css/simulation.css"
interface SimulationsListProps {
    simulations: SimulationResponse[]
}
export const SimulationsList = ({simulations} : SimulationsListProps) => {
    if (simulations.length === 0) return (
        <p>Симуляций не нашлось</p>
    )
    return (<>
        <div className="simulations-list">
            {simulations.map(simulation => (
                <SimulationCard simulation={simulation} />
            ))}
        </div>
    </>)
}