import { Dispatch, SetStateAction, useState } from "react"
import { PositiveNegative, PositiveNegativeOption } from "../PositiveNegative/PositiveNegative"
import { TemperamentFormA, TemperamentFormB, TemperamentOption } from "./temperamentData"
import { useNavigate } from "react-router-dom"

export const TemperamentFormSelection = () => {
    const [pickedForm, setPickedForm] = useState<string | null>(null)
    const [options, setOptions] = useState<TemperamentOption[] | null> (null)
    const navigate = useNavigate()
    const handleSelect = (testForm: string, temperamentData: TemperamentOption[]) => {
        if (temperamentData === null) return
        setPickedForm(testForm)
        setOptions(temperamentData)
    }
    const navigateToResult = () => {
        navigate("/tests/temperament-results", {
            state : {
                options: options,
                temperamentForm: pickedForm
            }
        })
    }
    if (!pickedForm) 
        return (
            <>
                <button onClick={() => handleSelect("A", TemperamentFormA)}>A</button>
                <button onClick={() => handleSelect("B", TemperamentFormB)}>B</button>
            </>
        )
    if (pickedForm && options) 
        return <PositiveNegative options={options} setOptions={setOptions as  Dispatch<SetStateAction<PositiveNegativeOption[]>>} navigateToResults={navigateToResult} />
    return (<>
        <p>Загрузка</p>
    </>)
}