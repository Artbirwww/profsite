import { Apple, ArrowUpToLine, FileCheck, Home, PieChart, User, Users } from "lucide-react"
import React, { ReactNode } from "react"
import { ROLES } from "../../../types/account/role"

// Интерфейс для элемента сайдбара
export interface SidebarItem {
    id: string              // Id
    label: string           // Текст кнопки
    icon: ReactNode         // Иконка кнопки
    path: string            // URL при нажатии на кнопку
    dataItem?: string       // Для тестирования / селекторов 
    allowedRoles?: string[] // Роли которым доступны отдельные кнопки
}

export const sidebarButtons: SidebarItem[] = [
    // Общие кнопки
    {
        id: "home",
        label: "Домой",
        icon: React.createElement(Home, { size: 20 }),
        path: "/",
    },
    {
        id: "testing",
        label: "Тестирование",
        icon: React.createElement(FileCheck, { size: 20 }),
        path: "/tests",
    },
    {
        id: "results",
        label: "Мои результаты",
        icon: React.createElement(PieChart, { size: 20 }),
        path: "/my-results",
    },
    {
        id: "profile",
        label: "Личный кабинет",
        icon: React.createElement(User, { size: 20 }),
        path: "/profile",
    },
    
    // Админ
    {
        id: "admin-list",
        label: "Список учеников",
        icon: React.createElement(Users, { size: 20 }),
        path: "/admin/pupil-list",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "admin-upload",
        label: "Загрузить данные",
        icon: React.createElement(ArrowUpToLine, { size: 20 }),
        path: "/admin/pupil-loading",
        allowedRoles: [ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    
    // Учитель
    {
        id: "teacher-1",
        label: "Учитель тест 1",
        icon: React.createElement(Apple, { size: 20 }),
        path: "/teacher-test-1",
        allowedRoles: [ROLES.TEACHER, ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "teacher-2",
        label: "Учитель тест 2",
        icon: React.createElement(Apple, { size: 20 }),
        path: "/teacher-test-2",
        allowedRoles: [ROLES.TEACHER, ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    
    // Специалист
    {
        id: "specialist-list",
        label: "Специалист тест 1",
        icon: React.createElement(Apple, { size: 20 }),
        path: "/speacialist-test-1",
        allowedRoles: [ROLES.SPECIALIST, ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "specialist-upload",
        label: "Специалист тест 2",
        icon: React.createElement(Apple, { size: 20 }),
        path: "/speacialist-test-2",
        allowedRoles: [ROLES.SPECIALIST, ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    
    // Директор
    {
        id: "director-list",
        label: "Директор тест 1",
        icon: React.createElement(Apple, { size: 20 }),
        path: "/director-test-1",
        allowedRoles: [ROLES.DIRECTOR, ROLES.ADMIN],
        dataItem: "role-based-item",
    },
    {
        id: "director-upload",
        label: "Директор тест 2",
        icon: React.createElement(Apple, { size: 20 }),
        path: "/director-test-2",
        allowedRoles: [ROLES.DIRECTOR, ROLES.ADMIN],
        dataItem: "role-based-item",
    },
]
