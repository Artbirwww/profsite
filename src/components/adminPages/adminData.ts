import { ArrowUpFromLine, CloudDownload, UsersRound } from "lucide-react"

export interface AdminMenuItemProps {
    id: string
    label?: string
    icon: React.ElementType
    path: string
    group?: string
}

export const adminButtons: AdminMenuItemProps[] = [
    {
        id: "pupils-upload",
        label: "Загрузить",
        icon: ArrowUpFromLine,
        path: "/admin/pupils-upload",
        group: "Ученики",
    },
    {
        id: "pupils-list",
        label: "Список",
        icon: UsersRound,
        path: "/admin/pupils",
        group: "Ученики",
    },
    {
        id: "specialists-upload",
        label: "Загрузить",
        icon: ArrowUpFromLine,
        path: "/admin/specialists-upload",
        group: "Специалисты",
    },
    {
        id: "specialists-list",
        label: "Список",
        icon: UsersRound,
        path: "/admin/specialists",
        group: "Специалисты",
    },
    {
        id: "simulations",
        label: "Симуляции",
        icon: CloudDownload,
        path: "/admin/simulations",
        group: "API",
    },
]