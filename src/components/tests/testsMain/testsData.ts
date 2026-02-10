import React, { ReactNode } from "react"
import { Drama, UsersRound, Cog, BriefcaseBusiness, Brain, Compass, Search, Target, Anchor } from "lucide-react"

// Интерфейс для элмента выбора теста (карточки тестов)
export interface TestsItem {
    id: string              // Id
    label: string           // Название теста
    author?: string         // Автор теста
    description: string     // Описание теста
    icon: React.ElementType // Иконка теста
    path: string            // URL до теста
    dataItem: string        // Для тестирования / селекторов
}

// Список доступных тестов для прохождения
export const testsList: TestsItem[] = [
    {
        id: "test-temperament",
        label: "Темперамент",
        author: "Ганс Юрген Айзенк",
        description: "Определение типа темперамента и личностных характеристик",
        icon: Drama,
        path: "/tests/temperament",
        dataItem: "test-item-1",
    },
    {
        id: "test-group-roles",
        label: "Роли в команде",
        author: "Реймонд Мередит Белбин",
        description: "Выявление вашей роли в команде по методике Белбина",
        icon: UsersRound,
        path: "/tests/group-roles",
        dataItem: "test-item-2",
    },
    {
        id: "test-engineering-thinking",
        label: "Инженерное мышление",
        author: "Джордж Кеттнер Беннет",
        description: "Оценка технических и аналитических способностей",
        icon: Cog,
        path: "/tests/engineering-thinking",
        dataItem: "test-item-3",
    },
    {
        id: "test-intellectual-potential",
        label: "Интеллектуальный потенциал",
        description: "Анализ когнитивных способностей и потенциала развития",
        icon: Brain,
        path: "/tests/iq-potential",
        dataItem: "test-item-4",
    },
    {
        id: "test-professional-orientation-klimov",
        label: "Профориентация",
        author: "Евгений Александрович Климов",
        description: "Профессиональные предпочтения",
        icon: BriefcaseBusiness,
        path: "/tests/professional-orientation",
        dataItem: "test-item-5",
    },
    {
        id: "test-professional-orientation-holland",
        label: "Профориентация",
        author: "Джон Льюис Холланд",
        description: "Описание",
        icon: Compass,
        path: "/tests/iq-potential",
        dataItem: "test-item-6",
    },
    {
        id: "test-professional-orientation-glomshtok",
        label: "Карта интересов",
        author: "Александр Ефимович Гломшток",
        description: "Описание",
        icon: Search,
        path: "/tests/iq-potential",
        dataItem: "test-item-7",
    },
    {
        id: "test-professional-orientation-yovayshi",
        label: "Профориентация",
        author: "Леонардас Адамович Йовайша",
        description: "Описание",
        icon: Target,
        path: "/tests/iq-potential",
        dataItem: "test-item-8",
    },
    {
        id: "test-professional-orientation-sheyn",
        label: "Якоря карьеры",
        author: "Эдгар Генри Шейн",
        description: "Описание",
        icon: Anchor,
        path: "/tests/iq-potential",
        dataItem: "test-item-9",
    },
]