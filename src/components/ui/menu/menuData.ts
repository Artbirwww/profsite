import { Home, FileCheck, ChartPie, Book, UserRound, ShieldUser, DoorOpen } from "lucide-react"
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
        id: "results",
        label: "Результаты",
        icon: ChartPie,
        path: "/my-results",
        order: 3,
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
        id: "profile",
        label: "Профиль",
        icon: UserRound,
        path: "/profile",
        order: 5,
    },
    {
        id: "admin-panel",
        label: "Адм",
        icon: ShieldUser,
        path: "/admin",
        order: 6,
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

/* OLD
import { Home, FileCheck, ChartPie, Book, UserRound, Settings2, UsersRound, FileUp, BookPlus, Apple, DoorOpen, HardHat } from "lucide-react"
import React from "react"
import { ROLES } from "../../../types/account/role"

// Интерфейс для элемента сайдбара
export interface MenuItemProps {
    id: string              // Id
    label: string           // Текст кнопки
    icon: React.ElementType // Иконка кнопки
    path: string            // URL при нажатии на кнопку
    dataItem?: string       // Для тестирования / селекторов 
    allowedRoles?: string[] // Роли которым доступны отдельные кнопки
    isExit?: boolean        // Флаг для кнопки выхода
}

export const menuButtons: MenuItemProps[] = [
    // Общие кнопки
    {
        id: "home",
        label: "Домой",
        icon: Home,
        path: "/",
    },
    {
        id: "testing",
        label: "Тесты",
        icon: FileCheck,
        path: "/tests",
    },
    {
        id: "results",
        label: "Результаты",
        icon: ChartPie,
        path: "/my-results",
    },
    
    {
        id: "profile",
        label: "Профиль",
        icon: UserRound,
        path: "/profile",
    },
    //Ученик
    {
        id: "grades",
        label: "Учеба",
        icon: Book,
        path: "/my-grades",
        allowedRoles: [ROLES.PUPIL],
        dataItem: "role-based-item"
    },

    // Админ
    {
        id: "admin-list",
        label: "Список учеников",
        icon: UsersRound,
        path: "/admin/pupils",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "admin-upload",
        label: "Загрузить учеников",
        icon: FileUp,
        path: "/admin/pupils-upload",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "specialists",
        label: "Специалисты",
        icon: HardHat,
        path: "/admin/specialists",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item"
    },
    {
        id: "specialists-upload",
        label: "Загрузить специалистов",
        icon: FileUp,
        path: "/admin/specialists-upload",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item"
    },

    {
        id: "admin-simulations",
        label: "Симуляции",
        icon: FileUp,
        path: "/admin/simulations",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item",
        
    },
    

    // Учитель
    {
        id: "teacher-1",
        label: "Учитель тест 1",
        icon: Apple,
        path: "/teacher-test-1",
        allowedRoles: [ROLES.TEACHER],
        dataItem: "role-based-item",
    },

    // Директор
    {
        id: "director-list",
        label: "Директор тест 1",
        icon: Apple,
        path: "/director-test-1",
        allowedRoles: [ROLES.DIRECTOR],
        dataItem: "role-based-item",
    },
]

// Отдельная константа для кнопки выхода (чтобы не путать с ролевыми кнопками)
export const logoutButton: MenuItemProps = {
    id: "logout",
    label: "Выход",
    icon: DoorOpen,
    path: "/login",
    isExit: true,
}
*/