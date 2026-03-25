
export interface Simulation {
    filePath: string
    startSimulation: string
    endSimulation: string
    createdAt: string
    email: string
    simulationType: string
    profession: string
}

export interface SimulationResponse {
    id: number
    simulation: Simulation
}
export interface SimulationRequest {
    email?: string,
    startSimulation?: string
    endSimulation?: string
    simulationType?: string
    profession?: string
    page?: number
    size?: number
}
export interface PaginatedSimulationResponse {
    content: SimulationResponse[]
    empty: boolean
    first: boolean
    last:boolean
    number: number
    numberOfElements: number
    size: number
    totalElements: number
    totalPages: number
}