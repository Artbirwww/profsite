
export interface EngineerLevels {
    gender: string
    age: string
    levels: Level[]
}
export interface Level {
    min: number
    max: number
    level: string
    description: string
    techCapabilities: string
}