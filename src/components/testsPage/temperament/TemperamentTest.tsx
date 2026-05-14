import { PositiveNegative } from "../generalTemplates/positiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { TestFormConfig } from "../generalTemplates/formSelection/TestFormSelection"
import { UseFormSelectionTest } from "../generalTests/UseFormSelectionTest"

const TEMPERAMENT_FORMS: TestFormConfig<TemperamentOption>[] = [
    { id: "A", label: "Форма A", data: TemperamentFormA },
    { id: "B", label: "Форма B", data: TemperamentFormB },
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
