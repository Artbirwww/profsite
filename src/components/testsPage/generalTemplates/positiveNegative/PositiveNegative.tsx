import { Button } from "../../../ui/reusable/button"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

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
        setCurrentOptionNumber(currentOptionNumber + 1)
    }

    return (
        <div
            className="test-card test-card-height-200">

            <div
                className="test-card-text">

                {currentOption?.text}
            </div>

            <div
                className="test-card-options">

                <Button
                    buttonLabel={"Да"}
                    buttonFunction={() => handleAnswer(true)} />

                <Button
                    buttonLabel={"Нет"}
                    buttonFunction={() => handleAnswer(false)} />
            </div>
        </div>
    )
}