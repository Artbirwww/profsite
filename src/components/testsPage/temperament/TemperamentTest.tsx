import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PositiveNegative, PositiveNegativeOption } from "../generalTemplates/positiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useNavigate } from "react-router-dom"
import { formatTime } from "../utils/formatTime"
import { useTimer } from "../hooks/useTimer"
import { TestFormConfig, TestFormSelection } from "../generalTemplates/formSelection/TestFormSelection"

const TEMPERAMENT_FORMS: TestFormConfig<TemperamentOption>[] = [
    { id: "A", label: "Форма A", data: TemperamentFormA },
    { id: "B", label: "Форма B", data: TemperamentFormB },
]

export const TemperamentTest = () => {
    const navigate = useNavigate()

    const { start, minutes, remaningSeconds, seconds } = useTimer(0, false)

    const [pickedForm, setPickedForm] = useState<string | null>(null)
    const [options, setOptions] = useState<TemperamentOption[]>([])

    useEffect(() => {
        if (!options || options.length === 0) return
        start()
    }, [options])

    const handleSelect = (testForm: string, temperamentData: TemperamentOption[]) => {
        if (temperamentData === null) return
        setPickedForm(testForm)
        setOptions(temperamentData)
    }

    const navigateToResult = () => {
        navigate("/tests/temperament-results", {
            state: {
                options: options,
                temperamentForm: pickedForm,
                completionTimeSeconds: seconds
            }
        })
    }

    if (!pickedForm) {
        return <TestFormSelection forms={TEMPERAMENT_FORMS} onSelect={handleSelect} />
    }

    return (
        <div className="test-timer-wrapper">
            <div className="float-timer">
                {formatTime(minutes)} : {formatTime(remaningSeconds)}
            </div>

            <PositiveNegative
                options={options}
                setOptions={setOptions as Dispatch<SetStateAction<PositiveNegativeOption[]>>}
                navigateToResults={navigateToResult} />
        </div>
    )
}