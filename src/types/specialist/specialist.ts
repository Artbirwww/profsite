export interface Specialist {
    email: string,
    name: string
    surname: string
    patronymic: string
    contactEmail: string
    contactPhone: string
    expirience: string
    jobSatisfaction: string
    profession: string
}
export interface SpecialistsPage {
    content: Specialist[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    size: number
    totalElements: number
    totalPages: number
}
export interface SpecialistsFilter {
    page: number
    size: number
    
}