import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, Check, FileQuestion, X } from "lucide-react"
import { BaseTestComponentProps } from "../../generalTests/BaseTest"

export interface PositiveNegativeOption {
    id: number
    text: string
    answer: boolean
}

interface PositiveNegativeProps<T extends PositiveNegativeOption> extends BaseTestComponentProps<T> { }

export const PositiveNegative = <T extends PositiveNegativeOption>({ tasks, setTasks, navigateToResults, description }: PositiveNegativeProps<T>) => {
    const [currentOption, setCurrentOption] = useState<PositiveNegativeOption | null>(null)
    const [currentOptionNumber, setCurrentOptionNumber] = useState<number>(0)

    //Первый вопрос
    useEffect(() => {
        if (!tasks || tasks.length === 0) return

        if (tasks.length === currentOptionNumber) {
            navigateToResults()
            return
        }

        if (tasks.length > 0)
            setCurrentOption(tasks[currentOptionNumber])
    }, [tasks, currentOptionNumber, navigateToResults])

    //следующий вопрос
    useEffect(() => {
        setCurrentOption(tasks[currentOptionNumber])
    }, [currentOptionNumber])

    //Ответ на вопрос пользователя, сохранить и показать новый
    const handleAnswer = (userAnswer: boolean) => {
        const optionsTemp = tasks.map(task => {
            if (task.text === currentOption?.text)
                return { ...task, answer: userAnswer }
            return task
        })
        setTasks(optionsTemp)
        changeOption(1)
        setCurrentOptionNumber(currentOptionNumber + 1)
    }

    const changeOption = (step: number) => {
        const newNumber = currentOptionNumber + step
        if (newNumber < 0 || newNumber >= tasks.length) {
            toast("Дальше некуда идти")
            return
        }
        setCurrentOptionNumber(newNumber)
    }

    return (
        <div className="test-card pozitive-negative">
            <div className="test-card-info">
                <div className="test-card-count">
                    {currentOptionNumber + 1} из {tasks.length}
                </div>

                {description && (
                    <div className="test-card-description">
                        {description}
                    </div>
                )}
            </div>

            <div className="test-card-text">
                {currentOption?.text}
            </div>

            <div className="test-card-options">
                <Button label={"Назад"} variant="secondary" icon={<ArrowLeft />} disabled={currentOptionNumber === 0} onClick={() => { changeOption(-1) }} />
                <Button label={"Да"} icon={<Check />} onClick={() => handleAnswer(true)} />
                <Button label={"Нет"} icon={<X />} onClick={() => handleAnswer(false)} />
            </div>

            <ProgressBar currentTaskNumber={currentOptionNumber} total={tasks.length} />

            <Toaster />
        </div>
    )
}