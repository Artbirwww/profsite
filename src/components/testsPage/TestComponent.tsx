import { FC, memo, useRef, MouseEvent, useEffect } from "react"
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

export const TestComponent: FC<TestItemProps> = memo(({ item, dataId, isAvailable, isComplete, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const targetPos = useRef({ x: 0, y: 0 })
    const currentPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        let frameId: number

        const animate = () => {
            // Коэффициент инерции (0.1 — плавно, 0.2 — быстрее)
            const lerpFactor = 0.1

            // Вычисляем разницу и прибавляем часть к текущей позиции
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor

            if (cardRef.current) {
                cardRef.current.style.setProperty("--mouse-x", `${currentPos.current.x}px`)
                cardRef.current.style.setProperty("--mouse-y", `${currentPos.current.y}px`)
            }

            frameId = requestAnimationFrame(animate)
        }

        frameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frameId)
    }, [])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()

        // Обновляем только целевую позицию
        targetPos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    const handleClick = () => {
        if (!isAvailable)
            return

        onClick(item.path)
    }

    const declension = (count: number, titles: [string, string, string]) => {
        const cases = [2, 0, 1, 1, 1, 2]
        return titles[
            count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
        ]
    }

    return (
        <div ref={cardRef}
            className={`test-selection-item ${!isAvailable ? "locked" : ""}`}
            onMouseMove={handleMouseMove}
            data-id={dataId}
            onClick={handleClick}>

            <div className="hover-circle" />

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
                <div className="test-selection-item-hint">
                    <Timer />
                    <span>{item.time} {declension(item.time, ["минута", "минуты", "минут"])}</span>
                </div>

                <div className="test-selection-item-hint">
                    <FileQuestion />
                    <span>{item.questionscount} {declension(item.questionscount, ["вопрос", "вопроса", "вопросов"])}</span>
                </div>
            </div>

            <div className="test-selection-decal">
                <ArrowRight />
            </div>
        </div>
    )
})