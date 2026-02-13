import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface PositiveNegativeOption {
    text: string
    answer: string
}
interface PositiveNegativeProps {
    options: PositiveNegativeOption[]
    setOptions: Dispatch<SetStateAction<PositiveNegativeOption[]>>
}
/**
 * TODO
 * 0. Перевести ответы пользователя в нужный формат для отправки на сервер (посчитать результаты)
 * 1. Сделать итоговый компонент для отображения результатов или их отправки
 */
const PositiveNegative = ({options, setOptions} : PositiveNegativeProps) => {
    const [currentOption, setCurrentOption] = useState<PositiveNegativeOption|null>(null)
    const [currentOptionNumber, setCurrentOptionNumber] = useState<number>(0)
    //Первый вопрос
    useEffect(() => {
        if (options.length > 0)
            setCurrentOption(options[currentOptionNumber])
    },[options])
    //следующий вопрос
    useEffect(() => {
        setCurrentOption(options[currentOptionNumber])
    },[currentOptionNumber])
    //Ответ на вопрос пользователя, сохранить и показать новый
    const handleAnswer = (answer: string) => {
        const optionsTemp = options.map(option => {
            if (option.answer === answer) 
                return {...option, answer: answer}
            return option
        })
        setOptions(optionsTemp)

        setCurrentOptionNumber(currentOptionNumber+1)
    }
    return (
        <>
        <div className="positive-negative-card">
            <p>{currentOption?.text}</p>
            <div>
                <button>YES</button>
                <button>NO</button>
            </div>
        </div>
        </>
    )
}