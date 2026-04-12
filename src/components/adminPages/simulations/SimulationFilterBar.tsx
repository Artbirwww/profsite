//TODO here need to add fields for filtering via all simulation fields (API available)

import { useEffect, useRef, useState } from "react"
import { SimulationRequest } from "../../../types/simulation/Simulation"

interface SimulationFilterBarProps {
    simulationsRequest: SimulationRequest
    setSimulationsRequest: React.Dispatch<React.SetStateAction<SimulationRequest>>
}

export const SimulationFilerBar = ({simulationsRequest, setSimulationsRequest}: SimulationFilterBarProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    
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
                    <option value="Взрывник">Взрывник</option>
                    <option value="Горный инженер">Горный инженер</option>
                    <option value="Горный мастер">Горный мастер</option>
                    <option value="Водитель белаза">Водитель белаза</option>
                    <option value="Горноспасатель">Горноспасатель</option>
            </select>
            <input type="text" name="simulationType" placeholder="Тип симуляции" onChange={handleChange}/>
            <input type="text" name="startSimulation" placeholder="Дата начала" onChange={handleChange}/>
            <input type="text" name="endSimulation" placeholder="Дата окончания" onChange={handleChange}/>
            
        </div>)

}