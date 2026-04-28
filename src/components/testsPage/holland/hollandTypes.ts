import { Option, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";

export interface HollandTask extends Task {
    id: number
    text: string
    options: HollandOption[]
    userAnswer: number
}
export interface HollandOption extends Option {
    id: number
    text: string
    isPicked: boolean
    type: string
}
export interface HollandProfession {
    name: string,
    title: string,
    short: string,
    description: string,
    suitable_professions: string
    traits: string
}