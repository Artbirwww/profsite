import React from "react"
import { Palette, UsersRound, Settings, BriefcaseBusiness, Brain, Compass, Map, Target, Anchor } from "lucide-react"

// Интерфейс для элмента выбора теста (карточки тестов)
export interface TestItem {
    id: string              // Id
    label: string           // Название теста
    author?: string         // Автор теста
    description: string     // Описание теста
    time?: number           // Примерное затраченое время на тест
    questionscount?: number // Количсетво вопросов в тесте
    icon: React.ElementType // Иконка теста
    path: string            // URL до теста
    dataItem: string        // Для тестирования / селекторов
    name?: string
    isAvailable?: boolean
}

// Список доступных тестов для прохождения
export const testsList: TestItem[] = [
    {
        id: "test-temperament",
        label: "Темперамент",
        author: "Ганс Юрген Айзенк",
        description: "Определение типа темперамента и личностных характеристик",
        time: 10,
        questionscount: 57,
        icon: Palette,
        path: "/tests/temperament",
        dataItem: "test-item-1",
        name: "Temperament",
        isAvailable: true
    },
    {
        id: "test-group-roles",
        label: "Роли в команде",
        author: "Реймонд Мередит Белбин",
        description: "Выявление вашей роли в команде по методике Белбина",
        time: 10,
        questionscount: 7,
        icon: UsersRound,
        path: "/tests/group-roles",
        dataItem: "test-item-2",
        name: "Group-Roles",
        isAvailable: true
    },
    {
        id: "test-engineering-thinking",
        label: "Инженерное мышление",
        author: "Джордж Кеттнер Беннет",
        description: "Оценка технических и аналитических способностей",
        time: 25,
        questionscount: 70,
        icon: Settings,
        path: "/tests/engineering-thinking",
        dataItem: "test-item-3",
        name: "Engineering-Thinking",
        isAvailable: true
    },
    {
        id: "test-professional-orientation-klimov",
        label: "Профориентация Климов",
        author: "Евгений Александрович Климов",
        description: "Профессиональные предпочтения",
        time: 20,
        questionscount: 20,
        icon: BriefcaseBusiness,
        path: "/tests/professional-orientation-klimov",
        dataItem: "test-item-5",
        name: "Professional-Orientation-Klimov",
        isAvailable: true
    },
    {
        id: "test-intellectual-potential",
        label: "Интеллектуальный потенциал",
        description: "Анализ когнитивных способностей и потенциала развития",
        time: 720,
        questionscount: 29,
        icon: Brain,
        path: "/tests/iq-potential",
        dataItem: "test-item-4",
        name: "Intellectual-Potential",
        isAvailable: true
    },
    {
        id: "test-professional-orientation-holland",
        label: "Профориентация",
        author: "Джон Льюис Холланд",
        description: "Описание",
        time: 999,
        questionscount: 999,
        icon: Compass,
        path: "/tests/iq-potential",
        dataItem: "test-item-6",
        isAvailable: false
    },
    {
        id: "test-professional-orientation-glomshtok",
        label: "Карта интересов",
        author: "Александр Ефимович Гломшток",
        description: "Описание",
        time: 999,
        questionscount: 999,
        icon: Map,
        path: "/tests/iq-potential",
        dataItem: "test-item-7",
        isAvailable: false
    },
    {
        id: "test-professional-orientation-yovayshi",
        label: "Профориентация",
        author: "Леонардас Адамович Йовайши",
        description: "Описание",
        time: 999,
        questionscount: 999,
        icon: Target,
        path: "/tests/iq-potential",
        dataItem: "test-item-8",
        isAvailable: false
    },
    {
        id: "test-professional-orientation-sheyn",
        label: "Якоря карьеры",
        author: "Эдгар Генри Шейн",
        description: "Описание",
        time: 999,
        questionscount: 999,
        icon: Anchor,
        path: "/tests/iq-potential",
        dataItem: "test-item-9",
        isAvailable: false
    },
]