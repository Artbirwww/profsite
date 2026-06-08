import { Home, FileCheck, Book, UserRound, ShieldUser, DoorOpen, Brain, ThumbsUp, Glasses } from "lucide-react"
import { ROLES } from "../../../types/account/role"

export interface MenuItemProps {
    id: string
    label?: string
    icon: React.ElementType
    path: string
    order?: number
    className?: string
    allowedRoles?: string[]
    isLogout?: boolean
}

export const menuButtons: MenuItemProps[] = [
    // пункты меню доступные всем
    {
        id: "home",
        label: "Домой",
        icon: Home,
        path: "/",
        order: 1,
    },
    {
        id: "tests",
        label: "Тесты",
        icon: FileCheck,
        path: "/tests",
        order: 2,
    },
        {
        id: "VR",
        label: "VR тесты",
        icon: Glasses,
        path: "/vr-tests",
        order: 3
    },
    {
        id: "grades",
        label: "Учеба",
        icon: Book,
        path: "/my-grades",
        order: 4,
        allowedRoles: [ROLES.PUPIL],
    },
    {
        id: "predictions",
        label: "Результаты",
        icon: Brain,
        path: "/predictions",
        order: 5,
        allowedRoles: [ROLES.PUPIL]
    },
    {
        id: "profile",
        label: "Профиль",
        icon: UserRound,
        path: "/profile",
        order: 6,
    },

    {
        id: "admin-panel",
        label: "Адм",
        icon: ShieldUser,
        path: "/admin",
        order: 7,
        className: "spec",
        allowedRoles: [ROLES.ADMIN],
    },
]

export const logoutButton: MenuItemProps = {
    id: "logout",
    label: "Выход",
    icon: DoorOpen,
    path: "/login",
    order: 99,
    isLogout: true,
}