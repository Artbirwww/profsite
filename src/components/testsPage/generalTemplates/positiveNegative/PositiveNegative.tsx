import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft } from "lucide-react"

export interface PositiveNegativeOption {
    id: number
    text: string
    answer: boolean
}

interface PositiveNegativeProps<T extends PositiveNegativeOption = PositiveNegativeOption> {
    options: T[]
    setOptions: Dispatch<SetStateAction<T[]>>
    navigateToResults: () => void;
}

export const PositiveNegative = ({ options, setOptions, navigateToResults }: PositiveNegativeProps) => {
    const [currentOption, setCurrentOption] = useState<PositiveNegativeOption | null>(null)
    const [currentOptionNumber, setCurrentOptionNumber] = useState<number>(0)

    //Первый вопрос
    useEffect(() => {
        if (options.length === currentOptionNumber) {
            navigateToResults()
            return
        }

        if (options.length > 0)
            setCurrentOption(options[currentOptionNumber])
    }, [options])

    //следующий вопрос
    useEffect(() => {
        setCurrentOption(options[currentOptionNumber])
    }, [currentOptionNumber])

    //Ответ на вопрос пользователя, сохранить и показать новый
    const handleAnswer = (userAnswer: boolean) => {
        const optionsTemp = options.map(option => {
            if (option.text === currentOption?.text)
                return { ...option, answer: userAnswer }
            return option
        })
        setOptions(optionsTemp)
        changeOption(1)
        setCurrentOptionNumber(currentOptionNumber + 1)
    }

    const changeOption = (step: number) => {
        const newNumber = currentOptionNumber + step
        if (newNumber < 0 || newNumber >= options.length) {
            toast("Дальше некуда идти")
            return
        }
        setCurrentOptionNumber(newNumber)
    }

    return (
        <div className="test-card pozitive-negative">
            <div className="test-card-info">
                <div className="test-card-back">
                    <Button 
                        buttonIcon={<ArrowLeft size={20} strokeWidth={2}/>}
                        buttonFunction={() => {changeOption(-1)}}/>
                </div>

                <div className="test-card-count">
                    <p><span>Вопрос</span> <span>{(currentOptionNumber + 1).toString().padStart(2, "0")}</span> из <span>{(options.length).toString().padStart(2, "0")}</span></p>
                </div>
            </div>

            <div className="test-card-text">
                {currentOption?.text}
            </div>

            <div className="test-card-options">
                <Button
                    buttonLabel={"Да"}
                    buttonFunction={() => handleAnswer(true)} />
                <Button
                    buttonLabel={"Нет"}
                    buttonFunction={() => handleAnswer(false)} />
            </div>

            <ProgressBar currentTaskNumber={currentOptionNumber} total={options.length} />

            <Toaster />
        </div>
    )
}