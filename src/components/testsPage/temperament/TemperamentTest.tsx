import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PositiveNegative, PositiveNegativeOption } from "../generalTemplates/positiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useNavigate } from "react-router-dom"
import { formatTime } from "../utils/formatTime"
import { useTimer } from "../hooks/useTimer"
import { TestFormConfig, TestFormSelection } from "../generalTemplates/formSelection/TestFormSelection"
import { createFormSelectionTest } from "../generalTests/FormSelection"

const TEMPERAMENT_FORMS: TestFormConfig<TemperamentOption>[] = [
    { id: "A", label: "Форма A", data: TemperamentFormA },
    { id: "B", label: "Форма B", data: TemperamentFormB },
]
export const TemperamentTest = createFormSelectionTest({
    forms: TEMPERAMENT_FORMS,
    resultPath: "/tests/temperament-results",
    stateKey: "options",
    stateKeyForm: "temperamentForm",
    Component: PositiveNegative,
    hasTimer: true,
    initialSeconds: 0
})
