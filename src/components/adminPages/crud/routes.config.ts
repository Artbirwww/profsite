import { Component, ComponentType, FC, JSX, ReactNode } from "react"
import { ProfessionsForm } from "./crudForms/ProfessionsForm"
import { ProfessionSphereForm} from "./crudForms/ProfessionSphereForm"
import { SimulationDataSource } from "./crudForms/SimulationDataSource"
import { ScenariosForm } from "./crudForms/ScenariosForm"

interface Route {
    path: string
    element: ComponentType
    name: string
    category: string
}

export const crudRoutes: Route[] = [
    {
        path: "forms/professions",
        element: ProfessionsForm ,
        name: "Профессии",
        category: "forms"
    },
    {
        path: "forms/professions-spheres",
        element: ProfessionSphereForm ,
        name: "Сферы профессий",
        category: "forms"
    },
    {
        path: "forms/simulation-data-sources",
        element: SimulationDataSource,
        name: "Источник данных для симуляций",
        category: "forms"
    },
    {
        path: "forms/scenarios",
        element: ScenariosForm,
        name: "Сценарии для симуляций",
        category: "forms"
    }
]