//TODO here need to add fields for filtering via all simulation fields (API available)

import { useEffect, useRef, useState } from "react"
import { SimulationRequest } from "../../../types/simulation/Simulation"
import { simulationAPI } from "../../../services/api/simulationApi"
import { specialistsAPI } from "../../../services/api/specialistApi"

interface SimulationFilterBarProps {
    simulationsRequest: SimulationRequest
    setSimulationsRequest: React.Dispatch<React.SetStateAction<SimulationRequest>>
}
interface Data {
    name: string
}
export const SimulationFilerBar = ({simulationsRequest, setSimulationsRequest}: SimulationFilterBarProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [simulationsTypes, setSimulationsTypes] = useState<Data[]>([])
    const [professions, setProfessions] = useState<Data[]>([])
    useEffect(() => {
        const loadFiltersData = async () => {
            const simulationsTypesTemp = await simulationAPI.getSimulationsTypes()
            const professionsTemp = await specialistsAPI.getProfessions()
            console.log(professionsTemp)
            setSimulationsTypes(simulationsTypesTemp)
            setProfessions(professionsTemp)
        }
        loadFiltersData()
    }, [])
    const handleChange = (e: any) => {
        const {name, value} = e.target
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        
        timeoutRef.current = setTimeout(() => {
                setSimulationsRequest(prev => ({...prev, [name]: value}))
        }, 1000);
    }
    return (
        <div className="filter-bar">
            <input type="text" name="email" placeholder="Логин" onChange={handleChange}/>
            <select
                name="profession"
                value={simulationsRequest.profession || "Все профессии"}
                onChange={handleChange}>
                    <option value="">Все профессии</option>
                    {professions.map(profession => (
                        <option value={profession.name}>{profession.name}</option>
                    ))}
            </select>
            <select name="simulationType"
                    value={simulationsRequest.simulationType || "Все симуляции"}
                    onChange={handleChange}>
                        <option value="">Все симуляции</option>
                        {simulationsTypes.map(sim => (
                            <option value={sim.name}>{sim.name}</option>
                        ))}
                    </select>
            <input type="text" name="startSimulation" placeholder="Дата начала" onChange={handleChange}/>
            <input type="text" name="endSimulation" placeholder="Дата окончания" onChange={handleChange}/>
            
        </div>)

}