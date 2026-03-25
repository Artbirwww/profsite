import { SimulationResponse } from "../../../types/simulation/Simulation"
import { SimulationCard } from "./SimulationCard"
import "./css/simulation.css"
interface SimulationsListProps {
    simulations: SimulationResponse[]
}
export const SimulationsList = ({simulations} : SimulationsListProps) => {
    if (simulations.length === 0) return (
        <p>Загрузка...</p>
    )
    return (<>
        <div className="simulation-list">
            {simulations.map(simulation => (
                <SimulationCard simulation={simulation} />
            ))}
        </div>
    </>)
}