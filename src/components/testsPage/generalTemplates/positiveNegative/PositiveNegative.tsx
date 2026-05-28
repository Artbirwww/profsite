import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"

import { Dispatch, SetStateAction, useState } from "react"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, Check, X } from "lucide-react"

export interface PositiveNegativeOption {
    id: number
    text: string
    answer?: boolean
}

interface PositiveNegativeProps {
    tasks: PositiveNegativeOption[]
    setTasks: Dispatch<SetStateAction<any[]>>
    navigateToResults: () => void
    description?: string
    timerString?: string
}

export const PositiveNegative = ({
    tasks,
    setTasks,
    navigateToResults,
    description,
    timerString,
}: PositiveNegativeProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    // Защита от пустых данных на старте
    if (!tasks || tasks.length === 0) {
        return <p>Данные теста отсутствуют...</p>
    }

    const currentOption = tasks[currentIndex]

    const handleAnswer = (userAnswer: boolean) => {
        // Обновляем ответ конкретно по текущему индексу (работает быстрее и надежнее поиска по text)
        const updatedTasks = tasks.map((task, idx) =>
            idx === currentIndex ? { ...task, answer: userAnswer } : task
        )
        setTasks(updatedTasks)

        // Если это был последний вопрос — завершаем тест
        if (currentIndex === tasks.length - 1) {
            navigateToResults()
        } else {
            setCurrentIndex(prev => prev + 1)
            console.log(userAnswer)
        }
    }

    const handleGoBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        } else {
            toast("Дальше некуда идти")
        }
    }

    return (
        <div className="test-wrapper">
            <div className="test-card-info">
                <div className="test-card-count">
                    <div className="test-card-questions">
                        Вопрос {currentIndex + 1} из {tasks.length}
                    </div>

                    {timerString && (
                        <div className="test-card-timer">
                            {timerString}
                        </div>
                    )}
                </div>

                {description && (
                    <div className="test-card-description">
                        <span>Как отвечать: </span>{description}
                    </div>
                )}
            </div>

            <div className="test-card pozitive-negative">
                <div className="test-card-text">
                    {currentOption?.text}
                </div>

                <div className="test-card-options">
                    <Button label={"Назад"} variant="secondary" icon={<ArrowLeft />} disabled={currentIndex === 0} onClick={handleGoBack} />
                    <Button label={"Да"} variant={currentOption?.answer === true ? "done" : "primary"} icon={<Check />} onClick={() => handleAnswer(true)} />
                    <Button label={"Нет"} variant={currentOption?.answer === false ? "done" : "primary"} icon={<X />} onClick={() => handleAnswer(false)} />
                </div>

                <ProgressBar currentTaskNumber={currentIndex} total={tasks.length} />

                <Toaster />
            </div>
        </div>
    )
}