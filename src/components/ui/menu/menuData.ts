import { Home, FileCheck, ChartPie, Book, UserRound, Settings2, UsersRound, FileUp, BookPlus, Apple, DoorOpen } from "lucide-react"
import React, { ReactNode } from "react"
import { ROLES } from "../../../types/account/role"

// Интерфейс для элемента сайдбара
export interface MenuItem {
    id: string              // Id
    label: string           // Текст кнопки
    icon: React.ElementType // Иконка кнопки
    path: string            // URL при нажатии на кнопку
    dataItem?: string       // Для тестирования / селекторов 
    allowedRoles?: string[] // Роли которым доступны отдельные кнопки
    isExit?: boolean        // Флаг для кнопки выхода
}

export const menuButtons: MenuItem[] = [
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
        id: "grades",
        label: "Учеба",
        icon: Book,
        path: "/my-grades",
    },
    {
        id: "profile",
        label: "Профиль",
        icon: UserRound,
        path: "/profile",
    },
    {
        id: "profile",
        label: "Настройки",
        icon: Settings2,
        path: "/settings",
    },

    // Админ
    {
        id: "admin-list",
        label: "Список учеников",
        icon: UsersRound,
        path: "/admin/pupil-list",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "admin-upload",
        label: "Загрузить данные",
        icon: FileUp,
        path: "/admin/pupil-loading",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "admin-grade-upload",
        label: "Загрузить оценки",
        icon: BookPlus,
        path: "/admin/pupil-grades-loading",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item"
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

    // Специалист
    {
        id: "specialist-list",
        label: "Специалист тест 1",
        icon: Apple,
        path: "/speacialist-test-1",
        allowedRoles: [ROLES.SPECIALIST],
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
export const logoutButton: MenuItem = {
    id: "logout",
    label: "Выход",
    icon: DoorOpen,
    path: "/login",
    isExit: true,
}