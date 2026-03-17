import { FC, memo } from "react"
import { TestItem } from "./TestsData"
import { Timer, FileQuestion, ArrowRight } from "lucide-react"

interface TestItemProps {
    item: TestItem
    dataId: string
    index?: number
    isAvailable?: boolean
    isComplete?: boolean
    onClick: (path: string) => void
}

export const TestComponent: FC<TestItemProps> = memo(({ item, dataId, index, isAvailable, isComplete, onClick }) => {
    const Icon = item.icon

    const handleClick = () => {
        if (!isAvailable)
            return

        onClick(item.path)
    }

    return (
        <div
            className={`test-selection-item ${!isAvailable ? "locked" : ""}`}
            data-id={dataId}
            onClick={handleClick}>

            <div
                className="test-item-content-wrapper">

                <div
                    className="test-item-icon-container">

                    <Icon size={30} strokeWidth={1.5} className="test-item-icon" />

                </div>

                <div
                    className="test-item-label-wrapper">

                    <div
                        className="test-item-label-container">

                        <div
                            className="test-item-label-order">

                            {Array.from({ length: (index ?? 0) + 1 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="order-dot" />
                            ))}

                        </div>

                        <h1>{item.label}</h1>

                    </div>

                    <span>{item.author}</span>

                </div>

                <div
                    className="test-item-additions-container">

                    <div>

                        <div>

                            <Timer size={20} strokeWidth={1.5} className="test-item-icon" />
                            <span>{item.time} мин.</span>

                        </div>

                        <div>

                            <FileQuestion size={20} strokeWidth={1.5} className="test-item-icon" />
                            <span>{item.questionscount} вопросов</span>

                        </div>

                    </div>

                    <button
                        onClick={handleClick}>

                        <ArrowRight size={24} strokeWidth={1.5} className="test-item-icon" />
                    </button>

                </div>
            </div>
        </div>
    )
})