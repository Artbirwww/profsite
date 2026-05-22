import { PositiveNegative } from "../generalTemplates/positiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { UseFormSelectionTest } from "../generalTests/UseFormSelectionTest"

const resetAnswers = (data: TemperamentOption[]) => {
    return data.map(({answer, ...rest}) => rest)
}

const TEMPERAMENT_FORMS = [
    { id: "A", label: "Форма A", data: resetAnswers(TemperamentFormA) },
    { id: "B", label: "Форма B", data: resetAnswers(TemperamentFormB) },
]

export const TemperamentTest = UseFormSelectionTest<TemperamentOption>({
    forms: TEMPERAMENT_FORMS,
    Component: PositiveNegative,
    resultPath: "/tests/temperament-results",
    stateKey: "options",
    stateKeyForm: "temperamentForm",
    description: 'Честно отвечай "Да" или "Нет", не думая долго над вопросами.',
    hasTimer: true,
    initialSeconds: 0,
})

{/*
export const TemperamentTest = createFormSelectionTest({
    forms: TEMPERAMENT_FORMS,
    resultPath: "/tests/temperament-results",
    stateKey: "options",
    stateKeyForm: "temperamentForm",
    Component: PositiveNegative,
    hasTimer: true,
    initialSeconds: 0
})
*/}
