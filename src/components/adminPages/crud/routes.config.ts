import { Component, ComponentType, FC, JSX, ReactNode } from "react"
import { ProfessionsForm } from "./crudForms/ProfessionsForm"
import { ProfessionSphereForm} from "./crudForms/ProfessionSphereForm"

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
    }
]