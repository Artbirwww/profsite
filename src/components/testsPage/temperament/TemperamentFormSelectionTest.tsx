import { Dispatch, SetStateAction, useState } from "react"
import { PositiveNegative, PositiveNegativeOption } from "../generalTemplates/positiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useNavigate } from "react-router-dom"

export const TemperamentFormSelection = () => {
    const [pickedForm, setPickedForm] = useState<string | null>(null)
    const [options, setOptions] = useState<TemperamentOption[] | null>(null)
    const navigate = useNavigate()

    const handleSelect = (testForm: string, temperamentData: TemperamentOption[]) => {
        if (temperamentData === null) return
        setPickedForm(testForm)
        setOptions(temperamentData)
    }

    const navigateToResult = () => {
        navigate("/tests/temperament-results", {
            state: {
                options: options,
                temperamentForm: pickedForm
            }
        })
    }

    if (!pickedForm)
        return (
            <>
                <div className="test-form-selector-wrapper">

                    <div className="test-form-item-wrapper" onClick={() => handleSelect("A", TemperamentFormA)}>
                        <div className="test-form-item-content">
                            <h1>Форма A</h1>
                        </div>
                    </div>

                    <div className="test-form-item-wrapper" onClick={() => handleSelect("B", TemperamentFormB)}>
                        <div className="test-form-item-content">
                            <h1>Форма B</h1>
                        </div>
                    </div>
                </div>
            </>
        )

    if (pickedForm && options)
        return (
            <PositiveNegative
                options={options}
                setOptions={setOptions as Dispatch<SetStateAction<PositiveNegativeOption[]>>}
                navigateToResults={navigateToResult} />
        )

    return (
        <p>Загрузка...</p>
    )
}