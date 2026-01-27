import React, { ReactNode } from "react"
import { Drama, UsersRound, Cog, BriefcaseBusiness, Brain } from "lucide-react"

// Интерфейс для элмента выбора теста (карточки тестов)
export interface TestsItem {
    id: string           // Id
    label: string        // Название теста
    description: string  // Описание теста
    icon: ReactNode      // Иконка теста
    path: string         // URL до теста
    dataItem: string     // Для тестирования / селекторов
}

// Список доступных тестов для прохождения
export const testsList: TestsItem[] = [
    {
        id: "test-temperament",
        label: "Темперамент",
        description: "Определение типа темперамента и личностных характеристик",
        icon: React.createElement(Drama, { size: 24 }),
        path: "/tests/temperament",
        dataItem: "test-item-1",
    },
    {
        id: "test-group-roles",
        label: "Групповые роли",
        description: "Выявление вашей роли в команде по методике Белбина",
        icon: React.createElement(UsersRound, { size: 24 }),
        path: "/tests/group-roles",
        dataItem: "test-item-2",
    },
    {
        id: "test-engineering-thinking",
        label: "Инженерное мышление",
        description: "Оценка технических и аналитических способностей",
        icon: React.createElement(Cog, { size: 24 }),
        path: "/tests/engineering-thinking",
        dataItem: "test-item-3",
    },
    {
        id: "test-professional-orientation",
        label: "Профессиональная направленность",
        description: "Профессиональные предпочтения",
        icon: React.createElement(BriefcaseBusiness, { size: 24 }),
        path: "/tests/professional-orientation",
        dataItem: "test-item-4",
    },
    {
        id: "test-intellectual-potential",
        label: "Интеллектуальный потенциал",
        description: "Анализ когнитивных способностей и потенциала развития",
        icon: React.createElement(Brain, { size: 24 }),
        path: "/tests/iq-potential",
        dataItem: "test-item-5",
    },
    {
        id: "test-aboba-6",
        label: "Абоба 6",
        description: "Анализ когнитивных способностей и потенциала развития",
        icon: React.createElement(Brain, { size: 24 }),
        path: "/tests/iq-potential",
        dataItem: "test-item-6",
    },
]