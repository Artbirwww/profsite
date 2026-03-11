import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PositiveNegative, PositiveNegativeOption } from "../generalTemplates/positiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

/** TODO
 * 0. Показывать пользователю текщий прогресс по тесту (вопрос 4 из 57)
 * 1. Можно к этому прикрутить прогресс бар для лучшего UX
 */

export const TemperamentFormSelection = () => {
    const navigate = useNavigate()

    const [pickedForm, setPickedForm] = useState<string | null>(null)
    const [options, setOptions] = useState<TemperamentOption[] | null>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

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
            <div
                className="test-viewer-selection-grid-container">

                <div
                    className={`test-viewer-selection-item ${isVisible ? "fade-in" : ""}`} onClick={() => handleSelect("A", TemperamentFormA)}>

                    <div
                        className="test-item-content-wrapper">

                        <h1>Форма A</h1>

                        <div
                            className="test-item-option-container">

                            <button
                                onClick={() => handleSelect("A", TemperamentFormA)}>

                                <ArrowRight size={24} strokeWidth={1.5} className="test-item-icon" />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`test-viewer-selection-item ${isVisible ? "fade-in" : ""}`} onClick={() => handleSelect("B", TemperamentFormB)}>

                    <div
                        className="test-item-content-wrapper">

                        <h1>Форма B</h1>

                        <div
                            className="test-item-option-container">

                            <button
                                onClick={() => handleSelect("B", TemperamentFormB)}>

                                <ArrowRight size={24} strokeWidth={1.5} className="test-item-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    if (pickedForm && options)
        return (
            <div
                className="test-viewer-container">

                <div>
                    <h4>Здесь должен быть номер вопроса</h4>
                </div>

                <PositiveNegative
                    options={options}
                    setOptions={setOptions as Dispatch<SetStateAction<PositiveNegativeOption[]>>}
                    navigateToResults={navigateToResult} />
            </div>

        )

    return (
        <p>Загрузка...</p>
    )
}