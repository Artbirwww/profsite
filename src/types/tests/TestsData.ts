import React from "react"
import { Drama, UsersRound, Cog, BriefcaseBusiness, Brain, Compass, Search, Target, Anchor } from "lucide-react"

// npm install vite-plugin-svgr --save-dev
import BG1 from "../../res/test-imgs/testsBackgrounds/1.svg?react"
import BG2 from "../../res/test-imgs/testsBackgrounds/2.svg?react"
import BG3 from "../../res/test-imgs/testsBackgrounds/3.svg?react"
import BG4 from "../../res/test-imgs/testsBackgrounds/4.svg?react"
import BG5 from "../../res/test-imgs/testsBackgrounds/5.svg?react"
import BG6 from "../../res/test-imgs/testsBackgrounds/6.svg?react"
import BG7 from "../../res/test-imgs/testsBackgrounds/7.svg?react"
import BG8 from "../../res/test-imgs/testsBackgrounds/8.svg?react"
import BG9 from "../../res/test-imgs/testsBackgrounds/9.svg?react"

// Интерфейс для элмента выбора теста (карточки тестов)
export interface TestItem {
    id: string              // Id
    label: string           // Название теста
    author?: string         // Автор теста
    description: string     // Описание теста
    icon: React.ElementType // Иконка теста
    path: string            // URL до теста
    background?: React.ElementType
    dataItem: string        // Для тестирования / селекторов
}

// Список доступных тестов для прохождения
export const testsList: TestItem[] = [
    {
        id: "test-temperament",
        label: "Темперамент",
        author: "Ганс Юрген Айзенк",
        description: "Определение типа темперамента и личностных характеристик",
        icon: Drama,
        path: "/tests/temperament",
        background: BG1,
        dataItem: "test-item-1",
    },
    {
        id: "test-group-roles",
        label: "Роли в команде",
        author: "Реймонд Мередит Белбин",
        description: "Выявление вашей роли в команде по методике Белбина",
        icon: UsersRound,
        path: "/tests/group-roles",
        background: BG2,
        dataItem: "test-item-2",
    },
    {
        id: "test-engineering-thinking",
        label: "Инженерное мышление",
        author: "Джордж Кеттнер Беннет",
        description: "Оценка технических и аналитических способностей",
        icon: Cog,
        path: "/tests/engineering-thinking",
        background: BG3,
        dataItem: "test-item-3",
    },
    {
        id: "test-intellectual-potential",
        label: "Интеллектуальный потенциал",
        description: "Анализ когнитивных способностей и потенциала развития",
        icon: Brain,
        path: "/tests/iq-potential",
        background: BG4,
        dataItem: "test-item-4",
    },
    {
        id: "test-professional-orientation-klimov",
        label: "Профориентация",
        author: "Евгений Александрович Климов",
        description: "Профессиональные предпочтения",
        icon: BriefcaseBusiness,
        path: "/tests/professional-orientation",
        background: BG5,
        dataItem: "test-item-5",
    },
    {
        id: "test-professional-orientation-holland",
        label: "Профориентация",
        author: "Джон Льюис Холланд",
        description: "Описание",
        icon: Compass,
        path: "/tests/iq-potential",
        background: BG6,
        dataItem: "test-item-6",
    },
    {
        id: "test-professional-orientation-glomshtok",
        label: "Карта интересов",
        author: "Александр Ефимович Гломшток",
        description: "Описание",
        icon: Search,
        path: "/tests/iq-potential",
        background: BG7,
        dataItem: "test-item-7",
    },
    {
        id: "test-professional-orientation-yovayshi",
        label: "Профориентация",
        author: "Леонардас Адамович Йовайша",
        description: "Описание",
        icon: Target,
        path: "/tests/iq-potential",
        background: BG8,
        dataItem: "test-item-8",
    },
    {
        id: "test-professional-orientation-sheyn",
        label: "Якоря карьеры",
        author: "Эдгар Генри Шейн",
        description: "Описание",
        icon: Anchor,
        path: "/tests/iq-potential",
        background: BG9,
        dataItem: "test-item-9",
    },
]