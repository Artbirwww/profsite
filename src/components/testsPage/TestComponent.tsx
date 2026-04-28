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
        <div className={`test-selection-item ${!isAvailable ? "locked" : ""}`} data-id={dataId} onClick={handleClick}>
            <div className="test-selection-item-icon">
                <Icon />
            </div>

            <div className="test-selection-item-label">
                <div className="test-selection-item-name">
                    <h4>{item.label}</h4>
                    <span>{item.author}</span>
                </div>
            </div>

            <div className="test-selection-item-description">
                <span>{item.description}</span>
            </div>

            <div className="test-selection-item-info">
                <div className="test-selection-item-options">
                    <Timer size={20} strokeWidth={1.5} />
                    <span>{item.time} минут</span>
                </div>

                <div className="test-selection-item-options">
                    <FileQuestion size={20} strokeWidth={1.5} />
                    <span>{item.questionscount} вопросов</span>
                </div>
            </div>

            <div className={`test-selection-item-icon icon-2 ${isComplete ? "complete" : ""}`}>
                <ArrowRight size={20} />
            </div>
        </div>
    )
})