import { Dispatch, SetStateAction, useState } from "react"
import { PositiveNegative, PositiveNegativeOption } from "../generalTemplates/positiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export const TemperamentFormSelection = () => {
    const navigate = useNavigate()

    const [pickedForm, setPickedForm] = useState<string | null>(null)
    const [options, setOptions] = useState<TemperamentOption[]>([])

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

    if (!pickedForm && !options)
        return (<p>загрузка...</p>)

    if (!pickedForm)
        return (
            <div className="test-form-selection-grid">

                <div className="test-form-selection-grid-item" onClick={() => handleSelect("A", TemperamentFormA)}>
                    <div className="test-form-selection-name">
                        <h4>Форма A</h4>
                    </div>

                    <div className="test-form-selection-option">
                        <div className="test-form-selection-icon">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

                <div className="test-form-selection-grid-item" onClick={() => handleSelect("B", TemperamentFormB)}>
                    <div className="test-form-selection-name">
                        <h4>Форма B</h4>
                    </div>

                    <div className="test-form-selection-option">
                        <div className="test-form-selection-icon">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

            </div>
        )

    return (
        <PositiveNegative
            options={options}
            setOptions={setOptions as Dispatch<SetStateAction<PositiveNegativeOption[]>>}
            navigateToResults={navigateToResult} />
    )
}